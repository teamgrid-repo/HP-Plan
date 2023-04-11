import {
  TextField,
  InputAdornment,
  ButtonBase,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useState } from "react";
const useStyle = makeStyles((theme) => ({
  formGroupContainer: {
    textAlign: "left !important",
    color: "black",
    fontFamily: "Montserrat",
  },
  labelName: {
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
    fontFamily: "Montserrat",
  },
  disabledC: {
    cursor: "not-allowed !important",
  },
}));
const PasswordFormGroup = ({
  label,
  onChange,
  value,
  onBlur = () => {},
  validator = null,
  required = false,
  disabled = false,
}) => {
  const classes = useStyle();
  const [passDis, setPassDis] = useState(false);
  return !required ? (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>{label}</div>
      <TextField
        type={passDis ? "text" : "password"}
        fullWidth
        disabled={disabled}
        value={value}
        variant="outlined"
        placeholder={label}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setPassDis((old) => !old)}>
                {passDis ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {validator}
    </div>
  ) : (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>{label} *</div>
      <TextField
        type={passDis ? "text" : "password"}
        fullWidth
        variant="outlined"
        disabled={disabled}
        value={value}
        placeholder={label}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setPassDis((old) => !old)}>
                {passDis ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {validator}
    </div>
  );
};

export default PasswordFormGroup;
