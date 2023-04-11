import {
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PublicLandingNav } from "../../utils/NavBarConstant";

const NavDrawer = (props) => {
  return (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!props.iOS}
        disableDiscovery={props.iOS}
        open={props.openDrawer}
        onClose={props.setCloseDrawer}
        onOpen={props.setOpenDrawer}
        anchor="right"
        classes={{ paper: props.classes.drawer }}
      >
        <List>
          {PublicLandingNav.map((e, i) => (
            <ListItem
              key={i}
              divider
              button
              onClick={() => props.shistory(e.path)}
              selected={e.path === props.loc}
            >
              <ListItemText className={props.classes.drawerItem}>
                {e.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={props.setOpenDrawer}
        className={props.classes.drawerIconContainer}
      >
        <MenuIcon className={props.classes.drawerIcon} />
      </IconButton>
    </>
  );
};

export default NavDrawer;
