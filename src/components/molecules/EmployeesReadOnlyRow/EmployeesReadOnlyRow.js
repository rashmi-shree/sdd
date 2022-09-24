import React from "react";

const EmployeesReadOnlyRow = ({
    rowdata,
    handleEditClick
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
                // onClick={() => handleDeleteClick(contact.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
}
export default EmployeesReadOnlyRow;