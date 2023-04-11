import {
  LocationOnOutlined,
  CloseOutlined,
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { Grid, Card, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import config from "../../config";
import CustomButton from "../UI/CustomButton";

const useStyle = makeStyles((theme) => ({
  savedListingCard: {
    borderRadius: "10px",
    border: "solid 1px #fff",
    backgroundColor: "#fff",
  },
  catDiv: {
    display: "flex",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#7dbaaf",
    gap: "14px",
  },
  doctorTxt: {
    paddingLeft: "0.3em",
    color: "#92929d",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  docAvatar: {
    width: "24px !important",
    height: "24px !important",
    fontSize: "1em !important",
  },
  docContainer: {
    paddingBottom: "1em",
    display: "flex",
  },
  addressDiv: {
    paddingTop: "0.2em",
    paddingLeft: "0.2em",
  },
  addressDIvContainer: {
    fontSize: "14px",
    color: "#92929d",
    display: "flex",
    flexDirection: "row",
    paddingBottom: "1em",
  },
  nameDiv: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#171725",
    paddingBottom: "0.5em",
  },
  imgDiv: {
    height: "150px",
    width: "100%",
    borderRadius: "10px",
  },
  thirdDivContainer: {
    display: "flex",
    height: "100%",
    gap: "4px",
    marginLeft: "10px",
  },
  thirdButtonGrp: {
    color: "#7dbaaf",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  closeBtnSpace: {
    marginLeft: "5px",
    marginBottom: "15px",
  },
  root: {
    "& .MuiAvatar-root": {
      width: "24px !important",
      height: "24px !important",
      fontSize: "1em !important",
    },
  },
}));

const SavedProviderListingCard = ({
  name,
  address,
  id,
  CutomComponent,
  removePro,
  data,
  handlePrint,
}) => {
  const classes = useStyle();

  const copyMsg = () => {
    navigator.clipboard.writeText(
      `${config.url}provider-details/${data.organisationId},${data.siteId}`
    );
    toast.success("url copied!");
  };
  return (
    <Grid item lg={12} md={12} sm={12} xs={12} key={id}>
      <Card className={classes.savedListingCard}>
        <Grid container direction="row">
          <Grid item lg={4} md={4} sm={4} xs={12} textAlign="left" padding={2}>
            <div className={classes.nameDiv}>{name}</div>
            <div className={classes.addressDIvContainer}>
              <LocationOnOutlined />
              <div className={classes.addressDiv}>{address}</div>
            </div>
            <div className={classes.catDiv}>
              <CustomButton
                name="Share Provider"
                varient="contained"
                classNameI="greyContained"
                onclick={() => copyMsg()}
              />
              <CustomButton
                name="Print Provider"
                varient="contained"
                classNameI="greyContained"
                onclick={() => handlePrint()}
              />
            </div>
          </Grid>
          <Grid
            item
            lg={7.7}
            md={7.5}
            sm={7.2}
            xs={10}
            textAlign="right"
            margin="auto"
          >
            {CutomComponent}
          </Grid>
          <Grid item lg={0.3} md={0.5} sm={0.8} xs={2} textAlign="right">
            <CloseOutlined
              fontSize="medium"
              className={classes.closeBtnSpace}
              onClick={() => removePro()}
              style={{
                color: "#7dbaaf",
                paddingRight: "3px",
                paddingTop: "5px",
                cursor: "pointer",
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default SavedProviderListingCard;
