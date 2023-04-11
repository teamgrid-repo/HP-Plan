import axios from "axios";
import { logout } from "../actions/auth/authActions";
import { store } from "../store/index";

import mainUrl from "../../config";

export const api = async (endpoint, data, type, cancelToken = "") => {
  let response;

  const ud =
    (localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user"))) ||
    "";
  let token;
  if (ud && ud.token) {
    if (
      endpoint === "cure_subcategories" ||
      endpoint === "filter-provider" ||
      endpoint === "special-qualification" ||
      endpoint === "get-all_stateLoc" ||
      endpoint === "unique-states" ||
      endpoint === "create-feedBack" ||
      endpoint === "contact" ||
      endpoint === "siteImage" ||
      endpoint === "email-quiz" ||
      endpoint === "user-stateLoc" ||
      (endpoint === "cms" && type === "get") ||
      (endpoint === "claimSite" && type === "post") ||
      (endpoint.includes("get-organisation") &&
        !endpoint.includes("admin-get-organisation"))
    ) {
      token = "HJI-C18185B0-E889-47BB-9371-8D1D51E68362";
    } else token = ud.token;
  } else if (
    endpoint === "siteImage" ||
    endpoint === "cure_subcategories" ||
    endpoint === "filter-provider" ||
    endpoint === "unique-states" ||
    endpoint.includes("get-organisation") ||
    endpoint === "get-all_stateLoc" ||
    endpoint === "special-qualification" ||
    endpoint === "create-feedBack" ||
    endpoint === "contact" ||
    endpoint === "email-quiz" ||
    endpoint.includes("acceptTerms") ||
    endpoint === "user-stateLoc" ||
    (endpoint === "cms" && type === "get") ||
    (endpoint === "claimSite" && type === "post")
  ) {
    token = "HJI-C18185B0-E889-47BB-9371-8D1D51E68362";
  }
  let headers = { "Content-Type": "application/json" };
  try {
    switch (type) {
      case "post":
        headers["authorization"] = token;
        response = await axios.post(
          `${mainUrl.mainUrl}/${endpoint}`,
          { ...data },
          {
            headers,
            cancelToken: cancelToken,
          }
        );
        break;
      case "postWithoutToken":
        response = await axios
          .post(`${mainUrl.mainUrl}/${endpoint}`, { ...data }, { headers })
          .catch((error) => error.response);
        break;
      case "postMultipart":
        headers["Content-Type"] = "multipart/form-data";
        headers["authorization"] = token;
        response = await axios.post(`${mainUrl.mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;

      case "putMultipart":
        headers["Content-Type"] = "multipart/form-data";
        headers["authorization"] = token;
        response = await axios.put(`${mainUrl.mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case "get":
        headers["authorization"] = token;
        response = await axios.get(`${mainUrl.mainUrl}/${endpoint}`, {
          headers,
          cancelToken: cancelToken,
        });
        break;
      case "put":
        headers["authorization"] = token;
        response = await axios.put(`${mainUrl.mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case "patch":
        headers["authorization"] = token;
        response = await axios.patch(`${mainUrl.mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case "delete":
        headers["authorization"] = token;
        response = await axios.delete(`${mainUrl.mainUrl}/${endpoint}`, {
          data,
          headers,
        });
        break;
      default:
        return true;
    }
  } catch (error) {
    if (error && error.response) {
      if (error.response.status === 400) {
        //  history.replace('/login')
      }
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 503
      ) {
        await store.dispatch(logout());

        response = error.response;
      } else {
        response = error.response;
      }
    } else {
      response = { code: 200, success: true };
    }
  }
  return (response && response.data) || response;
};
