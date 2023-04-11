const express = require("express");
const organisationController = require("./organisation.controller");
const {
  organisationValidation,
  singleOrganisationValidation,
} = require("./organisation.validation");
const {
  authentication,
  authorization,
  singleKeyAuthorization,
} = require("../../middleware/middleware");
const upload = require("../../connection/multer");
const router = express.Router();

router.post(
  "/create_organisation",
  authentication,
  authorization,
  organisationValidation,
  organisationController.reqForApprovalOrganisation
);
router.post(
  "/get_organisation",
  authentication,
  authorization,
  organisationController.getAllOrganisation
);
router.get(
  "/get_organisation_ids",
  authentication,
  authorization,
  organisationController.getAllOrganisationIdsAndNames
);
router.get(
  "/organisation_details/:providerId",
  authentication,
  authorization,
  singleOrganisationValidation,
  organisationController.getOneOrganisation
);

//ADMIN
router.post(
  "/admin-create-organisation",
  authentication,
  authorization,
  organisationController.createOrganisationForAdmin
);
router.put(
  "/admin-update-organisation/:orgId",
  authentication,
  authorization,
  organisationController.updateOneOrganisation
);
router.get(
  "/admin-get-organisation/:orgId",
  authentication,
  authorization,
  organisationController.getOneOrganisation
);
router.get(
  "/admin-get-allOrganisationUser/:orgId",
  authentication,
  authorization,
  organisationController.adminContactByOrganisation
);
router.get(
  "/search-org",
  authentication,
  authorization,
  organisationController.searchOrganisation
);
router.delete(
  "/deleteOrg/:id",
  authentication,
  authorization,
  organisationController.deleteOrganisation
);

//GENERAL PAGE SEARCH

router.get(
  "/get-organisation/:orgId",
  singleKeyAuthorization,
  organisationController.getOrganisationDetailsByOrgId
);
router.post(
  "/admin-upload",
  authentication,
  upload.any(),
  organisationController.uploadOrganisation
);

module.exports = router;
