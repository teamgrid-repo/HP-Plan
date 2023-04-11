import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../../components/UI/CustomButton";
import FormGroup from "../../../components/UI/FormGroup";
import CustomPhone from "../../../components/UI/CustomPhone";

import {
  addSubAdmin,
  updateSubAdmin,
} from "../../../redux/actions/Admin/AdminActions";
import CustomReactSelect from "../../../components/UI/CustomReactSelect";
import ModalLoading from "../../../components/UI/ModalLoading";
const role = [
  {
    label: "Directory Analyst",
    value: "analyst",
  },
  {
    label: "Admin Manager",
    value: "manager",
  },
  {
    label: "Compliance Officer",
    value: "officer",
  },
  {
    label: "Master Admin",
    value: "master",
  },
];
const AddModal = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const dispatch = useDispatch();
  const actions = bindActionCreators({ addSubAdmin, updateSubAdmin }, dispatch);
  const [feedData, setFeedData] = useState({
    name: "",
    email: "",
    subRole: "",
    contact: "",
  });
  useEffect(() => {
    if (props.udata)
      setFeedData(() => {
        return {
          ...props.udata,
          subRole: role.find((a) => a.value === props.udata.subRole),
        };
      });
    else
      setFeedData(() => {
        return {
          name: "",
          email: "",
          subRole: "",
          contact: "",
        };
      });
  }, [props]);
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFeedBackSubmit = async () => {
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        name: feedData.name,
        email: feedData.email,
        subRole: feedData.subRole.value,
        role: "admin",
        type: "web",
      };
      if (feedData.contact && !props.udata) {
        data.contact = feedData.contact
        .replace("(", "")
        .replace(")", "")
        .replace("-", "");
      }
      if (props.udata) {
        delete data.email;
        data.id = props.udata._id;
        await actions.updateSubAdmin(data);
      } else {
        await actions.addSubAdmin(data);
      }
      setLoading(false);
      simpleValidator.current.visibleFields = [];

      setFeedData(() => {
        return { name: "", email: "", subRole: "", contact: "" };
      });
      props.handleClose();
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const setData = (field, data) =>
    setFeedData((old) => {
      return { ...old, [field]: data };
    });

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
      style={{
        textAlign: "center",
        fontFamily: "Montserrat",
        margin: "16px",
        borderRadius: "8px",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div
          style={{
            fontFamily: "Montserrat",
            fontSize: "22px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "0.1px",
            textAlign: "left",
            color: "#92929d",
          }}
        >
          {props.udata ? "Edit" : "Add"} Sub Admin
        </div>
      </DialogTitle>
      <Divider />
      {loading ? (
        <ModalLoading />
      ) : (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormGroup
                label="Name"
                required={true}
                type="text"
                value={feedData.name}
                onChange={(data) => setData("name", data)}
                onBlur={() => blurSetup("Name")}
                validator={simpleValidator.current.message(
                  "Name",
                  feedData.name,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormGroup
                label="Email"
                required={true}
                type="text"
                disabled={props.udata ? true : false}
                value={feedData.email}
                onChange={(data) => setData("email", data)}
                onBlur={() => blurSetup("email")}
                validator={simpleValidator.current.message(
                  "email",
                  feedData.email,
                  "required|email",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomReactSelect
                required={true}
                label={"Role"}
                isMulti={false}
                onBlur={() => blurSetup("Role")}
                validator={simpleValidator.current.message(
                  "Role",
                  feedData.subRole,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
                options={role}
                value={feedData.subRole}
                onChange={(e) => setData("subRole", e)}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomPhone
                value={feedData.contact}
                label="Phone Number"
                onChange={(e) => setData("contact", e)}
                onBlur={() => blurSetup("phone")}
                validator={simpleValidator.current.message(
                  "phone",
                  feedData.contact,
                  "phone",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                name={props.udata ? "Edit" : "Add"}
                varient="contained"
                size="large"
                fullWidth={true}
                onclick={handleFeedBackSubmit}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                varient="outlined"
                name="Cancel"
                onclick={props.handleClose}
                size="large"
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddModal;
