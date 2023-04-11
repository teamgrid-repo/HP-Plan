import { Tab, Tabs } from "@mui/material";
import { PublicLandingNav } from "../../utils/NavBarConstant";
const NavTabs = (props) => {
  return (
    <Tabs
      value={props.tabActive}
      className={props.classes.tabContainer}
      TabIndicatorProps={{ style: { background: "white" } }}
      onChange={props.handleTabChange}
    >
      {PublicLandingNav.map((a, idx) => (
        <Tab
          key={idx}
          label={a.name}
          className={props.classes.tab}
          onClick={() => props.shistory(a.path)}
          value={a.path}
        />
      ))}
    </Tabs>
  );
};

export default NavTabs;
