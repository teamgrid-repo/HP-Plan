import { Grid } from "@mui/material";
import { capLetter } from "../../utils/CapFirstWord";
import { subCatIds } from "../../utils/catSubCatArray";
const ansArr = ["Not Secure/SomeWhat Secure", "Secure"];
const Step3 = ({
  setSelectedAns,
  classes,
  selectedAns,
  aboveTextque,
  aboveTextans,
  goToLink,
  hh,
  subCat = [],
}) => {
  return (
    <>
      <div className={classes.queMain}>
        <div>RANK YOUR CONFIDENCE IN THE FOLLOWING STATEMENTS</div>
        <div
          style={{
            color: "#696871",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.75,
            paddingTop: "21px",
          }}
        >
          These questions are organized in an intentional order to help address
          the area(s) of greatest need first. To order the search priorities, we
          recommend starting at the top and working your way down. You could
          choose to address the areas marked “Not Secure”, from top to bottom,
          first. Then you can move to address the “Somewhat Secure” answers,
          again top to bottom.
        </div>
      </div>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextque === "HER" ? "FEELS" : "FEEL"} CONFIDENT
          THAT {aboveTextans} CAN FEED {aboveTextque}SELF AND {aboveTextque}{" "}
          FAMILY.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q1"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q1", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q1"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[12]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[12])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextque === "HER" ? "FEELS" : "FEEL"} CONFIDENT
          THAT {aboveTextque} HOUSING IS SAFE, AFFORDABLE, AND STABLE.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q2"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q2", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q2"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[14]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[14])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} CONFIDENCE THAT {aboveTextans} CAN GET AROUND
          EASILY AND GO TO GET SERVICES.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q3"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q3", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q3"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[11]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[11])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextque === "HER" ? "FEELS" : "FEEL"} CONFIDENT
          THAT {aboveTextans} {hh} ENOUGH KNOWLEDGE AND SUPPORT TO PARENT WELL.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q4"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q4", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q4"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[28]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[28])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextque === "HER" ? "FEELS" : "FEEL"} CONFIDENT
          THAT {aboveTextans} {hh} SAFE AND AFFORDABLE CHILDCARE.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q5"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q5", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q5"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[27]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[27])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextque === "HER" ? "FEELS" : "FEEL"} CONFIDENT
          THAT {aboveTextans} {hh} ENOUGH FURNITURE, CLOTHES, AND BABY SUPPLIES
          TO CARE FOR {aboveTextque} CHILD(REN) WELL.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q6"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q6", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q6"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[13]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[13])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} CONFIDENCE THAT {aboveTextque} FAMILY HAS ENOUGH
          MONEY TO LIVE.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q7"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q7", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q7"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[6]], true)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[6])?.name || ""
                )}
              </span>.{" "}
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} CONFIDENCE THAT {aboveTextque} FAMILY CAN FIND AND
          AFFORD MEDICAL SERVICES – INCLUDING PRENATAL, DENTAL, AND GENERAL CARE
          AS APPLICABLE.
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
          marginBottom: "40px",
        }}
        spacing={2}
      >
        {ansArr.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q8"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns("q8", e)}
            >
              {e}
            </div>
          </Grid>
        ))}
        {selectedAns["q8"] === ansArr[0] && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.suggDiv}>
              Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[3]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[3])?.name || ""
                )}
              </span>{" "}
              or{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[5]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[5])?.name || ""
                )}
              </span>{" "}
              or{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[27]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[27])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Step3;
