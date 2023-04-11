import { useEffect, useState } from "react";
import { AttachFileRounded, ArrowRightAlt } from "@mui/icons-material";
import { ButtonBase, Grid, Input, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { sendFileApi } from "../../redux/actions/messages/MessagesActions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ModalLoading from "../UI/ModalLoading";

const MsgSendComp = ({ socket, cu, ms }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const actions = bindActionCreators({ sendFileApi }, dispatch);
  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (text) {
      const data = {
        senderId: cu.id,
        text,
        room: ms.roomName,
        time: new Date().toString(),
        imageFlag: false,
      };
      setText("");
      socket.emit("sendMessage", data, () => setText(""));
    }
  };

  useEffect(() => {
    const f = document.getElementById("my-file");
    if (f) f.addEventListener("change", uploadFile);

    return () => {
      if (f) f.removeEventListener("change", uploadFile);
    };
  }, [ms, loading]);
  const selectLogic = () => {
    const f = document.getElementById("my-file");
    f.click();
  };
  const uploadFile = async (e) => {
    const file = (e && e.target.files[0]) || "";
    const size = file.size ? file.size / 1024 / 1024 : false;
    if (file && size && size < 25) {
      setLoading(true);
      let formData = new FormData();
      formData.append("image", file);
      formData.append("senderId", cu.id);
      formData.append("text", "");
      formData.append("room", ms.roomName);
      formData.append("time", new Date().toString());
      formData.append("imageFlag", true);
      const data = await actions.sendFileApi(formData);
      if (data) {
        socket.emit(
          "sendMessage",
          { ...data, alreadySaved: true },
          (s) => {}
          // console.log(s)
        );
      }
      setLoading(false);
    } else {
      toast.error("You Only Upload Upto 25Mb Document");
    }
  };
  return (
    <Grid item lg={12} md={12} sm={12} xs={12} marginTop={2}>
      <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
        {ms.active ? (
          loading ? (
            <ModalLoading />
          ) : (
            <Input
              id="standard-adornment-amount"
              placeholder="Write messages down here…"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <ButtonBase onClick={() => selectLogic()}>
                    <AttachFileRounded />
                    <input type="file" hidden multiple={false} id="my-file" />
                  </ButtonBase>
                  <ButtonBase onClick={() => sendMessage()}>
                    <ArrowRightAlt />
                  </ButtonBase>
                </InputAdornment>
              }
              style={{
                borderRadius: "3px",
                border: "solid 1px #d5d5dc",
                backgroundColor: "#fafafb",
                paddingLeft: "8px",
              }}
              color="success"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />
          )
        ) : (
          <h2 style={{ margin: "auto" }}>You have already left this group.</h2>
        )}
      </div>
    </Grid>
  );
};

export default MsgSendComp;
