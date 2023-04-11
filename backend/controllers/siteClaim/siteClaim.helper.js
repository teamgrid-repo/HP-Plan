const siteClaimOrm = require("../../dbQuery/siteClaim");
const siteOrm = require("../../admin/dbQuery/site");
const userOrm = require("../../dbQuery/users");
const UsersModel = require("../../models/users");
const providerOrm = require("../../dbQuery/provider");
const userProfileOrm = require("../../dbQuery/userProfile");
const appointmentHelper = require("../../controllers/appointment/appointment.helper");
const organisationOrm = require("../../dbQuery/organisation");
const userHelper = require("../../admin/controllers/users/users.helper");
const { isEmpty } = require("lodash");
const {
  errorMessages,
  successMessages,
  identity,
} = require("../../helpers/messages");
const { status } = require("../../helpers/messages");
const { approvedProviderUser, content } = require("../../helpers/template");
const { sendMail } = require("../../connection/smtp.connect");
const dataApprovalSubUser = require("../DataApproval/DataApprovalSubUser");
const { createUserProfile } = require("../userProfile/userProfile.helper");
async function createSiteClaim(data) {
  try {
    const { email, siteId } = data;
    if (isEmpty(email))
      return { err: true, msg: `Email ${errorMessages.NOT_FOUND}` };
    const userByEmail = await userOrm.findUser({ email: email });
    console.log("heyyy", userByEmail);
    // if (!isEmpty(userByEmail)) {
    //   return {
    //     err: true,
    //     msg: "Already Used! can't use this email for this organisation",
    //   };
    // }
    // const findEmail = await siteClaimOrm.getClaimByEmail({
    //   email,
    //   active: true,
    // });
    // if (!isEmpty(findEmail)) {
    //   return { err: true, msg: "You have already Claim One Organisation" };
    // }
    const findSite = await siteOrm.getOneSite(siteId);
    if (isEmpty(findSite)) {
      return { err: true, msg: "Invalid Site" };
    }
    const findOrganisationId = findSite["organisationId"];
    if (isEmpty(findOrganisationId))
      return { err: true, msg: "Invalid Organisation" };

    data.organisationId = findOrganisationId;
    data.status = status.PENDING;
    if (data.isGeneralUser === false) {
      const newSubUserCreated =
        await dataApprovalSubUser.createOrgAndProviderBySubUser(
          {
            organisationId: data.organisationId,
            makeAccountPrimary: true,
            name: data.name,
            password: data.password,
            email: data.email,
            jobTitle: data.jobTitle,
            howYouHeard: data.howYouHeard,
            approvedStatus: status.PENDING,
            claimStatus: status.PENDING,
          },
          false
        );
      if (newSubUserCreated.msg === []) {
        data.userId = newSubUserCreated.id;
      } else {
        data.userId = newSubUserCreated.msg.userId;
      }
    } else {
      data.userId = userByEmail._id;
    }
    await organisationOrm.updateOrganisation(
      { claimStatus: true },
      data.organisationId
    );
    const site = await siteClaimOrm.createClaimSite(data);
    const claimTemplate = content([
      "We have received your request to claim your provider profile. It is pending approval, and we will be in touch once it is approved. Please reach out to " +
        `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org</a>` +
        " if you have any questions.",
    ]);
    sendMail(data.email, "Claim Review", claimTemplate);
    return { err: false, msg: [] };
  } catch (err) {
    return { err: true, msg: err };
  }
}

async function getALlClaimSite() {
  try {
    const getAllClaimSite = await siteClaimOrm.getAllClaimSite();
    return { err: false, msg: getAllClaimSite };
  } catch (err) {
    return { err: true, msg: err };
  }
}

async function updatedClaimSite(id, data, currUser) {
  try {
    const claimId = await siteClaimOrm.getOneSiteClaim({ _id: id });
    if (isEmpty(claimId)) {
      return { err: true, msg: "Invalid Claim ID" };
    }
    if (!isEmpty(data)) {
      await siteClaimOrm.updatedClaim(
        { _id: id },
        {
          ...data,
          approvedBy: currUser,
          active: data.status === status.APPROVED,
        }
      );
      if (data.status === status.APPROVED) {
        if (claimId.isGeneralUser === true) {
          const claimTemplate = content([
            "Your Provider account has been approved! Please use the same credentials you set up when you first signed up to log in to the portal. You can turn on messages and appointments to communicate with other providers.",
          ]);
          sendMail(claimId.email, "Claim Status", claimTemplate);
          const deletedClaims = await siteClaimOrm.deletePendingClaim({
            status: status.PENDING,
            userId: claimId.userId,
          });

          const findByEmail = await userOrm.findUser({ email: claimId.email });

          const userProfile = await userProfileOrm.findProfileByUserId(
            findByEmail._id
          );

          const appointment = await appointmentHelper.deleteAppointment(
            findByEmail._id,
            "clientId"
          );

          await userProfileOrm.deleteUserProfile(userProfile._id);

          // const newProvider = await userOrm.createUser({
          //   name: findByEmail.name,
          //   email: findByEmail.email,
          //   password: findByEmail.password,
          //   role: "provider",
          //   status: findByEmail.status,
          //   type: findByEmail.type,
          //   social_token: findByEmail.socialToken || "",
          //   fcm_token: findByEmail.fcmToken || null,
          //   jwt_auth_token: "",
          //   jwt_token_expired: "",
          // });
          await userOrm.updateUserById(findByEmail._id, {
            role: "provider",
          });

          const dataProfile = await providerOrm.createProvider({
            userId: findByEmail._id,
            message: userProfile.message,
            textMessage: userProfile.textMessage,
            EmailMessage: userProfile.EmailMessage,
            appNotification: userProfile.appNotification,
            communication: userProfile.communication,
            claimStatus: status.APPROVED,
            name: userProfile.name,
            email: findByEmail.email,
            makeAccountPrimary: true,
            approvedStatus: status.APPROVED,
            organization: claimId.organisationId,
          });
        } else {
          const providerData = await providerOrm.updateProviderInfoo(
            { claimStatus: status.APPROVED ,approvedStatus: status.APPROVED},
            claimId.userId
          );
        }
        const claimTemplate = content([
          "Your claim has been approved! You can now manage your profile, save lists and searches of providers, save custom quiz results, and directly message other providers on the platform. Please be sure to turn on appointments and messages.",
        ]);
        sendMail(claimId.email, "Claim Status", claimTemplate);
      }
      if (data.status === status.CANCELLED) {
        console.log("inside cancle-----")
        const claimTemplate = content([
          "We have received and reviewed your request to claim an organization on our directory. We cannot approve this request at this time. If you have questions, please reach out to us at " +
            `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org</a>.` +
            `<br/>` +
            "Thank you for all you do for women and families.",
        ]);
        sendMail(claimId.email, "Claim Status", claimTemplate);
        if(claimId.isGeneralUser === false)
        {
          const updateduser = await userOrm.updateUserById(claimId.userId, {
            role: "user",
          });
          console.log("updateduser-----",updateduser)
          const providerData = await providerOrm.getProviderByuserId(
            claimId.userId
          );

          const dataProfile = await createUserProfile(
            {
              userId: claimId.userId,
              message: providerData.message,
              textMessage: providerData.textMessage,
              EmailMessage: providerData.EmailMessage,
              appNotification: providerData.appNotification,
              communication: providerData.communication,
              name: providerData.name,
            },
            providerData.email
          );
          await UsersModel.findByIdAndUpdate(claimId.userId, {
            profileId: dataProfile.msg._id,
          });
          await providerOrm.deleteProvider(providerData._id);
        }


       await organisationOrm.updateOrganisation(
          { "claimStatus": false },
          claimId.organisationId
        );

      }
      // if (data.status === status.APPROVED) {
      //   const orgId = await organisationOrm.getOrganisationById(
      //     claimId["organisationId"]
      //   );
      //   if (isEmpty(orgId)) {
      //     return { err: true, msg: `Organisation ${errorMessages.NOT_FOUND}` };
      //   }
      //   console.log(orgId);
      //   //Create PROVIDER
      //   const { name, email, jobTitle, howYouHeard } = claimId;
      //   const createProviderByAdmin =
      //     await userHelper.createNewAdditionalSubUser({
      //       userId: currUser,
      //       organisationId: orgId["_id"],
      //       makeAccountPrimary: true,
      //       name,
      //       email,
      //       jobTitle,
      //       howYouHeard,
      //       approvedStatus: status.APPROVED,
      //       role: identity.ADMIN,
      //     });
      //   if (!isEmpty(createProviderByAdmin) && createProviderByAdmin.err)
      //     return createProviderByAdmin;
      //   if (data.status === status.APPROVED) {
      //     const claimTemplate = content([
      //       "Thank you for becoming a user of the Her PLAN directory. We invite you to explore your profile’s settings first. You must turn ON appointments and messages in order to receive or send secure information using this platform. In addition to messages and appointments, you can create your own lists of providers, searches, and quiz results.",
      //     ]);
      //     sendMail(email, "Claim Status", claimTemplate);
      //   }
      //   return {
      //     err: false,
      //     msg: [],
      //     val: "Provider User Created Successfully",
      //   };
      // }
    }
    const updatedData = await siteClaimOrm.getOneSiteClaim({ _id: id });
    return { err: false, msg: updatedData, val: successMessages.CLAIM_UPDATED };
  } catch (err) {
    return { err: true, msg: err };
  }
}

module.exports = {
  createSiteClaim,
  getALlClaimSite,
  updatedClaimSite,
};
