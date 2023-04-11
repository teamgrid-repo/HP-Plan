import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllList,
  createProviderList,
} from "../../redux/actions/Provider/ProviderActions";
import CustomButton from "../UI/CustomButton";
import ModalLoading from "../UI/ModalLoading";

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
    cursor: "pointer",
  },
  header: {
    fontSize: "28px",
    fontWeight: 600,
    marginRight: "20px",
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

const HeaderComponent = ({
  print,
  edit,
  oldName,
  changeOrder,
  handlePrint = () => {},
}) => {
  const classes = useStyle();

  const [name, setName] = useState("");
  const [order, setOrder] = useState("de");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const action = bindActionCreators(
    { getAllList, createProviderList },
    dispatch
  );
  const handleOrd = (e) => {
    setOrder(e);
    changeOrder(e);
  };
  useEffect(() => {
    if (oldName) {
      setName(oldName);
    }
  }, [oldName]);

  const addUpdate = async () => {
    if (name) {
      setLoading(true);
      if (edit) {
        const data = {
          listingName: oldName,
          update: true,
          updatedName: name,
        };
        await action.createProviderList(data);
      } else {
        const data = {
          listingName: name,
          update: false,
          updatedName: "",
        };
        await action.createProviderList(data);
        await action.getAllList();
        setName("");
      }
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="row"
      marginBottom={2}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <div style={{ display: "flex", maxHeight: "100px" }}>
        <div className={classes.header}>My Lists</div>
        {loading ? (
          <ModalLoading />
        ) : (
          <div>
            <TextField
              type="text"
              variant="outlined"
              value={name}
              placeholder={edit ? "Edit List Name:" : "New List"}
              onChange={(e) => setName(e.target.value)}
              size="small"
            />
            <CustomButton
              name={edit ? "Edit List" : "Add List"}
              varient="contained"
              size="large"
              classNameI="greyContained"
              onclick={() => addUpdate()}
            />
          </div>
        )}
      </div>

      {print && (
        <div className={classes.printList} onClick={() => handlePrint()}>
          Print List
        </div>
      )}
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
          <MenuItem value={0}>Ascending</MenuItem>
          <MenuItem value={1}>Descending</MenuItem>
        </Select>
      </div>
    </Stack>
  );
};

export default HeaderComponent;
