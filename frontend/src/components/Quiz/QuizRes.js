import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import config from "../../config";
import { getCat } from "../../redux/actions/category/categoryAction";
import { emailQuiz } from "../../redux/actions/Home/HomeActions";
import { capLetter } from "../../utils/CapFirstWord";
import { subCatIds } from "../../utils/catSubCatArray";
import LoadingComponent from "../UI/LoadingComponent";
import LoginModal from "../UI/LoginModal";
import EmailQuiz from "./EmailQuiz";
import QuizHeader from "./QuizHeader";
import ResCard from "./ResCard";
import SaveQuizModal from "./SaveQuizModal";

const ans1 = "Not Secure/SomeWhat Secure";
const ans2 = "Yes";
const useStyle = makeStyles((theme) => ({
  container: {
    padding: "4em 0px 22em 0px",
    width: "80%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    fontFamily: "Montserrat",
  },
}));

const QuizRes = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const classes = useStyle();
  const parms = useLocation();
  const [ans, setAns] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
  const [cat, setCat] = useState([]);
  const loc = useNavigate();
  const [openEmail, setOpenEmail] = useState(false);
  const [idss, setIdss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCat, setSubCat] = useState([]);
  const [ele, setEle] = useState({ 1: "", 2: "", 3: "" });
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getCat, emailQuiz }, dispatch);

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
    await setLoading(() => true);

    if (
      parms &&
      parms.search &&
      parms.search.split("?")[1] &&
      decodeURI(parms.search.split("?")[1])
    ) {
      const url = `${decodeURI(parms.search.split("?")[1]).replace(/'/g, '"')}`;
      if (url) {
        const data = await JSON.parse(url);
        if (!catRes) {
          const res = await actions.getCat();
          setUpSUbCats(res);
        } else {
          setUpSUbCats(catRes);
        }
        await setAns(() => data);
      }
    }
    await setLoading(() => false);
  };
  const uu = useSelector((state) => state.auth.user);
  useEffect(() => {}, [uu]);
  const [waitData, setWaitData] = useState("");
  useEffect(() => {
    if (subCat && subCat.length) {
      const url = `${decodeURI(parms.search.split("?")[1]).replace(/'/g, '"')}`;
      if (url) {
        const data = JSON.parse(url);
        setWaitData(() => data);
      }
    }
  }, [subCat]);
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (waitData) {
      const one = subAns(waitData["2"], 1);
      const two = subAns(waitData["3"], 2);
      const three = subAns(waitData["4"], 3);
      setEle(() => {
        return { 1: one, 2: two, 3: three };
      });
    }
  }, [waitData]);
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
  const handleEmail = async (email) => {
    setLoading(true);

    await actions.emailQuiz({
      url: `${config.url}quiz-result?${JSON.stringify(ans)}`,
      email: email,
    });
    setOpenEmail(false);
    setLoading(false);
  };
  const subAns = (selectedAns, first) => {
    const sgA = [];
    const ids = [];
    if (selectedAns)
      switch (first) {
        case 1: {
          if (
            selectedAns["mainAns"] &&
            selectedAns["mainAns"] === 1 &&
            selectedAns["q11"] &&
            selectedAns["q11"] === "YES"
          ) {
            if (selectedAns["q111"]) {
              switch (selectedAns["q111"]) {
                case "NOT SURE ABOUT CONTINUING THIS PREGNANCY.": {
                  sgA.push(
                    <div className={classes.suggDiv}>
                      Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => {
                          goToLink([subCatIds[1]], false);
                        }}
                      >
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[1])?.name || ""
                        )}
                      </span>{" "}
                      in your area to talk through options.
                    </div>
                  );
                  ids.push({ cat: [subCatIds[1]], all: false });
                  break;
                }
                // ans["1"].q1 === "MYSELF" ?
                case `TOOK THE FIRST ABORTION PILL, BUT NOW ${
                  ans["1"].q1 === "MYSELF" ? "I AM" : "SHE IS"
                } HAVING REGRETS.`: {
                  sgA.push(
                    <div className={classes.suggDiv}>
                      Call 877-558-0333 (24/7) or visit{" "}
                      <a
                        href="https://www.abortionpillreversal.com/"
                        target="_blank"
                      >
                        Abortion Pill Reversal
                      </a>
                    </div>
                  );
                  break;
                }
                case `PLANNING TO CARRY ${
                  ans["1"].q1 === "MYSELF" ? "MY" : "HER"
                } PREGNANCY TO TERM BUT ${
                  ans["1"].q1 === "MYSELF" ? "I'M" : "SHE IS"
                } NOT SURE ${
                  ans["1"].q1 === "MYSELF" ? "I" : "SHE"
                } CAN TAKE CARE OF ${
                  ans["1"].q1 === "MYSELF" ? "MY" : "HER"
                } CHILD.`: {
                  sgA.push(
                    <div className={classes.suggDiv}>
                      Sometimes parents who feel they can’t care for their
                      children make a plan for open adoption so they can still
                      be in their child’s life while giving them the best
                      chances of success. Click here to view{" "}
                      <span
                        style={{ color: "#2EADF3", cursor: "pointer" }}
                        onClick={() => {
                          goToLink([subCatIds[30]], false);
                        }}
                      >
                        {" "}
                        {capLetter(
                          subCat.find((a) => a._id === subCatIds[30])?.name ||
                            ""
                        )}
                      </span>{" "}
                      for high-quality programs in your area to learn more for
                      free.
                    </div>
                  );
                  ids.push({ cat: [subCatIds[30]], all: false });
                  break;
                }
                case "CONSIDERING ABORTION.": {
                  if (selectedAns["q112"])
                    switch (selectedAns["q112"]) {
                      case `${
                        ans["1"].q1 === "MYSELF" ? "FEEL" : "FEELS"
                      } THIS MIGHT BE THE BEST DECISION FOR ${
                        ans["1"].q1 === "MYSELF" ? "ME" : "HER"
                      }.`: {
                        sgA.push(
                          <div className={classes.suggDiv}>
                            We understand pregnancy decisions are complicated.
                            Many woman find they benefit from discussing their
                            options with a pregnancy help organization. Click
                            here to view{" "}
                            <span
                              style={{ color: "#2EADF3", cursor: "pointer" }}
                              onClick={() => {
                                goToLink([subCatIds[1]], false);
                              }}
                            >
                              {capLetter(
                                subCat.find((a) => a._id === subCatIds[1])
                                  ?.name || ""
                              )}
                            </span>{" "}
                            or continue the quiz.
                          </div>
                        );
                        ids.push({ cat: [subCatIds[1]], all: false });

                        break;
                      }
                      case "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION.": {
                        sgA.push(
                          <div className={classes.suggDiv}>
                            Doctors sometimes recommend abortion if there is
                            something wrong with the mom or baby, but abortion
                            is often not actually necessary in these cases, the
                            doctor may just not be trained to handle your case.
                            You have the option to continue your pregnancy. If
                            your doctor is recommending abortion because he
                            thinks your life is at risk, you can get a second
                            opinion by searching
                            <span
                              style={{ color: "#2EADF3", cursor: "pointer" }}
                              onClick={() => {
                                goToLink([subCatIds[3]], false);
                              }}
                            >
                              {" "}
                              {capLetter(
                                subCat.find((a) => a._id === subCatIds[3])
                                  ?.name || ""
                              )}
                            </span>
                            . The danger may not be immediate; you may be able
                            to keep going with the pregnancy with careful
                            monitoring to see if your condition improves, or to
                            see if your body miscarries naturally. If you are in
                            immediate danger, early induction is a safe
                            alternative to dismemberment abortion that allows
                            you to say goodbye to your baby.
                            <br />
                            <br />
                            If your doctor is recommending abortion because of
                            the condition of the unborn baby, search{" "}
                            <span
                              style={{ color: "#2EADF3", cursor: "pointer" }}
                              onClick={() => {
                                goToLink([subCatIds[21]], true);
                              }}
                            >
                              {capLetter(
                                subCat.find((a) => a._id === subCatIds[21])
                                  ?.name || ""
                              )}
                            </span>{" "}
                            to find resources to care for a baby with
                            disabilities or medical conditions, or resources to
                            say goodbye without abortion through a Perinatal
                            Hospice Program. You can also search{" "}
                            <span
                              style={{ color: "#2EADF3", cursor: "pointer" }}
                              onClick={() => {
                                goToLink([subCatIds[30]], false);
                              }}
                            >
                              {capLetter(
                                subCat.find((a) => a._id === subCatIds[30])
                                  ?.name || ""
                              )}
                            </span>{" "}
                            if you think you might be unable to care for your
                            child but want to make a plan for their care.
                            Another family may be wanting and even requesting a
                            special needs child.
                          </div>
                        );
                        ids.push(
                          {
                            cat: [subCatIds[3]],
                            all: false,
                          },
                          {
                            cat: [subCatIds[21]],
                            all: false,
                          },
                          {
                            cat: [subCatIds[30]],
                            all: true,
                          }
                        );
                        break;
                      }
                    }
                  break;
                }
              }
            }
          } else {
            if (selectedAns["q1"])
              switch (selectedAns["q1"]) {
                case "PREGNANT OR MIGHT BE PREGNANT.": {
                  if (selectedAns["q11"] === "NO") {
                    sgA.push(
                      <div className={classes.suggDiv}>
                        {" "}
                        {ans["1"].q1 === "MYSELF" ? "Your" : "Her"} #1 priority
                        could be to confirm{" "}
                        {ans["1"].q1 === "MYSELF" ? "your" : "her"} pregnancy
                        for free at a pregnancy help organization. Click here to
                        view{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[1]], false);
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[1])?.name ||
                              ""
                          )}
                        </span>{" "}
                        and look for those that have an ultrasound machine.
                      </div>
                    );
                    ids.push({
                      cat: [subCatIds[1]],
                      all: false,
                    });
                  }
                  break;
                }
                case "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2.": {
                  if (selectedAns["q12"] === "YES") {
                    sgA.push(
                      <div className={classes.suggDiv}>
                        Search{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[21]], true);
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[21])?.name ||
                              ""
                          )}
                        </span>{" "}
                        for help caring for children with special needs or
                        medical challenges.
                      </div>
                    );

                    ids.push({
                      cat: [subCatIds[21]],
                      all: true,
                    });
                  }
                  break;
                }
                case `EXPERIENCED PREGNANCY LOSS OR THE LOSS OF ${
                  ans["1"].q1 === "MYSELF" ? "MY" : "HER"
                } YOUNG CHILD.`: {
                  if (selectedAns["q13"] === "HAD AN ABORTION.") {
                    sgA.push(
                      <div className={classes.suggDiv}>
                        Click here to view{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[20]], false);
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[20])?.name ||
                              ""
                          )}
                        </span>{" "}
                        for help after abortion.
                      </div>
                    );
                    ids.push({
                      cat: [subCatIds[20]],
                      all: false,
                    });
                  }
                  if (
                    selectedAns["q13"] ===
                    "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT."
                  ) {
                    sgA.push(
                      <div className={classes.suggDiv}>
                        Click here to view{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[25], false]);
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[25])?.name ||
                              ""
                          )}
                        </span>
                        .
                      </div>
                    );
                    ids.push({
                      cat: [subCatIds[25]],
                      all: false,
                    });
                  }
                  if (
                    selectedAns["q13"] === "HAD A CHILD PLACED IN FOSTER CARE."
                  ) {
                    sgA.push(
                      <div className={classes.suggDiv}>
                        Click here to view{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[31]], false);
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[31])?.name ||
                              ""
                          )}
                        </span>
                        .
                      </div>
                    );
                    ids.push({
                      cat: [subCatIds[31]],
                      all: false,
                    });
                  }
                  break;
                }
                case "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.": {
                  if (selectedAns["q14"] === "CONSIDERING ADOPTION.")
                    sgA.push(
                      <div className={classes.suggDiv}>
                        Click here to view{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[30]], false);
                            ids.push({
                              cat: [subCatIds[30]],
                              all: false,
                            });
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[30])?.name ||
                              ""
                          )}
                        </span>
                        .
                      </div>
                    );

                  if (
                    selectedAns["q14"] ===
                    "CONSIDERING BECOMING A FOSTER PARENT."
                  )
                    sgA.push(
                      <div className={classes.suggDiv}>
                        Click here to view{" "}
                        <span
                          style={{ color: "#2EADF3", cursor: "pointer" }}
                          onClick={() => {
                            goToLink([subCatIds[31]], false);
                            ids.push({
                              cat: [subCatIds[31]],
                              all: false,
                            });
                          }}
                        >
                          {capLetter(
                            subCat.find((a) => a._id === subCatIds[31])?.name ||
                              ""
                          )}
                        </span>
                        .
                      </div>
                    );
                  break;
                }
              }
          }
          break;
        }
        case 2: {
          if (selectedAns["q1"] && selectedAns["q1"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[12]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[12])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[12]],
              all: false,
            });
          }
          if (selectedAns["q2"] && selectedAns["q2"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[14]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[14])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[14]],
              all: false,
            });
          }
          if (selectedAns["q3"] && selectedAns["q3"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[11]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[11])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[11]],
              all: false,
            });
          }
          if (selectedAns["q4"] && selectedAns["q4"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[28]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[28])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[28]],
              all: false,
            });
          }
          if (selectedAns["q5"] && selectedAns["q5"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[27]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[27])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[27]],
              all: false,
            });
          }
          if (selectedAns["q6"] && selectedAns["q6"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[13]], false);
                  }}
                >
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[13])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[13]],
              all: false,
            });
          }
          if (selectedAns["q7"] && selectedAns["q7"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[6]], true);
                  }}
                >
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[6])?.name || ""
                  )}
                </span>
                .{" "}
              </div>
            );
            ids.push({
              cat: [subCatIds[6]],
              all: true,
            });
          }
          if (selectedAns["q8"] && selectedAns["q8"] === ans1) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[3]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[3])?.name || ""
                  )}
                </span>{" "}
                or{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[5]], false);
                  }}
                >
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[5])?.name || ""
                  )}
                </span>{" "}
                or{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[27]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[27])?.name || ""
                  )}
                </span>{" "}
                .
              </div>
            );
            ids.push(
              {
                cat: [subCatIds[3]],
                all: false,
              },
              {
                cat: [subCatIds[5]],
                all: false,
              },
              {
                cat: [subCatIds[27]],
                all: false,
              }
            );
          }

          break;
        }
        case 3: {
          if (selectedAns["q1"] && selectedAns["q1"] === ans2) {
            sgA.push(
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
                      <a
                        href={a.link}
                        target="_blank"
                        style={{ color: "#2EADF3" }}
                      >
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          if (selectedAns["q2"] && selectedAns["q2"] === ans2) {
            sgA.push(
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
                      <a
                        href={a.link}
                        target="_blank"
                        style={{ color: "#2EADF3" }}
                      >
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          if (selectedAns["q3"] && selectedAns["q3"] === ans2) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[19]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[19])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[19]],
              all: false,
            });
          }
          if (selectedAns["q4"] && selectedAns["q4"] === ans2) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[5]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[5])?.name || ""
                  )}
                </span>
                . Or Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[19]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[19])?.name || ""
                  )}
                </span>
                . If the adjustment is adoption-related, Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[28]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[28])?.name || ""
                  )}
                </span>{" "}
                or{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[30]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[30])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push(
              {
                cat: [subCatIds[5]],
                all: false,
              },
              {
                cat: [subCatIds[19]],
                all: false,
              },
              {
                cat: [subCatIds[28]],
                all: false,
              },
              {
                cat: [subCatIds[30]],
                all: false,
              }
            );
          }
          if (selectedAns["q5"] && selectedAns["q5"] === ans2) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[18]], false);
                  }}
                >
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[18])?.name || ""
                  )}
                </span>
                .
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
                      <a
                        href={a.link}
                        target="_blank"
                        style={{ color: "#2EADF3" }}
                      >
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
            ids.push({
              cat: [subCatIds[18]],
              all: false,
            });
          }
          if (selectedAns["q6"] && selectedAns["q6"] === ans2) {
            sgA.push(
              <div className={classes.suggDiv}>
                Click here to view{" "}
                <span
                  style={{ color: "#2EADF3", cursor: "pointer" }}
                  onClick={() => {
                    goToLink([subCatIds[15]], false);
                  }}
                >
                  {" "}
                  {capLetter(
                    subCat.find((a) => a._id === subCatIds[15])?.name || ""
                  )}
                </span>
                .
              </div>
            );
            ids.push({
              cat: [subCatIds[15]],
              all: false,
            });
          }
          break;
        }
      }
    setIdss((old) => {
      return [...old, ...ids];
    });
    return sgA;
  };
  const handleGo = () => {
    const ds = {
      category: [],
      price: [],
      leaf: false,
      specialQualification: [],
      additionalResource: false,
      keywords: "",
      states: [],
    };
    for (let ccc = 0; ccc < idss.length; ccc++) {
      if (cat && cat.length && idss[ccc].cat && idss[ccc].cat.length) {
        if (idss[ccc].all) {
          let cd = cat.find((n) => n.category._id === idss[ccc].cat[0]);
          if (cd) cd.subCategory.forEach((i) => ds.category.push(i._id));
        } else if (subCat && subCat.length) {
          ds.category.push(...idss[ccc].cat);
        }
      }
    }
    const newCatFromex = [...new Set(ds.category)];

    ds.category = newCatFromex;
    loc(`/provider-search?${JSON.stringify(ds)}`);
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <div
      style={{
        background: "#fafafb",
      }}
    >
      <div className={classes.container}>
        <QuizHeader
          handleSave={() => setOpenAdd(true)}
          handleGo={handleGo}
          handleEmail={() => setOpenEmail(true)}
          text={ans["1"].q1 === "MYSELF"}
        />
        <ResCard
          header={`RECOMMENDATIONS BASED ON ${
            ans["1"].q1 === "MYSELF" ? "YOUR" : "HER"
          } SITUATION`}
          subAns={ele[1]}
        />
        <ResCard header={"CONFIDENCE RANKINGS"} subAns={ele[2]} />
        <ResCard header={"SPECIAL QUESTIONS"} subAns={ele[3]} />
      </div>
      <EmailQuiz
        open={openEmail}
        handleClose={() => setOpenEmail(false)}
        handleQuiz={(email) => handleEmail(email)}
      />
      {uu ? (
        <SaveQuizModal
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          url={JSON.stringify(ans)}
        />
      ) : (
        <LoginModal open={openAdd} handleClose={() => setOpenAdd(false)} />
      )}
    </div>
  );
};

export default QuizRes;
