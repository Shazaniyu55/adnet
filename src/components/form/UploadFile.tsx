import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function UploadFile({name,label,type,...rest}:any) {
  return (
    <>
    <label>{label}</label>
    <IconButton color="primary" aria-label="upload picture" component="label">
      <input
        name={name}
        hidden
        accept="image/*"
        type="file"
      />
      
      <PhotoCamera />
  </IconButton>
    </>
  );
}