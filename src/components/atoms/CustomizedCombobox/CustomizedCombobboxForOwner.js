import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Select from 'react-select';

const CustomizedComboboxForOwner = ({
  comboboxdata,
  selectevent
}) => {
  const [statedata, setstatedata] = useState();
  const [defaultvalue, setdefaultvalue] = useState();
  useEffect(()=>{
    let temp = comboboxdata.map((d)=>{
      return {value:d.ownerid, label:d.ownername}
    })
    setstatedata(temp);
  },[comboboxdata])
//   useEffect(()=>{
//     setdefaultvalue({label: 'Karnataka', value: 29})
//   },[comboboxdata])
//   const handleChange = e => {
//     setdefaultvalue(e);
//     selectevent(e);
//   }
  return (
    <div className='comboboxselectstyle'>
      <Select
        placeholder="Select Option"
        // value={defaultvalue}
        options={statedata} // set list of the data
        // onChange={handleChange} // assign onChange function
    />
  </div>
  );
}
export default CustomizedComboboxForOwner;