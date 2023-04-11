const express = require("express");
const { authentication, authorization } = require("../../../middleware/middleware")
const adminUserController = require("./users.controller")
const userValidator = require('../../../controllers/user/user.validator');

const router = express.Router();

router.post('/admin-users', authentication, authorization, userValidator.registerValidator, adminUserController.createAdminUser)
router.get('/admin-users', authentication, authorization, adminUserController.getAdminUser)
router.put('/admin-users', authentication, authorization, adminUserController.updateAdminUser)
router.delete('/admin-users', authentication, authorization, adminUserController.deleteAdminUser)

//FREEZE OR DELETE
router.get("/allAccount/:type",authentication, authorization, adminUserController.getAllProviderOrGeneral)
router.put("/freeze",authentication, authorization, adminUserController.freezeAccount)
router.delete("/deleteAccount/:accountType",authentication, authorization, adminUserController.deleteAccount)
router.get(
    "/getAllGhostProvider",
    authentication,
    authorization,
    adminUserController.getAllGhostAccount
  );

  router.delete(
    "/delGhostProvider",
    authentication,
    authorization,
    adminUserController.delGhostProvider
  );
module.exports = router
