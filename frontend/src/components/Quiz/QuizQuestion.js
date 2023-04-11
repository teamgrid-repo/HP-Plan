import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, ButtonBase, Card, Grid, Slider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const QuizQuestion = ({
  classes,
  step,
  back,
  nextQue,
  subCat,
  ans = {},
  handleAns = () => {},
  goToLink = () => {},
}) => {
  const [goNext, setGoNext] = useState(false);
  const loadNextStatus = () => {
    if (ans && ans[step]) {
      switch (step) {
        case 1: {
          if (ans[step].q1) {
            setGoNext(true);
          } else {
            setGoNext(false);
          }
          break;
        }
        case 2: {
          if (
            ans[step].q1 &&
            (ans[step].q11 || ans[step].q12 || ans[step].q13 || ans[step].q14)
          ) {
            setGoNext(true);
          } else {
            setGoNext(false);
          }
          break;
        }
        case 3: {
          if (
            ans[step].q1 &&
            ans[step].q2 &&
            ans[step].q3 &&
            ans[step].q4 &&
            ans[step].q5 &&
            ans[step].q6 &&
            ans[step].q7 &&
            ans[step].q8
          ) {
            setGoNext(true);
          } else {
            setGoNext(false);
          }
          break;
        }
        case 4: {
          if (
            ans[step].q1 &&
            ans[step].q2 &&
            ans[step].q3 &&
            ans[step].q4 &&
            ans[step].q5 &&
            ans[step].q6
          ) {
            setGoNext(true);
          } else {
            setGoNext(false);
          }
          break;
        }
      }
    } else {
      setGoNext(false);
    }
  };
  useEffect(() => {
    loadNextStatus();
  }, [ans, step]);
  return (
    <Stack direction="column" spacing={3} textAlign="center" margin={2}>
      <div style={{ maxHeight: "700px", overflow: "auto", padding: "20px" }}>
        {step === 1 ? (
          <Step1
            qid="q1"
            que="I'M LOOKING FOR HELP FOR…"
            ans={["A CLIENT OR PATIENT", "A FRIEND OR FAMILY MEMBER", "MYSELF"]}
            setSelectedAns={(id, e) => handleAns(id, e)}
            classes={classes}
            selectedAns={ans[step]}
          />
        ) : null}
        {step === 2 ? (
          <Step2
            setSelectedAns={(id, e) => handleAns(id, e)}
            classes={classes}
            selectedAns={ans[step]}
            aboveTextans={ans["1"]["q1"] === "MYSELF" ? "I" : "SHE"}
            aboveTextque={ans["1"]["q1"] === "MYSELF" ? " YOUR " : " HER "}
            goToLink={(name, all) => goToLink(name, all)}
            subCat={subCat}
          />
        ) : null}
        {step === 3 ? (
          <Step3
            setSelectedAns={(id, e) => handleAns(id, e)}
            classes={classes}
            selectedAns={ans[step]}
            aboveTextans={ans["1"]["q1"] === "MYSELF" ? "I" : "SHE"}
            aboveTextque={ans["1"]["q1"] === "MYSELF" ? "MY" : "HER"}
            hh={ans["1"]["q1"] === "MYSELF" ? "HAVE" : "HAS"}
            goToLink={(name, all) => goToLink(name, all)}
            subCat={subCat}
          />
        ) : null}
        {step === 4 ? (
          <Step4
            setSelectedAns={(id, e) => handleAns(id, e)}
            classes={classes}
            selectedAns={ans[step]}
            aboveTextans={ans["1"]["q1"] === "MYSELF" ? "I" : "SHE"}
            aboveTextque={ans["1"]["q1"] === "MYSELF" ? "MY" : "HER"}
            hh={ans["1"]["q1"] === "MYSELF" ? "AM" : "IS"}
            goToLink={(name, all) => goToLink(name, all)}
            subCat={subCat}
          />
        ) : null}
      </div>
      <Card
        style={{
          marginTop: "56px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "1em",
          overflow: "visible",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            lg={1}
            xs={6}
            sm={2}
            md={2}
            order={{ xs: 2, lg: 1, md: 1, sm: 1 }}
            textAlign="left"
          >
            <ButtonBase
              style={{
                paddingTop: "0.2em",
                background: "#F1F7F6",
                borderRadius: "8px",
                width: "80%",
              }}
              onClick={back}
            >
              <ArrowBack
                style={{ padding: "0.3em", color: "#7dbaaf", opacity: "1" }}
              />
            </ButtonBase>
          </Grid>
          <Grid
            item
            lg={8}
            xs={12}
            sm={8}
            md={8}
            order={{ xs: 1 }}
            textAlign="center"
          >
            <div style={{ marginTop: "0.2em" }}>
              <Slider
                size="medium"
                valueLabelDisplay="auto"
                step={25}
                min={0}
                value={step * 25}
                max={100}
                valueLabelFormat={(v) => `${v}% complete keep it up`}
                style={{ color: "#7dbaaf" }}
              />
            </div>
          </Grid>
          <Grid
            item
            lg={3}
            xs={6}
            sm={2}
            md={2}
            order={{ xs: 2 }}
            textAlign="right"
          >
            <Button
              variant="contained"
              fullWidth
              style={{
                background: "#7dbaaf",
                textTransform: "none",
                marginTop: "0.2em",
              }}
              onClick={() =>
                goNext ? nextQue() : toast.error("Please Select Answer")
              }
            >
              Next Question
              <ArrowForward />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default QuizQuestion;
