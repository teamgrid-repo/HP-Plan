import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../../components/UI/CustomButton";
import CustomTextArea from "../../../components/UI/CustomTextArea";
import CustomTextField from "../../../components/UI/FormGroup";
import config from "../../../config";

const AddEditTeamModal = ({
  open,
  handleClose,
  classes,
  editData,
  handleAdd,
  handleEdit,
}) => {
  const [teamData, setTeamData] = useState({
    name: "",
    staffImage: "",
    description: "",
    job: "",
  });
  const [eid, setEid] = useState("");
  const [img, setImg] = useState("");
  const [, setDisplayError] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        newUrl: {
          // name the rule
          message: "The Url must be valid url",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, config.urlRegex);
          },
          messageReplace: (message, params) =>
            message.replace(":values", this.helpers.toSentence(params)), // optional
          required: false, // optional
        },
      },
    })
  );

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const setData = (field, data) => {
    setTeamData((old) => {
      return {
        ...old,
        [field]: data,
      };
    });
  };
  useEffect(() => {
    if (editData) {
      setEid(() => editData._id);
      setImg(() => editData.image);
      setTeamData(() => {
        return {
          name: editData.name,
          description: editData.description,
          job: editData.job,
        };
      });
    } else {
      setEid(() => "");
      setImg(() => "");
      setTeamData(() => {
        return { name: "", staffImage: "", description: "" };
      });
      simpleValidator.current.visibleFields = [];
    }
  }, [editData, open]);

  const handleAddEdit = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      let formData = new FormData();
      if (teamData.staffImage) {
        formData.append("staffImage", teamData.staffImage);
      }
      formData.append("name", teamData.name);
      formData.append("description", teamData.description);
      formData.append("job", teamData.job);
      if (eid) {
        handleEdit(eid, formData);
      } else {
        handleAdd(formData);
      }
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      className={classes.container}
      onClose={handleClose}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div className={classes.dailogHeader}>
          {eid ? "Update" : "Add"} Team
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <div className={classes.formGroupContainer}>
              <div className={classes.labelName}>Image *</div>
              <TextField
                type={"file"}
                fullWidth
                variant="outlined"
                placeholder={"Image"}
                onBlur={() => blurSetup("Image")}
                onChange={(e) => setData("staffImage", e.target.files[0])}
              />
              {img}
              {simpleValidator.current.message(
                "Image",
                teamData.staffImage || img,
                "required",
                {
                  className: "errorClass",
                }
              )}
            </div>
          </Grid>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <CustomTextField
              type="text"
              label="Name"
              value={teamData.name}
              onChange={(e) => setData("name", e)}
              required={true}
              onBlur={() => blurSetup("name")}
              validator={simpleValidator.current.message(
                "name",
                teamData.name,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <CustomTextField
              type="text"
              label="Job Title"
              value={teamData.job}
              onChange={(e) => setData("job", e)}
              required={true}
              onBlur={() => blurSetup("job")}
              validator={simpleValidator.current.message(
                "job",
                teamData.job,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <CustomTextArea
              label="About"
              value={teamData.description}
              onChange={(data) => setData("description", data)}
              required={true}
              onBlur={() => blurSetup("description")}
              validator={simpleValidator.current.message(
                "description",
                teamData.description,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12} md={12} textAlign="left">
            <CustomButton
              name={eid ? "Update" : "Add"}
              varient="contained"
              onclick={handleAddEdit}
              size="large"
            />
            <CustomButton
              name="Cancel"
              varient="contained"
              styled={{ marginLeft: "5px", background: "red" }}
              onclick={handleClose}
              size="large"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTeamModal;
