import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../UI/CustomButton";

const useStyle = makeStyles((theme) => ({
  title: {
    fontSize: "43px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.16,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#252222",
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.4,
    letterSpacing: "-0.5px",
    textAlign: "left",
    color: "#696871",
  },
  saveQuizBtn: {
    width: "361px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  seeProviderBtn: {
    width: "173px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "15px",
  },
  emailQBtn: {
    width: "173px",
    height: "56px",
    color: "#7dbaaf",
    border: "solid 1px #7dbaaf",
    fontSize: "14px",
    fontWeight: "bold",
  },
}));

const QuizHeader = ({ handleSave, handleEmail, handleGo, text }) => {
  const classes = useStyle();

  return (
    <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <div className={classes.title}>
          See {text ? "Your" : "the"} Quiz Results
        </div>
        <div className={classes.subTitle}>
          Based on {text ? "your" : "the"} responses, here’s the best search
          criteria.
        </div>
      </div>
      <div>
        <CustomButton
          name="Save Quiz Results"
          varient="contained"
          className={classes.saveQuizBtn}
          onclick={() => handleSave()}
        />
        <div>
          <CustomButton
            name="See Providers"
            varient="contained"
            className={classes.seeProviderBtn}
            onclick={() => handleGo()}
          />
          <CustomButton
            name="Email Quiz Results"
            varient="outlined"
            className={classes.emailQBtn}
            onclick={() => handleEmail()}
          />
        </div>
      </div>
    </Stack>
  );
};

export default QuizHeader;
