import { Button } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  outlined: {
    borderRadius: "5px",
    border: "solid 1px #7dbaaf",
    fontSize: "12px",
    color: "#7dbaaf",
    fontWeight: 600,
    textTransform: "none",
  },
  contained: {
    borderRadius: "5px",
    backgroundColor: "#7dbaaf",
    fontSize: "12px",
    fontWeight: 600,
    color: "#fafafb",
    textTransform: "none",
  },
  text: {
    color: "#7dbaaf",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "none",
  },
  special: {
    margin: "14px 0px 0px 0px",
    padding: "13px 69px 11px",
    backgroundColor: "#7dbaaf",
    textTransform: "none",
    borderRadius: "20px 10px 40px 20px",
    color: "white",
  },
  specialOutline: {
    margin: "14px 0px 0px 0px",
    padding: "13px 69px 11px",
    textTransform: "none",
    borderRadius: "20px 10px 40px 20px",
    color: "white",
    borderColor: "#7dbaaf",
  },
  greyText: { color: "#8692a7" },
  greyOutLine: {
    color: "#8692a7",
    borderColor: "#8692a7",
  },
  greyContained: {
    background: "#8692a7",
  },
}));

const CustomButton = ({
  className,
  classNameI,
  name,
  varient,
  onclick,
  styled = {},
  size = "medium",
  fullWidth = false,
  disabled = false,
}) => {
  const classes = useStyle();
  return (
    <Button
      disabled={disabled}
      className={`${classes[varient]} ${className || classes[classNameI]}`}
      variant={varient}
      style={styled}
      size={size}
      onClick={onclick}
      fullWidth={fullWidth}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
