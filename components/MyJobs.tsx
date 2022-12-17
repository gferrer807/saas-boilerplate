import React, { useState } from 'react';
import ActionAreaCard from './Card';
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { JobPosting } from 'types';
import { getJobDocuments } from 'utils/supabase-client';
import { User } from '@supabase/supabase-js';

interface Props {
  user: User;
}

const jobsIsValid = (jobs: any) => {
  if (Array.isArray(jobs) === false) {
    return false;
  }

  if (jobs.length === 0) {
    return false;
  }

  return true;
}

const MyJobs = ({ user }: Props) => {
  // getJobDocuments(user) should return a list of JobPosting objects
  const [jobs, setJobs] = useState([] as JobPosting[])
  getJobDocuments(user)
  .then((data: any) => {
    setJobs(data)
  })
  .catch((error: any) => {
    console.log(error)
  })

  return (
    <Container className="py-4 px-0 min-h-[75vh]">
      <Grid container spacing={5} >
        {jobsIsValid(jobs) ? jobs.map((job: JobPosting, index: number) => (
          <Grid item xs={4} key={index}>
            <ActionAreaCard
              jobTitle={job.jobTitle}
              jobDescription={job.jobDescription}
            />
          </Grid>
        )) : <p>No jobs found</p>}
      </Grid>
    </Container>
  );
};

export default MyJobs;