import { makeStyles } from "@mui/styles";
import { BasicSwitch } from "../UI/CustomSwitch";
const useStyle = makeStyles((theme) => ({
  switchContainer: {
    padding: "9.4px 14px 9.4px 24px",
    borderRadius: "24px",
    backgroundColor: "#fafafa",
    display: "flex",
  },
  switchTitle: {
    margin: "auto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "#000",
    marginLeft:"14px"
  },
  switch: {
    margin: "auto",
    marginRight: "0px",
    textAlign: "right",
  },
}));

const NotificationSwitchCard = ({ title, value, method, disabled = false }) => {
  const classes = useStyle();
  return (
    <div className={classes.switchContainer}>
      <div className={classes.switchTitle}>{title}</div>
      <div className={classes.switch}>
        <BasicSwitch checked={value} onChange={method} disabled={disabled} />
      </div>
    </div>
  );
};

export default NotificationSwitchCard;
