import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getSaveQuiz,
  deleteSaveQuiz,
} from "../../redux/actions/Provider/ProviderActions";
import SavedSearchListingCard from "./SaveQuizListingCard";
import ListingComponent from "../UI/ListingComponent";
import ListingHeader from "../UI/ListingHeader";
import SavedSearchCard from "./SaveQuizCard";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
const SaveQuizComponent = () => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const action = bindActionCreators(
    {
      getSaveQuiz,
      deleteSaveQuiz,
    },
    dispatch
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await action.getSaveQuiz(ctc.getToken());
    if (res && res.length) {
      setData(() => res);
      setOldData(() => res);
    } else {
      setData(() => []);
      setOldData(() => []);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
    return () => ctc.cancelTheApi();
  }, []);

  const onOpen = (url) => {
    window.open(`${config.url}quiz-result?${url}`);
  };
  const onShare = (url) => {
    navigator.clipboard.writeText(`${config.url}quiz-result?${url}`);
    toast.success("url copied!");
  };

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const onDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await action.deleteSaveQuiz(delId);
      await getData();
      setDelId("");
    }
    setLoading(false);
  };
  const changeOrder = (o) => {
    if (oldData) {
      if (o !== "de") {
        const data1 = [...data];
        if (o === 1) {
          data1.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          data1.sort((a, b) => a.name.localeCompare(b.name));
        }
        setData(data1);
      } else {
        setData(() => oldData);
      }
    }
  };
  return (
    <ListingComponent>
      <ListingHeader
        headerName="Saved Quizzes"
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              No saved quiz data found!
            </Grid>
          )}
        </Grid>
      )}
      <DeleteConfirmation
        open={deleteModal}
        title="Quiz Result"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => onDelete()}
      />
    </ListingComponent>
  );
};

export default SaveQuizComponent;
