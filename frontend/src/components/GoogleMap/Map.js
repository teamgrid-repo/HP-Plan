import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import config from "../../config";
import PIN from "../../assets/images/pin1.png";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { setListingViaMap } from "../../redux/actions/ProviderSearch/ProviderSearchAction";

// const styles = require("./style.json");
// var pinIcon = new window.google.maps.MarkerImage(
//   PIN,
//   null /* size is determined at runtime */,
//   null /* origin is 0,0 */,
//   null /* anchor is bottom center of the scaled image */,
//   new window.google.maps.Size(40, 40)
// );
const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => {
    const map = useRef(null);
    const dispatch = useDispatch();
    const actions = bindActionCreators({ setListingViaMap }, dispatch);
    const dis = useSelector((state) => state.cat.dis);
    return (
      <GoogleMap
        zoom={
          localStorage.getItem("zoom")
            ? +localStorage.getItem("zoom")
            : props.zoom || 8
        }
        ref={map}
        onIdle={() => {
          if (
            props.marker &&
            props.marker.length &&
            window.location.href.includes("provider-search")
          ) {
            if (map.current.getBounds())
              actions.setListingViaMap(
                props.marker.filter((a) => {
                  if (map.current.getBounds().contains(a.marker)) return a;
                })
              );
            if (map.current.getCenter() && map.current.getCenter().lat()) {
              localStorage.setItem("lat", +map.current.getCenter().lat());
              localStorage.setItem("lng", +map.current.getCenter().lng());
              localStorage.setItem("zoom", map.current.getZoom());
            }
          }
        }}
        fitBounds={() => {}}
        center={
          dis && window.location.href.includes("provider-search")
            ? { lat: dis.lat, lng: dis.lang }
            : props.isState &&
              window.location.href.includes("provider-search") &&
              props.marker &&
              props.marker.length
            ? props.onlyPins
              ? props.marker[0]
              : props.marker[0].marker
            : window.location.href.includes("provider-search") &&
              localStorage.getItem("lat") &&
              localStorage.getItem("lng")
            ? {
                lat: +localStorage.getItem("lat"),
                lng: +localStorage.getItem("lng"),
              }
            : props.singleMarker
            ? props.marker
              ? props.marker
              : { lat: 37.007828, lng: -89.184265 }
            : props.marker && props.marker.length
            ? props.onlyPins
              ? props.marker[0]
              : props.marker[0].marker
            : { lat: 37.007828, lng: -89.184265 }
        }
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          zoomControl: true,
          zoomControlOptions: { position: 9 }, // zoom
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          minZoom: 1,
          maxZoom: 15,
          restriction: {
            latLngBounds: {
              north: 85,
              south: -85,
              west: -180,
              east: 180,
            },
            strictBounds: true,
          },
          //styles: styles, // change default map styles
        }}
      >
        {!props.direction && props.singleMarker && props.marker ? (
          <Marker position={props.marker} icon={PIN} />
        ) : props.marker && props.marker.length ? (
          props.marker.map((m, id) => {
            return (
              !m?.homeVisit &&
              !m.virtual && (
                <Marker
                  icon={PIN}
                  key={id}
                  position={props.onlyPins ? m : m.marker}
                  onClick={() => (props.onlyPins ? null : props.selData(m))}
                />
              )
            );
          })
        ) : null}
        {props.direction && props.directionData && (
          <DirectionsRenderer
            directions={props.directionData}
            defaultOptions={{ markerOptions: { icon: PIN } }}
            options={{ markerOptions: { icon: PIN } }}
          />
        )}
      </GoogleMap>
    );
  })
);
const url = `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&libraries=places&maptype=roadmap`;
const MyMap = (props) => {
  return (
    <MapWithAMarker
      googleMapURL={url}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={
        <div
          style={{
            height: `${props.size}`,
            borderRadius: "10px",
            zIndex: "20",
          }}
        />
      }
      mapElement={<div style={{ height: `100%`, borderRadius: "10px" }} />}
      marker={props.marker}
      selData={props.selData}
      singleMarker={props.singleMarker}
      directionData={props.directionData}
      direction={props.direction}
      onlyPins={props.onlyPins || false}
      zoom={props.zoom || 8}
      isState={props.isState}
    />
  );
};

export default MyMap;
