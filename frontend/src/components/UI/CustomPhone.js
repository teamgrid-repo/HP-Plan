import InputMask from "react-input-mask";

import { TextField } from "@mui/material";

import FormGroupContainer from "./FormGroupContainer";

const CustomPhone = ({
  label,
  onChange,
  value,
  onBlur,
  validator,
  required = false,
  disabled = false,
  oldData = false,
}) => {
  return (
    <FormGroupContainer required={required} label={label} oldData={oldData}>
      <InputMask
        onChange={(e) => onChange(e.target.value)}
        value={value}
        mask="(999)999-9999"
        maskChar=" "
        placeholder={label}
        disabled={disabled}
        onBlur={onBlur}
      >
        {(inputProps) => (
          <TextField {...inputProps} fullWidth variant="outlined" />
        )}
      </InputMask>
      {validator}
    </FormGroupContainer>
  );
};

export default CustomPhone;
