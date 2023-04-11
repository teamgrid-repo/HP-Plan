import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import config from "../../config";
import LeafIcon from "../../assets/icons/leaf.png";
import { Grid } from "@mui/material";
import Map1 from "../../assets/images/map1.png";
import Map2 from "../../assets/images/map2.png";

const useStyle = makeStyles((theme) => ({
  container: {
    padding: "4em 0px 8em 0px",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  mainTitle: {
    margin: "0 0 80px 0",
    fontFamily: "Montserrat",
    fontSize: "36px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#252222",
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: "21px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "-0.66px",
    textAlign: "left",
    color: "#19191b",
    marginBottom: "24px",
  },
  desc: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "-0.5px",
    textAlign: "left",
    color: "#696871",
    marginBottom: "68px",
  },
}));

const MapsTips = (props) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return (
    <div className={classes.container}>
      {/* <div className={classes.mainTitle}>Map Tips</div> */}
      <Grid
        container
        spacing={5}
        marginBottom={"126px"}
        style={{
          borderRadius: "8px",
          boxShadow: "0 50px 100px 0 rgba(208, 208, 208, 0.25)",
          backgroundColor: " #fff",
          padding: "25px",
        }}
      >
        {" "}
        <Grid item lg={5} md={12} sm={12} xs={12} textAlign="left">
          <img src={Map1} alt="quiz1" style={{ width: "100%" }} />
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <div
            style={{
              fontFamily: "Montserrat",
              fontSize: "24px",
              fontWeight: 600,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: 1.5,
              letterSpacing: "normal",
              textAlign: "left",
              color: "#524f4f",
              marginBottom: "16px",
            }}
          >
            How to use the Her PLAN map
          </div>
          <div
            style={{
              fontFamily: "Montserrat",
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
            {" "}
            The Her PLAN network assistance providers collaborate to serve women
            and families but are not formally or legally affiliated and do not
            support or refer for abortion. We have researched, vetted, and
            cataloged organizations assisting pregnant and parenting women and
            families. But how does this map facilitate finding the help you, a
            friend or client needs? We’ll show you how.
            <ul>
              <li>
                Type in an address or zip code to find local assistance
                providers. Use a keyword if you want more specific results.
              </li>
              <br />
              <li>
                Filter by need using our Categories of Care. These filters are
                available on the results page. If you want more information
                about the Categories head on over to our{" "}
                <a
                  href={`https://herplan.org/about/#categories-of-care`}
                  target="_blank"
                >
                  Categories of Care page{" "}
                </a>
                for a breakdown of what services fall under each category and
                subcategory.
              </li>
              <br />
              <li>
                Filter by price-point to identify services that are
                <ul>
                  <li>Free</li>
                  <li>Discounts/Negotiable rates</li>
                  <li>Sliding Scale</li>
                  <li>Accepts Medicaid</li>
                  <li>Market</li>
                </ul>
              </li>
              <br />
            </ul>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={5}
        style={{
          borderRadius: "8px",
          boxShadow: "0 50px 100px 0 rgba(208, 208, 208, 0.25)",
          backgroundColor: " #fff",
          padding: "25px",
        }}
      >
        {" "}
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <div
            style={{
              fontFamily: "Montserrat",
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
            {" "}
            <li>
              Filter by “leaf status” if you prefer providers who offer natural
              or restorative approaches to fertility
            </li>
            <br />
            <li>
              Her PLAN network programs marked with a leaf 
              <img
                src={LeafIcon}
                style={{ width: "24px", height: "24px", marginLeft: "5px" }}
              />
               support a green, natural approach toward reproductive health by
              supporting, not repressing, replacing, or blocking, their clients’
              natural fertility and procreative potential. These providers
              welcome patients/clients who do not share their beliefs who can
              still benefit from their services
            </li>
            <br />
            <li>
              This designation applies to the following categories of care:
              <ul>
                <li> 1.1 Pregnancy help and case management</li>
                <li> 2.1Women’s medical services </li>
                <li> 2.2 Support services for women</li>
                <li> 2.3 General health services</li>
                <li> 4.4 Housing, shelters, and maternity homes </li>
                <li>
                  5.2 Intimate partner violence, sexual assault, or sex
                  trafficking
                </li>
                <li> 5.3 Counseling for women and families </li>
                <li> 6.2 Medical interventions for baby </li>
                <li> 6.3 Perinatal hospice resources </li>
                <li> 6.4 Pregnancy and infant loss support </li>
                <li> 7.2 Children’s healthcare</li>
                <li> 7.3 Family and parenting education</li>
              </ul>
            </li>
            <br />
            <li>
              Read more about each assistance provider, get directions or share
              their directory listing
            </li>
            <br />
            <li>
              Contact the assistance provider with questions. We post emails and
              phone numbers so it’s easy to reach out to any assistance
              provider.
            </li>
            <br />
          </div>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12} textAlign="left">
          <img src={Map2} alt="quiz1" style={{ width: "100%" }} />
        </Grid>
      </Grid>
      {/* <div className={classes.title}>How to use the Her PLAN map</div>
      <div className={classes.desc}>
        The Her PLAN network assistance providers collaborate to serve women and
        families but are not formally or legally affiliated and do not support
        or refer for abortion. We have researched, vetted, and cataloged
        organizations assisting pregnant and parenting women and families. But
        how does this map facilitate finding the help you, a friend or client
        needs? We’ll show you how.
        <ul>
          <li>
            Type in an address or zip code to find local assistance providers.
            Use a keyword if you want more specific results.
          </li>
          <br />
          <li>
            Filter by need using our Categories of Care. These filters are
            available on the results page. If you want more information about
            the Categories head on over to our Categories of Care page{" "}
            <a href={`${config.url}`} target="_blank">
              for a breakdown of what services fall under each category and
              subcategory.
            </a>
          </li>
          <br />
          <li>
            Filter by price-point to identify services that are
            <ul>
              <li>Free</li>
              <li>Discounts/Negotiable rates</li>
              <li>Sliding Scale</li>
              <li>Accepts Medicaid</li>
              <li>Market</li>
            </ul>
          </li>
          <br />
          <li>
            Filter by “leaf status” if you prefer providers who offer natural or
            restorative approaches to fertility
          </li>
          <br />

          <li>
            Her PLAN network programs marked with a leaf 
            <img
              src={LeafIcon}
              style={{ width: "24px", height: "24px", marginLeft: "5px" }}
            />
             support a green, natural approach toward reproductive health by
            supporting, not repressing, replacing, or blocking, their clients’
            natural fertility and procreative potential. These providers welcome
            patients/clients who do not share their beliefs who can still
            benefit from their services
          </li>
          <br />

          <li>
            This designation applies to the following categories of care:
            <ul>
              <li> 1.1 Pregnancy help and case management</li>
              <li> 2.1Women’s medical services </li>
              <li> 2.2 Support services for women</li>
              <li> 2.3 General health services</li>
              <li> 4.4 Housing, shelters, and maternity homes </li>
              <li>
                5.2 Intimate partner violence, sexual assault, or sex
                trafficking
              </li>
              <li> 5.3 Counseling for women and families </li>
              <li> 6.2 Medical interventions for baby </li>
              <li> 6.3 Perinatal hospice resources </li>
              <li> 6.4 Pregnancy and infant loss support </li>
              <li> 7.2 Children’s healthcare</li>
              <li> 7.3 Family and parenting education</li>
            </ul>
          </li>
          <br />

          <li>
            Read more about each assistance provider, get directions or share
            their directory listing
          </li>
          <br />

          <li>
            Contact the assistance provider with questions. We post emails and
            phone numbers so it’s easy to reach out to any assistance provider.
          </li>
          <br />
        </ul>
      </div> */}
    </div>
  );
};

export default MapsTips;
