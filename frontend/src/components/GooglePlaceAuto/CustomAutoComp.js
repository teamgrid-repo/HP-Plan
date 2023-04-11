import { TextField } from "@mui/material";
// import { usePlacesWidget } from "react-google-autocomplete";
import { makeStyles } from "@mui/styles";
// import config from "../../config";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
const useStyle = makeStyles((theme) => ({
  formGroupContainer: {
    textAlign: "left !important",
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
}));
const CustomAutoComp = ({
  label,
  onBlur,
  validator,
  onSelect,
  value,
  onchange,
  required,
  disabled = false,
  oldData = false,
}) => {
  const classes = useStyle();
  // const grabAddress = async (p) => {
  //   const data = {
  //     location: {
  //       lat: p.geometry.location.lat(),
  //       lang: p.geometry.location.lng(),
  //     },
  //     address: p.formatted_address,
  //     city: p.address_components[0].long_name,
  //     state: p.address_components[2].short_name,
  //   };
  //   onSelect(data);
  // };
  // const { ref: materialRef } = usePlacesWidget({
  //   apiKey: config.mapApiKey,
  //   onPlaceSelected: (place) => grabAddress(place),
  //   options: {
  //     componentRestrictions: { country: "usa" },
  //   },
  // });

  // return required ? (
  //   <div className={classes.formGroupContainer}>
  //     <div className={classes.labelName}>{label} *</div>
  //     <TextField
  //       fullWidth
  //       color="secondary"
  //       variant="outlined"
  //       inputRef={materialRef}
  //       placeholder={label}
  //       onBlur={onBlur}
  //       disabled={disabled}
  //       // value={value}
  //       // onChange={(e) => onchange(e.target.value)}
  //     />
  //     {validator}
  //   </div>
  // ) : (
  //   <div className={classes.formGroupContainer}>
  //     <div className={classes.labelName}>{label}</div>
  //     <TextField
  //       fullWidth
  //       color="secondary"
  //       variant="outlined"
  //       inputRef={materialRef}
  //       value={value}
  //       onChange={(e) => onchange(e.target.value)}
  //       placeholder={label}
  //       disabled={disabled}
  //     />
  //   </div>
  // );
  const getCityFromAdd = (arr) => {
    let f = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].types && arr[i].types.find((a) => a === "locality")) {
        f = arr[i].long_name;
        break;
      }
    }
    return f;
  };
  const getStateFromAdd = (arr) => {
    let f = "";
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].types &&
        arr[i].types.find((a) => a === "political") &&
        !arr[i].types.find((a) => a === "country")
      ) {
        f = arr[i].short_name;
      }
    }
    return f;
  };
  const getPostalCode = (arr) => {
    let f = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].types && arr[i].types.find((a) => a === "postal_code")) {
        f = arr[i].long_name;
        break;
      }
    }
    return f;
  };
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        if (results[0]) {
          const p = results[0];
          const data = {
            location: {
              lat: p.geometry.location.lat(),
              lang: p.geometry.location.lng(),
            },
            address: p.formatted_address,
            city: getCityFromAdd(p.address_components),
            state: getStateFromAdd(p.address_components),
            zipcode: getPostalCode(p.address_components),
          };
          onSelect(data);
        }
      })
      .catch((error) => console.error("Error", error));
  };
  return (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>
        {label} {required ? "*" : ""}
        {oldData ? <span className={classes.redClass}>{oldData}</span> : null}
      </div>

      <PlacesAutocomplete
        debounce={500}
        searchOptions={{
          componentRestrictions: { country: "usa" },
        }}
        value={value}
        onChange={(e) => onchange(e)}
        onSelect={(e) => handleSelect(e)}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              {...getInputProps({
                placeholder: label,
                disabled: disabled,
                onBlur: onBlur,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.index}
                  >
                    <span
                      style={{
                        position: "block",
                        padding: "10px",
                        paddingBottom: "20px",
                        lineHeight: 1.6,
                        width: "inherit",
                      }}
                    >
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {validator}
    </div>
  );
};

export default CustomAutoComp;
