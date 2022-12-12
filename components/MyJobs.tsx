import React from 'react';
import ActionAreaCard from './Card';
import { Container } from "@mui/material";
import { Grid } from "@mui/material";

const data = [1,2,3,4,5,6,7]

const MyJobs = () => {
  return (
    <Container className="py-4 px-0">
      <Grid container spacing={5} >
        {data.map((item, index) => (
          <Grid item xs={4} key={index}>
            <ActionAreaCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyJobs;