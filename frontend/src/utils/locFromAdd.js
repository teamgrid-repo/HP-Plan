import Axios from "axios";
import { api } from "../redux/api/api";

const geocoder = new window.google.maps.Geocoder();
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const getStateFromAdd = (arr) => {
  let f = "";
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].types &&
      arr[i].types.find((a) => a === "political") &&
      !arr[i].types.find((a) => a === "country")
    ) {
      f = arr[i].short_name;
    }
  }
  return f;
};
export async function locFromAdd(page) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      const add = await geocoder.geocode({ location: { lng, lat } });
      let ip = "";

      try {
        const d = await Axios.get("https://api.ipify.org?format=json");
        ip = d.data.ip;
      } catch (error) {}
      if (add && add.results[0] && add.results[0].address_components) {
        const state = getStateFromAdd(add.results[0].address_components);
        if (state) {
          const data = {
            ipAddress: ip,
            state: state,
            page: page,
          };
          api(`user-stateLoc`, data, "post");
        }
      }
    },
    (e) => {
      console.log(e, "error");
    },
    options
  );
}
