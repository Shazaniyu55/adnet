import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { FastField,} from "formik";
import {Box,Typography} from "@mui/material";

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RatingControl({name,label,type,...rest}:any) {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box>
        <Typography component="legend">{label}</Typography>
    <FastField as={Rating}  name={name} precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                            

    </Box>
    //   sx={{
    //     width: 200,
    //     display: 'flex',
    //     alignItems: 'center',
    //   }}
    // >
    //   <Rating
    //     name={name}
    //     value={value}
    //     precision={0.5}
    //     getLabelText={getLabelText}
    //     onChange={(event, newValue) => {
    //       setValue(newValue);
    //     }}
    //     onChangeActive={(event, newHover) => {
    //       setHover(newHover);
    //     }}
    //     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
    //   />
    //   {value !== null && (
    //     <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
    //   )}
    // </Box>
  );
}