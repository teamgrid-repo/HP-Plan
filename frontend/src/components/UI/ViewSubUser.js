import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

const useStyle = makeStyles({
  container: {
    textAlign: "center",
    fontFamily: "Montserrat",
    margin: "16px",
    borderRadius: "8px",
  },
  dailogHeader: {
    fontFamily: "Montserrat",
    fontSize: "22px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#92929d",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: 600,
    paddingTop: "14px",
  },
  formField: {
    fontSize: "20px",
    color: "#7e7e7e",
    paddingTop: "14px",
    maxHeight: "250px",
    overflow: "auto",
  },
  siteDivContainer: {
    margin: "0 5px 5px 5px",
    padding: "0 20px 20px 20px",
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    maxHeight: "500px",
    overflow: "auto",
  },
  siteDiv: {
    fontSize: "22px",
    borderRadius: "18px",
    padding: "7px",
    color: "#4f8ead",
    fontWeight: "600",
    textAlign: "center",
    margin: "auto",
    overflow: "auto",
  },
  catDiv: {
    fontSize: "20px",
    borderRadius: "18px",
    padding: "7px",
    color: "white",
    fontWeight: "500",
    background: "#7e7e7e",
    width: "fit-content",
  },
  subCatDiv: {
    fontSize: "18px",
    borderRadius: "18px",
    padding: "7px",
    fontWeight: "400",
    width: "fit-content",
  },
  siteCard: {
    width: "400px",
    height: "300px",
    overflow: "auto",
    borderRadius: "30px",
    border: "solid 0.5px #e0e7fe",
  },
  catCard: {
    height: "230px",
    overflow: "auto",
    padding: "10px",
  },
});

const ViewSubUser = ({
  handleClose,
  open,
  handleOpenEdit,
  viewD,
  dontShow = false,
  isPoc,
}) => {
  const classes = useStyle();
  const [siteCats, setSiteCats] = useState([]);
  const loc = useNavigate();
  const setCatForSite = () => {
    if (viewD && viewD.siteInfo) {
      if (!dontShow) {
        const st = [];
        for (let i = 0; i < viewD.siteInfo.length; i++) {
          let s = viewD.siteInfo[i];
          let sd = { name: s.name, id: s._id, catInfo: [] };
          const subc = viewD.siteInfo[i].siteSubCategory;
          if (subc) {
            for (let j = 0; j < subc.length; j++) {
              if (subc[j].category && subc[j].subcategory) {
                sd["catInfo"].push(
                  {
                    ...subc[j].category,
                    cat: true,
                  },
                  ...Object.values(subc[j].subcategory).map((e) => {
                    return { ...e, subCat: true };
                  })
                );
              }
            }
          }
          st.push(sd);
        }
        setSiteCats(() => st);
      }
    }
  };

  useEffect(() => {
    setCatForSite();
  }, [viewD]);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xl"
      className={classes.container}
      onClose={handleClose}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div className={classes.dailogHeader}>User Details</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            First Name
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.firstName || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Last Name
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.lastName || "-"}
          </Grid>

          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Name
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.name || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Phone
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.contact || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Email
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.email || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Job Title
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.jobTitle || "-"}
          </Grid>
          {!isPoc && (
            <>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formTitle}
                textAlign="left"
              >
                Primary Account
              </Grid>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formField}
                textAlign="left"
              >
                {viewD.makeAccountPrimary ? "Yes" : "No"}
              </Grid>
            </>
          )}
{/* 
          {isPoc && (
            <>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formTitle}
                textAlign="left"
              >
                HIPAA Chat
              </Grid>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formField}
                textAlign="left"
              >
                {viewD.hippa ? "Yes" : "No"}
              </Grid>
            </>
          )} */}
          {dontShow ? (
            <>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formTitle}
                textAlign="left"
              >
                Organization
              </Grid>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formField}
                textAlign="left"
              >
                {(viewD.organization && viewD.organization.name) || "-"}
              </Grid>
            </>
          ) : null}
          {!dontShow ? (
            <>
              {" "}
              <Grid
                item
                lg={2}
                md={2}
                sm={3}
                xs={12}
                className={classes.formTitle}
                textAlign="left"
              >
                Site and Categories
              </Grid>
              <Grid item lg={10} md={10} sm={9} xs={12} textAlign="left">
                <div className={classes.siteDivContainer}>
                  {(siteCats &&
                    siteCats.length &&
                    siteCats.map((i) => (
                      <div className={classes.siteCard} key={i._id}>
                        <div className={classes.siteDiv}>{i.name}</div>
                        <Divider />
                        <div className={classes.catCard}>
                          {i.catInfo &&
                            i.catInfo.length &&
                            i.catInfo.map((j, idx) => (
                              <div
                                className={
                                  j.cat ? classes.catDiv : classes.subCatDiv
                                }
                                key={`${j._id}${idx + 2}`}
                              >
                                {j.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))) ||
                    "-"}
                </div>
              </Grid>
            </>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        {dontShow ? null : (
          <CustomButton
            name="Edit"
            varient="contained"
            styled={{ width: "200px" }}
            onclick={() => handleOpenEdit()}
          />
        )}
        {dontShow && viewD.organisationId && viewD.organisationId._id ? (
          <CustomButton
            name="Go To Organization"
            varient="contained"
            styled={{ width: "200px" }}
            onclick={() => loc(`/org-edit/${viewD.organisationId._id}`)}
          />
        ) : null}
        <CustomButton
          name="Cancel"
          varient="contained"
          styled={{ width: "200px", background: "red" }}
          onclick={() => handleClose()}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ViewSubUser;
