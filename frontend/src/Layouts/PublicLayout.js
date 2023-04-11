import { Outlet } from "react-router";
import Footer from "./PrivateFooter";
import Header from "./Header";

const PublicLayout = (props) => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
