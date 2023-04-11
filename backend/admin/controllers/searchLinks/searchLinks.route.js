const express = require("express");
const { createSearchLink, getAllSearchLink, getOneSearchLink, updateSearchLink,deleteSearchLink, getALlStatistics, getALlSearchLinkStatistics } = require("./searchLinks.controller");
const { createSearchLinkValidation } = require("./searchLinks.validation");
const { authentication, authorization } = require("../../../middleware/middleware")
const router = express.Router();

router.post('/searchLink',authentication, authorization, createSearchLinkValidation, createSearchLink);
router.get('/searchLink',authentication,  authorization, getAllSearchLink);
router.get('/searchLink/:id',authentication, authorization, getOneSearchLink);
router.put('/searchLink/:id',authentication, authorization, updateSearchLink);
router.delete('/searchLink/:id',authentication, authorization, deleteSearchLink)
router.get('/overall-statistics', authentication, authorization, getALlStatistics)
router.get('/searchLink-statistics', authentication, authorization, getALlSearchLinkStatistics)

module.exports = router;