import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CustomizedTextInput = ({
  labelname,
  onHandleChangeEvent,
  type,
  defaultValue,
  index
 }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        value={defaultValue} 
        name={type} 
        onChange={onHandleChangeEvent} 
        id="standard-basic" 
        placeholder={labelname}
        variant="standard" 
        index={index}
        />
    </Box>
  );
}
export default CustomizedTextInput;