import FormGroupContainer from "./FormGroupContainer";
import Select from "react-select";

const styles = {
  control: (base) => ({
    ...base,
    minHeight: 56,
    zindex: 99999,
  }),
  menu: (base) => ({ ...base, zIndex: 9999, position: "" }),
};
const CustomReactSelect = ({
  label,
  onChange,
  value,
  onBlur,
  validator,
  options,
  required = false,
  disabled = false,
  isMulti = false,
  oldData = false,
}) => {
  return (
    <FormGroupContainer required={required} label={label} oldData={oldData}>
      <Select
        isMulti={isMulti}
        name={label}
        options={options}
        isDisabled={disabled}
        onBlur={onBlur}
        placeholder={label}
        onChange={(e) => onChange(e)}
        value={value}
        styles={styles}
      />
      {validator}
    </FormGroupContainer>
  );
};

export default CustomReactSelect;
