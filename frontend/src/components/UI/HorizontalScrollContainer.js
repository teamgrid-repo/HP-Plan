import { useTheme } from "@emotion/react";
import { Card, Stack, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  providerCardContainer: {
    background: "#fafafa",
    borderRadius: "0px",
    marginBottom: "10em",
    fontFamily: "Montserrat",
  },
  providerListCardContainer: {
    marginBottom: "69px",
    overflow: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
    paddingBottom: "10px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 800,
    marginBottom: "20px",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.6,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#7e7e7e",
  },
}));

const HorizontalScrollContainer = (props) => {
  const classes = useStyle();
  const theme = useTheme();

  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const style =
    props.fontColor && props.color
      ? {
          color: props.fontColor,
          background: props.color,
        }
      : props.color
      ? {
          background: props.color,
        }
      : {};
  return (
    <Card className={classes.providerCardContainer} style={style}>
      <Stack style={{ margin: match ? "0px" : "32px" }}>
        <div className={classes.title}>{props.name}</div>
        <div className={classes.subTitle}>{props.subtitle}</div>
      </Stack>
      <div className={classes.providerListCardContainer}>{props.children}</div>
    </Card>
  );
};

export default HorizontalScrollContainer;
