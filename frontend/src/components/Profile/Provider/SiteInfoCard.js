import { makeStyles } from "@mui/styles";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const useStyle = makeStyles((theme) => ({
  infoDiv: {
    fontSize: "18px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.78,
    letterSpacing: "normal",
    color: "#252222",
    display: "flex",
    justifyContent: "space-between",
  },
  lineOne: {
    background: "#4f8ead",
    height: "2px",
    width: "76px",
    zIndex: 2,
    position: "absolute",
  },
  lineTwo: {
    background: "#ededf2",
    height: "2px",
  },
}));
const SiteInfoCard = () => {
  const classes = useStyle();

  const [tdata, setTdata] = useState([]);

  const pdata = useSelector((state) => state.profile.profile);

  const setData = () => {
    if (pdata && pdata.siteInfo) {
      const st = [];
      for (let i = 0; i < pdata.siteInfo.length; i++) {
        if (pdata.siteInfo[i].cat) {
          for (let j = 0; j < pdata.siteInfo[i].cat.length; j++) {
            st.push({
              siteName: pdata.siteInfo[i].name,
              id: pdata.siteInfo[i]._id,
              catName: pdata.siteInfo[i].cat[j].name,
              subCats: pdata.siteInfo[i].cat[j].subCategory.reduce(
                (acc, curr) => (acc = acc + curr.name || " " + ", "),
                " "
              ),
            });
          }
        }
      }
      setTdata(() => st);
    }
  };

  useEffect(() => {
    setData();
  }, [pdata]);

  return (
    <>
      <Grid
        item
        lg={12}
        md={12}
        xs={12}
        sm={12}
        marginLeft={2}
        marginRight={2}
        textAlign="left"
      >
        <div className={classes.infoDiv}>Site And Categories</div>
        <Divider variant="fullWidth" className={classes.lineOne} />
        <Divider variant="fullWidth" className={classes.lineTwo} />
      </Grid>

      <Grid
        item
        container
        direction="row"
        lg={12}
        md={12}
        sm={12}
        xs={12}
        textAlign="left"
        padding="21px 21px 25px 21px"
      >
        <TableContainer sx={{ maxHeight: 250, overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Site</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub-Categories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tdata && tdata.length ? (
                tdata.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell size="small" align="left">
                      <div style={{ width: "180px", overflow: "auto" }}>
                        {s.siteName}
                      </div>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <div
                        style={{
                          width: "200px",
                          letterSpacing: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {s.catName}
                      </div>
                    </TableCell>
                    <TableCell size="small" align="left">
                      {s.subCats}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Site Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default SiteInfoCard;
