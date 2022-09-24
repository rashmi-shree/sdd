import React from "react";

const EmployeesReadOnlyRow = ({
    rowdata,
    handleEditClick,
    handleDeleteClick
}) => {
    return (
        <tr>
          <td>{rowdata.username}</td>
          <td>{rowdata.password}</td>
          <td>
            <button
              type="button"
              onClick={(event) => handleEditClick(event, rowdata)}
            >
              Edit
            </button>
            <button type="button" 
                onClick={() => handleDeleteClick(rowdata.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
}
export default EmployeesReadOnlyRow;