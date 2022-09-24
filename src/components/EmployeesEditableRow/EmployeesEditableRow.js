import React from "react";
import CustomizedSaveIcon from "../atoms/CustomizedSaveIcon/CustomizedSaveIcon";
import CustomizedCancelIcon from "../atoms/CustomizedCancelIcon/CustomizedCancelIcon";

const EmployeesEditableRow = ({
    rowdata,
    handleEditFormChange,
    handleCancelClick,
    handleEditFormSubmit
}) => {
    return(
        <tr>
          <td>
            <input
              type="text"
              required="required"
              placeholder="Enter a name..."
              name="username"
              defaultValue={rowdata.username}
              onChange={handleEditFormChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              required="required"
              placeholder="Enter a password..."
              name="password"
              defaultValue={rowdata.password}
              onChange={handleEditFormChange}
            ></input>
          </td>
          <td>
            {/* <button type="submit">Save</button> */}
            <CustomizedSaveIcon 
                type="submit"
                onClick={handleEditFormSubmit}
            />
            <CustomizedCancelIcon 
                type="button"
                onClick={handleCancelClick}
            />
            {/* <button type="button" 
                onClick={handleCancelClick}
                >
              Cancel
            </button> */}
          </td>
        </tr>
    );
}
export default EmployeesEditableRow;