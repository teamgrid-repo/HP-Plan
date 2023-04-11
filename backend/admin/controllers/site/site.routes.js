const express = require("express");
const { createSite, getAllSite, getOneSite, updateSite, deleteSite, getAllSiteByOrganisation, getAllSitesStates } = require("./site.controller");
const { createSiteValidation } = require("./site.validator");
const { authentication, authorization, singleKeyAuthorization } = require("../../../middleware/middleware")
const router = express.Router();

router.post('/site', authentication, createSiteValidation, createSite);
router.get('/site/:organisationId/:userId', authentication, getAllSite);
router.get('/site/:siteId',authentication, getOneSite);
router.put('/site/:siteId',authentication, updateSite);
router.delete('/site/:siteId',authentication, deleteSite);
router.get("/unique-states", singleKeyAuthorization, getAllSitesStates)

//ADMIN
router.get('/admin-site/:organisationId', authentication, authorization, getAllSiteByOrganisation);

module.exports = router;
