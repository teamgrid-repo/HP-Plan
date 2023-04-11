import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrgList,
  getAdminOrgByKeyWord,
  deleteOrg,
  dataMigration,
} from "../../../redux/actions/Admin/AdminActions";

import { makeStyles } from "@mui/styles";
import CustomButton from "../../../components/UI/CustomButton";
import { useNavigate } from "react-router-dom";
import { ArrowDownward, ArrowUpward, Search, Sort } from "@mui/icons-material";
import { debounce, floor } from "lodash";
import config from "../../../config";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import { DataGrid } from "@mui/x-data-grid";
import CancelToken from "../../../utils/cancelClass";
import LoadingComponent from "../../../components/UI/LoadingComponent";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  aboutContainer: {
    paddingTop: "8em",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  outlined: {
    borderRadius: "5px",
    border: "solid 1px #7dbaaf",
    fontSize: "12px",
    color: "#7dbaaf",
    fontWeight: 600,
    textTransform: "none",
  },
  contained: {
    borderRadius: "5px",
    backgroundColor: "#7dbaaf",
    fontSize: "12px",
    fontWeight: 600,
    color: "#fafafb",
    textTransform: "none",
  },
  text: {
    color: "#7dbaaf",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "none",
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

const ListOrg = (props) => {
  const loc = useNavigate();

  const classes = useStyle();
  const total = useSelector((state) => state.admin.orgList?.total);
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getAdminOrgList,
      getAdminOrgByKeyWord,
      deleteOrg,
      dataMigration,
    },
    dispatch
  );
  const [order, setOrder] = useState("de");
  const [loading, setLoading] = useState(true);
  const [orgListD, setOrgListD] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("desc");
  const [field, setField] = useState("createdAt");
  const [typeCity, setTypeCity] = useState("desc");
  const ud = useSelector((state) => state.auth.user);

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const handleDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await actions.deleteOrg(delId);
      await getData();
      setDelId("");
    }
    setLoading(false);
  };

  const orgD = useSelector((state) => state.admin.orgList?.data);

  const debouncedSave = useCallback(
    debounce((k) => getByName(k), 1000),
    []
  );
  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    await actions.getAdminOrgList(
      ctc.getToken(),
      page,
      rowsPerPage,
      keyword,
      field,
      field === "name" ? type : typeCity,
      order
    );
    setLoading(false);
  };

  const getByName = async (k) => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getAdminOrgList(
      ctc.getToken(),
      page,
      rowsPerPage,
      k,
      field,
      field === "name" ? type : typeCity,
      order
    );
    setOrgListD(res);
    setLoading(false);
  };

  useEffect(() => {
    actions.setTitle({ title: props.title });
    getData();
    return () => ctc.cancelTheApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (orgD) {
      // setOrder("de");
      setOrgListD(orgD);
    }
  }, [orgD]);

  const handleOrd = async (o) => {
    setOrder(o);
    const res = await actions.getAdminOrgList(
      ctc.getToken(),
      page,
      rowsPerPage,
      keyword,
      field,
      field === "name" ? type : typeCity,
      o
    );
    setOrgListD(res.data);
  };
  const handleKSearch = (k) => {
    debouncedSave(k);
    setKeyword(k);
  };
  // const uploadMigrationFile = async (file) => {
  //   var reg = /^.*\.xls[xm]?$/;
  //   if (file && file.name && reg.test(file.name)) {
  //     setLoading(true);
  //     let formData = new FormData();
  //     formData.append("data", file);
  //     await actions.dataMigration(formData);
  //     await getData();
  //     setLoading(false);
  //   } else {
  //     toast.error("Please Upload Valid XL File!");
  //   }
  // };
  const columns = [
    { field: "name", headerName: "Organization", flex: 1, minWidth: 120 },
    { field: "website", headerName: "Website", flex: 1, minWidth: 120 },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    //   minWidth: 120,
    // },
    {
      field: "city",
      headerName: "City",
      width: 120,
    },
    {
      field: "state",
      headerName: "State",
    },
    {
      field: "zipcode",
      headerName: "Zip",
    },
    {
      field: "leadStatus",
      headerName: "Lead Status",
      width: 120,
      flex: 1,
    },
    {
      field: "publish",
      headerName: "Publish",
      sortable: false,
      width: 90,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <CustomButton
              name={"Edit"}
              varient={"contained"}
              onclick={() => loc(`/org-edit/${params.row._id}`)}
            />
            {ud && ud.subRole && ud.subRole !== "analyst" && (
              <CustomButton
                name={"Delete"}
                varient={"contained"}
                styled={{ backgroundColor: "red" }}
                onclick={() => handleDeleteModalOpen(params.row._id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  // const handlePageChange = async (p) => {
  //   console.log(p - 1, page);
  //   if (p - 1 !== page) {
  //     setPage(() => p + 1);
  //     await getData(p + 1, 25);
  //   }
  // };

  const handleChangePage = (e, num) => {
    setPage(num);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleSort = async (type, fieldName) => {
    fieldName === "name" ? setType(type) : setTypeCity(type);
    setField(fieldName);
    const res = await actions.getAdminOrgList(
      ctc.getToken(),
      page,
      rowsPerPage,
      keyword,
      fieldName,
      type,
      order
    );
    setOrgListD(res);
  };

  return (
    <div className={classes.aboutContainer}>
      <Grid container spacing={1}>
        {/* <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={6}
          // order={{ md: 2 }}
          textAlign="center"
        >
          <CustomButton
            name="Add Search Link"
            className="w-100"
            varient={"contained"}
            onclick={() => loc("/add-search")}
          />
        </Grid> */}
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          // order={{ md: 2 }}
          textAlign="center"
          mb={5}
        >
          <CustomButton
            name="Add Organization"
            className="w-100"
            varient={"contained"}
            onclick={() => loc("/org-add")}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          // order={{ md: 2 }}
          textAlign="left"
        >
          <div>
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap={"wrap"}
              gap="10px"
              style={{ marginBottom: "20px" }}
            >
              <div>
                <Search style={{ marginTop: "4px", marginRight: "3px" }} />
                <TextField
                  variant="standard"
                  placeholder="Search Organization"
                  value={keyword}
                  onChange={(e) => handleKSearch(e.target.value)}
                />
              </div>
              {/* <div style=  */}

              {/* <div style={{ display: "flex", gap: "5px" }}>
                <div style={{ fontSize: "18px", fontWeight: 450 }}>
                  Upload Data
                </div>
                <input
                  type="file"
                  value=""
                  multiple={false}
                  onChange={(e) => uploadMigrationFile(e.target.files[0])}
                />
              </div> */}
              <div className={classes.sortContainer}>
                <div className={classes.sortLabel}>View:</div>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={order}
                  size="small"
                  variant="standard"
                  onChange={(e) => handleOrd(e.target.value)}
                >
                  <MenuItem value="de">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={0}>Published</MenuItem>
                  <MenuItem value={1}>Not Published</MenuItem>
                </Select>
              </div>
            </Stack>
            <div style={{ height: 550, overflow: "auto", width: "100%" }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Organization
                        {field === "name" ? (
                          type === "asc" ? (
                            <button
                              className=""
                              tabIndex="-1"
                              type="button"
                              aria-label="Sort"
                              title="Asc"
                              style={{ border: "0", background: "transparent" }}
                              onClick={() => handleSort("desc", "name")}
                            >
                              <ArrowUpward />
                            </button>
                          ) : (
                            <button
                              className=""
                              tabIndex="-1"
                              type="button"
                              aria-label="Sort"
                              title="Desc"
                              style={{ border: "0", background: "transparent" }}
                              onClick={() => handleSort("desc", "createdAt")}
                            >
                              <ArrowDownward />
                            </button>
                          )
                        ) : (
                          <button
                            className=""
                            tabIndex="-1"
                            type="button"
                            aria-label="apply Sort"
                            title="Reset"
                            style={{ border: "0", background: "transparent" }}
                            onClick={() => handleSort("asc", "name")}
                          >
                            <Sort />
                          </button>
                        )}
                      </TableCell>
                      <TableCell>Website</TableCell>
                      <TableCell
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        City
                        {field === "city" ? (
                          typeCity === "asc" ? (
                            <button
                              className=""
                              tabIndex="-1"
                              type="button"
                              aria-label="Sort"
                              title="Asc"
                              style={{ border: "0", background: "transparent" }}
                              onClick={() => handleSort("desc", "city")}
                            >
                              <ArrowUpward />
                            </button>
                          ) : (
                            <button
                              className=""
                              tabIndex="-1"
                              type="button"
                              aria-label="Sort"
                              title="Desc"
                              style={{ border: "0", background: "transparent" }}
                              onClick={() => handleSort("desc", "createdAt")}
                            >
                              <ArrowDownward />
                            </button>
                          )
                        ) : (
                          <button
                            className=""
                            tabIndex="-1"
                            type="button"
                            aria-label="apply Sort"
                            title="Reset"
                            style={{ border: "0", background: "transparent" }}
                            onClick={() => handleSort("asc", "city")}
                          >
                            <Sort />
                          </button>
                        )}
                      </TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Zipcode</TableCell>
                      <TableCell>Lead Status</TableCell>
                      <TableCell>Publish</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "1000px",
                      }}
                    >
                      <LoadingComponent />
                    </div>
                  ) : (
                    <TableBody>
                      {orgListD &&
                        orgListD?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell>{row.website}</TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>{row.state}</TableCell>
                            <TableCell>{row.zipcode}</TableCell>
                            <TableCell>{row.leadStatus}</TableCell>
                            <TableCell>
                              {row.publish ? "true" : "false"}
                            </TableCell>
                            <TableCell>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <CustomButton
                                  name={"Edit"}
                                  varient={"contained"}
                                  onclick={() => loc(`/org-edit/${row._id}`)}
                                />
                                {ud &&
                                  ud.subRole &&
                                  ud.subRole !== "analyst" && (
                                    <CustomButton
                                      name={"Delete"}
                                      varient={"contained"}
                                      styled={{ backgroundColor: "red" }}
                                      onclick={() =>
                                        handleDeleteModalOpen(row._id)
                                      }
                                    />
                                  )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              {/* <DataGrid
                getRowId={(row) => row._id}
                rows={orgListD || []}
                disableExtendRowFullWidth={false}
                columns={columns}
                disableSelectionOnClick
                loading={loading}
                options={{
                  paging: false,
                }}
                // rowCount={pagination.total}
                // pageSize={pagination?.limit}
                // onPageSizeChange={(p) =>
                //   setPagination((prev) => ({ ...prev, limit: p }))
                // }
                // page={pagination?.page}
                // onPageChange={(p) =>
                //   setPagination((prev) => ({ ...prev, page: p }))
                // }
                // rowsPerPageOptions={[...config.pageSlot]}
              /> */}
            </div>
            {!!total && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <TablePagination
                  component="div"
                  count={total}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {/* <Pagination
                count={floor(total / 25)}
                page={page + 1}
                variant="outlined"
                shape="rounded"
                color="secondary"
                size="large"
                onChange={(_, p) => handlePageChange(p)}
              /> */}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <DeleteConfirmation
        open={deleteModal}
        title="Organization"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleDelete()}
      />
    </div>
  );
};
export default ListOrg;
