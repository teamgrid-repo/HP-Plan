import { Avatar, Button, Card, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router";

const calculateAge = (dob) => {
  return new Date().getFullYear() - new Date(dob).getFullYear();
};

const SaveCard = ({ classes, data, cu, removeClient }) => {
  const loc = useNavigate();
  return (
    <Grid item lg={3} md={5} sm={6} xs={12} textAlign="center">
      <Card className={classes.cardContainer}>
        <Stack className={classes.cardHeader}>
          <Avatar
            src={(data.userId && data.userId.image) || ""}
            aria-label="recipe"
            className={classes.cardAvatar}
          />
          <div className={classes.cardHeaderTitle}>{data.name}</div>
          <div className={classes.cardSubTitle}>
            {(data.userId && data.userId.email) || "-"}
          </div>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          margin={3}
          marginTop={0}
          marginBottom={5}
          textAlign="center"
        >
          <div>
            <div className={classes.cardContentTitle}>Phone</div>
            <div className={classes.cardContentSubTitle}>
              {data.contact || "-"}
            </div>
          </div>
          <div>
            <div className={classes.cardContentTitle}>age</div>
            <div className={classes.cardContentSubTitle}>
              {data.dob ? calculateAge(data.dob) : "-"}
            </div>
          </div>
          <div>
            <div className={classes.cardContentTitle}>Gender</div>
            <div className={classes.cardContentSubTitle}>
              {data.gender || "-"}
            </div>
          </div>
        </Stack>
        <Stack
          justifyContent="space-between"
          marginLeft={2}
          marginRight={2}
          direction="row"
        >
          <Button
            variant="contained"
            size="large"
            className={classes.messageButton}
            onClick={() =>
              loc(
                `/message/${cu.id || ""}-${
                  (data.userId && data.userId._id) || ""
                }`
              )
            }
          >
            Message
          </Button>
          <Button
            variant="outlined"
            size="large"
            className={classes.meetingButton}
            onClick={() => removeClient((data.userId && data.userId._id) || "")}
          >
            Remove Client
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default SaveCard;
