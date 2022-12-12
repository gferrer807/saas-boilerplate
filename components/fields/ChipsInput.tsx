import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsInput(props: {setTags: Function}) {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([]);
  const [chipsCharacterCount, setChipsCharacterCount] = React.useState(0);

  const handleTagAdd = (newChip: string) => {
    let currentChipsLength = chipsCharacterCount
    if (currentChipsLength + newChip.length > 100 || chipData.length >= 10) {
      return
    }
    setChipsCharacterCount(currentChipsLength+=newChip.length);
    const chipToAdd = {
      label: newChip,
      key: chipData.length,
    }
    setChipData([...chipData, chipToAdd]);
    props.setTags([...chipData, chipToAdd])
  }

  const handleDelete = (chipToDelete: ChipData) => () => {
    let currentChipsLength = chipsCharacterCount
    setChipsCharacterCount(currentChipsLength-= chipToDelete.label.length);
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    props.setTags((chips: Array<object>) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <div>
      <TextField 
        label="Add a skill" 
        style={{minWidth: 250}}
        InputProps={{
          onKeyDown: (event) => {
            if (event.key === 'Enter') {
              handleTagAdd(event.currentTarget.value);
              event.currentTarget.value = '';
            }
          }
        }}
      />
      <Paper
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          boxShadow: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={data.label}
                onDelete={handleDelete(data)}
                sx={{
                  marginRight: 0.4,
                  marginTop: 0.5,
                  marginBottom: 0.5,
                }}
              />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
}