import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
  lisitngContainer: {
    padding: "8em 0px 22em 0px",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    fontFamily: "Montserrat",
  },
}));

const ListingComponent = (props) => {
  const classes = useStyle();

  return (
    <div style={{ background: "#fafafb", margin: 0, padding: 0 }}>
      <div className={classes.lisitngContainer}>{props.children}</div>
    </div>
  );
};

export default ListingComponent;
