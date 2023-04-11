import { Card, Collapse, Divider, IconButton, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import LeafIcon from "../../assets/icons/leaf.png";
import HippaIcon from "../../assets/icons/hippa.jpg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    maxHeight: "346px",
    overflow: "auto",
    borderRadius: "15px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1em 2em 1em 2em",
  },
  imgDiv: {
    maxWidth: "117px",
    maxHeight: "110px",
  },
  titleDiv: {
    fontSize: "34px",
    lineHeight: 0.88,
    color: "#524f4f",
    marginTop: "0",
    marginBottom: "19px",
    letterSpacing: "normal",
    fontWeight: "bold",
  },
  descDiv: {
    color: "#7e7e7e",
    lineHeight: 1.7,
    letterSpacing: "normal",
    marginLeft: "64px",
    textAlign: "left",
    fontWeight: "bold",
  },
  linkDiv: {
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    marginLeft: "64px",
    color: "#868686",
  },
  claimBtn: {
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#7dbaaf",
    marginLeft: "10px",
  },
}));

const CategoryCard = ({ img, title, setOpen, subCat }) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyle();
  return (
    <Card className={classes.cardContainer}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          textAlign: "left",
          flexWrap: "wrap",
          cursor: "pointer",
        }}
        onClick={handleExpandClick}
      >
        <div className={classes.titleDiv}>
          {title}
          {/* <span className={classes.claimBtn}>Claim Listing</span> */}
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon onClick={handleExpandClick} fontSize="large" />
        </ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider style={{ marginBottom: "30px" }} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <img className={classes.imgDiv} src={img} />
          </div>
          <div>
            <div className={classes.descDiv}>
              {subCat.map((d, id) => (
                <div
                  key={id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(d.subCategoryId)}
                >
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "24px",
                      fontWeight: 600,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: 1.5,
                      letterSpacing: "normal",
                      textAlign: "left",
                      color: "#7e7e7e",
                    }}
                  >
                    {d.subCategoryName}{" "}
                    {d.leaf ? (
                      <img
                        src={LeafIcon}
                        style={{
                          width: "24px",
                          height: "24px",
                          marginTop: -5,
                        }}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      width: "90%",
                      maxHeight: "163px",
                      margin: "6px 0 12px",
                      padding: "10px 10px 19px 21px",
                      borderRadius: "2px",
                      border: "solid 2px #ebe8e8",
                      overflow: "auto",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.56,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#7dbaaf",
                      }}
                    >
                      {d.serviceName || d.subCategoryName}
                    </div>
                    <span className="Price-Free">
                      Price:
                      <span className="text-style-1">
                        {"  "}{" "}
                        {d.price && d.price.length
                          ? d.price.map((a) => a + " ")
                          : "-"}
                      </span>
                    </span>

                    <div className="Group-1373">
                      {(d.specialQues ||
                        (d.specialQualiFlag && d.specialQualif.length > 0)) && (
                        <div className="Special-Qualifications">
                          Special Qualifications:
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                        }}
                      >
                        {d.specialQualif
                          ? d.specialQualif.map((a) => (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <div className="Rectangle-41"></div>
                                <div className="Special-Qualification-1">
                                  {a}
                                </div>
                              </div>
                            ))
                          : null}{" "}
                        {d.specialQues ? (
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div className="Rectangle-41"></div>
                            <div className="Special-Qualification-1">
                              {d.specialQues}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Collapse>
    </Card>
  );
};

export default CategoryCard;
