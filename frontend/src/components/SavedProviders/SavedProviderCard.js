import { useNavigate } from "react-router";
import CustomButton from "../UI/CustomButton";

const SavedProviderCard = ({ classes, data, openModal }) => {
  const loc = useNavigate();
  return (
    <div className={classes.btnContainer}>
      <CustomButton
        varient="contained"
        className={classes.contactProviderButton}
        name="View Provider"
        onclick={() =>
          loc(`/provider-details/${data.organisationId},${data.siteId}`)
        }
      />
      <CustomButton
        varient="outlined"
        className={classes.directionProviderButton}
        name="Get Directions"
        onclick={() => openModal(data.siteDetails)}
      />
    </div>
  );
};

export default SavedProviderCard;
