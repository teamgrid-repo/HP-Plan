import { TextField } from "@mui/material";

import { makeStyles } from "@mui/styles";

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
  redClass: {
    marginLeft: "5px",
    color: "red",
    fontWeight: 500,
    fontSize: "18px !important",
    fontFamily: "Montserrat",
  },
}));
const FormGroup = ({
  type,
  label,
  onChange,
  value,
  onBlur = () => {},
  validator = null,
  required = false,
  disabled = false,
  oldData = false,
}) => {
  const classes = useStyle();

  return !required ? (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>
        {label}{" "}
        {oldData ? <span className={classes.redClass}>{oldData}</span> : null}
      </div>
      <TextField
        type={type}
        fullWidth
        disabled={disabled}
        value={value}
        variant="outlined"
        placeholder={label}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
      />
      {validator}
    </div>
  ) : (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>
        {label} *{" "}
        {oldData ? <span className={classes.redClass}>{oldData}</span> : null}
      </div>
      <TextField
        type={type}
        fullWidth
        variant="outlined"
        disabled={disabled}
        value={value}
        placeholder={label}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
      />
      {validator}
    </div>
  );
};

export default FormGroup;
