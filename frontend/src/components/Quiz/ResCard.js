import { Card, Divider, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    padding: "47px 49px 70px 36px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    margin: "29px 0 45px 0px",
    [theme.breakpoints.down("sm")]: {
      margin: "47px 0px 47px 0px",
      padding: "10px",
    },
  },
  suggDiv: {
    marginBottom: "25px",
  },
  header: {
    fontSize: "34px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#2262ac",
    margin: "0 103px 29px 15px",
    [theme.breakpoints.down("sm")]: {
      margin: "5px",
    },
  },
  desc: {
    textAlign: "left",
    fontSize: "23px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.43,
    letterSpacing: "normal",
    color: "#7e7e7e",
    marginTop: "43px",
    wordSpacing: "normal",
  },
}));

const ResCard = ({ header, subAns }) => {
  const classes = useStyle();

  return (
    <Card className={classes.cardContainer}>
      <Stack direction="column" flexWrap="wrap">
        <div className={classes.header}>{header}</div>
        <Divider />
        <div className={classes.desc}>{subAns}</div>
      </Stack>
    </Card>
  );
};

export default ResCard;
