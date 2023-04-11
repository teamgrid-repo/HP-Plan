import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  footer: {
    width: "100%",
    textAlign: "center",
    margin: "auto",
  },
}));

const Footer = () => {
  const classes = useStyle();
  return (
    <footer className={classes.footer}>
      © {new Date().getFullYear()} PLAN for Her.
    </footer>
  );
};

export default Footer;
