import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@mui/styles";
import {
  getAllList,
  deleteList,
} from "../../redux/actions/Provider/ProviderActions";
import { DeleteForever } from "@mui/icons-material";
import ListingComponent from "../UI/ListingComponent";
import HeaderComponent from "./HeaderComponent";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../UI/DeleteConfirmation";
import LoadingComponent from "../UI/LoadingComponent";

const SavedProviderListComponent = () => {
  const loc = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const action = bindActionCreators({ getAllList, deleteList }, dispatch);
  const sp = useSelector((state) => state.provider.saveProviders);
  const get = async () => {
    setLoading(true);
    await action.getAllList();
    setLoading(false);
  };

  const loadData = () => {
    if (sp) {
      setData(sp);
    }
  };
  useEffect(() => {
    loadData();
  }, [sp]);

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const deleteL = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await action.deleteList(delId);
      await action.getAllList();
    }
    setLoading(false);
  };
  //providerInfo
  useEffect(() => {
    get();
  }, []);
  const changeOrder = (o) => {
    if (sp) {
      if (o !== "de") {
        const data1 = [...data];
        if (o === 1) {
          data1.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          data1.sort((a, b) => b.name.localeCompare(a.name));
        }
        setData(data1);
      } else {
        setData(sp);
      }
    }
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <ListingComponent>
      <HeaderComponent edit={false} changeOrder={(o) => changeOrder(o)} />
      <Grid container spacing={2} mt={5}>
        {data && data.length ? (
          data.map((p) => (
            <Grid item lg={12} md={12} sm={12} xs={12} key={p._id}>
              <div
                style={{
                  height: "170px",
                  borderRadius: "10px",
                  border: "solid 1px #fff",
                  backgroundColor: "#fff",
                  padding: "20px 30px 20px 30px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "18px",
                      fontWeight: 600,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "normal",
                      letterSpacing: "normal",
                      textAlign: "left",
                      color: "#171725",
                      cursor: "pointer",
                    }}
                    onClick={() => loc(`/my-providers/${p._id}`)}
                  >
                    {p.name} ({p.directoryItems.length} Results)
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginLeft: "5px",
                        marginTop: "10px",
                      }}
                    >
                      {p.directoryItems && p.directoryItems.length
                        ? p.directoryItems.map(
                            (a, id) =>
                              id < 2 && (
                                <div
                                  style={{
                                    fontFamily: "Montserrat",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    fontStretch: "normal",
                                    fontStyle: "normal",
                                    lineHeight: "normal",
                                    letterSpacing: "normal",
                                    textAlign: "left",
                                    color: "#7dbaaf",
                                  }}
                                  key={a._id}
                                >
                                  {(a.siteDetails && a.siteDetails.name) || ""}
                                </div>
                              )
                          )
                        : null}
                    </div>
                  </div>
                  <div onClick={() => handleDeleteModalOpen(p._id)}>
                    <DeleteForever
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <Grid item lg={12} md={12} xs={12} sm={12} textAlign={"center"}>
            No Saved Provider List Found!
          </Grid>
        )}
      </Grid>

      <DeleteConfirmation
        open={deleteModal}
        title="Provider List"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => deleteL()}
      />
    </ListingComponent>
  );
};

export default SavedProviderListComponent;
