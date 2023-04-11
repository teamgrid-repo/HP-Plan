import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { capLetter } from "../../utils/CapFirstWord";
import { subCatIds } from "../../utils/catSubCatArray";

const Step2 = ({
  setSelectedAns,
  classes,
  selectedAns,
  aboveTextque,
  aboveTextans,
  goToLink,
  subCat = [],
}) => {
  const subAns = () => {
    if (selectedAns["q1"]) {
      switch (selectedAns["q1"]) {
        case "PREGNANT OR MIGHT BE PREGNANT.": {
          return (
            <>
              <div className={classes.queSub}>
                <div>
                  {aboveTextans === "I" ? "HAVE YOU" : "HAS SHE"} CONFIRMED{" "}
                  {aboveTextans === "I" ? "YOUR " : "HER "}
                  PREGNANCY VIA ULTRASOUND OR BLOOD TEST?
                </div>
              </div>
              <Grid
                container
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#2262ac",
                  textAlign: "center",
                }}
                spacing={2}
              >
                {["YES", "NO"].map((e, id) => (
                  <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                    <div
                      className={`${classes.ans} ${
                        selectedAns["q11"] === e ? classes.selectedAns : ""
                      }`}
                      onClick={() => setSelectedAns("q11", e)}
                    >
                      {e}
                    </div>
                  </Grid>
                ))}
                {selectedAns["q11"] === "NO" && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      {aboveTextans === "I" ? "Your" : "Her"} #1 priority could
                      be to confirm {aboveTextans === "I" ? "your" : "her"}{" "}
                      pregnancy for free at a pregnancy help organization. Click
                      here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[1]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[1])?.name || ""
                        )}
                      </span>{" "}
                      and look for those that have an ultrasound machine.
                    </div>
                  </Grid>
                )}
              </Grid>
            </>
          );
        }
        case "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2.": {
          return (
            <>
              <div className={classes.queSub}>
                <div>DO THESE UNBORN OR YOUNG CHILDREN HAVE SPECIAL NEEDS?</div>
              </div>
              <Grid
                container
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#2262ac",
                  textAlign: "center",
                }}
                spacing={2}
              >
                {["YES", "NO"].map((e, id) => (
                  <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                    <div
                      className={`${classes.ans} ${
                        selectedAns["q12"] === e ? classes.selectedAns : ""
                      }`}
                      onClick={() => setSelectedAns("q12", e)}
                    >
                      {e}
                    </div>
                  </Grid>
                ))}
                {selectedAns["q12"] === "YES" && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Search{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[21]], true)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[21])?.name ||
                            ""
                        )}
                      </span>{" "}
                      for help caring for children with special needs or medical
                      challenges.
                    </div>
                  </Grid>
                )}
              </Grid>
            </>
          );
        }
        case `EXPERIENCED PREGNANCY LOSS OR THE LOSS OF ${
          aboveTextans === "I" ? "MY" : "HER"
        } YOUNG CHILD.`: {
          return (
            <>
              <div className={classes.queSub}>
                <div>
                  {aboveTextans === "I" ? "I HAVE " : "SHE HAS "} EXPERIENCED
                  PREGNANCY LOSS OR THE LOSS OF{" "}
                  {aboveTextans === "I" ? "MY" : "HER"} YOUNG CHILD.
                </div>
              </div>
              <Grid
                container
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#2262ac",
                  textAlign: "center",
                }}
                spacing={2}
              >
                {[
                  "HAD AN ABORTION.",
                  "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT.",
                  "HAD A CHILD PLACED IN FOSTER CARE.",
                ].map((e, id) => (
                  <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                    <div
                      className={`${classes.ans} ${
                        selectedAns["q13"] === e ? classes.selectedAns : ""
                      }`}
                      onClick={() => setSelectedAns("q13", e)}
                    >
                      {aboveTextans} {e}
                    </div>
                  </Grid>
                ))}
                {selectedAns["q13"] === "HAD AN ABORTION." && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[20]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[20])?.name ||
                            ""
                        )}
                      </span>{" "}
                      for help after abortion.
                    </div>
                  </Grid>
                )}
                {selectedAns["q13"] ===
                  "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT." && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[25]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[25])?.name ||
                            ""
                        )}
                      </span>
                      .
                    </div>
                  </Grid>
                )}
                {selectedAns["q13"] ===
                  "HAD A CHILD PLACED IN FOSTER CARE." && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[31]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[31])?.name ||
                            ""
                        )}
                      </span>
                      .
                    </div>
                  </Grid>
                )}
              </Grid>
            </>
          );
        }
        case "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.": {
          return (
            <>
              <div className={classes.queSub}>
                <div>
                  {aboveTextans === "I" ? "I AM " : "SHE IS "} CONSIDERING
                  BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.
                </div>
              </div>
              <Grid
                container
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#2262ac",
                  textAlign: "center",
                }}
                spacing={2}
              >
                {[
                  "CONSIDERING ADOPTION.",
                  "CONSIDERING BECOMING A FOSTER PARENT.",
                ].map((e, id) => (
                  <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                    <div
                      className={`${classes.ans} ${
                        selectedAns["q14"] === e ? classes.selectedAns : ""
                      }`}
                      onClick={() => setSelectedAns("q14", e)}
                    >
                      {aboveTextans === "I" ? "I AM " : "SHE IS "} {e}
                    </div>
                  </Grid>
                ))}
                {selectedAns["q14"] === "CONSIDERING ADOPTION." && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[30]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[30])?.name ||
                            ""
                        )}
                      </span>
                      .
                    </div>
                  </Grid>
                )}
                {selectedAns["q14"] ===
                  "CONSIDERING BECOMING A FOSTER PARENT." && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[31], false])}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[31])?.name ||
                            ""
                        )}
                      </span>
                      .
                    </div>
                  </Grid>
                )}
              </Grid>
            </>
          );
        }
        default:
          return null;
      }
    } else {
      return null;
    }
  };
  const subSubAns = () => {
    if (
      selectedAns["mainAns"] === 1 &&
      selectedAns["q11"] &&
      selectedAns["q11"] === "YES"
    ) {
      return (
        <>
          <div className={classes.queSub}>
            <div>
              HOW {aboveTextans === "I" ? "DO" : "DOES"}{" "}
              {aboveTextans === "I" ? "YOU" : "SHE"} FEEL ABOUT{" "}
              {aboveTextans === "I" ? "YOUR " : "HER "}
              PREGNANCY?
            </div>
          </div>
          <Grid
            container
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#2262ac",
              textAlign: "center",
            }}
            spacing={2}
          >
            {[
              "NOT SURE ABOUT CONTINUING THIS PREGNANCY.",
              "CONSIDERING ABORTION.",
              `TOOK THE FIRST ABORTION PILL, BUT NOW ${
                aboveTextans === "I" ? "I AM" : "SHE IS"
              } HAVING REGRETS.`,
              `PLANNING TO CARRY ${
                aboveTextans === "I" ? "MY" : "HER"
              } PREGNANCY TO TERM BUT ${
                aboveTextans === "I" ? "I'M" : "SHE IS"
              } NOT SURE ${
                aboveTextans === "I" ? "I" : "SHE"
              } CAN TAKE CARE OF ${aboveTextans === "I" ? "MY" : "HER"} CHILD.`,
            ].map((e, id) => (
              <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                <div
                  className={`${classes.ans} ${
                    selectedAns["q111"] === e ? classes.selectedAns : ""
                  }`}
                  onClick={() => setSelectedAns("q111", e)}
                >
                  {`${aboveTextans} ${
                    id !== 2 ? (aboveTextans === "I" ? "AM" : "IS") : ""
                  }`}{" "}
                  {e}
                </div>
              </Grid>
            ))}
            {selectedAns["q111"] ===
              "NOT SURE ABOUT CONTINUING THIS PREGNANCY." && (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.suggDiv}>
                  Click here to view{" "}
                  <span
                    style={{ color: "#2EADF3", cursor: "pointer" }}
                    onClick={() => goToLink([subCatIds[1]], false)}
                  >
                    {capLetter(
                      subCat.find((a) => a._id === subCatIds[1])?.name || ""
                    )}
                  </span>{" "}
                  in your area to talk through options.
                </div>
              </Grid>
            )}
            {selectedAns["q111"] ===
              `TOOK THE FIRST ABORTION PILL, BUT NOW ${
                aboveTextans === "I" ? "I AM" : "SHE IS"
              } HAVING REGRETS.` && (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.suggDiv}>
                  Call 877-558-0333 (24/7) or visit{" "}
                  <a
                    href="https://www.abortionpillreversal.com/"
                    target="_blank"
                  >
                    Abortion Pill Reversal
                  </a>
                </div>
              </Grid>
            )}
            {selectedAns["q111"] ===
              `PLANNING TO CARRY ${
                aboveTextans === "I" ? "MY" : "HER"
              } PREGNANCY TO TERM BUT ${
                aboveTextans === "I" ? "I'M" : "SHE IS"
              } NOT SURE ${
                aboveTextans === "I" ? "I" : "SHE"
              } CAN TAKE CARE OF ${
                aboveTextans === "I" ? "MY" : "HER"
              } CHILD.` && (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.suggDiv}>
                  Sometimes parents who feel they can’t care for their children
                  make a plan for open adoption so they can still be in their
                  child’s life while giving them the best chances of success. Go
                  to{" "}
                  <span
                    style={{ color: "#2EADF3", cursor: "pointer" }}
                    onClick={() => goToLink([subCatIds[30]], false)}
                  >
                    {capLetter(
                      subCat.find((a) => a._id === subCatIds[30])?.name || ""
                    )}
                  </span>{" "}
                  for high-quality programs in your area to learn more for free.
                </div>
              </Grid>
            )}
          </Grid>
          {selectedAns["q111"] === "CONSIDERING ABORTION." && (
            <>
              <div className={classes.queSub}>
                <div>
                  {`${aboveTextans} ${aboveTextans === "I" ? "AM" : "IS"}`}{" "}
                  CONSIDERING ABORTION.
                </div>
              </div>
              <Grid
                container
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#2262ac",
                  textAlign: "center",
                }}
                spacing={2}
              >
                {[
                  `${
                    aboveTextans === "I" ? "FEEL" : "FEELS"
                  } THIS MIGHT BE THE BEST DECISION FOR ${
                    aboveTextans === "I" ? "ME" : "HER"
                  }.`,
                  "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION.",
                ].map((e, id) => (
                  <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                    <div
                      className={`${classes.ans} ${
                        selectedAns["q112"] === e ? classes.selectedAns : ""
                      }`}
                      onClick={() => setSelectedAns("q112", e)}
                    >
                      {`${aboveTextans} ${
                        id > 0 ? (aboveTextans === "I" ? "HAVE" : "HAS") : ""
                      }`}{" "}
                      {e}
                    </div>
                  </Grid>
                ))}
                {selectedAns["q112"] ===
                  `${
                    aboveTextans === "I" ? "FEEL" : "FEELS"
                  } THIS MIGHT BE THE BEST DECISION FOR ${
                    aboveTextans === "I" ? "ME" : "HER"
                  }.` && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      We understand pregnancy decisions are complicated. Many
                      woman find they benefit from discussing their options with
                      a pregnancy help organization. Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[1]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[1])?.name || ""
                        )}
                      </span>{" "}
                      or continue the quiz.
                    </div>
                  </Grid>
                )}

                {selectedAns["q112"] ===
                  "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION." && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.suggDiv}>
                      Doctors sometimes recommend abortion if there is something
                      wrong with the mom or baby, but abortion is often not
                      actually necessary in these cases, the doctor may just not
                      be trained to handle your case. You have the option to
                      continue your pregnancy. If your doctor is recommending
                      abortion because he thinks your life is at risk, you can
                      get a second opinion by searching{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[3]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[3])?.name || ""
                        )}
                      </span>
                      . The danger may not be immediate; you may be able to keep
                      going with the pregnancy with careful monitoring to see if
                      your condition improves, or to see if your body miscarries
                      naturally. If you are in immediate danger, early induction
                      is a safe alternative to dismemberment abortion that
                      allows you to say goodbye to your baby.
                      <br />
                      <br />
                      If your doctor is recommending abortion because of the
                      condition of the unborn baby, search{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[21]], true)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[21])?.name ||
                            ""
                        )}
                      </span>{" "}
                      to find resources to care for a baby with disabilities or
                      medical conditions, or resources to say goodbye without
                      abortion through a Perinatal Hospice Program. You can also
                      search{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[30]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[30])?.name ||
                            ""
                        )}
                      </span>{" "}
                      if you think you might be unable to care for your child
                      but want to make a plan for their care. Another family may
                      be wanting and even requesting a special needs child.
                    </div>
                  </Grid>
                )}
              </Grid>
            </>
          )}
          <div className={classes.queSub}>
            <div>SPECIAL QUESTIONS</div>
          </div>
          <Grid
            container
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#2262ac",
              textAlign: "left",
            }}
            spacing={2}
          >
            {[
              `${
                aboveTextans === "I" ? "ARE YOU " : "IS SHE "
              }WANTING HELP WITH BIRTH ASSISTANCE AND EDUCATION, OR POST-PARTUM AND/OR BREASTFEEDING SUPPORT?`,
              `${
                aboveTextans === "I" ? "DOES YOUR " : "DOES HER "
              }UNBORN BABY HAVE A DIAGNOSIS OF AN ABNORMAL DISABILITY OR MEDICAL CONDITION?`,
              `${
                aboveTextans === "I" ? "DO YOU " : "DOES SHE "
              }WANT INFORMATION ON HEALTHY PARENTING?`,
            ].map((e, id) => (
              <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAns["spq"][id]}
                      onChange={(e) => {
                        let op = {
                          ...selectedAns["spq"],
                          [id]: e.target.checked,
                        };
                        setSelectedAns("spq", op);
                      }}
                    />
                  }
                  label={e}
                />
              </Grid>
            ))}
            {(selectedAns["spq"]["0"] ||
              selectedAns["spq"]["1"] ||
              selectedAns["spq"]["2"]) && (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.suggDiv}>
                  {selectedAns["spq"]["0"] && (
                    <>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[4]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[4])?.name || ""
                        )}
                      </span>
                      <br />
                      <br />
                    </>
                  )}
                  {selectedAns["spq"]["1"] && (
                    <>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[21]], true)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[21])?.name ||
                            ""
                        )}
                      </span>{" "}
                      <br />
                      <br />
                    </>
                  )}
                  {selectedAns["spq"]["2"] && (
                    <>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => goToLink([subCatIds[28]], false)}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[28])?.name ||
                            ""
                        )}
                      </span>
                      .
                      <br />
                    </>
                  )}
                </div>
              </Grid>
            )}
          </Grid>
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <div className={classes.queMain}>
        <div>WHAT IS{aboveTextque}BASIC SITUATION?</div>
        <div
          style={{
            color: "#696871",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.75,
            paddingTop: "21px",
          }}
        >
          Select One Option
        </div>
      </div>
      <Grid
        container
        style={{
          fontSize: "20px",
          fontWeight: 500,
          color: "#2262ac",
          textAlign: "center",
        }}
        spacing={2}
      >
        {[
          "PREGNANT OR MIGHT BE PREGNANT.",
          "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2.",
          `EXPERIENCED PREGNANCY LOSS OR THE LOSS OF ${
            aboveTextans === "I" ? "MY" : "HER"
          } YOUNG CHILD.`,
          "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.",
        ].map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns["q1"] === e ? classes.selectedAns : ""
              }`}
              onClick={() => {
                setSelectedAns("q1", e);
                setSelectedAns("mainAns", id + 1);
              }}
            >
              {aboveTextans === "I"
                ? `${aboveTextans} ${id === 2 ? "HAVE " : "AM "} `
                : `${aboveTextans} ${id === 2 ? "HAS " : "IS "}`}
              {e}
            </div>
          </Grid>
        ))}
      </Grid>
      {subAns()}
      {subSubAns()}
    </div>
  );
};

export default Step2;
