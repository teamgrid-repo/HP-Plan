const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errorMessages } = require('../helpers/messages');
const { envConstants } = require('../helpers/constants');

const whitelist = [`${envConstants.FRONT_END_URL}`];
const perIpTimeLimit = 15 * 60 * 1000; // 15 minutes

/** const corsOptions = {
  origin(origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(errorMessages.CORS_BLOCK));
    }
  },
}; */

const { errorHandler } = require('../middleware/errorHandler');

const userRoutes = require('../controllers/user/user.routes');
const quizRoutes = require('../controllers/quizz/quiz.routes')
const contactRoutes = require('../controllers/contact/contact.route')
const appointmentRoutes = require('../controllers/appointment/appointment.route')
const providerRoutes = require('../controllers/provider/provider.route')
const categoryRoutes = require('../controllers/cure_categories/categories.routes')
const organisation = require('../controllers/my_organisation/organisation.routes')
const site = require('../admin/controllers/site/site.routes')
const searchLink = require('../admin/controllers/searchLinks/searchLinks.route')
const adminOrganisation = require("../admin/controllers/organisations/organisation.validation");
const userProfile = require("../controllers/userProfile/userProfile.routes")
const siteSubcategory = require("../controllers/sitesSubCategory/siteSubCategory.route")
const specialQualification = require("../controllers/specialQualification/specialQuali.routes");
const saveListing = require("../controllers/SavedListing/savedListing.routes")
const savedSearches = require("../controllers/saveSearches/saveSearches.route");
const message  = require("../controllers/messages/message.routes")
const siteFeedBack  = require("../controllers/SiteFeedBack/siteFeedBack.route")
const siteClaim  = require("../controllers/siteClaim/siteClaim.routes")
const adminUser  = require("../admin/controllers/users/users.routes")
const dataApproval = require("../controllers/DataApproval/DataApproval.route")
const hubspot = require("../controllers/Hubspot/credential.route")
const cms = require("../controllers/cms/cms.routes")
const team = require("../controllers/teamListing/teamListing.routes")
const userStateLoc = require("../controllers/UserStateLoc/userStateLoc.routes")
const terms = require("../controllers/terms/terms.routes");
const apiLimiter = rateLimit({
  windowMs: perIpTimeLimit,
  max: 1000,
  message: {
    error: errorMessages.TOO_MANY_REQUESTS,
  },
});

const routes = (app) => {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', quizRoutes);
  app.use('/api/v1', contactRoutes);
  app.use('/api/v1', appointmentRoutes);
  app.use('/api/v1', providerRoutes)
  app.use('/api/v1', categoryRoutes)
  app.use('/api/v1', organisation)
  app.use('/api/v1', site)
  app.use('/api/v1', searchLink)
  app.use('/api/v1', userProfile)
  app.use('/api/v1', siteSubcategory)
  app.use('/api/v1', specialQualification)
  app.use('/api/v1', saveListing)
  app.use('/api/v1', message)
  app.use('/api/v1', savedSearches)
  app.use('/api/v1', siteFeedBack)
  app.use('/api/v1', siteClaim)
  app.use('/api/v1', adminUser)
  app.use('/api/v1', dataApproval)
  app.use('/api/v1', hubspot)
  app.use('/api/v1', cms)
  app.use('/api/v1', team)
  app.use('/api/v1', userStateLoc)
  app.use("/api/v1", terms);
  app.use('/api/v1/admin', apiLimiter, adminOrganisation)
  app.use('/', (req, res)=>{
    res.send("Backend is Running")
  })
  app.use(errorHandler);
};

module.exports = { routes };
