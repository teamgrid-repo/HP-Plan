import { combineReducers } from "redux";

import themeReducer from "./theme/themeReducer";
import authReducer from "./auth/authReducer";
import profileReducer from "./profile/profileReducer";
import provicerReducer from "./Provider/ProviderReducer";
import catReducer from "./category/categoryReducer";
import adminReducer from "./Admin/AdminReducer";
import MessagesReducer from "./messages/MessagesReducer";
import CmsReducer from "./cmsReducer/cmsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  profile: profileReducer,
  provider: provicerReducer,
  cat: catReducer,
  admin: adminReducer,
  msg: MessagesReducer,
  cms: CmsReducer,
});

export default rootReducer;
