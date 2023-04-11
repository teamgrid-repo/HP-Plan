const express = require('express')
const provider = require('./provider.controller');
const validation = require("./provider.validation")
const { authentication, authorization } = require("../../middleware/middleware")
const router = express.Router();

//router.post('/create_provider',   provider.createProvider);
router.get('/get_provider',authentication, authorization, provider.getAllProvider)
router.get('/get_provider/:id',authentication, provider.getOneProvider)
router.get('/get_provider/:userId/:email', authentication, authorization, provider.getProviderByUserId)

router.post('/saved-client', authentication, authorization, provider.saveClients)
router.get('/saved-client', authentication, authorization, provider.getSaveClients)
router.delete('/saved-client/:clientId', authentication, provider.deleteSaveClient)
router.get('/search-savedClient', authentication, authorization, provider.searchSavedClient);
router.put('/account-approval', authentication, authorization, provider.updateAccountApproval)
router.post('/shift-Organisation', authentication, authorization, provider.shiftProviderOrganisation)
router.get('/hippa-status', authentication, authorization, provider.getAllHippaStatus)
router.get(
    "/activeProvider",
    authentication,
    authorization,
    provider.getActiveProvider
  );

  router.put("/add-poc", authentication, authorization, provider.createPOC);
  router.get("/getAll-poc", authentication, authorization, provider.getAllPOC);
  router.get("/get-poc", authentication, authorization, provider.getPOC);
  router.put("/update-poc", authentication, authorization, provider.updatePOC);
  router.put("/del-poc", authentication, authorization, provider.deletePOC);
  router.put("/del-poc-one", authentication, authorization, provider.deleteOnePOC);
  router.post(
    "/resend-invite",
    authentication,
    authorization,
    provider.resendInvite
  );
  module.exports = router;


module.exports = router
