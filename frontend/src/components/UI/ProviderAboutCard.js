import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  otherCards: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    // margin: "1em",
    padding: "1em",
  },
  otherCardAppoinmentHeader: {
    fontSize: "16px",
    fontWeight: 600,
    paddingBottom: "2em",
  },
  otherCardAppoinmentDetails: {
    color: "#696974",
    lineHeight: 1.71,
    letterSpacing: "0.1px",
  },
}));

const ProviderAboutCard = ({ name, description, hospitalName, spacility }) => {
  const classes = useStyle();
  return (
    <Card className={classes.otherCards}>
      <div className={classes.otherCardAppoinmentHeader}>{name}</div>
      <div className={classes.otherCardAppoinmentDetails}>{description}</div>
      <div style={{ paddingTop: "1em" }}>{spacility}</div>
      <div style={{ paddingTop: "1em" }}>{hospitalName}</div>
    </Card>
  );
};

export default ProviderAboutCard;
