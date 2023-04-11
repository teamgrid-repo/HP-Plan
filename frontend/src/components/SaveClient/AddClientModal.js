import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import CustomButton from "../UI/CustomButton";

const AddClientModal = ({ open, handleClose, data, addToClient }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      style={{
        textAlign: "center",
        fontFamily: "Montserrat",
        margin: "16px",
        borderRadius: "8px",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div
          style={{
            fontFamily: "Montserrat",
            fontSize: "22px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "0.1px",
            textAlign: "left",
            color: "#92929d",
          }}
        >
          Add Client From Appointment
        </div>
      </DialogTitle>
      <Divider />
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        <Stack direction={"column"} margin={"10px"}>
          {data && data.length ? (
            data.map((d) => (
              <div
                key={d._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid grey",
                  padding: "5px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    {d.name || "-"}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    {d.email || "-"}
                  </div>
                </div>
                <CustomButton
                  name="add"
                  varient="contained"
                  onclick={() => addToClient(d._id)}
                />
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 600,
                margin: "auto",
              }}
            >
              No clients to add!
            </div>
          )}
        </Stack>
      </div>
    </Dialog>
  );
};

export default AddClientModal;
