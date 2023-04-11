import { makeStyles } from "@mui/styles";
import config from "../../config";

const useStyle = makeStyles((theme) => ({
  mainTitle: {
    margin: "0 0 80px 0",
    fontFamily: "Montserrat",
    fontSize: "36px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#252222",
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: "21px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "-0.66px",
    textAlign: "left",
    color: "#19191b",
    marginBottom: "24px",
  },
  desc: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "-0.5px",
    textAlign: "left",
    color: "#696871",
    marginBottom: "68px",
  },
}));

const GeneralUserTOU = () => {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.title}>INTRODUCTION & ACKNOWLEDGMENT</div>
      <div className={classes.desc}>
        These Terms of Use for Her Pregnancy and Life Assistance Network (“Her
        PLAN”) Website and Related Services (“Terms”) apply to the Her PLAN
        website located at{" "}
        <a href="directory.herplan.org" target="_blank">
          directory.herplan.org
        </a>{" "}
        (“Website”) and are between Her PLAN, a product of the Susan B. Anthony
        List, Education Fund, Inc. (collectively “Her PLAN” or “We”) and the
        individual connecting to, accessing and using, the Website and services
        provided in connection with access and use of the Website (“You”, and
        such related services, the “Services”). These Terms inform You of Your
        rights and the rights held by Her PLAN in relation to Your use of the
        Website and Services. By connecting and/or accessing and/or using the
        Website and/or Services, You expressly confirm Your agreement to these
        Terms and also acknowledge and agree that:
        <ul>
          <li>
            You have accessed or obtained, and read, a copy of these Terms;
          </li>
          <li>
            You have accessed or obtained, and read, a copy of our{" "}
            <a href={`${config.url}privacy-policy`} target="_blank">
              Privacy Policy;
            </a>
          </li>
          <li>
            You are of an age required or otherwise authorized under the law of
            Your location of residence to commit Yourself to these Terms;
          </li>
          <li>
            You have the right to access and use the Website and the Services
          </li>

          <li>
            We maintain records of Your downloads, the content You have provided
            Her PLAN, Your requests, the products provided to You and the
            Services with which you have been provided or have engaged, Your
            contacts and communications and other interactions with HER PLAN.
          </li>
        </ul>
        Any objection to these Terms, or any part of these Terms, will be
        interpreted as a refusal to agree to these Terms. IF YOU DISAGREE WITH
        THESE TERMS, YOU ARE NOT PERMITTED TO USE THE WEBSITE OR THE SERVICES,
        AND SHALL NOT CONNECT TO, ACCESS OR USE THE WEBSITE OR THE SERVICES.
        Your connection to, access or use of the Website and/or the Services are
        deemed to be Your acceptance of these Terms.
      </div>

      <div className={classes.title}>CHANGES</div>
      <div className={classes.desc}>
        We may change these Terms from time to time at our discretion and any
        changes to these Terms will be posted on this Website and become
        effective immediately upon posting. Any new version of the Terms will
        not apply retroactively, but shall immediately replace and supersede the
        previous Terms upon posting. Your continued use of this Website and/or
        the Services after We make changes is deemed to be acceptance of the
        changes, so please check these Terms periodically for updates.
      </div>

      <div className={classes.title}>
        NOTICE OF ARBITRATION AND CLASS WAIVER
      </div>
      <div className={classes.desc}>
        THESE TERMS REQUIRE ARBITRATION OF DISPUTES AND YOUR WAIVER OF JURY
        TRIAL AND CLASS ACTION LAWSUITS, AND LIMIT HER PLAN’S LIABILITY IN
        DISPUTES. SEE BELOW FOR FURTHER DETAIL.
      </div>

      <div className={classes.title}>SERVICE PROVIDERS AND HIPAA ENTITIES</div>
      <div className={classes.desc}>
        Her PLAN’S objectives include the provision of life-affirming assistance
        and support to women and families facing challenges associated with
        pregnancy. We do this by engaging with, and providing opportunities for
        collaboration between and among, Service Providers and HIPAA Entities
        (collectively, “Her Plan Providers”) to empower women and families
        through comprehensive medical, social and material support.
        <br /> <br />A “Service Provider” is an organization in a community,
        such as a church, pregnancy help center, shelter, food pantry, job
        training service, support group, or thrift store, whose objectives
        include the provision of life-affirming assistance entity that has
        self-identified as not being subject to HIPAA; however, some Service
        Providers may provide health services such as limited obstetrical
        ultrasound for diagnostic purposes. providers. Service Providers may
        include individuals who provide services to women and families facing
        challenges associated with pregnancy life-affirming assistance and
        support in the seven categories of care that meet the needs that women
        identify as reasons for considering abortion: mentorship; health and
        well-being; financial assistance, work or education; material or legal
        support; recovery and mental health; prenatal diagnosis; and care for
        children.
        <br /> <br />A “HIPAA Entity” is an entity that has identified as a
        HIPAA-covered entity, and therefore is also providing healthcare
        services.
        <br />
        <br /> Her PLAN Providers may include providers not listed on the
        Website.
      </div>

      <div className={classes.title}>MEDICAL EMERGENCIES</div>
      <div className={classes.desc}>
        THE WEBSITE AND THE SERVICES ARE NOT INTENDED FOR USE, AND YOU SHOULD
        NOT USE THEM, IN A MEDICAL EMERGENCY OR IN CASE OF AN URGENT HEALTHCARE
        NEED. IF YOU HAVE AN EMERGENCY OR URGENT MEDICAL NEED, YOU SHOULD GET
        CARE FROM AN EMERGENCY DEPARTMENT, OR CALL 911 IMMEDIATELY.
      </div>

      <div className={classes.title}>ADVERSE ORGANIZATIONS</div>
      <div className={classes.desc}>
        Organizations that advocate for public policy positions that are adverse
        to Her PLAN, including but not limited to organizations that advocate
        for certain access to abortion services, are prohibited from
        reproducing, copying any part of, screenshotting, or using any part of
        the Website or Services, including without limitation information,
        documents (such as directories, guidebooks, or other materials) and
        other content contained on the Website.{" "}
      </div>

      <div className={classes.title}>MEDIA CONTACTS</div>
      <div className={classes.desc}>
        Media should contact Her PLAN at{" "}
        <a href="mailto:info@herplan.org">info@herplan.org</a> for permission to
        reproduce or make copies of any part of the Website, including without
        limitation, any of the information, documents (such as directories,
        guidebooks, etc.) and other content and materials on the Website.
      </div>

      <div className={classes.title}>PROPRIETARY RIGHTS AND YOUR RIGHTS</div>
      <div className={classes.desc}>
        <b>Proprietary Rights.</b> As between You and Her PLAN, all elements of
        the Website, including without limitation, music, artwork, charts,
        pictures, browsing means, text, interfaces, photographs, graphics,
        designs, computer code, software, fonts, trademarks, trade names, logos
        (excluding logos, trade names, trademarks and contact information of Her
        PLAN Providers), and all updates and derivative works of any of the
        foregoing, and all rights, title and interest in and to, and all
        intellectual property rights therein, are owned by Her PLAN and/or its
        licensors and affiliates. The structure, design, selection, expression,
        “look and feel” and arrangement organization and code of the Website
        also are owned, controlled or licensed by or to Her PLAN, and are
        protected by intellectual property rights.
        <br />
        <br />
        <b>Your Rights.</b> Subject to Your compliance with these Terms, Her
        PLAN grants You a personal, non-exclusive, non-transferable,
        non-assignable, limited privilege, revocable at any time at Her PLAN’S
        sole discretion, to enter and use the Website and the Services. To the
        extent You choose to use the Website to access and use the Services, You
        do so at Your own initiative and agree to use the Website and Services
        only for Your and/or Your family’s own personal, non-commercial,
        informational, educational and support purposes (“Purposes”). You may
        download, copy and use information, documents (such as directories,
        guidebooks, etc.) and other content and materials made available by Her
        PLAN for downloading from the Website, provided that: (1) You do not
        remove any proprietary notice language in all copies of such documents;
        (2) You do not add, delete, distort, misrepresent or add representations
        to, any content provided by Her PLAN; and (3) You use such information,
        documents, content and materials only for the Purposes. You may not
        copy, reproduce or sell, without the prior express written authorization
        of Her PLAN, any information, documents, content, materials or portions
        thereof that are downloaded from the Website or otherwise provided by
        Her PLAN.
      </div>

      <div className={classes.title}>RESTRICTIONS</div>
      <div className={classes.desc}>
        You agree not to, and Her PLAN disclaims any and all liability arising
        out of any of the following:
        <ul>
          <li>
            Your use of the Website or Services for any illegal purposes. You
            agree to comply with all applicable local, state, national, and
            international laws and regulations, and any additional policies or
            guidelines that Her PLAN may make available;
          </li>
          <li>
            Your attempt to gain unauthorized access to any portion or feature
            of the Website or the Services, or any other systems or networks
            connected to the Website or other user’s accounts through password
            mining or any other means, or pretend that You are or that You
            represent someone else, or impersonate any other individual or
            entity;{" "}
          </li>
          <li>
            Your attempt to forge or otherwise manipulate identifiers in order
            to disguise the origin of any message or transmittal You send on or
            through the Website or any Service;
          </li>
          <li>
            Your attempt to reverse look-up, trace or seek to trace any
            information on any other user of or visitor to the Website, to its
            source, or exploit the Website or any Service in any way where the
            purpose is to reveal any information, including but not limited to
            personal identification or information, other than Your own
            information, as provided for by the Website;
          </li>
          <li>
            You taking any action and/or use any method that would allow data to
            be retrieved from the Website, including data scraping, data
            harvesting, web crawling or any other automatic device, program or
            operation enabling any direct or indirect migration and/or
            duplication of the data or Services accessible from the Website;
          </li>
          <li>
            Your attempt to probe, scan or technically analyze the Website, or
            test the vulnerability, the performance or functionality of the
            Website, or breach the security or authentication measures on the
            Website or any network connected to the Website;
          </li>
          <li>
            Your reproduction, modification, translation, or creation of
            derivative works of the Website or any portion thereof; provided
            that You may use information about the Services as set forth above;{" "}
          </li>
          <li>
            You acting as a service bureau for, or sell, rent, lease, loan,
            sublicense, publish, transfer or redistribute access to or use of
            the Services, or any portion thereof, in any manner;
          </li>
          <li>
            You attempting to defraud, defame, abuse, harass, stalk, threaten,
            or otherwise violate the legal rights (such as rights of privacy and
            publicity) of others, or breach Your confidentiality obligations to
            another;
          </li>
          <li>
            Your attempt to knowingly upload, or knowingly otherwise make
            available, files that contain images, photographs, software, or
            other material protected by intellectual property laws, including,
            by way of example, and not as a limitation, copyright or trademark
            laws (or by rights of privacy or publicity) unless You own or
            control the rights thereto or have received all necessary consent to
            do the same;
          </li>
          <li>
            Your exploitation of the Website or the Services in violation of
            these Terms or in any unauthorized way, including, but not limited
            to, using the Website to transmit any computer viruses, worms,
            trojan horses or other malware, or by trespass, burdening network
            capacity, or otherwise interfering with other users’ use of the
            Website or Services;
          </li>
          <li>
            Your attempt to remove, obscure or alter any copyright notices,
            marks, or any other proprietary rights or legal notices, documents
            or hyperlinks that may appear in or be provided through the Website
            or Services;{" "}
          </li>
          <li>
            You acting in any manner that shall create any prejudice to Her
            PLAN, its affiliates, Her PLAN providers, partners or any user of
            the Website or Services;
          </li>
          <li>
            Your attempt to do any of the foregoing, or advocate, encourage or
            assist any third party in doing any of the foregoing.
          </li>
        </ul>
      </div>

      <div className={classes.title}>ACCOUNT CREATION AND REGISTRATION</div>
      <div className={classes.desc}>
        To use certain portions of this Website, You will be asked to complete a
        profile information form and provide contact information (such as name,
        address and email address) (“Your Account”). There is no cost for
        individuals using this Website. You agree to provide complete, accurate
        and up-to-date information during the registration process and to update
        such information as necessary to ensure that it remains complete,
        accurate and up-to-date.
        <br />
        <br />
        When You create Your Account, You must follow a set of requirements
        designed to prevent third parties from accessing Your Account. You must
        verify that Your password is sufficiently secured (composed with enough
        characters, mixed cases, and varied alpha-numerical characters, etc.),
        and disconnect Your session when You disconnect from the Website. Access
        to Your Account and/or any other means at Your disposal to connect to
        the Website is done at Your own risk. You are solely responsible for any
        connection to Your Account by a third party to whom You have given Your
        consent or who is using Your password for such access.
      </div>

      <div className={classes.title}>HER PLAN COMMUNICATIONS</div>
      <div className={classes.desc}>
        <b> Email Communications.</b> If You create Your Account, Her PLAN may
        occasionally send You information on resources, services, news and other
        issues. If You register to receive a Her PLAN publication, We will ask
        for Your contact information to send You that publication. You may
        request for any such communication to be discontinued by deactivating
        Your Account, or by selecting the “unsubscribe” option within any
        electronic communications. electing “. You may access, adjust, remove
        Your personal information, or deactivate Your Account by contacting Her
        PLAN at <a href="mailto:info@herplan.org">info@herplan.org</a>.
        <br />
        <br />
        <b> Text Communications.</b> When you opt-in and provide your mobile
        phone number, you will agree to receive notification messages via text
        concerning your use of our Services. Message and data rates apply.
        Consent is not required as a condition for receiving the Services or
        using the Website. You can Reply HELP for help, and STOP to cancel.
        <br />
        <br />
        <b> Provider Sharing.</b> With your permission, certain information,
        such as Your name, will be shared with any providers you message within
        our platform. We refer to this as “provider sharing.” You have the
        option to opt-in to “provider sharing.” This option will be given to you
        via a separate check box. By selecting to opt-in to provider sharing,
        you give Her PLAN permission to share your contact information with Her
        PLAN providers on your behalf.
        <br />
        <br />
        Certain providers, such as medical and healthcare providers are
        considered entities covered by the Health Insurance Portability and
        Accountability Act of 1996 (HIPAA). In most instances HIPAA-covered
        entities must obtain your permission before communicating with others.
        Providers that are not required to abide by HIPAA, such as housing and
        food services, may ask your permission to communicate with others but
        may not be legally required to do so. We encourage You to ask each
        provider about their own policies regarding obtaining permission to
        share Your information. For your protection, our platform meets standard
        security measures according to the Software as a service (SAAS) model
        and the Security Rule of HIPAA, but we do not obtain permissions on
        behalf of providers you find on the Her PLAN website. More information
        about our security protections can be found throughout these Terms.{" "}
        <b>
          {" "}
          We do NOT obtain HIPAA permissions from providers on your behalf.
        </b>
      </div>

      <div className={classes.title}>NO MEDICAL ADVICE</div>
      <div className={classes.desc}>
        The Website features a variety of content on issues related to
        pregnancy, abortion, human sexuality, sexual health, contraception,
        abstinence and other related issues. Such information on this Website is
        not intended to substitute, and should not be substituted, for
        professional medical advice. You are always advised to seek advice from
        Your personal medical physician on issues related to Your health. The
        issues and content discussed in this Website are for general audiences
        only. Your physician is typically best able to evaluate whether or not a
        specific health suggestion or potential course of treatment is best for
        You.
        <br />
        <br />
        You acknowledge and agree that:
        <ul>
          <li>
            The Website and the Services are not, and shall not be deemed to be,
            the practice of medicine or in any way the provision of medical or
            health or wellness-related services, and that Her PLAN has no
            license or other authority to do any of the foregoing;
          </li>
          <li>
            None of the Website or the Services are a substitute for medical
            advice, diagnosis or treatment and should not be used to prevent,
            diagnose or treat any medical condition, but rather are intended for
            informational and educational purposes only.
          </li>
        </ul>
        You should call Your doctor to receive medical advice, and if You think
        You may be having a medical emergency, You should immediately call 911.
      </div>

      <div className={classes.title}>GENERAL INFORMATIONAL USE ONLY</div>
      <div className={classes.desc}>
        All material, resources, content and information published, posted or
        distributed by Her PLAN are designed and intended for general
        informational purposes only and should not be relied upon as a
        substitute for the direct counsel of an attorney, financial, life skills
        or education/career counselor, or medical/mental health professional.
        You expressly assume the risk of Your reliance upon any content or
        information contained in or accessed through this Website or the
        Services.
      </div>

      <div className={classes.title}>PRIVACY & SECURITY</div>
      <div className={classes.desc}>
        Please read our{" "}
        <a href={`${config.url}privacy-policy`} target="_blank">
          Privacy Policy
        </a>{" "}
        carefully for information relating to our collection, use, storage, and
        securing of your personal information.{" "}
      </div>

      <div className={classes.title}>
        UPDATES, THIRD PARTY ASSISTANCE, SPONSORS AND ADVERTISERS, LINKS
      </div>
      <div className={classes.desc}>
        <b> Updates and Other Rights.</b> Her PLAN may, in its sole discretion,
        provide updates, supplements, add-on components, features, or other
        functionality or messages related thereto, including without limitation
        alterations of functionality, features, storage, security, availability,
        content and other information relating to the Website or Services
        (collectively, “Updates”), subject to any additional terms and
        conditions provided by Her PLAN applicable to such Updates. Unless
        otherwise provided by Her PLAN, all such Updates will be covered by
        these Terms. Updates may include substantial modifications of: (1) the
        Website or Services and/or (2) the functionality available through the
        Website or the Services. You hereby authorize Her PLAN to, and agree
        that Her PLAN may automatically transmit, access, install and otherwise
        provide Updates without further notice or need for consent. Her PLAN has
        no obligation to, and nothing in these Terms may be construed to require
        Her PLAN to, create, provide or install Updates.
        <br />
        <br />
        Her PLAN also reserves the right to do any of the following, at any
        time, with or without notice: (1) modify, suspend or terminate operation
        of or access to the Website or Services, or any portion of thereof, for
        any reason; (2) modify or change the Website or Services, or any portion
        of thereof, and any applicable policies or terms; and/or (3) interrupt
        the operation of the Website or Services, or any portion thereof, as
        necessary to perform routine or non-routine maintenance, error
        correction, or other changes.
        <br />
        <br />
        <b> Third Party Assistance.</b> Her PLAN may, at its discretion, use
        third parties to assist in providing the Website or Services. Any such
        third party is an authorized third party under Your authorization above.
        <br />
        <br />
        <b> Posts and Grants.</b> The Website may contain posts by or about
        third parties. Posting by or about such third parties on the Website
        does not imply endorsement by Her PLAN or its affiliates of the company
        posting, or the product, information or service. Her PLAN does not
        explicitly or implicitly endorse third parties in exchange for
        advertising, and does not accept remuneration for advertising.
        Advertising does not influence our editorial content, products or
        services. Her PLAN does not make any representation as to the accuracy
        or suitability of any of the information contained in any posts and does
        not accept, or have, any responsibility or liability for the conduct or
        content of such posts and the offerings made by the third parties. Her
        PLAN recommends that users of the Website do their due diligence before
        engaging a vendor or service provider.
        <br />
        <br />
        Her PLAN determines the order in which Her PLAN providers, are listed on
        the Website. Her PLAN may award grants to certain organizations. Her
        PLAN does not consider the failure to receive a grant as a factor in Her
        PLAN’S decision to include or not to include a Her Plan provider on
        lists of the same on the Website.
        <br />
        <br />
        <b> Links.</b> Her PLAN provides links to other websites maintained by
        individuals or organizations outside of Her PLAN, and/or information
        about such individuals and organizations These links and information are
        not an endorsement of these external websites or the values or opinions
        expressed therein. Her PLAN does not control or guarantee such websites
        and expressly disclaims any representations or warranties, implied or
        express, regarding such websites’ accuracy or appropriateness, or
        position on abortion, and does not accept, or have, any responsibility
        or liability for the conduct or content of those websites or the
        offerings, values or opinions expressed therein. Should You visit these
        external websites, You will be under the terms of service and privacy
        policy maintained by the sites/owners of such external websites.
      </div>

      <div className={classes.title}>FEEDBACK</div>
      <div className={classes.desc}>
        Her PLAN welcomes and encourages You to provide Your remarks, comments,
        ideas and suggestions for improvements, enhancements and modifications
        to the Website and/or the Services, and Your findings, conclusions and
        judgments regarding the Website and/or the Services (“Feedback”). If You
        have Feedback, You may submit it to Her PLAN at info@herplan.org or by
        submitting responses to any surveys provided to You by Her PLAN or on
        our behalf. You acknowledge and agree that You are responsible for such
        Feedback and that You have full responsibility for the content of such
        Feedback, including its legality, reliability, appropriateness,
        originality, non-infringement and copyright. You further acknowledge and
        agree that all Feedback You provide: (1) will be treated as
        non-confidential, and (2) will be the sole and exclusive property of Her
        PLAN. Without limiting the foregoing, You acknowledge that Your Feedback
        may be disseminated or used by Her PLAN for any purpose whatsoever,
        including without limitation, developing, improving and marketing the
        Website and/or the Services, or other products and services or for any
        and all purposes that We believe to be appropriate to the mission and
        vision of Her PLAN. You hereby irrevocably transfer and assign to Her
        PLAN all of Your right, title, and interest in and to all Feedback,
        including all worldwide patent, copyright, trade secret, moral and other
        proprietary or intellectual property rights therein, and waive any moral
        rights You may have in such Feedback. You agree to sign and deliver such
        documents, and otherwise provide such assistance, as may reasonably be
        required from time to time to perfect Her PLAN’S rights in any such
        improvements, enhancements and modifications.
      </div>

      <div className={classes.title}>VIOLATION OF THESE TERMS</div>
      <div className={classes.desc}>
        Her PLAN may, in its sole discretion and without prior notice, terminate
        Your access to the Website and Services, and/or block Your future access
        to the Website and Services, if We determine that You have violated
        these Terms or other agreements or guidelines which may be associated
        with Your use of the Website or Services. Notwithstanding the foregoing,
        Your rights under these Terms will terminate automatically or otherwise
        cease to be eﬀective without notice from Her PLAN if You fail to comply
        with any term(s) of these Terms. You also agree that any violation by
        You of these Terms will constitute an unlawful and unfair business
        practice, and will cause irreparable harm to Her PLAN, for which
        monetary damages would be inadequate, and You consent to Her PLAN
        obtaining any injunctive or equitable relief that Her PLAN deems
        necessary or appropriate in such circumstances. These remedies are in
        addition to any other remedies Her PLAN may have at law or in equity.
        <br />
        <br />
        Her PLAN also reserves the right to change, suspend, remove or disable
        Your access to the Website or the Services, or any feature or part
        thereof, at any time without notice or liability. Her PLAN also may
        impose limits on the use of or access to the Website or the Services, or
        any feature or part thereof, in any case and without notice or
        liability. If Her PLAN has suspended Your Account due to Your actual or
        suspected breach of the Terms, such suspension will continue until the
        suspected breach is cured or otherwise resolved to Her PLAN’S
        satisfaction.
        <br />
        <br />
        If Her PLAN does take any legal action against You as a result of Your
        violation of these Terms of Use, Her PLAN will be entitled to recover
        from You, and You agree to pay, all reasonable attorneys’ fees and costs
        of such action, in addition to any other relief granted to Her PLAN. You
        agree that Her PLAN will not be liable to You or to any third party for
        termination of Your access to the Website or Services as a result of any
        violation of these Terms.
        <br />
        <br />
        Upon any termination of these Terms, You shall cease all use of the
        Website and Services. The following provisions of these Terms shall
        survive any termination: Proprietary Rights; Restrictions;
        Authorization; Feedback; Violation of These Terms; Disclaimer of
        Warranties; Indemnification; Disclaimer of Liability; Governing Law;
        Arbitration; . Prohibition of Class and Representative Actions and
        Non-Individualized Relief; Miscellaneous.
      </div>

      <div className={classes.title}>
        DISCLAIMER OF WARRANTIES; INDEMNIFICATION; DISCLAIMER OF LIABILITY
      </div>
      <div className={classes.desc}>
        <b> DISCLAIMER OF WARRANTIES.</b> SOME JURISDICTIONS DO NOT ALLOW THE
        EXCLUSION OF CERTAIN WARRANTIES. TO THE EXTENT CERTAIN EXCLUSIONS ARE
        SPECIFICALLY PROHIBITED BY APPLICABLE LAW, THE FOLLOWING SUCH
        DISCLAIMERS MAY NOT APPLY TO YOU.
        <br />
        <br />
        HER PLAN DOES NOT WARRANT THAT THE WEBSITE OR ANY CONTENT OR SERVICE OR
        FEATURE OF THE WEBSITE WILL BE ERROR-FREE OR UNINTERRUPTED, OR THAT ANY
        DEFECTS WILL BE CORRECTED, OR THAT YOUR USE OF THE WEBSITE OR SERVICES
        WILL PROVIDE SPECIFIC RESULTS OR WILL MEET YOUR REQUIREMENTS. YOU
        EXPRESSLY UNDERSTAND AND AGREE THAT THE WEBSITE AND THE SERVICES ARE
        PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS AND THAT YOUR USE OF THE
        WEBSITE AND SERVICES, AND ANY LINKED WEBSITES, IS AT YOUR OWN DISCRETION
        AND SOLE RISK.
        <br />
        <br />
        HER PLAN EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
        MERCHANTABILITY, ACCURACY, FITNESS FOR A PARTICULAR PURPOSE AND
        NON-INFRINGEMENT. HER PLAN DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS,
        OMISSIONS AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR RELATED
        TO YOUR USE OF THE WEBSITE AND/OR SERVICES. THE FOREGOING DISCLAIMERS
        INCLUDE, WITHOUT LIMITATION, ANY WARRANTY, DUTY, OR CONDITION THAT: THE
        WEBSITE OR SERVICES WILL BE RELIABLE, SECURE, VIRUS-FREE, OR CORRESPOND
        TO ANY CONDITION; THAT MESSAGES OR REQUESTS WILL BE DELIVERED; OR THAT
        THE WEBSITE OR SERVICES, ANY CONTENT, SYSTEMS, SERVERS, AND INFORMATION
        THAT IS IN OR UTILIZED BY THE WEBSITE AND/OR SERVICES WILL BE FREE OF
        HARMFUL ASPECTS OR THAT ANY INFORMATION OBTAINED BY YOU AS A RESULT OF
        THE WEBSITE OR SERVICES, OR OTHER WEBSITES LINKED FROM THE WEBSITE, WILL
        BE ACCURATE OR RELIABLE. ALSO, THERE IS NO WARRANTY OF TITLE OR AGAINST
        INTERFERENCE WITH ANYONE’S ENJOYMENT OF THE WEBSITE OR SERVICES.
        <br />
        <br />
        YOU AGREE THAT HER PLAN IS NOT BE LIABLE FOR: ANY CONTENT, INCLUDING BUT
        NOT LIMITED TO CONTENT THAT IS SENT, RECEIVED, HELD, RELEASED OR
        OTHERWISE CONNECTED IN ANY RESPECT TO THE WEBSITE OR SERVICES; CONTENT
        THAT IS SENT BUT NOT RECEIVED; ANY ACCESS TO OR ALTERATION OF CONTENT;
        ANY CONTENT SENT USING AND/OR INCLUDED IN THE SERVICES, INCLUDING
        WITHOUT LIMITATION ANY THREATENING, DEFAMATORY, OBSCENE, OFFENSIVE, OR
        ILLEGAL CONTENT; THE CONDUCT OF ANYONE; OR ANY INFRINGEMENT OF ANOTHER’S
        RIGHTS, INCLUDING PRIVACY, INTELLECTUAL PROPERTY, OR DATA PROTECTION
        RIGHTS. BY ACCESSING AND USING THE WEBSITE, YOU AGREE TO HOLD HER PLAN
        AND ITS AFFILIATES HARMLESS AND NOT RESPONSIBLE FOR THE CONTENT
        DISTRIBUTED BY OR THROUGH THE WEBSITE OR SERVICES, OR OTHER WEBSITES
        LINKED FROM THE WEBSITE.
        <br />
        <br />
        <b> Indemnification.</b> You agree to defend, indemnify, and hold
        harmless Her PLAN and its affiliates and their respective officers,
        directors, employees and agents, and successors and assigns from and
        against any and all demands, losses, liabilities, claims, expenses, and
        costs (including, but not limited to, fees, costs and other expenses of
        attorneys and expert witnesses) arising out of or related to: (i) Your
        use of the Website or the Services; (2) Your violation of these Terms;
        or (3) Your fraud, willful misconduct or gross negligence.
        <br />
        <br />
        <b> DISCLAIMER OF LIABILITY.</b> HER PLAN DISCLAIMS ANY AND ALL
        LIABILITY FOR ANY DAMAGE DIRECTLY OR INDIRECTLY SUFFERED BY YOU, IN
        CONNECTION WITH OR RELATED TO YOUR USE OF THE WEBSITE OR THE SERVICES,
        OR ANY WEBSITE LINKED TO THE WEBSITE, INCLUDING, WITHOUT LIMITATION, ANY
        DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE OR
        CONSEQUENTIAL DAMAGES OF ANY KIND, OR DAMAGES FOR LOST REVENUES OR
        PROFITS, LOSS OF DATA OR LOSS OF GOODWILL, SERVICE INTERRUPTION,
        COMPUTER DAMAGE OR SYSTEM FAILURE, OR FOR ANY DAMAGES FOR PERSONAL OR
        BODILY INJURY OR EMOTIONAL DISTRESS, WHETHER BASED IN WARRANTY,
        CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, AND
        WHETHER OR NOT HER PLAN HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH
        DAMAGE, AND EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE
        FAILED OF ITS ESSENTIAL PURPOSE. YOU ACKNOWLEDGE AND AGREE THAT YOU
        ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE WEBSITE AND THE
        SERVICES, AND ANY CONTENT THEREIN AND ANY WEBSITE LINKED TO THE WEBSITE.
        YOUR SOLE REMEDY AGAINST HER PLAN FOR ANY DISSATISFACTION WITH ALL OR
        PART OF THE WEBSITE OR THE SERVICES, OR ANY CONTENT DIRECTLY OR
        INDIRECTLY LINKED TO THE FOREGOING IS TO STOP USING THE WEBSITE AND THE
        SERVICES. THIS LIMITATION OF LIABILITY IS AN ESSENTIAL PART OF THE
        BARGAIN BETWEEN THE PARTIES WITHOUT WHICH THE PARTIES WOULD NOT HAVE
        ENTERED INTO THESE TERMS.
        <br />
        <br />
        CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE
        EXCLUSIVE OR LIMITATION OF CERTAIN DAMAGES AS SET FORTH IN THIS SECTION,
        SO THESE LIMITATIONS AND EXCLUSIONS APPLY TO YOU ONLY TO THE EXTENT
        PERMITTED BY APPLICABLE LAW. IN THE EVENT THAT THE FOREGOING LIMITATION
        OF LIABILITY IS DETERMINED BY A COURT OF COMPETENT JURISDICTION TO BE
        UNENFORCEABLE, HER PLAN’S AGGREGATE LIABILITY ARISING OUT OF OR IN
        CONNECTION WITH THESE TERMS SHALL BE LIMITED TO FIFTY U.S. DOLLARS
        (US$50).
      </div>

      <div className={classes.title}>
        GOVERNING LAW; ARBITRATION; PROHIBITION OF CLASS AND REPRESENTATIVE
        ACTIONS AND NON-INDIVIDUALIZED RELIEF
      </div>
      <div className={classes.desc}>
        <b> Governing Law.</b> The Terms are governed by the laws set forth by
        the Commonwealth of Virginia without regard to conflict of law
        principles. You consent to the jurisdiction of and venue in Arlington
        County, Virginia and waive any objection as to inconvenient forum.
        <br />
        <br />
        <b> Arbitration.</b> Notwithstanding any contrary provision of these
        Terms, all disputes, claims, controversies and matters relating to or in
        connection with these Terms (or the breach thereof) or any transactions
        hereunder shall be settled by binding arbitration administered by the
        American Arbitration Association under its Commercial Arbitration Rules
        (“AAA Rules”), and judgment on the award rendered by the arbitrator(s)
        may be entered in any court having jurisdiction thereof. The arbitration
        shall take place in Arlington County, Virginia before a single neutral
        arbitrator appointed in accordance with the AAA Rules and shall be
        conducted in the English language. All arbitrations shall be conducted
        and resolved on an individual basis and not a class-wide, multiple
        plaintiff or similar basis. No arbitration shall be consolidated with
        any other arbitration proceeding involving any other person or entity.
        The prevailing party in any arbitration proceeding will be entitled to
        recover its reasonable legal fees and costs and expenses from the other
        party.
        <br />
        <br />
        <b>
          {" "}
          PROHIBITION OF CLASS AND REPRESENTATIVE ACTIONS AND NON-INDIVIDUALIZED
          RELIEF.
        </b>{" "}
        YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST Her PLAN ONLY ON AN
        INDIVIDUAL BASIS AND HEREBY WAIVE THE RIGHT TO PARTICIPATE AS A
        PLAINTIFF OR CLASS MEMBER IN ANY CLASS ACTION OR REPRESENTATIVE
        PROCEEDING, TO THE MAXIMUM EXTENT NOT PROHIBITED BY APPLICABLE LAW.
        FURTHER, UNLESS BOTH YOU AND Her PLAN OTHERWISE AGREE IN WRITING, THE
        COURT MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S CLAIMS, AND MAY
        NOT OTHERWISE PRESIDE OVER ANY FORM OF CONSOLIDATED, REPRESENTATIVE, OR
        CLASS PROCEEDING.
      </div>

      <div className={classes.title}>MISCELLANEOUS</div>
      <div className={classes.desc}>
        If any of the provisions of these Terms are held by a court or other
        tribunal of competent jurisdiction to be void or unenforceable, such
        provisions shall be limited or eliminated to the minimum extent
        necessary and replaced with a valid provision that best embodies the
        intent of these Terms, so that these Terms shall remain in full force
        and effect. These Terms constitute the entire agreement between You and
        Her PLAN with regard to Your use of the Website and Services, and any
        and all other written or oral agreements or understandings previously
        existing between You and Her PLAN with respect to such use are hereby
        superseded and cancelled. Her PLAN’S failure to insist on or enforce
        strict performance of these Terms shall not be construed as a waiver by
        Her PLAN of any provision or any right it has to enforce these Terms,
        nor shall any course of conduct between Her PLAN and You or any other
        party be deemed to modify any provision of these Terms. These Terms of
        Use shall not be interpreted or construed to confer any rights or
        remedies on any third parties. You may not assign these Terms, or any
        rights or obligations hereunder, whether by contract, operation of law,
        or otherwise without the express prior written consent of Her PLAN.
        <br />
        <br />
        You acknowledge that the laws and regulations of the United States
        restrict the export and re-export of commodities and technical data of
        United States origin, which may include the content of the Website or
        Services. Without limiting the foregoing, You acknowledge that such
        content or the Services are or may be an “encryption item” subject to
        controls under the Export Administration Regulations promulgated by the
        U.S. Department of Commerce. You agree not to export or re-export such
        content or the Services, or any copy or adaptation thereof, in any form
        in violation of the export laws of the United States or any foreign
        jurisdiction.
        <br />
        <br />
        By clicking Approve and signing up for our services you agree to these
        Terms and confirm you have read and understand our Privacy Policy.
      </div>
    </div>
  );
};

export default GeneralUserTOU;
