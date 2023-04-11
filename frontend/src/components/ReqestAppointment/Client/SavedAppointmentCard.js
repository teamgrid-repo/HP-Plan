import { useNavigate } from "react-router";
import CustomButton from "../../UI/CustomButton";
const AppointmentCard = ({
  classes,
  status,
  date,
  organisationId,
  siteId,
  openModal,
  subId,
}) => {
  const loc = useNavigate();
  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <div className={classes[status]}>
          {status === "cancelled" ? "canceled" : status}
        </div>

        <div>
          <div className={classes.monthDiv}>
            {new Date(date).toLocaleString("en-us", { month: "short" })}
          </div>
          <div className={classes.dateDiv}>{new Date(date).getDate()}</div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <CustomButton
          varient="contained"
          className={classes.contactProviderButton}
          name="Contact Provider"
          onclick={() =>
            loc(`/provider-details/${organisationId},${siteId},${subId}`)
          }
        />
        <CustomButton
          varient="outlined"
          className={classes.directionProviderButton}
          name="Get Directions"
          onclick={() => openModal()}
        />
      </div>
    </div>
  );
};

export default AppointmentCard;
