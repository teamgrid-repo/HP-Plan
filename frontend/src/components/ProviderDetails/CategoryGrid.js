import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CategoryCard from "./CategoryCard";

const useStyle = makeStyles((theme) => ({
  catDiv: {
    color: "#1d3c6e",
    fontSize: "25px",
    lineHeight: 1.39,
    textAlign: "center",
    fontWeight: 600,
  },
  subCatDiv: {
    fontSize: "16px",
    color: "#7e7e7e",
    lineHeight: 1.7,
    fontWeight: 300,
    width: "40%",
    margin: "auto",
  },
}));

const CategoryGrid = ({ cats, setOpen }) => {
  const classes = useStyle();
  return (
    <Grid
      container
      spacing={2}
      textAlign="center"
      marginTop={2}
      paddingBottom={3}
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <div className={classes.catDiv}>Categories of Care</div>
      </Grid>
      {cats.map((c, idx) => (
        <Grid item lg={12} md={12} sm={12} xs={12} key={c.catId}>
          <CategoryCard
            img={c.icon || "cat1"}
            title={c.name}
            subCat={c.subCat}
            setOpen={(id) => setOpen(id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
