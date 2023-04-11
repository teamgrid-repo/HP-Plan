import { makeStyles } from "@mui/styles";
import moment from "moment";
import ArticleIcon from "@mui/icons-material/Article";

const useStyle = makeStyles((theme) => ({
  senderCotainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10px",
  },
  sendAvatar: {
    width: "32px",
    height: "32px",
    position: "relative",
    left: 15,
    top: 15,
  },
  senderMessageContainer: {
    margin: "15px 0px 15px 0px",
    textAlign: "left",
    padding: "15px 19px 15px 19.1px",
    border: "solid 1px #e2e2ea",
    backgroundColor: "#fff",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.71",
    letterSpacing: "0.1px",
    color: "#44444f",
    maxWidth: "80%",
    overflow: "auto",
    wordBreak: "break-all",
  },
  senderTime: {
    margin: "auto",
    marginLeft: "2px",
    marginRight: 0,
  },

  reCotainer: {
    display: "flex",
  },
  reAvatar: {
    width: "32px",
    height: "32px",
    position: "relative",
    left: 15,
    top: 15,
  },
  reMessageContainer: {
    margin: "15px 0px 15px 0px",
    textAlign: "left",
    padding: "15px 19px 15px 19.1px",
    border: "solid 1px #e2e2ea",
    backgroundColor: "#fff",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.71",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#44444f",
    maxWidth: "80%",
    overflow: "auto",
  },
  reTime: {
    fontSize: "10px",
    marginLeft: "auto",
    textAlign: "right",
    color: "black",
    fontWeight: 600,
  },
}));
const ChatMsg = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.senderCotainer}>
      <div className={classes.senderCotainer}>
        {/* <Avatar
          className={classes.sendAvatar}
          src={(props.senderId && props.senderId.image) || ""}
        /> */}
        <div className={classes.senderMessageContainer}>
          {props.imageFlag ? (
            /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(props.text) ? (
              <img
                src={props.text}
                style={{
                  maxHeight: "400px",
                  maxWidth: "400px",
                  cursor: "pointer",
                }}
                onClick={() => window.open(props.text)}
              />
            ) : (
              <ArticleIcon
                fontSize="large"
                style={{ cursor: "pointer" }}
                onClick={() => window.open(props.text)}
              />
            )
          ) : (
            props.text
          )}{" "}
          <div className={classes.reTime}>
            {props.time ? moment(props.time).format("MMM, DD yyyy") : ""} <br />
            {props.time ? moment(props.time).format("hh:mm a") : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMsg;
