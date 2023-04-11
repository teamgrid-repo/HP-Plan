import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  img1: {
    height: "100%",
    maxWidth: "100%",
    borderRadius: "8px",
  },
  img2: {
    maxWidth: "100%",
    maxHeight: "50%",
    borderRadius: "8px",
  },
});

const ProviderImageGrid = ({ img }) => {
  const classes = useStyle();
  return (
    img &&
    img.length && (
      <Grid container spacing={2} marginBottom={3}>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <img src={img[0]} className={classes.img1} />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <img src={img[1]} className={classes.img2} />
          <img src={img[2]} className={classes.img2} />
        </Grid>
      </Grid>
    )
  );
};

export default ProviderImageGrid;
