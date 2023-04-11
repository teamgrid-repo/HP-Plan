import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageBodyContainer from "./MessageBodyContainer";
import {
  getMsgs,
  getRooms,
  checkRoom,
} from "../../redux/actions/messages/MessagesActions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import config from "../../config";
import { io } from "socket.io-client";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import { getClients } from "../../redux/actions/client/clientActions";
import LoadingComponent from "../UI/LoadingComponent";

const useStyle = makeStyles((theme) => ({
  mainContianer: {
    height: "100%",
    width: "100%",
    background: "#fafafb",
    fontFamily: "Montserrat",
  },
  subContainer: {
    padding: "4em 0px 2em 0px",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    overflow: "auto",
    [theme.breakpoints.down("lg")]: {
      width: "99%",
    },
  },
}));
const socket = io.connect(config.socketUrl);

const MessgesComponent = () => {
  const classes = useStyle();
  const parms = useParams();
  const [loader, setLoader] = useState(true);
  const [cu, setCu] = useState("");
  const [online, setOnline] = useState([]);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      getMsgs,
      getRooms,
      checkRoom,
      getIdRole,
      getClients,
    },
    dispatch
  );
  const userRec = useSelector((state) => state.auth.user);

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

  const getData = async (d) => {
    setLoader(true);
    const user = actions.getIdRole();
    setCu(() => user);
    const [id1, id2] = parms.id.split("-");
    let res = {};
    if (id1 && id2 && d) {
      res = await actions.checkRoom({
        userId: [id2],
        group: false,
        roomName: `${id1}-${id2}`,
      });
    }
    const rooms = await actions.getRooms();
    if (id1 && id2 && res && res.room) {
      await actions.getMsgs(
        res.room,
        res.userId[0]._id || "",
        res.userId[0].name || "",
        res.image || "",
        res.userId[0]._id || "",
        res.group || false,
        res.active || false,
        res.userId[0].hippa || false,
        res.userId[0].role || ""
      );
    } else if (rooms && rooms.length && rooms[0] && rooms[0].room) {
      if (parms.id === "xyz" || !d) {
        await actions.getMsgs(
          rooms[0].room,
          rooms[0].id,
          getComaName(rooms[0].name),
          (rooms[0].name && rooms[0].name[0] && rooms[0].name[0].image) || "",
          rooms[0].group ? "" : rooms[0].rid || "",
          rooms[0].group || false,
          rooms[0].active || false,
          rooms[0].name && rooms[0].name[0] ? rooms[0].name[0].hippa : false,
          rooms[0].name && rooms[0].name[0] ? rooms[0].name[0].name : ""
        );
      } else {
        const d = rooms.find((r) => r.room === parms.id);
        if (d) {
          await actions.getMsgs(
            d.room,
            d.id,
            getComaName(d.name),
            (d.name && d.name[0] && d.name[0].image) || "",
            d.group ? "" : d.rid || "",
            d.group || false,
            d.active || false,
            d.name && d.name[0] ? d.name[0].hippa : false,
            d.name && d.name[0] ? d.name[0].role : ""
          );
        } else {
          await actions.getMsgs(
            rooms[0].room,
            rooms[0].id,
            getComaName(rooms[0].name),
            (rooms[0].name && rooms[0].name[0] && rooms[0].name[0].image) || "",
            rooms[0].group ? "" : rooms[0].rid || "",
            rooms[0].group || false,
            rooms[0].active || false,
            rooms[0].name && rooms[0].name[0] ? rooms[0].name[0].hippa : false,
            rooms[0].name && rooms[0].name[0] ? rooms[0].name[0].role : ""
          );
        }
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    if (userRec) getData(true);
  }, [parms]);
  useEffect(() => {
    const { id } = actions.getIdRole();
    if (id) {
      socket.emit("newUser", { senderId: id });

      socket.on("allUser", (user) => {
        setOnline(() => Object.keys(user));
      });
    }
    if (userRec && userRec.role === "provider") {
      getClientFromServer();
    }
  }, []);
  const getClientFromServer = async () => {
    await actions.getClients();
  };
  return (
    <div className={classes.mainContianer}>
      <div className={classes.subContainer}>
        {loader ? (
          <LoadingComponent />
        ) : (
          <MessageBodyContainer
            socket={socket}
            cu={cu}
            handleReload={userRec ? getData : null}
            online={online || []}
          />
        )}
      </div>
    </div>
  );
};

export default MessgesComponent;
