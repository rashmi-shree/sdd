import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import '../../../style/style.css';

const CustomizedEditIcon = ({onClick}) => {
    return(
        <EditIcon 
        className="custediticon"
            onClick={()=>{onClick()}} />
    );
}
export default CustomizedEditIcon;