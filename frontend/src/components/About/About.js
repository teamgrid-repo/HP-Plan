import { Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import About1 from "../../assets/images/about-img3.PNG";
// import Autumn from "../../assets/images/Autumn.jpg";
// import Anja from "../../assets/images/Anja.png";
// import Kayla from "../../assets/images/Kayla.jpg";
// import Anna from "../../assets/images/Anna.jpg";
// import Celeste from "../../assets/images/Celeste.jpg";
// import Jill from "../../assets/images/Jill.jpg";
// import AnnaStephens from "../../assets/images/AnnaStephens.jpg";
// import Sandy from "../../assets/images/Sandy.jpg";
// import Chaney from "../../assets/images/Chaney.png";
// import Jeanneane from "../../assets/images/Jeanneane.jpg";
// import Shawn from "../../assets/images/Shawn.png";
import { useDispatch, useSelector } from "react-redux";
import { getTeamData } from "../../redux/actions/Admin/AdminActions";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import LoadingComponent from "../UI/LoadingComponent";
import CancelToken from "../../utils/cancelClass";
const ctc = new CancelToken();

// const aboutDetails = [
//   {
//     name: "Autumn Christensen",
//     desc: "As Her PLAN Director, Autumn oversees the program and guides the team’s work to facilitate collaboration between assistance providers and their communities to empower pregnant and parenting women and families in need through comprehensive medical, social, and material support. She manages the Her PLAN national program offerings and state coordinator programs and shepherds the team’s work to connect and aid assistance providers, to connect and engage community organizations, and to strategize to fill service gaps.",
//     job: "Director",
//     img: Autumn,
//   },
//   {
//     name: "Anja Baker",
//     desc: "In her role as Mississippi Coordinator, Anja works to facilitate collaboration among Mississippi assistance providers and to connect organizations that support pregnant and parenting women and families throughout the state. She organizes state events, visits assistance providers to learn more about their life-affirming work, and connects local providers with other state and national resources. Anja also networks with local assistance providers in Mississippi and supports them as they collaborate to empower women and families through comprehensive medical, social, and material support.",
//     job: "Mississippi Coordinator",
//     img: Anja,
//   },
//   {
//     name: "Kayla Kessinger",
//     desc: "In her role as West Virginia Coordinator, Kayla works to facilitate collaboration among West Virginia assistance providers and to connect organizations that support pregnant and parenting women and families throughout the state. She organizes state events, visits assistance providers to learn more about their life-affirming work, and connects local providers with other state and national resources. Kayla also networks with local assistance providers in West Virginia and supports them as they collaborate to empower women and families through comprehensive medical, social, and material support.",
//     job: "West Virginia Coordinator",
//     img: Kayla,
//   },
//   {
//     name: "Anna Longbons",
//     desc: "As Virginia Coordinator, Anna connects life-affirming assistance providers, community organizations, and local leaders. She facilitates collaboration by hosting regional and category-specific events and spreading the word about other life-affirming networking opportunities. Anna works to increase awareness and use of the Her PLAN directory and Pathways to Life Guide and connects individual assistance providers with state and national resources. She is energized by uniting leaders around a common mission. Through Her PLAN, she gets to combine her belief in the power of community with her commitment to abundant life for women, children, and families.",
//     job: "Virginia Coordinator",
//     img: Anna,
//   },
//   {
//     name: "Celeste Vernon",
//     desc: "In her role as Georgia Coordinator, Celeste works to facilitate collaboration among Georgia assistance providers and to connect organizations that support pregnant and parenting women and families throughout the state. She organizes state events, visits assistance providers to learn more about their life-affirming work, and connects local providers with other state and national resources. Celeste also networks with local assistance providers in Georgia and supports them as they collaborate to empower women and families through comprehensive medical, social, and material support.",
//     job: "Georgia Coordinator",
//     img: Celeste,
//   },
//   {
//     name: "Jill Stanek",
//     desc: "In her role as Community Outreach Manager for Her PLAN, Jill works to support and increase life-affirming work among churches and community groups to help pregnant and parenting mothers in need and their children. Co-author of the Pathways to Life guide for churches, Jill facilitates growth of churches in this area by offering practical ideas and models on collaborating with life-affirming assistance providers or perhaps launching their own services. Our guide also suggests studies and reading material to educate church members on various elements pertaining to pro-life apologetics and ministering to these families.",
//     job: "Community Outreach Manager",
//     img: Jill,
//   },
//   {
//     name: "Anna Stephens",
//     desc: "In her role as Communications Associate for Her PLAN, Anna manages the Her PLAN social media presence and features the life-affirming work of assistance providers who support pregnant and parenting women and families in need in their communities. Anna designs monthly state newsletters, manages the national Her PLAN Facebook page, and assists state coordinators with running state Facebook groups to connect and facilitate collaboration among assistance providers. Anna also tracks media mentions and features of providers within the Her PLAN network and supports the day-to-day communications needs of the Her PLAN team. She is excited to be working with this team and furthering the vital life-affirming work of supporting pregnant and parenting moms in need and their children.",
//     job: "Communications Associate",
//     img: AnnaStephens,
//   },
//   {
//     name: "Sandy Burton",
//     desc: "As Interim Directory Coordinator, Sandy develops, refines, and oversees the Her PLAN Directory Division. This includes management of the Her PLAN Directory database, and the day-to-day operational needs such as hiring, training, equipping, and guiding the Her PLAN Directory Analyst Team. This team is responsible for thoroughly vetting all assistance providers for approval to be included in the Her PLAN Directory Network.",
//     job: "Interim Directory Coordinator",
//     img: Sandy,
//   },
//   {
//     name: "Chaney Mullins Gooley",
//     desc: "Chaney was Her PLAN's first hire in 2019, coming from her work in the women's healthcare sphere, where she saw firsthand the need for comprehensive care and life-affirming service coordination. In her role as Program Manager for Her PLAN, Chaney helps facilitate national provider engagement, connection to national training resources for assistance providers, and Her PLAN's presence at national conferences. She also assists in the directory building process as Her PLAN expands to more states. Co-Author of the Pathways to Life guide for churches to help pregnant and parenting moms in need, Chaney has a passion for seeing innovation and optimism infused into the service side of the pro-life movement.",
//     job: "Program Manager",
//     img: Chaney,
//   },
//   {
//     name: "Jeanneane Maxon",
//     desc: "In her role as Compliance Officer for Her PLAN, Jeanneane oversees the legal and compliance aspects of the Her PLAN program. Jeanneane leads the HIPAA certification process for Her PLAN staff members and advises the team on compliance processes and requirements for community groups and assistance providers listed within the Her PLAN network. She also works with the team on the legal and compliance aspects of the Her PLAN website and directories.",
//     job: "Compliance Officer",
//     img: Jeanneane,
//   },
//   {
//     name: "Shawn Zierke, MBA, MPH-Policy",
//     desc: "In her role as Research Director for Her PLAN, Shawn collects data, analyzes the data, and identifies needs in PLAN’S 7 Categories of Care. Shawn then applies her training and education in Public Health to conduct community health needs assessments to identify service gaps in the PLAN and works to identify ways to fill these gaps through a focused health improvement plan. This plan is designed to strengthen and expand the pro-life safety net for pregnant and parenting women and families in need on both the state and national level.",
//     job: "Research Director",
//     img: Shawn,
//   },
// ];

const useStyle = makeStyles((theme) => ({
  aboutContainer: {
    paddingTop: "8em",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  img1: {
    // margin: "0px",
    // display: "block",
    // maxWidth: "100%",
    // maxHeight: "100%",
    //height: "100%",
    width: "100%",
  },
  aboutTextContainer: {
    margin: "4em",
    marginBottom: "1em",
    textAlign: "left",
    width: "90%",
    [theme.breakpoints.down("md")]: {
      margin: "2em",
      marginBottom: "1em",
    },
  },
  aboutTitle: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#524F4F",
  },
  aboutDesc: {
    color: "#949494",
    fontSize: "20px",
    lineHeight: "40px",
    width: "100%",
  },
  aboutDescHighLight: {
    paddingTop: "10px",
    color: "#4F8EAD",
    lineHeight: "45px",
    paddingBottom: "30px",
  },
  cardContainer: {
    marginBottom: "6em",
  },

  aboutDescHighLight2: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    color: "#4F8EAD",
    lineHeight: "45px",
    paddingBottom: "30px",
  },
  numberDiv: {
    fontSize: "36px",
    lineHeight: "20px",
  },
  numberUderDiv: {
    color: "black",
  },
  meetTeam: {
    display: "flex",
    flexWrap: "wrap",
    gap: "76px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

const AboutUs = () => {
  // const navigate = useNavigate();
  const classes = useStyle();
  const cms = useSelector((state) => state.cms);
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getTeamData }, dispatch);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(() => true);
    const data = await actions.getTeamData(ctc.getToken());
    if (data) setTeamData(() => data);
    setLoading(() => false);
  };

  useEffect(() => {
    ctc.createToken();
    loadData();
    return () => ctc.cancelTheApi();
  }, []);

  return (
    <div className={classes.aboutContainer}>
      <Card className={classes.cardContainer}>
        <Grid container spacing={0}>
          <Grid item lg={5} md={12} sm={12} xs={12} textAlign="left">
            <img
              src={cms.aboutImage || About1}
              alt="about 1"
              className={classes.img1}
            />
          </Grid>
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <div className={classes.aboutTextContainer}>
              <h3 className={classes.aboutTitle}>
                {" "}
                {cms.aboutHeader || `Welcome to Her PLAN`}
              </h3>
              <div className={classes.aboutDesc}>
                {cms.aboutText ||
                  `Her PLAN facilitates collaboration between assistance providers
                and their communities to empower women and families through
                medical, social, and material support. As providers connect with
                each other and their community, together they will build a
                stronger safety net for pregnant and parenting women and
                families.”`}
              </div>
              {/* <div style={{ marginTop: "24px" }}>
                <CustomButton
                  varient="contained"
                  name="Meet Our Team"
                  size="large"
                />
              </div> */}
            </div>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Grid container padding={"75px"}>
          <Grid item xs={12} sm={12} md={12} lg={12} mb={"30px"}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1.5,
                letterSpacing: "normal",
                textAlign: "left",
                color: "#524f4f",
              }}
            >
              Our Team
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1.75,
                letterSpacing: "normal",
                textAlign: "left",
                color: "#7e7e7e",
              }}
            >
              Meet the Her PLAN team{" "}
            </div>
          </Grid>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className={classes.meetTeam}>
                {teamData.map((d, id) => (
                  <div
                    key={id}
                    style={{ maxWidth: "325px", textAlign: "left" }}
                  >
                    <div>
                      <img
                        src={d.image}
                        alt={d.name}
                        style={{
                          // width: "340px",
                          height: "340px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 2.08,
                        marginTop: 0,
                        marginBottom: 0,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#4f8ead",
                      }}
                    >
                      {d.name}
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.75,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#524f4f",
                      }}
                    >
                      {d.job}
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.75,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#7e7e7e",
                        maxHeight: "100px",
                        overflow: "auto",
                      }}
                    >
                      {d.description}
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      </Card>
    </div>
  );
};

export default AboutUs;
