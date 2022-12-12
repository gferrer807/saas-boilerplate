import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const sliderTrack = {
    normal: "normal",
    inverted: "inverted",
}

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider(props: {name: string, onChangeFunction: Function}) {

  const handleChange = (event: Event, newValue: number | number[]) => {
    props.onChangeFunction(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks
        min={1}
        max={10}
        track="inverted"
      />
    </Box>
  );
}