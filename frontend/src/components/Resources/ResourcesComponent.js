import { useTheme } from "@emotion/react";
import { Menu, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import {
  Card,
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  useMediaQuery
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import img1 from "../../assets/images/home1.png";
import CustomButton from "../UI/CustomButton";

const res = [
  {
    img: img1,
    title: "Snapshot on Category of Care",
    desc: "FORMING HER PLAN",
    id: "1",
  },
  {
    img: img1,
    title: "Snapshot on Category of Care",
    desc: "FORMING HER PLAN",
    id: "2",
  },
  {
    img: img1,
    title: "Snapshot on Category of Care",
    desc: "FORMING HER PLAN",
    id: "3",
  },
  {
    img: img1,
    title: "Snapshot on Category of Care",
    desc: "FORMING HER PLAN",
    id: "4",
  },
];

const useStyle = makeStyles((theme) => ({
  container: {
    padding: "2em 0px 4em 0px",
    width: "80%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    fontFamily: "Montserrat",
  },
  dropHeader: {
    marginBottom: "3px",
    fontSize: "16px",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.83,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#2b4c5b",
  },
  dropDownCard: {
    padding: "10px",
  },
  dropStateContainer: {
    borderRadius: "2px",
    border: "solid 3px #008dc2",
    padding: "9px 14.4px 9px 21.5px",
    color: "#008dc2",
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    display: "flex",
    justifyContent: "space-between",
  },
  checkBoxText: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#8692a7",
    display: "flex",
  },
  checkBoxIText: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#8692a7",
    display: "flex",
    marginLeft: "10%",
  },
  descHeader: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.31,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#a6a6a6",
  },
  sortContainer: {
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
  },
  sortLabel: {
    fontSize: "14px",
    color: "#696974",
    paddingTop: "10px",
    paddingRight: "10px",
  },
  imgContainer: {
    width: "100%",
  },
  resTitleDiv: {
    fontSize: "34px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#2262ac",
    marginBottom: "10px",
  },
  resDescDiv: {
    fontSize: "21px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.57,
    letterSpacing: "normal",
    color: "#7e7e7e",
    marginBottom: "10px",
  },
  resDescHDiv: {
    color: "#4f8ead",
  },
  filterDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  filterResDiv: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    color: "#8692a7",
  },
  viewContainer: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0",
    },
  },
  viewDiv: {
    fontSize: "20px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#2262ac",
    margin: "auto",
    marginLeft: "0",
  },
  btn: {
    marginRight: "9.4px",
  },
  checkBoxContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  checkBoxTitle: {
    margin: "auto",
    marginLeft: "0",
    display: "flex",
  },
  pagination: {
    fontSize: "23px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.22,
    letterSpacing: "normal",
    color: "#8692a7",
  },
  bottomDIv: {
    fontSize: "12px",
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.67,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#5b5b5b",
    margin: "41px 40px 2px 40px",
  },
}));

const ResourcesComponent = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyle();
  return (
    <div style={{ background: "#fff" }}>
      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Grid item lg={12} mb={2}>
              <TextField
                fullWidth
                placeholder="Search by keyword"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={12} mb={2}>
              <Card className={classes.dropDownCard}>
                <div className={classes.dropHeader}>SEARCH BY LOCATION</div>
                <div className={classes.dropStateContainer}>
                  Select State <Menu />
                </div>
                <div className={classes.checkBoxContainer}>
                  <div className={classes.checkBoxText}>
                    <Checkbox defaultChecked />
                    <div className={classes.checkBoxTitle}>Alabama</div>
                  </div>

                  <div className={classes.checkBoxText}>
                    <Checkbox defaultChecked />
                    <div className={classes.checkBoxTitle}> Alabama</div>
                  </div>

                  <div className={classes.checkBoxText}>
                    <Checkbox defaultChecked />
                    <div className={classes.checkBoxTitle}>Alabama</div>
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid item lg={12} mb={2}>
              <Card className={classes.dropDownCard}>
                <div className={classes.dropHeader}>SELECT CARE</div>
                <Divider />
                <div className={classes.checkBoxContainer}>
                  <div className={classes.checkBoxText}>
                    <Checkbox defaultChecked size="medium" />
                    <div className={classes.checkBoxTitle}>
                      Alabama
                      <ArrowDropUp style={{ color: "#008dc2" }} />
                    </div>
                  </div>
                  <div className={classes.checkBoxIText}>
                    <Checkbox defaultChecked size="medium" />
                    <div className={classes.checkBoxTitle}>Alabama</div>
                  </div>

                  <div className={classes.checkBoxText}>
                    <Checkbox defaultChecked />
                    <div className={classes.checkBoxTitle}>
                      Alabama
                      <ArrowDropDown />
                    </div>
                  </div>

                  <div className={classes.checkBoxText}>
                    <Checkbox defaultChecked />
                    <div style={{ margin: "auto", marginLeft: "0" }}>
                      Alabama
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Grid item lg={12} marginBottom={2}>
              <div className={classes.descHeader}>
                Resources listed in this “additional resources” directory are
                not part of the Her PLAN network and are not reviewed to
                determine consistency with Her PLAN standards. Her PLAN does not
                necessarily endorse these websites, or the products,
                content, materials, or information presented or made available
                within them. {" "}
              </div>
            </Grid>
            <Grid item lg={12} mb={2}>
              <Divider />
            </Grid>
            <Grid item lg={12}>
              <div className={classes.filterDiv}>
                <div className={classes.filterResDiv}>Results 24</div>
                <div className={classes.sortContainer}>
                  <div className={classes.sortLabel}>Sort by:</div>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    size="small"
                    variant="standard"
                  >
                    <MenuItem value="de">
                      <em>Default</em>
                    </MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </div>
              </div>
            </Grid>
            {res.map((m) => (
              <Grid
                container
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                mb={match ? 4 : 0}
              >
                <Grid item lg={3} md={3} sm={3}>
                  <img src={m.img} className={classes.imgContainer} />
                </Grid>
                <Grid
                  item
                  lg={9}
                  md={9}
                  sm={9}
                  margin="auto"
                  textAlign="left"
                  mt="2%"
                >
                  <div className={classes.resTitleDiv}>{m.title}</div>
                  <div className={classes.resDescDiv}>
                    Her #1 priority could be to confirm her pregnancy for free
                    at a pregnancy help. Go to{" "}
                    <span className={classes.resDescHDiv}>{m.desc}</span> ,
                    search Pregnancy Help .
                  </div>
                  <div className={classes.viewContainer}>
                    <div className={classes.viewDiv}>View More &gt;</div>
                    <div>
                      <CustomButton
                        name="Print"
                        varient="contained"
                        className={classes.btn}
                      />
                      <CustomButton
                        name="Share"
                        varient="contained"
                        className={classes.btn}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            ))}
            <Grid item lg={12} mb={6} mt={2}>
              <div className={classes.pagination}>1, 2, 3 ... 6 &gt;</div>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.bottomDIv}>
           “Additional Resources” provides links to and information about third
          parties (including websites), owned and operated by independent
          parties over which Her PLAN has no control ("Third-Parties)"). HER
          PLAN DOES NOT ENDORSE OR APPROVE AND MAKES NO WARRANTIES,
          REPRESENTATIONS, OR UNDERTAKINGS RELATING TO THE PRODUCTS, CONTENT,
          MATERIALS, OPINIONS, OR OTHER INFORMATION MADE AVAILABLE BY OR ABOUT
          THIRD-PARTIES, OR RELATING TO ANY SERVICES PROVIDED BY SUCH THIRD
          PARTIES.  In addition to the terms stated in Her PLAN’s Terms of Use,
          Her PLAN disclaims liability for any loss, damage, cost and any other
          consequence resulting directly or indirectly from or relating to your
          access to the Third-Party Websites or any information made available
          by or about Third-Parties, or any information that you may provide or
          any transaction conducted on or via a Third-Party Website or the
          failure of any information, goods or services posted or offered at the
          Third-Party Website or any error, omission, or misrepresentation on
          the Third-Party Website or any computer virus arising from or system
          failure associated with the Third-Party Website, or resulting directly
          or indirectly from or relating to any services, products, content,
          materials, opinions, and/or other information provided by the
          applicable third party. By clicking "Proceed", you will be confirming
          that you have read and agreed to the terms herein and in Her PLAN’s
          Terms of Use.
        </div>
      </div>
    </div>
  );
};

export default ResourcesComponent;
