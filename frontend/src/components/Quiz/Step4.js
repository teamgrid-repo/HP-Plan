import { Grid } from "@mui/material";
import { capLetter } from "../../utils/CapFirstWord";
import { subCatIds } from "../../utils/catSubCatArray";
const ansArr = ["Yes", "No"];
const Step4 = ({
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
        <div>SPECIAL QUESTIONS</div>
        {/* <div
          style={{
            color: "#696871",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.75,
            paddingTop: "21px",
          }}
        >
          SPECIAL QUESTIONS
        </div> */}
      </div>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} CURRENTLY EXPERIENCING SUICIDAL THOUGHTS.
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
              HOTLINES:
              <ul>
                {[
                  {
                    number: "1-800-273-8255",
                    title: "National Suicide Prevention Hotline",
                    link: "https://suicidepreventionlifeline.org/",
                  },
                  {
                    number: "1-877-726-472",
                    title:
                      "Substance Abuse and Mental Health Services Administration",
                    link: "https://www.samhsa.gov/",
                  },
                ].map((a, i) => (
                  <li key={i} style={{ lineHeight: 2.1 }}>
                    {a.number}:{" "}
                    <a href={a.link} target="_blank" style={{ color: "#2EADF3" }}>
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} CURRENTLY STRUGGLING WITH SUBSTANCE ABUSE OR
          ADDICTION.
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
              HOTLINES:
              <ul>
                {[
                  {
                    number: "1-844-289-087",
                    title: "National Drug Helpline",
                    link: "http://drughelpline.org/",
                  },
                  {
                    number: "1-877-726-472",
                    title:
                      "Substance Abuse and Mental Health Services Administration",
                    link: "https://www.samhsa.gov/",
                  },
                ].map((a, i) => (
                  <li key={i} style={{ lineHeight: 2.1 }}>
                    {a.number}:{" "}
                    <a href={a.link} target="_blank" style={{ color: "#2EADF3" }}>
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} STRUGGLING WITH GRIEF, TRAUMA, RELATIONSHIP
          ISSUES, DEPRESSION, ANXIETY, OR OTHER EMOTIONAL PROBLEMS.
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
                onClick={() => goToLink([subCatIds[19]], false)}
              >
                {" "}
                {subCat.find((a) => a._id === subCatIds[19])?.name || ""}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {hh} STRUGGLING TO ADJUST AFTER THE BIRTH OF A CHILD
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
                onClick={() => goToLink([subCatIds[5]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[5])?.name || ""
                )}
              </span>
              . Or Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[19]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[19])?.name || ""
                )}
              </span>
              . If the adjustment is adoption-related, Click here to view{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[28]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[28])?.name || ""
                )}
              </span>{" "}
              or{" "}
              <span
                style={{ color: "#2EADF3", cursor: "pointer" }}
                onClick={() => goToLink([subCatIds[30]], false)}
              >
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[30])?.name || ""
                )}
              </span>
              .
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextans === "SHE" ? "HAS" : "HAVE"} BEEN RAPED,
          ASSAULTED, TRAFFICKED, OR ABUSED.
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
                onClick={() => goToLink([subCatIds[18]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[18])?.name || ""
                )}
              </span>
              <br />
              <br />
              HOTLINES:
              <ul>
                {[
                  {
                    number: "1-888-373-7888 (text 233733)",
                    title: "National Human Trafficking Hotline",
                    link: "https://humantraffickinghotline.org/",
                  },
                ].map((a, i) => (
                  <li key={i} style={{ lineHeight: 2.1 }}>
                    {a.number}:{" "}
                    <a href={a.link} target="_blank" style={{ color: "#2EADF3" }}>
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        )}
      </Grid>
      <div className={classes.queSub}>
        <div>
          {aboveTextans} {aboveTextans === "I" ? "NEED" : "NEEDS"} HELP WITH A
          LEGAL SITUATION.
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
                onClick={() => goToLink([subCatIds[15]], false)}
              >
                {" "}
                {capLetter(
                  subCat.find((a) => a._id === subCatIds[15])?.name || ""
                )}
              </span>.
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Step4;
