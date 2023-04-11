import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../UI/CustomButton";
import SiteModal from "../../UI/SiteModal";
import { bindActionCreators } from "redux";
import {
  deleteSiteLoc,
  getIdRole,
} from "../../../redux/actions/profile/profileActions";
import ViewSiteDataModal from "../../UI/ViewSiteDataModal";
import FilterModal from "../../UI/FilterModal";
import { getAdminOrgSite } from "../../../redux/actions/Admin/AdminActions";
import DeleteConfirmation from "../../UI/DeleteConfirmation";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const ProviderSiteTab = ({ selCat, orgId }) => {
  const [editF, setEditF] = useState(false);
  const [editD, setEditD] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewF, setViewF] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const siteData = useSelector((state) => state.admin.orgSite);

  useEffect(() => {
    return () => ctc.cancelTheApi();
  }, [siteData, selCat, orgId]);
  const action = bindActionCreators(
    {
      getAdminOrgSite,
      deleteSiteLoc,
      getIdRole,
    },
    dispatch
  );

  const handleView = (s) => {
    setEditD(() => s);
    setViewF(() => true);
  };

  const handleEdit = (s) => {
    setViewF(() => false);
    setEditD(() => s);
    setEditF(() => true);
    handleModal();
  };

  const handleFilter = (s) => {
    setViewF(() => false);
    setEditD(() => s);
    setEditF(() => false);
    setOpenFilterModal(() => true);
  };

  const handleAdd = () => {
    setEditD(() => false);
    setEditF(() => false);
    handleModal();
  };

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const handleDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await action.deleteSiteLoc(delId);
      ctc.createToken();
      await action.getAdminOrgSite(orgId, ctc.getToken());
      setDelId("");
    }
    setLoading(false);
  };

  const handleModal = () => setOpenModal((v) => !v);

  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12} textAlign={"right"}>
        <CustomButton
          varient="contained"
          name="Add"
          styled={{ width: "20%" }}
          onclick={() => handleAdd()}
        />
      </Grid>
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <LoadingComponent />
              ) : siteData && siteData.length ? (
                siteData.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell align="left">{s.name}</TableCell>
                    <TableCell
                      align="left"
                      style={{
                        maxWidth: "200px",
                      }}
                    >
                      {s.address}
                    </TableCell>
                    <TableCell align="left">{s.website}</TableCell>
                    <TableCell align="left">
                      <CustomButton
                        name={"Edit"}
                        varient={"contained"}
                        onclick={() => handleEdit(s)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"View"}
                        varient={"contained"}
                        onclick={() => handleView(s)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"Details"}
                        varient={"contained"}
                        onclick={() => handleFilter(s)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"Delete"}
                        varient={"contained"}
                        styled={{ background: "red", marginBottom: "10px" }}
                        onclick={() => handleDeleteModalOpen(s._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Site Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {openModal && (
        <SiteModal
          open={openModal}
          handleClose={() => handleModal()}
          edit={editF}
          cat={selCat}
          editData={editD}
          admin={true}
          id={orgId}
        />
      )}
      {viewF && (
        <ViewSiteDataModal
          open={viewF}
          handleClose={() => setViewF(false)}
          cat={selCat}
          handleOpenEdit={() => handleEdit(editD)}
          viewD={editD}
        />
      )}
      {openFilterModal && (
        <FilterModal
          open={openFilterModal}
          handleClose={() => setOpenFilterModal(false)}
          cat={selCat}
          editData={editD}
          admin={true}
          oid={orgId}
        />
      )}
      <DeleteConfirmation
        open={deleteModal}
        title="Site"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleDelete()}
      />
    </>
  );
};

export default ProviderSiteTab;
