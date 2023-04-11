import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import LoginForm from "../Login/LoginForm";

const LoginModal = (props) => {
  const handleCloseModal = () => {
    props.handleClose();
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="md"
      style={{ textAlign: "center", fontFamily: "Montserrat" }}
    >
      <DialogContent>
        <LoginForm page={false} close={() => handleCloseModal()} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
