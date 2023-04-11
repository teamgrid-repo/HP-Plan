import { Grid } from "@mui/material";

const Step1 = ({
  qid,
  que,
  setSelectedAns,
  classes,
  selectedAns,
  ans = [],
}) => {
  return (
    <>
      {" "}
      <div
       className={classes.queMain}
      >
        <div>{que}</div>
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
        {ans.map((e, id) => (
          <Grid item key={id} lg={6} md={6} sm={12} xs={12}>
            <div
              className={`${classes.ans} ${
                selectedAns[qid] === e ? classes.selectedAns : ""
              }`}
              onClick={() => setSelectedAns(qid, e)}
            >
              {e}
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Step1;
