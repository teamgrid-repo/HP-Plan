import { Button, Card, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { bindActionCreators } from "redux";
import QuizImg from "../../assets/images/TakeTheQuizimg.png";
import { getCat } from "../../redux/actions/category/categoryAction";
import CancelToken from "../../utils/cancelClass";
import { locFromAdd } from "../../utils/locFromAdd";
import LoadingComponent from "../UI/LoadingComponent";
import QuizQuestion from "./QuizQuestion";
const ctc = new CancelToken();
const useStyle = makeStyles((theme) => ({
  quizContainer: {
    padding: "8em 0px 22em 0px",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    fontFamily: "Montserrat",
  },
  ans: {
    backgroundColor: "#fff",
    margin: "15px 0px 15px 0px",
    padding: "25px 0px 25px 0px",
    cursor: "pointer",
  },
  selectedAns: {
    backgroundColor: "#2262ac",
    color: "white",
  },
  suggDiv: {
    backgroundColor: "#D0EAF5",
    color: "black",
    padding: "20px",
    textAlign: "left",
    fontWeight: 200,
  },
  queMain: {
    fontSize: "36px",
    fontWeight: 600,
    color: "#2d2a43",
    lineHeight: 1.4,
    paddingBottom: "61px",
    marginTop: "60px",
  },
  queSub: {
    fontSize: "28px",
    fontWeight: 400,
    color: "#2d2a43",
    lineHeight: 1.4,
    paddingBottom: "61px",
    marginTop: "60px",
  },
}));

const Quiz = () => {
  const loc = useNavigate();

  const classes = useStyle();
  const [step, setStep] = useState(1);
  const [survey, setSurvey] = useState(false);

  const [ans, setAns] = useState({
    1: { q1: "" },
    2: { spq: { 0: false, 1: false, 2: false } },
    3: {},
    4: {},
  });
  const [cat, setCat] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const actions = bindActionCreators({ getCat }, dispatch);
  const catRes = useSelector((state) => state.cat.cats);

  const setUpSUbCats = (res) => {
    if (res && res.length) {
      setCat(() => res);
      const d = [];
      res.forEach((e) => {
        d.push(...Object.values(e.subCategory));
        d.push(e.category);
      });
      setSubCat(() => d);
    } else {
      setCat(() => []);
    }
  };
  const loadData = async () => {
    setLoading(true);
    if (!catRes) {
      ctc.createToken();
      const res = await actions.getCat(ctc.getToken());
      setUpSUbCats(res);
    } else {
      setUpSUbCats(catRes);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
    locFromAdd("quiz");
    return () => ctc.cancelTheApi();
  }, []);

  const goToLink = (name, all) => {
    const ds = {
      category: [],
      price: [],
      leaf: false,
      specialQualification: [],
      additionalResource: false,
      keywords: "",
      states: [],
    };

    if (cat && cat.length && name && name.length) {
      if (all) {
        let cd = cat.find((n) => n.category._id === name[0]);
        if (cd) cd.subCategory.forEach((i) => ds.category.push(i._id));
      } else if (subCat && subCat.length) {
        ds.category = name;
      }
    }
    loc(`/provider-search?${JSON.stringify(ds)}`);
  };
  const handleAns = (id, op) => {
    const newAns = { ...ans };
    newAns[step][id] = op;
    setAns({ ...newAns });
  };
  return (
    <div style={{ background: survey ? "#fafafb" : "white" }}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className={classes.quizContainer}>
          <Card
            style={survey ? { background: "#fafafb", boxShadow: "none" } : {}}
          >
            {survey ? (
              <QuizQuestion
                classes={classes}
                nextQue={() =>
                  step < 4
                    ? setStep((old) => old + 1)
                    : loc(`/quiz-result?${JSON.stringify(ans)}`)
                }
                back={() =>
                  step > 1 ? setStep((old) => old - 1) : setSurvey(false)
                }
                step={step}
                ans={ans}
                subCat={subCat}
                handleAns={(a, b) => handleAns(a, b)}
                goToLink={(name, all) => goToLink(name, all)}
              />
            ) : (
              <Grid container>
                <Grid item lg={5} md={12} sm={12} xs={12} textAlign="left">
                  <img src={QuizImg} alt="quiz1" style={{ width: "100%" }} />
                </Grid>
                <Grid item lg={7} md={12} sm={12} xs={12}>
                  <Stack
                    direction="column"
                    spacing={2}
                    margin={6}
                    textAlign="left"
                  >
                    <div
                      style={{
                        lineHeight: 1.5,
                        fontSize: "24px",
                        color: "#524f4f",
                        paddingBottom: "34px",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: "#2262ac" }}>
                        TAKE THE QUIZ
                      </div>
                      <div>Not sure what to search for?</div>
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "#7e7e7e",
                        lineHeight: 1.75,
                        letterSpacing: "normal",
                        paddingBottom: "5px",
                      }}
                    >
                      The Her PLAN quiz is a tool to identify the services that
                      will be most helpful to a pregnant or parenting woman
                      seeking assistance. The Her PLAN quiz was developed by an
                      experienced case manager with a masters in social work.
                      The quiz's three sections – recommendations based on her
                      situation, confidence rankings, and special questions –
                      are intentionally organized to address the area(s) of
                      greatest need first. The quiz will link to recommended Her
                      PLAN search results based on the answers.
                      <br />
                      <br />
                      You will be able to save quiz results for future reference
                      if you have created a free Her PLAN account.
                    </div>

                    {/* <div
                      style={{
                        lineHeight: 2.25,
                        color: "#4f8ead",
                        fontSize: "16px",
                        fontWeight: 500,
                        paddingBottom: "21px",
                      }}
                    >
                      ✓ Malesuada in augue congue a sit risus.
                      <br />
                      ✓ Faucibus quis non orci, aliquam. <br />✓ Interdum
                      vivamus nisi, convallis sed.
                    </div> */}

                    <div>
                      <Button
                        style={{
                          margin: "21px 241px 0 0",
                          padding: "18px 38px 17px 39px",
                          borderRadius: "5px",
                          backgroundColor: "#4f8ead",
                          textTransform: "none",
                        }}
                        variant="contained"
                        onClick={() => setSurvey(true)}
                      >
                        Start Quiz
                      </Button>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Quiz;
