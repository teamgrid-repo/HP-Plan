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
import { bindActionCreators } from "redux";
import {
  deleteSubUser,
  getIdRole,
  reAssignUser,
} from "../../../redux/actions/profile/profileActions";
import EditSubUser from "../../UI/EditSubUser";
import ViewSubUser from "../../UI/ViewSubUser";
import AddSubUserModal from "../../UI/AddSubUserModal";
import { makeStyles } from "@mui/styles";
import {
  getAdminOrgSubUser,
  getPOC,
  deletePOC,
} from "../../../redux/actions/Admin/AdminActions";
import DeleteConfirmation from "../../UI/DeleteConfirmation";
import ShiftModal from "./ShiftModal";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  titleHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.08,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#252222",
    textAlign: "left",
    marginBottom: "7px",
  },
}));

const SubUser = ({ orgId, isAdmin }) => {
  const classes = useStyle();
  const [editU, setEditU] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewU, setViewU] = useState(false);
  const [addU, setAddU] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [reqModal, setReqModal] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [isPoc, setIsPoc] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();
  const pocData = useSelector((state) => state.profile.poc);
  const subUserData = useSelector((state) => state.profile.subUser);

  useEffect(() => {
    return () => ctc.cancelTheApi();
  }, [subUserData]);

  const action = bindActionCreators(
    {
      getAdminOrgSubUser,
      deleteSubUser,
      getIdRole,
      reAssignUser,
      deletePOC,
      getPOC,
    },

    dispatch
  );

  const handleEdit = (u, poc) => {
    setSelectedUser(() => u);
    setIsPoc(() => poc);
    setViewU(() => false);
    setEditU(() => true);
  };
  const handleDeleteModalOpen = (id, user) => {
    setDelId(() => id);
    setDeleteModal(() => true);
    setIsUser(() => user);
  };
  const handleDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (!isUser) {
      if (delId) {
        await action.deletePOC(delId, orgId);
        ctc.createToken();
        await action.getPOC(orgId, ctc.getToken());
        setDelId("");
      }
    } else {
      if (delId) {
        const { id } = action.getIdRole();
        await action.deleteSubUser(delId);
        ctc.createToken();
        await action.getAdminOrgSubUser(id, orgId, ctc.getToken());
        setDelId("");
      }
    }
    setLoading(false);
  };
  const handleView = (u, poc) => {
    setSelectedUser(() => u);
    setSelectedUser(() => u);
    setIsPoc(() => poc);
    setViewU(() => true);
  };
  const reqPocEmail = async () => {
    setReqModal(false);
    setLoading(true);
    setReqEmail("");
    const data = {
      email: reqEmail,
      currOrgId: orgId,
    };
    await action.reAssignUser(data);
    const { id } = action.getIdRole();
    await action.getAdminOrgSubUser(id, orgId);
    setLoading(false);
  };
  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12} textAlign={"right"}>
        <CustomButton
          varient="contained"
          name="Add"
          styled={{ width: "20%" }}
          onclick={() => setAddU(true)}
        />
      </Grid>
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <div className={classes.titleHeader}>Point of contact</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                {/* <TableCell>Primary</TableCell> */}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <LoadingComponent />
              ) : pocData && pocData.length ? (
                pocData.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell size="small" align="left">
                      <div style={{ width: "180px", overflow: "auto" }}>
                        {s.name}
                      </div>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <div
                        style={{
                          width: "200px",
                          letterSpacing: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {s.email}
                      </div>
                    </TableCell>
                    <TableCell align="left">{s.contact}</TableCell>
                    {/* <TableCell align="left">
                      {s.makeAccountPrimary ? "Yes" : "No"}
                    </TableCell> */}
                    <TableCell align="left">
                      <CustomButton
                        name={"Edit"}
                        varient={"contained"}
                        onclick={() => handleEdit(s, true)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"View"}
                        varient={"contained"}
                        onclick={() => handleView(s, true)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"Delete"}
                        varient={"contained"}
                        styled={{ background: "red", marginBottom: "10px" }}
                        onclick={() => handleDeleteModalOpen(s._id, false)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Contact Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item lg={12} sm={12} md={12} xs={12}>
        <div className={classes.titleHeader}>Sub Provider</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Primary</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <LoadingComponent />
              ) : subUserData && subUserData.length ? (
                subUserData.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell size="small" align="left">
                      <div style={{ width: "180px", overflow: "auto" }}>
                        {s.name}
                      </div>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <div
                        style={{
                          width: "200px",
                          letterSpacing: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {s.email}
                      </div>
                    </TableCell>
                    <TableCell align="left">{s.contact}</TableCell>
                    <TableCell align="left">
                      {s.makeAccountPrimary ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="left">
                      <CustomButton
                        name={"Edit"}
                        varient={"contained"}
                        onclick={() => handleEdit(s, false)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"View"}
                        varient={"contained"}
                        onclick={() => handleView(s, false)}
                        styled={{ marginRight: "10px", marginBottom: "10px" }}
                      />
                      <CustomButton
                        name={"Convert"}
                        varient={"contained"}
                        styled={{ background: "red", marginBottom: "10px" }}
                        onclick={() => handleDeleteModalOpen(s._id, true)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Contact Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <ViewSubUser
        handleClose={() => setViewU(false)}
        handleOpenEdit={() => handleEdit(selectedUser, isPoc)}
        open={viewU}
        viewD={selectedUser}
        isPoc={isPoc}
      />
      <EditSubUser
        handleClose={() => setEditU(false)}
        ed={selectedUser}
        open={editU}
        admin={true}
        orgId={orgId}
        isPoc={isPoc}
      />
      <ShiftModal
        shiftOrg={() => reqPocEmail()}
        handleClose={() => setReqModal(false)}
        open={reqModal}
      />
      <AddSubUserModal
        handleClose={() => setAddU(false)}
        open={addU}
        orgId={orgId}
        admin={true}
        handleShift={(email) => {
          setReqEmail(email);
          setAddU(false);
          setReqModal(true);
        }}
        isAdmin={true}
      />
      <DeleteConfirmation
        open={deleteModal}
        title="User"
        handleClose={() => {
          setDeleteModal(false);
          setIsUser(false);
        }}
        handleDelete={() => handleDelete()}
      />
    </>
  );
};

export default SubUser;
