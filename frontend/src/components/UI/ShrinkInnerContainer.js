import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  otherContainerDiv: {
    width: "90%",
    margin: "auto",
    textAlign: "center",
    marginTop: "10em",
    [theme.breakpoints.down("sm")]: {
      // marginTop: "20em",
      width: "100%",
    },
  },
}));

const ShrinkInnerContainer = (props) => {
  const classes = useStyle();
  return <div className={classes.otherContainerDiv}>{props.children}</div>;
};

export default ShrinkInnerContainer;
