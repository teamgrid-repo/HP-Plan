import { Divider, Grid } from "@mui/material";
import SMsg from "./SenderChatMsg";
import RMsg from "./ReciveChatMsg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MiniSearch from "minisearch";

const ChatRightMsg = (props) => {
  const { message, cu } = props;
  const searchMsg = useSelector((state) => state.msg.searchString);
  const [searchMsgState, setSearchMsg] = useState([]);
  const [handleF, setHandleF] = useState(false);
  const clearF = useSelector((state) => state.msg.clear);

  let miniSearch = new MiniSearch({
    fields: ["text"], // fields to index for full-text search
    storeFields: [
      "_id",
      "text",
      "activeUserId",
      "imageFlag",
      "room",
      "senderId",
      "socketId",
      "status",
      "time",
    ],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  });

  const msgForSearch = message.map((a) => {
    return { ...a, id: a._id };
  });
  // Index all documents
  miniSearch.addAll(msgForSearch);

  useEffect(() => {
    scrollToBottomFun();
  }, [props]);

  const scrollToBottomFun = () => {
    var chatHistory = document.getElementById("needScroll");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  };
  useEffect(() => {
    if (searchMsg && searchMsg.length && message && message.length) {
      let results = miniSearch.search(searchMsg);
      setSearchMsg(() => results);
      setHandleF(true);
    }
  }, [searchMsg]);
  useEffect(() => {
    if (clearF) {
      setSearchMsg([]);
      setHandleF(false);
    }
  }, [clearF]);
  useEffect(() => {
    scrollToBottomFun();
  }, [handleF]);
  return (
    <Grid item lg={12} md={12} sm={12} xs={12} marginTop={2}>
      <div
        id="needScroll"
        style={{ height: "calc(100vh - 500px)", overflow: "auto" }}
      >
        {handleF ? (
          searchMsgState && searchMsgState.length ? (
            searchMsgState.map((data) =>
              data.senderId ? (
                data.senderId._id === cu.id ? (
                  <SMsg {...data} key={data._id} />
                ) : (
                  <RMsg {...data} key={data._id} />
                )
              ) : null
            )
          ) : (
            <h5>No Message</h5>
          )
        ) : message && message.length ? (
          message.map((data) =>
            data.senderId ? (
              data.senderId._id === cu.id ? (
                <SMsg {...data} key={data._id} />
              ) : (
                <RMsg {...data} key={data._id} />
              )
            ) : null
          )
        ) : (
          <h5>No Message</h5>
        )}
        {/* <div style={{ float: "left", clear: "both" }} ref={inputEl}></div> */}
      </div>
      <Divider />
    </Grid>
  );
};

export default ChatRightMsg;
