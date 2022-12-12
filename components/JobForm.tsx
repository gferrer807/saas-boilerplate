import React from "react";
import { Form } from "react-final-form";
import { TextField } from "./fields/TextField";
import Button from "@mui/material/Button";
import { Checkbox } from "./fields/Checkbox";
import { Select } from "./fields/Select";
import { Box } from "@mui/system";
import { FormGroup } from "@mui/material";
import Slider from "./fields/Slider";
import ChipsInput from "./fields/ChipsInput";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { getJobDescriptionWithPrompt } from "./utils/formUtils";

const JobForm: React.FC<{
  setJobDescription: Function;
}> = () => {
  const [yearsOfExperience, setYearsOfExperience] = React.useState(1);
  const [visa, setVisa] = React.useState(false);
  const [tags, setSkillsTags] = React.useState([]);

  const [jobDescription, setJobDescription] = React.useState("")

  const handleJobDescription = (e: any) => {
    if (e.target) {
      setJobDescription(e.target.value)
    }
  }

  const onSubmit = async ({
    jobTitle,
    remotePosition,
    description,
  }: any) => {
    console.log("Form submitted!!!")
    console.log('jobTitle', jobTitle)
    console.log('remotePosition', remotePosition)
    console.log('description', description)
    // let data = await getJobDescriptionWithPrompt({
    //     jobTitle,
    //     remotePosition,
    //     description,
    //     yearsOfExperience,
    //     visa,
    //     tags,
    // })
    // try {
    //   setJobDescription(data);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <Container className="py-4 px-0">
      <Grid container spacing={2} >
          <Grid item xs={6}>
          <Form
          onSubmit={onSubmit}
          initialValues={{ jobTitle: "" }}
          render={({ handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
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
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
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