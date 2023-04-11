import { Search } from "@mui/icons-material";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
// import FilterIcon from "../../assets/icons/Filter.svg";
import PluseIcon from "../../assets/icons/ic_Plus.svg";
import { getAllAppointment } from "../../redux/actions/appointment/appointmentActions";
import {
  getClients,
  deleteClient,
  addClient,
  getClientsByname,
} from "../../redux/actions/client/clientActions";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import CancelToken from "../../utils/cancelClass";
import DeleteConfirmation from "../UI/DeleteConfirmation";
import LoadingComponent from "../UI/LoadingComponent";
import AddClientModal from "./AddClientModal";
import SaveCard from "./SaveCard";
const ctc = new CancelToken();
const useStyle = makeStyles((theme) => ({
  clientContainer: {
    paddingTop: "8em",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    fontFamily: "Montserrat",
  },
  cardContainer: {
    borderRadius: "20px",
    backgroundColor: "#fff",
    height: "355px",
    textAlign: "center",
  },
  cardHeader: { paddingTop: "30px", paddingBottom: "30px" },
  cardAvatar: {
    width: "80px",
    margin: "auto",
    height: "80px",
  },
  cardHeaderTitle: {
    paddingTop: "15px",
    paddingBottom: "7px",
    fontSize: "18px",
    fontWeight: 600,
    color: "#171725",
  },
  cardSubTitle: { color: "#92929d", fontSize: "14px" },
  cardContentTitle: {
    fontSize: "12px",
    color: "#d5d5dc",
    paddingBottom: "5px",
  },
  cardContentSubTitle: { color: "#171725", fontSize: "18px", fontWeight: 600 },
  messageButton: {
    borderRadius: "5px",
    backgroundColor: "#7dbaaf",
    textTransform: "none",
  },
  meetingButton: {
    borderRadius: "5px",
    borderColor: "#7dbaaf",
    textTransform: "none",
    color: "#7dbaaf",
  },
}));

const SaveClient = () => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cu, setCu] = useState("");
  const [apData, setApData] = useState([]);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const debouncedSave = useCallback(
    debounce((k) => (k ? getByName(k) : getData()), 1000),
    []
  );
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      getClients,
      deleteClient,
      addClient,
      getIdRole,
      getAllAppointment,
      getClientsByname,
    },
    dispatch
  );

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };

  const removeClient = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await actions.deleteClient(delId);
      await getData();
      setDelId("");
    }
    setLoading(false);
  };
  const getByName = async (k) => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getClientsByname(k, ctc.getToken());
    if (res && res.length) {
      setData(() => res);
    } else {
      setData(() => []);
    }
    setLoading(false);
  };
  const getData = async () => {
    setLoading(() => true);
    ctc.createToken();
    const res = await actions.getClients(ctc.getToken());
    if (res && res.length) {
      setData(() => res);
    } else {
      setData(() => []);
    }
    setLoading(() => false);
    ctc.createToken();
    const res2 = await actions.getAllAppointment(ctc.getToken());
    if (res2 && res2.length) {
      const notInObj = {};
      for (let i = 0; i < res2.length; i++) {
        if (res2[i].profileData && res2[i].clientData) {
          notInObj[res2[i].profileData._id] = {
            ...res2[i].clientData,
          };
        }
      }
      const oA = Object.values(notInObj);
      const notIn = [];
      if (res && res.length) {
        for (let j = 0; j < oA.length; j++) {
          if (res.find((a) => a.userId && a.userId._id === oA[j]._id)) {
          } else {
            notIn.push(oA[j]);
          }
        }
      } else {
        notIn.push(...oA);
      }
      setApData(() => notIn);
    } else {
      setApData(() => []);
    }
  };
  const addToClient = async (id) => {
    setOpen(() => false);
    setLoading(() => true);
    await actions.addClient(id);
    await getData();
    setLoading(() => false);
  };
  useEffect(() => {
    const u = actions.getIdRole();
    setCu(() => u);
    getData();
    return () => ctc.cancelTheApi();
  }, []);

  const handleKSearch = (k) => {
    debouncedSave(k);
    setKeyword(k);
  };

  return (
    <div style={{ background: "#fafafb" }}>
      <div className={classes.clientContainer}>
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ marginBottom: "50px" }}
        >
          <div>
            <Search style={{ marginTop: "4px", marginRight: "3px" }} />
            <TextField
              variant="standard"
              placeholder="search client"
              value={keyword}
              onChange={(e) => handleKSearch(e.target.value)}
            />
          </div>
          <div>
            {/* <ButtonBase
              style={{
                background: "white",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <img src={FilterIcon} />
            </ButtonBase> */}
            <Button
              variant="contained"
              style={{
                marginLeft: "15px",
                borderRadius: "10px",
                backgroundColor: "#7dbaaf",
              }}
              onClick={() => setOpen(true)}
            >
              <img
                src={PluseIcon}
                height={18}
                width={18}
                style={{ paddingRight: "10px" }}
              />{" "}
              Add Client
            </Button>
          </div>
        </Stack>
        {loading ? (
          <LoadingComponent />
        ) : (
          <Grid container spacing={8}>
            {data && data.length ? (
              data.map((e) => (
                <SaveCard
                  classes={classes}
                  data={e}
                  key={e._id}
                  cu={cu}
                  removeClient={(id) => handleDeleteModalOpen(id)}
                />
              ))
            ) : (
              <Grid item lg={12} md={12} xs={12} sm={12} textAlign={"center"}>
                No client found!
              </Grid>
            )}
          </Grid>
        )}
      </div>
      <AddClientModal
        open={open}
        handleClose={() => setOpen(false)}
        data={apData}
        addToClient={(id) => addToClient(id)}
      />
      <DeleteConfirmation
        open={deleteModal}
        title="Client"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => removeClient()}
      />
    </div>
  );
};

export default SaveClient;
