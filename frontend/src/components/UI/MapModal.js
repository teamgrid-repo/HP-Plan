import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import MyMap from "../GoogleMap/Map";
import CustomButton from "./CustomButton";

const MapModal = (props) => {
  const [direction, setDirection] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    let u = `https://www.google.com/maps/dir/?api=1&`;

    if (props.myLocation) {
      u = u + `origin=${props.myLocation.lat},${props.myLocation.lng}`;
      if (props.marker) {
        u = u + `&destination=${props.marker.lat},${props.marker.lng}`;
      }
    } else if (props.marker) {
      u = u + `origin=${props.marker.lat},${props.marker.lng}`;
    }
    setUrl(() => u);
    if (props.myLocation && props.marker) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: props.myLocation,
          destination: props.marker,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirection(result);
          } else {
            console.error(result);
          }
        }
      );
    } else {
      setDirection("");
    }
  }, [props]);
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xl"
      style={{
        textAlign: "center",
        fontFamily: "Montserrat",
        margin: "16px",
        borderRadius: "8px",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fafafb",
        }}
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
          {" "}
          Directions to Provider
        </div>
        <CustomButton
          varient="contained"
          name="Open Maps"
          onclick={() => window.open(url)}
        />
      </DialogTitle>
      <Divider />

      <DialogContent>
        <MyMap
          size="460px"
          singleMarker={true}
          marker={props.marker}
          direction={direction ? true : false}
          directionData={direction}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
