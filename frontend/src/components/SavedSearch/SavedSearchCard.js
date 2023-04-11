import CustomButton from "../UI/CustomButton";

const SavedSearchCard = ({ classes, onDelete, onOpen, onShare }) => {
  return (
    <div className={classes.btnContainer}>
      <CustomButton
        varient="contained"
        className={classes.contactProviderButton}
        name="Open Search"
        onclick={onOpen}
      />
      <CustomButton
        varient="outlined"
        className={classes.directionProviderButton}
        name="Share"
        onclick={onShare}
      />
      <CustomButton
        varient="text"
        className={classes.directionProviderButton}
        name="Delete"
        onclick={onDelete}
      />
    </div>
  );
};

export default SavedSearchCard;
