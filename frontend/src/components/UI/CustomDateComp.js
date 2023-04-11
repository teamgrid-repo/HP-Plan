import FormGroupContainer from "./FormGroupContainer";
import DatePicker from "react-date-picker";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  dateStyle: {
    width: "100%",
    height: "50px",
  },
}));

const calulateDate = () => {
  const yr = new Date().getFullYear() - 10;
  return new Date(`01/01/${yr}`);
};

const CustomDateComp = ({
  label,
  onChange,
  value,
  onBlur,
  validator,
  required = false,
  disabled = false,
}) => {
  const classes = useStyle();
  return (
    <FormGroupContainer label={label} required={required}>
      <DatePicker
        onChange={(e) => onChange(e)}
        value={value}
        className={classes.dateStyle}
        onBlur={onBlur}
        disabled={disabled}
        maxDate={calulateDate()}
      />
      {validator}
    </FormGroupContainer>
  );
};

export default CustomDateComp;
