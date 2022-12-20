import React from "react";
import { Form } from "react-final-form";
import { TextField } from "./fields/TextField";
import Button from "./ui/Button";
import { Checkbox } from "./fields/Checkbox";
import { Select } from "./fields/Select";
import { Box } from "@mui/system";
import { FormGroup } from "@mui/material";
import Slider from "./fields/Slider";
import ChipsInput from "./fields/ChipsInput";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { User } from '@supabase/supabase-js';
import { getJobDescriptionWithPrompt, saveJobDescription } from "./utils/formUtils";
import LoadingBar from 'react-top-loading-bar'
import { progressMovement } from "./utils/progressUtils";

const JobForm: React.FC<{
  user: User
}> = ({ user }) => {
  const [progress, setProgress] = React.useState(0)
  const [yearsOfExperience, setYearsOfExperience] = React.useState(1);
  const [visa, setVisa] = React.useState(false);
  const [tags, setSkillsTags] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);

  const [jobDescription, setJobDescription] = React.useState("")

  const handleJobDescription = (e: any) => {
    if (e.target) {
      setJobDescription(e.target.value)
    }
  }

  const handleSave = async () => {
    saveJobDescription("Software Engineer", jobDescription, user.id)
  }

  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  
  const onSubmit = async ({
    jobTitle,
    remotePosition,
    description,
  }: any) => {
    setIsActive(true)
    setProgress(15)
    progressMovement(setProgress)
    getJobDescriptionWithPrompt({
        jobTitle,
        remotePosition,
        description,
        yearsOfExperience,
        visa,
        tags,
    })
    .then((data: any) => {
      setProgress(100)
      setJobDescription(data);
      setIsActive(!isActive);
    })
    .catch((e: any) => {
      setJobDescription("Error loading data");
      setIsActive(!isActive);
    })
  };

  return (
    <Container className="py-4 px-0">
      <LoadingBar color="#1875D1" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Grid container spacing={2} >
          <Grid item xs={6}>
          <Form
          onSubmit={onSubmit}
          initialValues={{ jobTitle: "" }}
          render={({ handleSubmit, errors }) => (
            <form onSubmit={handleSubmit} onKeyDown={onKeyDown}>
              <div>
                <TextField name="jobTitle" label="Job Title" required />
              </div>
              <Box my={2}>
                <Select
                  name="remotePosition"
                  label="Remote"
                  required
                  options={[
                    { value: "No", label: "No" },
                    { value: "Hybrid" },
                    { value: "Full Remote" },
                  ]}
                />
              </Box>
                <FormGroup>
                    <ChipsInput setTags={setSkillsTags}/>
                </FormGroup>
                <br/>
                <FormGroup>
                  <TextField
                    name="description"
                    label="Additional Job Details"
                    rows={5}
                  />
                </FormGroup>
                <Box sx={{ width: 300 }}>
                    <span>
                    <h4>Years of Experience</h4>
                    <Slider 
                      name="yearsOfExperience"
                      onChangeFunction={setYearsOfExperience}
                    />
                    </span>
                </Box>
                <div>
                  <Checkbox name='Visa' label='Visa Sponsorship' onChangeFunction={setVisa} value={visa}/>
                </div>
                <span>
                  <Button type="submit" className="mr-7">
                    Submit
                  </Button>
                  <Button type='button' onClick={handleSave}>
                    Save
                  </Button>
                </span>
              </form>
            )}
          />
          </Grid>
          <Grid item xs={6} container={true} direction="column">
            <textarea className="outputArea" value={jobDescription} onChange={handleJobDescription}/>
          </Grid>
      </Grid>
    </Container>
    );
}

export default JobForm;