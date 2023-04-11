import React from "react";
import FormGroupContainer from "./FormGroupContainer";
import { TextareaAutosize } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  areaStyle: {
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    margin: "0",
    WebkitTapHighlightColor: "transparent",
    display: "block",
    minWidth: "0",
    width: "95%",
    WebkitAnimationName: "mui-auto-fill-cancel",
    animationName: "mui-auto-fill-cancel",
    WebkitAnimationDuration: "10ms",
    animationDuration: "10ms",
    padding: "16.5px 14px",
    borderColor: "#c4c4c4",
    "&::placeholder": {
      font: "inherit",
      letterSpacing: "inherit",
      padding: "4px 0 5px",
      border: "0",
      boxSizing: "content-box",
      background: "none",
      height: "1.4375em",
      margin: "0",
      WebkitTapHighlightColor: "transparent",
      display: "block",
      minWidth: "0",
      WebkitAnimationName: "mui-auto-fill-cancel",
      animationName: "mui-auto-fill-cancel",
      WebkitAnimationDuration: "10ms",
      animationDuration: "10ms",
      fontSize: "17px",
      color: "#C3C3C3",
    },
  },
}));

const CustomTextArea = ({
  label,
  onChange,
  value,
  onBlur,
  validator,
  required = false,
  disabled = false,
  styled = {},
}) => {
  const classes = useStyle();
  return (
    <FormGroupContainer required={required} label={label}>
      <TextareaAutosize
        placeholder="Write Your Message"
        value={value}
        minRows={10}
        onChange={(data) => onChange(data.target.value)}
        onBlur={onBlur}
        className={classes.areaStyle}
        disabled={disabled}
        style={styled}
      />
      {validator}
    </FormGroupContainer>
  );
};

export default CustomTextArea;
