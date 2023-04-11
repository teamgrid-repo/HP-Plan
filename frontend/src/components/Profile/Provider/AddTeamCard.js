import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../UI/CustomButton";
import {
  getIdRole,
  createSubUser,
  getSubUser,
  deleteSubUser,
  getPOCData,
} from "../../../redux/actions/profile/profileActions";
import {
  addContact,
  deletePOC,
  deletePOCOne,
  resendInvite,
} from "../../../redux/actions/Admin/AdminActions";
import { useEffect } from "react";
import ViewSubUser from "../../UI/ViewSubUser";
import EditSubUser from "../../UI/EditSubUser";
import AddSubUserModal from "../../UI/AddSubUserModal";
import DeleteConfirmation from "../../UI/DeleteConfirmation";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
import MakeSubUserModal from "../../UI/MakeSubUserModal";
import ResendInviteModal from "../../UI/ResendInviteModal";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  titleHeader: {
    fontSize: "18px",
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
  infoDiv: {
    fontSize: "18px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.78,
    letterSpacing: "normal",
    color: "#252222",
    display: "flex",
    justifyContent: "space-between",
  },
  lineOne: {
    background: "#4f8ead",
    height: "2px",
    width: "76px",
    zIndex: 2,
    position: "absolute",
  },
  lineTwo: {
    background: "#ededf2",
    height: "2px",
  },
  switchContainer: {
    marginTop: "19px",
    width: "289px",
    padding: "9.4px 14px 9.4px 24px",
    borderRadius: "24px",
    backgroundColor: "#fafafa",
    display: "flex",
  },
  switchTitle: {
    margin: "auto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "#000",
    marginLeft: "14px",
  },
  btn: {
    width: "182px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    borderRadius: "26px 26px 57px 28px",
    marginBottom: "17px",
  },
}));

const AddTeamCard = () => {
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [isPoc, setIsPoc] = useState(false);
  const [subUserModal, setSubUserModal] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendEmailModal, setResendEmailModal] = useState(false);
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      getIdRole,
      createSubUser,
      getSubUser,
      deleteSubUser,
      getPOCData,
      addContact,
      deletePOC,
      deletePOCOne,
      resendInvite,
    },
    dispatch
  );
  const handleDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      if (isPoc) {
        await actions.deletePOC(delId, orgId);
        ctc.createToken();
        await actions.getPOCData(orgId);
        setDelId("");
        setLoading(false);
      } else {
        const { id } = actions.getIdRole();
        await actions.deleteSubUser(delId);
        ctc.createToken();
        await actions.getSubUser(id, ctc.getToken());
        setDelId("");
        setLoading(false);
      }
    }
    setLoading(false);
  };
  const [selectedUser, setSelectedUser] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);

  const handleDeleteModalOpen = (id, poc) => {
    setDelId(() => id);
    setIsPoc(poc);
    setDeleteModal(() => true);
  };
  const handleEditUser = (u) => {
    setSelectedUser(() => u);
    setViewUserModal(() => false);
    setEditUserModal(() => true);
  };

  const handleResendEmailModal = (u) => {
    setResendEmail(() => u?.email);
    setResendEmailModal(() => true);
  };

  const handleViewUser = (u) => {
    setSelectedUser(() => u);
    setViewUserModal(() => true);
  };

  const handleSubUser = (s) => {
    setSubUserModal(() => true);
    setSelectedUser(() => s);
  };

  const handleAddSubUser = async () => {
    setSubUserModal(false);
    setLoading(true);
    const { id } = actions.getIdRole();
    setLoading(true);
    const data = {
      contact: selectedUser?.contact,
      name: selectedUser?.name,
      email: selectedUser?.email,
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      jobTitle: selectedUser?.jobTitle,
      makeAccountPrimary: true,
      hippa: false,
      isPoc: true,
      staticPocId: selectedUser?._id,
    };
    data.organisationId = orgId;
    data.userId = id;
    await actions.addContact(data);
    await actions.deletePOCOne(selectedUser._id, orgId);
    await actions.getPOCData(orgId);
    actions.getSubUser(id, ctc.getToken());
    setSelectedUser({
      name: "",
      contact: "",
      email: "",
      site: [],
      fname: "",
      lname: "",
      jobTitle: "",
      hippa: false,
      makeAccountPrimary: false,
    });
    setLoading(false);
  };

  const handleResendEmail = async (email) => {
    setResendEmailModal(false);
    setLoading(true);
    if (email) {
      await actions.resendInvite({ email });
      setResendEmail("");
    }
    const { id } = actions.getIdRole();
    actions.getSubUser(id, ctc.getToken());
    setLoading(false);
  };

  const pdata = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);
  const subUserData = useSelector((state) => state.profile.subUser);
  const pocData = useSelector((state) => state.profile.poc);

  const orgId = useSelector((state) => state.profile.org._id);
  const catRes = useSelector((state) => state.cat.cats);
  const orgD = useSelector((state) => state.profile.org);

  const [cat, setCat] = useState([]);

  useEffect(() => {
    makeCat();
  }, [orgD, orgId]);

  const makeCat = () => {
    if (catRes && catRes.length) {
      const catData = [];
      for (let i = 0; i < catRes.length; i++) {
        //category //subCategory
        catData.push(
          {
            ...catRes[i].category,
            cat: true,
          },
          ...Object.values(catRes[i].subCategory).map((e) => {
            return { ...e, cat: false };
          })
        );
      }
      setCat(() => catData);
    }
  };

  useEffect(() => {
    return () => ctc.cancelTheApi();
  }, [subUserData]);

  return (
    <>
      <Grid
        item
        lg={12}
        md={12}
        xs={12}
        sm={12}
        marginLeft={2}
        marginRight={2}
        textAlign="left"
        marginTop={1}
      >
        <div className={classes.infoDiv}>
          <div>Manage Team (up to {pdata && pdata.totalAssigned} members) </div>

          {user?.profileId?.claimStatus === undefined ? (
            pdata && pdata.approvedStatus === "approved" ? (
              subUserData &&
              pdata.totalAssigned &&
              subUserData.length < pdata.totalAssigned ? (
                <CustomButton
                  name="Add Team Member"
                  varient="contained"
                  size="small"
                  styled={{ margin: "auto", marginRight: "5px" }}
                  onclick={() => setOpenAdd(true)}
                />
              ) : (
                <CustomButton
                  varient="contained"
                  name="Request Admin For More Accounts"
                  styled={{ margin: "auto", marginRight: "5px" }}
                />
              )
            ) : (
              <div
                style={{
                  padding: "7px 10px 6px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(252, 90, 90, 0.1)",
                  fontSize: "10px",
                  fontWeight: 600,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  letterSpacing: "normal",
                  color: "#fc5a5a",
                  textAlign: "center",
                  maxHeight: "15px",
                  textTransform: "capitalize",
                }}
              >
                Your account is under approval please contact to admin for more
                details
              </div>
            )
          ) : user?.profileId?.claimStatus === "approved" &&
            pdata &&
            pdata.approvedStatus === "approved" ? (
            subUserData &&
            pdata.totalAssigned &&
            subUserData.length < pdata.totalAssigned ? (
              <CustomButton
                name="Add Team Member"
                varient="contained"
                size="small"
                styled={{ margin: "auto", marginRight: "5px" }}
                onclick={() => setOpenAdd(true)}
              />
            ) : (
              <CustomButton
                varient="contained"
                name="Request Admin For More Accounts"
                styled={{ margin: "auto", marginRight: "5px" }}
              />
            )
          ) : (
            <div
              style={{
                padding: "7px 10px 6px",
                borderRadius: "5px",
                backgroundColor: "rgba(252, 90, 90, 0.1)",
                fontSize: "10px",
                fontWeight: 600,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
                color: "#fc5a5a",
                textAlign: "center",
                maxHeight: "15px",
                textTransform: "capitalize",
              }}
            >
              Your account is under approval please contact to admin for more
              details
            </div>
          )}
        </div>
        <Divider variant="fullWidth" className={classes.lineOne} />
        <Divider variant="fullWidth" className={classes.lineTwo} />
      </Grid>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Grid
            item
            lg={12}
            sm={12}
            md={12}
            xs={12}
            marginLeft={2}
            marginRight={2}
          >
            <div className={classes.titleHeader}>Point of contact</div>
            <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pocData && pocData.length ? (
                    pocData.map((s) =>
                      pdata.userId !== s.userId
                        ? s.isActive && (
                            <TableRow key={s._id}>
                              <TableCell size="small" align="left">
                                <div
                                  style={{ width: "180px", overflow: "auto" }}
                                >
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
                              <TableCell
                                size="small"
                                align="left"
                                style={{ width: "250px" }}
                              >
                                {s.approvalPending ? null : (
                                  <CustomButton
                                    name={"Add as a sub user"}
                                    varient={"contained"}
                                    disabled={
                                      user.profileId?.claimStatus !==
                                        undefined &&
                                      user.profileId?.claimStatus !== "approved"
                                    }
                                    styled={{
                                      marginRight: "10px",
                                      marginBottom: "10px",
                                    }}
                                    onclick={() => handleSubUser(s)}
                                  />
                                )}
                                {s.approvalPending ? null : (
                                  <CustomButton
                                    name={"Delete"}
                                    varient={"contained"}
                                    disabled={
                                      user.profileId?.claimStatus !==
                                        undefined &&
                                      user.profileId?.claimStatus !== "approved"
                                    }
                                    styled={{
                                      background: "red",
                                      marginBottom: "10px",
                                    }}
                                    onclick={() =>
                                      handleDeleteModalOpen(s._id, true)
                                    }
                                  />
                                )}
                                {s.recText}
                              </TableCell>
                            </TableRow>
                          )
                        : null
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No User Data Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            md={12}
            xs={12}
            marginLeft={2}
            marginRight={2}
          >
            <div className={classes.titleHeader}>Sub Users</div>
            <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subUserData && subUserData.length ? (
                    subUserData.map((s) =>
                      pdata.userId !== s.userId ? (
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
                          <TableCell
                            size="small"
                            align="left"
                            style={{ width: "350px" }}
                          >
                            {s.approvalPending ? null : (
                              <CustomButton
                                name={"Edit"}
                                varient={"contained"}
                                disabled={
                                  user.profileId?.claimStatus !== undefined &&
                                  user.profileId?.claimStatus !== "approved"
                                }
                                styled={{
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                }}
                                onclick={() => handleEditUser(s)}
                              />
                            )}
                            {s.approvalPending ? null : (
                              <CustomButton
                                name={"Resend Invite"}
                                varient={"contained"}
                                disabled={
                                  user.profileId?.claimStatus !== undefined &&
                                  user.profileId?.claimStatus !== "approved"
                                }
                                styled={{
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                }}
                                onclick={() => handleResendEmailModal(s)}
                              />
                            )}
                            {s.rec ? null : (
                              <CustomButton
                                name={"View"}
                                varient={"contained"}
                                disabled={
                                  user.profileId?.claimStatus !== undefined &&
                                  user.profileId?.claimStatus !== "approved"
                                }
                                styled={{
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                }}
                                onclick={() => handleViewUser(s)}
                              />
                            )}
                            {s.approvalPending ? null : (
                              <CustomButton
                                name={"Delete"}
                                varient={"contained"}
                                disabled={
                                  user.profileId?.claimStatus !== undefined &&
                                  user.profileId?.claimStatus !== "approved"
                                }
                                styled={{
                                  background: "red",
                                  marginBottom: "10px",
                                }}
                                onclick={() =>
                                  handleDeleteModalOpen(s._id, false)
                                }
                              />
                            )}
                            {s.recText}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No User Data Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}
      <ViewSubUser
        handleClose={() => setViewUserModal(false)}
        handleOpenEdit={() => handleEditUser(selectedUser)}
        open={viewUserModal}
        viewD={selectedUser}
      />
      <EditSubUser
        handleClose={() => setEditUserModal(false)}
        ed={selectedUser}
        cat={cat}
        open={editUserModal}
      />
      <AddSubUserModal
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        orgId={orgId}
      />
      <DeleteConfirmation
        open={deleteModal}
        title="User"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleDelete()}
      />
      <ResendInviteModal
        open={resendEmailModal}
        title="User"
        handleClose={() => setResendEmailModal(false)}
        handleDelete={() => handleResendEmail(resendEmail)}
      />
      <MakeSubUserModal
        open={subUserModal}
        title="Sub User"
        handleClose={() => setSubUserModal(false)}
        handleSubUser={() => handleAddSubUser()}
      />
    </>
  );
};

export default AddTeamCard;
