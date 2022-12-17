import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

interface Props {
  jobTitle: string;
  jobDescription: string;
}


export default function ActionAreaCard({jobTitle, jobDescription}: Props) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 180 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {jobDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {jobTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}