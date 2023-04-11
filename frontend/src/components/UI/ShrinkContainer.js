import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  upperContainer: {
    fontFamily: "Montserrat",
    marginBottom: "8em",
    background: "#fafafb",
    [theme.breakpoints.down("md")]: {
      marginBottom: "25em",
    },
  },
}));

const ShrinkContainer = (props) => {
  const classes = useStyle();

  return <div className={classes.upperContainer}>{props.children}</div>;
};

export default ShrinkContainer;
