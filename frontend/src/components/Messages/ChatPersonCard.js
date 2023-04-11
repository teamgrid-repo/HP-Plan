import { Avatar, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useSelector } from "react-redux";
import profileImg from "../../assets/images/person-img.png";

const useStyle = makeStyles((theme) => ({
  personCard: {
    width: "98%",
    height: "74px",
    display: "flex",
    gap: "10px",
    padding: "5px 8px 5px 8px",
  },
  avatar: {
    width: "42px",
    height: "42px",
    marginLeft: "0px",
    marginRight: "0px",
    margin: "auto",
  },
  rightContainer: {
    marginLeft: "0px",
    marginRight: "0px",
    margin: "auto",
    flexGrow: 1,
  },
  name: {
    fontSize: "14px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#171725",
    marginLeft: "0px",
    margin: "auto",
  },
  lastMsg: {
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#92929d",
    whiteSpace: "nowrap",
    wordBreak: "break-all",
  },
  lastTime: {
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.83,
    letterSpacing: "normal",
    textAlign: "right",
    color: "#92929d",
    marginRight: "0px",
    margin: "auto",
  },
  upperDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  active: {
    backgroundColor: "#7dbaaf",
    borderRadius: "15px",
  },
  outerContainer: {
    marginBottom: "10px",
    cursor: "pointer",
  },
  activeCardText: {
    color: "#fff !important",
  },
  unread: {
    backgroundColor: "#f2f7ff",
    borderRadius: "15px",
  },
}));

const ChatPersonCard = (props) => {
  const { name, id, lastTime, lastMsg, status, selRoom } = props;
  const classes = useStyle();
  const ms = useSelector((state) => state.msg.selRoom);
  const container =
    ms && ms.roomName && ms.roomName === props.room
      ? classes.active
      : status === "unread"
      ? classes.unread
      : "";
  const color =
    ms && ms.roomName && ms.roomName === props.room
      ? `${classes.activeCardText} `
      : "";
  const getComaName = (name) => {
    let mName = "";
    if (name && name.length) {
      name.forEach((n, i) => {
        mName =
          mName +
          n.name +
          `${name.length > 1 ? (i !== name.length - 1 ? ", " : "") : ""}`;
      });
    }
    return mName;
  };

  return (
    <Grid
      item
      lg={12}
      md={12}
      sm={12}
      xs={12}
      key={id}
      className={classes.outerContainer}
    >
      <div className={classes.personCard + " " + container} onClick={selRoom}>
        <Avatar
          src={(name && name[0] && name[0].image) || profileImg}
          className={classes.avatar}
        />
        <div className={classes.rightContainer}>
          <div className={color + classes.upperDiv}>
            <div className={color + classes.name}>{getComaName(name)}</div>
            <div className={color + classes.lastTime}>
              {lastTime ? moment(lastTime).format("hh:mm a") : "-"} <br />
              {lastTime ? moment(lastTime).format("MMM, DD yyyy") : "-"}
            </div>
          </div>
          <div className={color + classes.lastMsg}>
            {lastMsg ? lastMsg.slice(0, 25) : "-"}
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default ChatPersonCard;
