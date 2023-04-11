import { LocalHospitalOutlined } from "@mui/icons-material";
import { Card, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../UI/CustomButton";

const useStyle = makeStyles((theme) => ({
  card: {
    background: "white",
    width: "362px",
    height: "393px",
    borderRadius: "8px",
    margin: "0px 24px 10px 27px",
    padding: "10px",
    border: "solid 0.5px #e0e7fe",
    display: "inline-block",
  },
  img: {
    width: "100%",
    height: "240px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  nameContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  name: {
    fontSize: "24px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "0.2px",
    textAlign: "left",
    color: "#524f4f",
    margin: "auto",
    marginLeft: "0px",
  },
  count: {
    fontSize: "12px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.67,
    letterSpacing: "normal",
    color: "#7dbaaf",
    display: "flex",
    margin: "auto",
    marginRight: "0px",
  },
  btn: {
    height: "56px",
  },
}));

const LocationCard = ({ img, name, count, id, loc }) => {
  const classes = useStyle();
  return (
    <Card className={classes.card} key={id}>
      <Stack direction="column" gap="12px">
        <img src={img} className={classes.img} />
        <div className={classes.nameContainer}>
          <div className={classes.name}>{name}</div>
          <div className={classes.count}>
            <LocalHospitalOutlined fontSize="small" /> {count} Service Providers
          </div>
        </div>
        <CustomButton
          name="Start Search"
          varient="contained"
          className={classes.btn}
          onclick={() => loc(id)}
        />
      </Stack>
    </Card>
  );
};

export default LocationCard;
