import { MenuItem, Select, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  printList: {
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#7dbaaf",
    margin: "auto",
    marginLeft: "5px",
    marginTop: "10px",
  },
  header: {
    fontSize: "28px",
    fontWeight: 600,
  },
  sortContainer: {
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
  },
  sortLabel: {
    fontSize: "14px",
    color: "#696974",
    paddingTop: "10px",
    paddingRight: "10px",
  },
}));

const ListingHeader = ({ headerName, print, changeOrder = () => {} }) => {
  const classes = useStyle();

  const [order, setOrder] = useState("de");
  const handleOrd = (e) => {
    setOrder(e);
    changeOrder(e);
  };

  return (
    <Stack direction="row" marginBottom={2} justifyContent="space-between">
      <div className={classes.header}>{headerName}</div>
      {print && <div className={classes.printList}>Print List</div>}
      <div className={classes.sortContainer}>
        <div className={classes.sortLabel}>Sort by:</div>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={order}
          size="small"
          variant="standard"
          onChange={(e) => handleOrd(e.target.value)}
        >
          <MenuItem value="de">
            <em>Default</em>
          </MenuItem>
          <MenuItem value={"pending"}>Pending</MenuItem>
          <MenuItem value={"cancelled"}>Canceled</MenuItem>
          <MenuItem value={"approved"}>Approved</MenuItem>
        </Select>
      </div>
    </Stack>
  );
};

export default ListingHeader;
