import React from "react";

const EmployeesEditableRow = ({
    rowdata,
    handleEditFormChange,
    handleCancelClick
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
            <button type="submit">Save</button>
            <button type="button" 
                onClick={handleCancelClick}
                >
              Cancel
            </button>
          </td>
        </tr>
    );
}
export default EmployeesEditableRow;