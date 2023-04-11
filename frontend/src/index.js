import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import theme from "./components/UI/Theme";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./assets/custom.scss";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./Auth";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer position="bottom-right" theme="colored" />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
