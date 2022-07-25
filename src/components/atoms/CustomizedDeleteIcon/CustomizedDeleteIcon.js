import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import '../../../style/style.css';

const CustomizedDeleteIcon = ({onClick}) => {
    return(
        <div className="deleteiconcontainer">
            <DeleteIcon 
                id="deleteicon"
                onClick={()=>{onClick()}} 
            />
        </div>
    );
}
export default CustomizedDeleteIcon ;