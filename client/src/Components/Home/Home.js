import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../Actions/Posts";
const Home = () => {
  const [updatedId, setUpdatedId] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("changed");
    dispatch(getPosts());
  }, [updatedId, dispatch]);
  console.log(updatedId);
  return (
    <Grow in>
      <Container>
        <Grid
          //   className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setUpdatedId={setUpdatedId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form updatedId={updatedId} setUpdatedId={setUpdatedId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
