import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import '../../../style/style.css';

const CustomizedSaveIcon = ({onClick, type}) => {
    return(
        <SaveIcon 
        type={type}
        className="custediticon"
            onClick={()=>{onClick()}} />
    );
}
export default CustomizedSaveIcon;