import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

const AdditionalResModal = (props) => {
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {
    setReadMore(false);
  }, [props]);
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="sm"
      style={{ textAlign: "center", fontFamily: "Montserrat" }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontSize: "26px",
          color: "#17589F",
          fontWeight: 600,
        }}
      >
        GOING TO ADDITIONAL RESOURCES SEARCH
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ color: "black", fontWeight: 500 }}
        >
          Resources listed in this “additional resources” directory are not part
          of the Her PLAN network and are not reviewed to determine consistency
          with Her PLAN standards. Her PLAN does not necessarily endorse these
          sites or the products, content, materials, or information presented or
          made available within them.{" "}
          {readMore ? (
            <br />
          ) : (
            <span
              onClick={() => setReadMore(true)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              read more
            </span>
          )}
          {readMore ? (
            <>
               “Additional Resources” provides links to and information about
              third parties (including websites), owned and operated by
              independent parties over which Her PLAN has no control
              ("Third-Parties)"). HER PLAN DOES NOT ENDORSE OR APPROVE AND MAKES
              NO WARRANTIES, REPRESENTATIONS, OR UNDERTAKINGS RELATING TO THE
              PRODUCTS, CONTENT, MATERIALS, OPINIONS, OR OTHER INFORMATION MADE
              AVAILABLE BY OR ABOUT THIRD-PARTIES, OR RELATING TO ANY SERVICES
              PROVIDED BY SUCH THIRD PARTIES.  In addition to the terms stated
              in Her PLAN’S Terms of Use, Her PLAN disclaims liability for any
              loss, damage, cost and any other consequence resulting directly or
              indirectly from or relating to your access to the Third-Party
              Websites or any information made available by or about
              Third-Parties, or any information that you may provide or any
              transaction conducted on or via a Third-Party Website or the
              failure of any information, goods or services posted or offered at
              the Third-Party Website or any error, omission, or
              misrepresentation on the Third-Party Website or any computer virus
              arising from or system failure associated with the Third-Party
              Website, or resulting directly or indirectly from or relating to
              any services, products, content, materials, opinions, and/or other
              information provided by the applicable third party. By clicking
              "Proceed", you will be confirming that you have read and agreed to
              the terms herein and in Her PLAN’S Terms of Use.
            </>
          ) : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <CustomButton
          name="Continue to Additional Resources"
          varient="contained"
          size="large"
          styled={{
            fontSize: "18px",
            backgroundColor: "#17589F",
            fontWeight: 600,
          }}
          onclick={() => props.openRes()}
        />
        <CustomButton
          name="Cancel"
          size="large"
          styled={{
            fontSize: "18px",
            color: "#17589F",
            fontWeight: 600,
          }}
          onclick={() => props.handleClose()}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AdditionalResModal;
