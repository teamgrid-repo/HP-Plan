import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ChatPersonCard from "./ChatPersonCard";
import { getMsgs } from "../../redux/actions/messages/MessagesActions";
const useStyle = makeStyles((theme) => ({
  chatHbody: {
    textAlign: "left",
    padding: "10px",
    width: "100%",
    minHeight: "500px",
    maxHeight: "880px",
    overflowX: "auto",
  },
}));

const ChatLeftHBody = () => {
  const ms = useSelector((state) => state.msg.rooms);
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getMsgs }, dispatch);
  const selRoom = async (r) => {
    let name = "";
    if (r.name && r.name.length) {
      r.name.forEach((n, i) => {
        name =
          name +
          n.name +
          `${r.name.length > 1 ? (i !== r.name.length - 1 ? ", " : "") : ""}`;
      });
    }
    await actions.getMsgs(
      r.room,
      r.id || "",
      name,
      (r && r.name && r.name[0] && r.name[0].image) || "",
      r.group ? "" : r.rid || "",
      r.group || false,
      r.active || false,
      r && r.name && r.name[0] ? r.name[0].hippa : false,
      r && r.name && r.name[0] ? r.name[0].role : ""
    );
  };
  //active
  return (
    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.chatHbody}>
      {ms &&
        ms.length &&
        ms.map((p) => (
          <ChatPersonCard {...p} key={p.id} selRoom={() => selRoom(p)} />
        ))}
    </Grid>
  );
};

export default ChatLeftHBody;
