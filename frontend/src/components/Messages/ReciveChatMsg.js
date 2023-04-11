import ArticleIcon from "@mui/icons-material/Article";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  reCotainer: {
    display: "flex",
    marginLeft: "10px",
  },
  reAvatar: {
    width: "32px",
    height: "32px",
    position: "relative",
    right: 15,
    top: 15,
  },
  reMessageContainer: {
    margin: "0px 0px 15px 0px",
    textAlign: "left",
    padding: "15px 19px 15px 19.1px",
    border: "solid 1px #e2e2ea",
    backgroundColor: "#f1f1f5",
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
    wordBreak: "break-all",
    overflow: "auto",
  },
  reTime: {
    fontSize: "10px",
    marginLeft: "auto",
    textAlign: "right",
    color: "black",
    fontWeight: 600,
  },
  reMsg: {
    marginLeft: "8px",
    fontSize: "10px",
    marginRight: "auto",
    textAlign: "left",
    color: "green",
    fontWeight: 600,
  },
}));

const ReciveChatMsg = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.reCotainer}>
      <div className={classes.reCotainer}>
        <div>
          <div className={classes.reMsg}>
            {props.senderId && props.senderId.name}
          </div>
          <div className={classes.reMessageContainer}>
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
              {props.time ? moment(props.time).format("MMM, DD yyyy") : ""}{" "}
              <br />
              {props.time ? moment(props.time).format("hh:mm a") : ""}
            </div>
          </div>
        </div>
        {/* <Avatar
          className={classes.reAvatar}
          src={(props.senderId && props.senderId.image) || ""}
        /> */}
      </div>
    </div>
  );
};

export default ReciveChatMsg;
