import HeaderImg2 from "../../../assets/images/Header-image2.png";
import About1 from "../../../assets/images/about-img3.PNG";

const initState = {
  homeImage: HeaderImg2,
  homeHeader: "Collaborating for Comprehensive Care",
  homeText:
    "Why seven categories of care? Women cite seven reasons for abortion, and we transformed them to seven categories of care. We break it down further into 25 subcategories, and we research your state to find any life-affirming organization offering care in these areas.",
  homeButtonOneText: "Read More",
  homeButtonOneUrl:
    "https://www.theatlantic.com/politics/archive/2020/08/anti-abortion-roe-wade-movement/615013/",
  homeButtonTwoText: "View Questionnaire",
  homeButtonTwoUrl: "https://herplan.org/community/",
  mapTipsQuestion: "",
  mapTipsAnswer: "",
  aboutImage: About1,
  aboutHeader: "Welcome to Her PLAN",
  aboutText:
    "Her PLAN facilitates collaboration between assistance providers and their communities to empower women and families through medical, social, and material support. As providers connect with each other and their community, together they will build a stronger safety net for pregnant and parenting women and families.”",
  load: true,
  contactInfo: "",
  contactEmail: "",
  homeOneImage: "",
  homeDescOne: "",
  homeTitleOne: "",
  homeDescTwo: "",
  homeTitleTwo: "",
  homeTwoImage: "",
  homeTwoSubTitle: "",
};

const CmsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CMS_DET":
      return { ...state, ...action.payload.data };

    default:
      return state;
  }
};

export default CmsReducer;
