import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  searchMsg,
  setResetSearch,
} from "../../redux/actions/messages/MessagesActions";

const useStyle = makeStyles((theme) => ({
  pluseIcon: {
    height: "18px",
    width: "18px",
    marginRight: "2px",
    marginTop: "2px",
  },
  pluseButtonContainer: {
    display: "inline-flex",
    fontSize: "14px",
    fontWeight: 600,
  },
  headerMsgDiv: {
    fontSize: "24px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.1px",
    textAlign: "center",
    color: "#171725",
  },
  leftHeaderDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
const ChatLeftHeader = () => {
  const classes = useStyle();
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const action = bindActionCreators({ searchMsg, setResetSearch }, dispatch);

  useEffect(() => {
    action.searchMsg(search);
    if (search) {
      action.setResetSearch(false);
    } else {
      action.setResetSearch(true);
    }
  }, [search]);

  return (
    <Grid item lg={12} md={12} sm={12} xs={12} marginBottom={2}>
      <div className={classes.leftHeaderDiv}>
        <div className={classes.headerMsgDiv}>Message</div>
        {/* <CustomButton
          varient="contained"
          name={
            <div className={classes.pluseButtonContainer}>
              <img src={Pluse} className={classes.pluseIcon} />
              New
            </div>
          }
        /> */}
      </div>
      <TextField
        type="text"
        variant="outlined"
        fullWidth
        placeholder="Search Messages"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <IconButton
        //         disabled={search ? false : true}
        //         onClick={() => action.setNextSearch(true)}
        //       >
        //         <ArrowDropDownIcon fontSize="large" />
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      />
    </Grid>
  );
};

export default ChatLeftHeader;
