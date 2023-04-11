const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const userValidator = require('./user.validator');
const upload = require("../../connection/multer")

const { authentication, authorization } = require('../../middleware/middleware');

router.post('/register', userValidator.registerValidator, userController.register);
router.post('/login', userValidator.loginValidator, userController.login);
router.get('/profile', authentication, authorization, userController.profile);
router.get('/users', authentication, authorization, userController.getAll);
router.put('/profile', authentication, userController.updateFcmToken)
router.get('/users/:userId', authentication, userController.findById);
router.delete('/users/:userId', authentication, authorization, userController.deleteById);
router.post('/forget-password',userController.forgetPassword)
router.post('/change-password',userValidator.changePasswordValidator,userController.changePassword)
router.post('/verify-forgot-password',userValidator.verifyForgotPasswordValidator,userController.verifyForgotPassword)
router.post('/saved-users', authentication, userController.savedUser);
router.get('/saved-users', authentication, userController.getSavedUser);
router.delete('/saved-users', authentication, userController.removeSavedUser);
router.post('/additional-member',authentication, userValidator.additionalMember, userController.createAdditionalUser)
router.get('/additional-member',authentication, userController.getAllAdditionalUser)
router.put('/additional-member/:providerId/:userId',authentication, userController.updateSubUsers)
router.put('/additional-member-provider/:providerId/:userId',authentication, userController.updateSubUsersProvider)
router.delete('/additional-member/:providerId',authentication, userController.deleteSubUsers)
router.post('/upload-image', authentication,upload.any(), userController.uploadBase64Image)
router.post('/update_provider/:id',authentication, userController.updateProviderInfo)
router.get("/switch-tab", authentication, authorization, userController.switchTab)
router.get(
    "/activeUser",
    authentication,
    authorization,
    userController.activeUser
  );
module.exports = router;
