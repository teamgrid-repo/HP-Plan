import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatLeftHBody from "./ChatLeftHBody";
import ChatLeftHeader from "./ChatLeftHeader";
import ChatRightHeader from "./ChatRightHeader";
import ChatRightMsg from "./ChatRightMsg";
import { readStatus } from "../../redux/actions/messages/MessagesActions";
import { bindActionCreators } from "redux";
import MsgSendComp from "./MsgSendComp";

const useStyle = makeStyles((theme) => ({
  msgCard: {
    background: "white",
    borderRadius: "5px",
    padding: "21px 10px 21px 10px",
    minWidth: "800px",
    overflow: "auto",
  },
  pluseIcon: {
    height: "18px",
    width: "18px",
    marginRight: "2px",
    marginTop: "2px",
  },
  pluseButtonContainer: {
    display: "inline-flex",
    fontSize: "14px",
    fontWeight: 600,
  },
  headerMsgDiv: {
    fontSize: "24px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.1px",
    textAlign: "center",
    color: "#171725",
  },
}));

const MessageBodyContainer = ({ socket, cu, handleReload, online }) => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const actions = bindActionCreators({ readStatus }, dispatch);

  const ms = useSelector((state) => state.msg.selRoom);
  // const newMsgFile = useSelector((state) => state.msg.newMsg);

  const [roomId, setRoomId] = useState("");
  const [messageBody, setMessageBody] = useState([]);

  const loadMsg = () => {
    setRoomId(ms.id);
    setMessageBody(() => ms.msgs);
    if (ms.roomName) actions.readStatus({ roomName: ms.roomName });
    if (ms.active) socket.emit("CLIENT_JOINED", { room: ms.roomName });
  };

  useEffect(() => {
    if (ms && roomId !== ms.id) {
      loadMsg();
    }
  }, [ms]);
  useEffect(() => {
    if (ms.active)
      socket.on("new_message", (message) => {
        setMessageBody((msg) => {
          return [...msg, message];
        });
      });
  }, []);
  // useEffect(() => {
  //   if (newMsgFile) {
  //     setMessageBody((msg) => {
  //       return [...msg, newMsgFile];
  //     });
  //   }
  // }, [newMsgFile]);
  return (
    <div className={classes.msgCard}>
      <Grid container className={classes.msgContainer}>
        <Grid item lg={3.5} md={3.5} xs={3.5} sm={3.5}>
          <ChatLeftHeader />
          <ChatLeftHBody />
        </Grid>
        <Grid item lg={0.1} md={0.1} xs={0.1} sm={0.1}>
          <div style={{ height: "100%" }}>
            <Divider orientation="vertical" variant="fullWidth" />
          </div>
        </Grid>
        <Grid
          item
          lg={8.4}
          md={8.4}
          xs={8.4}
          sm={8.4}
          justifyContent="flex-start"
        >
          <ChatRightHeader handleReload={handleReload} online={online} />
          <ChatRightMsg message={messageBody} cu={cu} />
          <MsgSendComp socket={socket} cu={cu} ms={ms} />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(MessageBodyContainer);
