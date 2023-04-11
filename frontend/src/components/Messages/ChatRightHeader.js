import { Avatar, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  clearMsgs,
  leaveOrdelete,
} from "../../redux/actions/messages/MessagesActions";
import {
  getClients,
  addClient,
  deleteClient,
} from "../../redux/actions/client/clientActions";
import HippaCoverdIcon from "../../assets/images/HippaEntity.png";
import profileImg from "../../assets/images/person-img.png";

const sxObj = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    zIndex: 0,
  },
};
const useStyle = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  innerContainer: {
    display: "flex",
    gap: "10px",
  },
  icon: {
    width: "19.1px",
    height: "20px",
    color: "#92929d",
    margin: "auto",
    marginRight: "15px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    margin: "auto",
  },
  name: {
    fontSize: "18px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#171725",
    margin: "auto",
  },
  statusDiv: {
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#696974",
    margin: "auto",
  },
  separator: {
    width: "1px",
    height: "20px",
    backgroundColor: "#d8d8d8",
    margin: "auto",
  },
}));

const ChatRightHeader = ({ handleReload, online }) => {
  const classes = useStyle();

  const ms = useSelector((state) => state.msg.selRoom);
  const userRole = useSelector((state) => state.auth.user.role);
  const cc = useSelector((state) => state.msg.clients);

  const [clients, setClients] = useState([]);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { leaveOrdelete, clearMsgs, getClients, addClient, deleteClient },
    dispatch
  );

  const [enchorEl, setEnchorEl] = useState(null);
  const [openP, setOpenP] = useState(false);

  useEffect(() => {
    if (cc) {
      const data = [];
      for (let i = 0; i < cc.length; i++) {
        if (cc[i] && cc[i].userId && cc[i].userId._id)
          data.push(cc[i].userId._id);
      }
      setClients(() => data);
    }
  }, [cc]);
  const handleAddRemove = async (add, id) => {
    handleClose();
    if (id) {
      if (add) {
        await actions.addClient(id);
      } else {
        await actions.deleteClient(id);
      }
      await actions.getClients();
    }
  };

  const handleClick = (event) => {
    setEnchorEl(event.currentTarget);
    setOpenP(true);
  };
  const handleClose = () => {
    setEnchorEl(null);
    setOpenP(false);
  };
  const handleMenu = async (leave) => {
    handleClose();
    const data = { roomName: ms.roomName, delete: leave };
    await actions.leaveOrdelete(data);
    await actions.clearMsgs();
    handleReload(false);
  };
  return (
    <Grid item lg={12} md={12} sm={12} xs={12} marginBottom={4} marginLeft={2}>
      <div className={classes.headerContainer}>
        <div className={classes.innerContainer}>
          <Avatar
            className={classes.avatar}
            src={(ms && ms.img) || profileImg}
          />
          <div className={classes.name}>
            {" "}
            {(ms && ms.name) || "-"}{" "}
            {ms.hippa ? (
              <img
                src={HippaCoverdIcon}
                style={{
                  margin: "auto",
                  marginLeft: "0px",
                  marginRight: "0",
                }}
              />
            ) : null}{" "}
          </div>
          <div className={classes.separator}></div>
          <div className={classes.statusDiv}>
            {ms.sid
              ? online && online.length
                ? online.find((o) => o === ms.sid)
                  ? "Online"
                  : "Offline"
                : "Offline"
              : ""}
          </div>
        </div>
        {ms ? (
          <div className={classes.innerContainer}>
            <IconButton onClick={handleClick}>
              <MenuIcon className={classes.icons} />
            </IconButton>

            <Menu
              open={openP}
              anchorEl={enchorEl}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: { ...sxObj },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {ms.group && ms.active ? (
                <MenuItem onClick={() => handleMenu(false)}>
                  Leave Chat
                </MenuItem>
              ) : null}
              {!ms.group &&
                userRole &&
                userRole === "provider" &&
                ms.sid &&
                ms.role !== "provider" &&
                typeof ms.sid === "string" && (
                  <MenuItem
                    onClick={() =>
                      handleAddRemove(
                        !clients.find((a) => a === ms.sid),
                        ms.sid
                      )
                    }
                  >
                    {clients &&
                    clients.length &&
                    clients.find((a) => a === ms.sid)
                      ? "Remove Client"
                      : "Add Client"}
                  </MenuItem>
                )}
              <MenuItem onClick={() => handleMenu(ms.group ? true : false)}>
                Delete Chat
              </MenuItem>
            </Menu>
          </div>
        ) : null}
      </div>
    </Grid>
  );
};

export default ChatRightHeader;
