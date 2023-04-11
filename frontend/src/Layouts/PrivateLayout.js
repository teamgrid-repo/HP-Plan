import { Outlet } from "react-router";
import PrivateFooter from "./PrivateFooter";
import PrivateHeader from "./PrivateHeader";

const PrivateLayout = () => {
  return (
    <div>
      <PrivateHeader />
      <Outlet  />
      <PrivateFooter />
    </div>
  );
};

export default PrivateLayout;
