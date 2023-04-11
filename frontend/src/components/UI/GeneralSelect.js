import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles({
  formGroupContainer: {
    textAlign: "left !important",
    color: "black",
  },
  labelName: {
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
  },
  redClass: {
    marginLeft: "5px",
    color: "red",
    fontWeight: 500,
    fontSize: "18px !important",
    fontFamily: "Montserrat",
  },
});
const GeneralSelect = ({
  required,
  menuItem,
  onChange,
  value,
  blurSetup,
  validator,
  name,
  multi = false,
  disabled = false,
  oldData = false,
}) => {
  const classes = useStyle();
  return required ? (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>
        {name} *{" "}
        {oldData ? (
          <span className={classes.redClass}>
            {oldData ? oldData.reduce((a, b) => a + " " + b, "") : ""}
          </span>
        ) : null}
      </div>
      <Select
        fullWidth
        multiple={multi}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={blurSetup}
      >
        {menuItem.map((m) => (
          <MenuItem value={m.value} key={m.value}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
      {validator}
    </div>
  ) : (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>
        {name}{" "}
        {oldData ? (
          <span className={classes.redClass}>
            {oldData
              ? oldData.reduce((a, b) => a + `${a ? ", " : ""}` + b, "")
              : ""}
          </span>
        ) : null}
      </div>
      <Select
        fullWidth
        multiple={multi}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {menuItem.map((m) => (
          <MenuItem value={m.value} key={m.value}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default GeneralSelect;
