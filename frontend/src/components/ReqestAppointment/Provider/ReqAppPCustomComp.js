import CustomButton from "../../UI/CustomButton";
const AppointmentCard = ({ classes, status, changeStatus, handleOpenView }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <CustomButton
          varient="contained"
          className={classes.contactProviderButton}
          name="View Request"
          onclick={handleOpenView}
        />
        <CustomButton
          varient="outlined"
          className={classes.directionProviderButton}
          name="Accept Request"
          disabled={status !== "approved" ? false : true}
          onclick={() => changeStatus("approved")}
        />
        <CustomButton
          varient="text"
          className={classes.directionProviderButton}
          name="Reject Request"
          disabled={status !== "cancelled" ? false : true}
          onclick={() => changeStatus("cancelled")}
        />
      </div>
    </div>
  );
};

export default AppointmentCard;
