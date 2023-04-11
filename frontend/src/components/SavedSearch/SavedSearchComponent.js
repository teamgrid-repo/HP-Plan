import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getSaveShareProvider,
  deleteShareItem,
} from "../../redux/actions/Provider/ProviderActions";
import SavedSearchListingCard from "./SavedSearchListingCard";
import ListingComponent from "../UI/ListingComponent";
import ListingHeader from "../UI/ListingHeader";
import SavedSearchCard from "./SavedSearchCard";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../../config";
import { toast } from "react-toastify";
import DeleteConfirmation from "../UI/DeleteConfirmation";
import LoadingComponent from "../UI/LoadingComponent";
import CancelToken from "../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  directionProviderButton: {
    width: "164px",
  },
  contactProviderButton: {
    width: "164px",
  },
  btnContainer: {
    marginTop: "30px",
    marginBottom: "20px",
    marginLeft: "auto",
    maxWidth: "180px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}));
const SavedSearchComponent = () => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const action = bindActionCreators(
    { getSaveShareProvider, deleteShareItem },
    dispatch
  );
  const shareRes = useSelector((state) => state.provider.shareProviderList);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    await action.getSaveShareProvider(ctc.getToken());
    setLoading(false);
  };
  const loadData = () => {
    setData(() => shareRes);
  };
  useEffect(() => {
    getData();
    return () => ctc.cancelTheApi();
  }, []);
  useEffect(() => {
    if (shareRes) loadData();
  }, [shareRes]);

  const onOpen = (url) => {
    window.open(`${config.url}provider-search?${url}`);
  };
  const onShare = (url) => {
    navigator.clipboard.writeText(`${config.url}provider-search?${url}`);
    toast.success("url copied!");
  };
  const onDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await action.deleteShareItem(delId);
      await action.getSaveShareProvider();
      setDelId("");
    }
    setLoading(false);
  };
  const changeOrder = (o) => {
    if (shareRes) {
      if (o !== "de") {
        const data1 = [...data];
        if (o === 1) {
          data1.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          data1.sort((a, b) => a.name.localeCompare(b.name));
        }
        setData(data1);
      } else {
        setData(() => shareRes);
      }
    }
  };
  return (
    <ListingComponent>
      <ListingHeader
        headerName="Saved Searches"
        changeOrder={(o) => changeOrder(o)}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={2}>
          {data && data.length ? (
            data.map((e) => (
              <SavedSearchListingCard
                name={e.name}
                count={e.count}
                id={e._id}
                CutomComponent={
                  <SavedSearchCard
                    classes={classes}
                    onDelete={() => handleDeleteModalOpen(e._id)}
                    onShare={() => onShare(e.url)}
                    onOpen={() => onOpen(e.url)}
                  />
                }
              />
            ))
          ) : (
            <Grid item lg={12} md={12} xs={12} sm={12} textAlign={"center"}>
              No saved searches found !
            </Grid>
          )}
        </Grid>
      )}
      <DeleteConfirmation
        open={deleteModal}
        title="Search"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => onDelete()}
      />
    </ListingComponent>
  );
};

export default SavedSearchComponent;
