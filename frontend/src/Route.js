import { lazy } from "react";
import GhostUserMgt from "./pages/Admin/UserMgt/GhostUserMgt";

const Login = lazy(() => import("./pages/Public/Login"));

const Register = lazy(() => import("./pages/Public/Register"));

const MyProfile = lazy(() => import("./pages/Private/MyProfile"));

const About = lazy(() => import("./pages/Public/AboutUs"));

const ContactUs = lazy(() => import("./pages/Public/ContactUs"));

const Clients = lazy(() => import("./pages/Private/ProviderUser/SavedClient"));

const MyProvider = lazy(() => import("./pages/Private/SaveProvider"));

const MySavedAppointment = lazy(() =>
  import("./pages/Private/ReqestAppointment")
);
const MySearches = lazy(() => import("./pages/Private/SavedSearch"));

const ProviderDetails = lazy(() => import("./pages/Private/ProviderDetails"));

const Messages = lazy(() => import("./pages/Private/Messages"));

const Qres = lazy(() => import("./pages/Public/QuizRes"));

const Quiz = lazy(() => import("./pages/Public/Quiz"));

const ForgotPass = lazy(() => import("./pages/Public/ForgotPass"));

const ProviderSearch = lazy(() => import("./pages/Public/ProviderSearch"));
const ProviderEdit = lazy(() => import("./pages/Admin/ManageOrg/EditOrg"));
const ProviderAdd = lazy(() => import("./pages/Admin/ManageOrg/AddOrg"));
const ProviderAdminList = lazy(() => import("./pages/Admin/ManageOrg/ListOrg"));
const ProviderSingleList = lazy(() =>
  import("./components/SavedProviders/SavedProvidersComponent")
);

const TermsAndConditions = lazy(() => import("./pages/Public/TermOfUse"));
const PriavarcyPolicy = lazy(() => import("./pages/Public/PriavarcyPolicy"));
const MapsTips = lazy(() => import("./pages/Public/MapsTips"));
const FeedbackMgt = lazy(() => import("./pages/Admin/FeedbackMgt/Feedbackmgt"));

const ListSearch = lazy(() => import("./pages/Admin/SearchLinkmgt/ListSearch"));
const AddSearch = lazy(() => import("./pages/Admin/SearchLinkmgt/AddSearch"));

const ClaimMgt = lazy(() => import("./pages/Admin/ClaimMgt/ClaimMgt"));
const AccApproveMgt = lazy(() =>
  import("./pages/Admin/AccountAppMgt/AccAppMgt")
);
const ApproveMgt = lazy(() => import("./pages/Admin/ApprovalMgt/ApprovalMgt"));

const UserMgt = lazy(() => import("./pages/Admin/UserMgt/UserMgt"));

const SaveQuizRes = lazy(() => import("./pages/Private/SaveQuizResult"));

const ProviderUserMgt = lazy(() =>
  import("./pages/Admin/UserMgt/ProviderUserMgt")
);

const GeneralUserMgt = lazy(() =>
  import("./pages/Admin/UserMgt/GeneralUserMgt")
);

const AdminProfile = lazy(() => import("./pages/Admin/Home/Profile"));
const CmsAndState = lazy(() => import("./pages/Admin/CmsAndState/CmsAndState"));
const Statistics = lazy(() => import("./pages/Admin/statistics/Statistics"));

export default [
  {
    path: "/admin-profile",
    element: AdminProfile,
    role: "admin",
    name: "My Profile",
  },
  {
    path: "/statistics",
    element: Statistics,
    role: "admin",
    name: "Statistics",
  },
  {
    path: "/cms-and-state",
    element: CmsAndState,
    role: "admin",
    name: "CMS & State",
  },
  {
    path: "/provider-user-manage",
    element: ProviderUserMgt,
    role: "admin",
    name: "Provider Users",
  },
  {
    path: "/general-user-manage",
    element: GeneralUserMgt,
    role: "admin",
    name: "General Users",
  },
  {
    path: "/non-active-user-manage",
    element: GhostUserMgt,
    role: "admin",
    name: "Ghost Users",
  },
  {
    path: "/user-manage",
    element: UserMgt,
    role: "admin",
    name: "Admin Users",
  },
  {
    path: "/save-quiz-result",
    element: SaveQuizRes,
    role: ["user", "provider"],
    name: "Saved Quizzes",
  },
  {
    path: "/claim-manage",
    element: ClaimMgt,
    role: "admin",
    name: "Org Claims",
  },
  {
    path: "/acc-approval-manage",
    element: AccApproveMgt,
    role: "admin",
    name: "Account Approval",
  },
  {
    path: "/approval-manage",
    element: ApproveMgt,
    role: "admin",
    name: "Organization Approval",
  },
  {
    path: "/organizations-list",
    element: ProviderAdminList,
    role: "admin",
    name: "Organizations",
  },
  {
    path: "/management-search",
    element: ListSearch,
    role: "admin",
    name: "Search Link Management",
  },
  {
    path: "/org-add/:id",
    element: ProviderAdd,
    role: "admin",
    name: "Add Organization Via Link",
  },
  {
    path: "/add-search/:id",
    element: AddSearch,
    role: "admin",
    name: "Add Search Link",
  },
  {
    path: "/add-search",
    element: AddSearch,
    role: "admin",
    name: "Add Search Link",
  },
  {
    path: "/edit-search/:id",
    element: AddSearch,
    role: "admin",
    name: "Edit Search Link",
  },
  {
    path: "/terms-conditions",
    element: TermsAndConditions,
    role: "all",
    name: "Terms & Conditions",
  },
  {
    path: "/admin-feedback",
    element: FeedbackMgt,
    role: "admin",
    name: "Feedback",
  },
  {
    path: "/maps-tips",
    element: MapsTips,
    role: "all",
    name: "Map Tips",
  },
  {
    path: "/privacy-policy",
    element: PriavarcyPolicy,
    role: "all",
    name: "Privacy Policy",
  },
  { path: "/forgot-password", element: ForgotPass, role: "all" },
  { path: "/login", element: Login, role: "all" },
  { path: "/register", element: Register, role: "all" },
  {
    path: "/my-providers/:id",
    element: ProviderSingleList,
    role: ["user", "provider", "admin"],
  },
  {
    path: "/org-edit/:id",
    element: ProviderEdit,
    role: "admin",
    name: "Edit Organization",
  },
  {
    path: "/org-add",
    element: ProviderAdd,
    role: "admin",
    name: "Add Organization",
  },

  { path: "/about-us", element: About, role: "all", name: { shrink: true } },
  {
    path: "/contact-us",
    element: ContactUs,
    role: "all",
    name: "Contact Her Plan",
  },
  {
    path: "/my-profile",
    element: MyProfile,
    role: ["user", "provider", "admin"],
    name: "My Profile",
  },
  {
    path: "/provider-search",
    element: ProviderSearch,
    role: "all",
    name: "Find Providers",
  },
  {
    path: "/my-clients",
    element: Clients,
    role: ["user", "provider"],
    name: "Saved Clients",
  },
  {
    path: "/my-providers",
    element: MyProvider,
    role: ["user", "provider"],
    name: "Provider Lists",
  },
  {
    path: "/my-searches",
    element: MySearches,
    role: ["user", "provider"],
    name: "Saved Searches",
  },
  {
    path: "/my-appointments",
    element: MySavedAppointment,
    role: ["user", "provider"],
    name: "Appointments",
  },
  // {
  //   path: "/direction/:id",
  //   element: Direction,
  //   role: "all",
  //   name: { shrink: true },
  // },
  {
    path: "/provider-details/:id",
    element: ProviderDetails,
    role: "all",
  },
  // {
  //   path: "/state-landing/:id",
  //   element: StateLanding,
  //   role: "all",
  //   name: { filter: true },
  // },
  {
    path: "/message/:id",
    role: ["user", "provider"],
    name: "Messages",
    element: Messages,
  },
  {
    path: "/quiz-result",
    role: "all",
    name: "Quiz Results",
    element: Qres,
  },
  {
    path: "/quiz",
    role: "all",
    name: "Plan Quiz",
    element: Quiz,
  },
  // {
  //   path: "/resources",
  //   role: "all",
  //   name: "Resources",
  //   element: Resources,
  // },
];
