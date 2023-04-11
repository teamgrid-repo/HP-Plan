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
}));

const FormGroupContainer = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.formGroupContainer}>
      <div className={classes.labelName}>
        {props.label} {props.required && "*"}
        {props.oldData ? (
          <span
            style={{
              marginLeft: "5px",
              color: "red",
              fontWeight: 500,
              fontSize: "18px !important",
              fontFamily: "Montserrat",
            }}
          >
            {props.oldData
              ? props.oldData.reduce((a, b) => a + `${a ? ", " : ""}` + b, "")
              : "-"}
          </span>
        ) : null}
      </div>
      {props.children}
    </div>
  );
};

export default FormGroupContainer;
