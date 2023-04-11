import axios from "axios";

class CancelToken {
  token = "";
  constructor() {
    this.token = "";
  }
  createToken() {
    try {
      const t = axios.CancelToken;
      this.token = t.source();
    } catch (error) {
      console.log(error);
    }
  }
  getToken() {
    if (this.token) {
      return this.token.token || "";
    } else return "";
  }
  cancelTheApi() {
    if (this.token) {
      this.token.cancel();
      this.clearToken();
    }
  }
  clearToken() {
    this.token = "";
  }
}
export default CancelToken;
