import React, {useState, useEffect, Fragment} from "react";
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmployeesEditableRow from "../../components/EmployeesEditableRow/EmployeesEditableRow";
import EmployeesReadOnlyRow from "../../components/molecules/EmployeesReadOnlyRow/EmployeesReadOnlyRow";
import {useNavigate} from 'react-router-dom';

const EmployeeManagementPage = ({api}) => {
    let navigate = useNavigate();
    const [employees, setemployees] = useState({});
    useEffect(()=>{
        api.get('/employees/getusers')
        .then((res) => {
            setemployees(res.data);
        })
    },[])
    const [check, setcheck] = useState(false);
    const [Id, setId] = useState(null);
    useEffect(() => {
      setcheck(JSON.parse(window.localStorage.getItem('logoutbtn')));
    }, []);
    useEffect(()=>{
      if(check == null){
        navigate('/');
      }
    },[check])
    const [EditId,setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        username: "",
        password: ""
      });
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
    
        const edited = {
          id: EditId,
          username: editFormData.username,
          password: editFormData.password
        };
    
        const newData = [...employees];
    
        const index = employees.findIndex((data) => data.id === EditId);
    
        newData[index] = edited;
        console.log("on submit", newData);
        setemployees(newData);
        setEditId(null);
      };
      const handleEditClick = (event, data) => {
          event.preventDefault();
          console.log("hi edit",data);
            setEditId(data.id);
    
        const formValues = {
          username: data.username,
          password: data.password
        };
    
        setEditFormData(formValues);
      };
      const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };
      const handleCancelClick = () => {
        setEditId(null);
      };
      const handleDeleteClick = (Id) => {
       console.log("to be deleted", Id);
      };
    return(
        <div>
        <div>
          <HeaderWithLogout />
        </div>
        <div className="reportcontainer">
          <div className="pageheading">
            Employee Management
          </div>
          <div className="displayContainer">
                    <div className="backarrow">
                        <p
                            onClick={() => {
                                navigate("/main");
                            }}
                        ><ArrowBackIcon /></p>
                    </div>
                    <form onSubmit={handleEditFormSubmit}>
                    <div className="table-responsive">
                        {
                            employees.length != 0 &&
                                <table className="table table-striped table-bordered">
                                    <thead className="theadalter">
                                        <tr>
                                            <th>User Name</th>
                                            <th>Password</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            employees && employees.length &&
                                            employees.map((data)=>(
                                                <Fragment>
                                                {EditId === data.id ? (
                                                <EmployeesEditableRow
                                                    rowdata={data}
                                                    handleEditFormChange={handleEditFormChange}
                                                    handleCancelClick={handleCancelClick}
                                                />
                                                ) : (
                                                <EmployeesReadOnlyRow
                                                    handleEditClick={handleEditClick}
                                                    rowdata={data}
                                                    handleDeleteClick={handleDeleteClick}
                                                />
                                                )}
                                            </Fragment>
                                            ))
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                    </form>
                    {
                        employees.length === 0 &&
                        <p> no data found! </p>
                    }
                </div>
        </div>
      </div>
    );
}
export default EmployeeManagementPage;