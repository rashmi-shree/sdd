import React, {useState, useEffect, Fragment} from "react";
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmployeesEditableRow from "../../components/EmployeesEditableRow/EmployeesEditableRow";
import EmployeesReadOnlyRow from "../../components/molecules/EmployeesReadOnlyRow/EmployeesReadOnlyRow";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import CustomizedSaveIcon from "../../components/atoms/CustomizedSaveIcon/CustomizedSaveIcon";

const EmployeeManagementPage = ({api}) => {
    let navigate = useNavigate();
    const [employees, setemployees] = useState({});
    useEffect(()=>{
        api.get('/employees/getusers')
        .then((res) => {
            setemployees(res.data);
        })
    },[]);
    const getusers = () => {
        api.get('/employees/getusers')
        .then((res) => {
            setemployees(res.data);
        })
    }
    const [check, setcheck] = useState(false);
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
    const [addFormData, setAddFormData] = useState({
        username: "",
        password: ""
      });
    const handleEditFormSubmit = (event) => {
        // event.preventDefault();
        console.log("on submitted", editFormData);
        api.put('/employees/edituserdata', {
            params: {
                id:EditId,
                data:editFormData
            }
          })
          .then((res) => {
            if(res){
                alert("Employee Data Edited Successfully");
                getusers();
            }
          })
        setEditId(null);
      };
      const handleEditClick = (event, data) => {
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
        setEditFormData({ ...editFormData, [event.target.name]: event.target.value })
      };
      const handleAddFormChange = (event) => {
        event.preventDefault();
        setAddFormData({ ...addFormData, [event.target.name]: event.target.value })
      }
      const handleAddFormSubmit = () => {
        api.post('/employees/insertuserdata', {
            params: {
                addFormData
            }
          })
          .then((res) => {
            if(res){
                getusers();
            }
          })
      }
      const handleCancelClick = () => {
        setEditId(null);
      };
      const [useriddelete, setuseriddelete] = useState();
      const  deletesuperevent = (id) => {
        setuseriddelete(id);
    }
    const handleDeleteClick = (e) => {
        if(e == "yes"){
               console.log("to be deleted", useriddelete);
            axios.delete(`http://3.84.110.201:3001/employees/deleteuserdata`,
            {
                data: {
                    id: useriddelete
                }
            })
            .then((res) => {
                if(res){
                    getusers();
                }
            })
        }
    }
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

                    <h2>Add an employee</h2>
                    <div>
                        <input
                        type="text"
                        name="username"
                        required="required"
                        placeholder="Enter a username..."
                        onChange={handleAddFormChange}
                        />
                        <input
                        type="text"
                        name="password"
                        required="required"
                        placeholder="Enter an password..."
                        onChange={handleAddFormChange}
                        />
                        <CustomizedSaveIcon 
                            type="submit"
                            onClick={handleAddFormSubmit}
                        />
                        <button type="submit">Add</button>
                    </div>


                    {/* <form onSubmit={handleEditFormSubmit}> */}
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
                                                    handleEditFormSubmit={handleEditFormSubmit}
                                                />
                                                ) : (
                                                <EmployeesReadOnlyRow
                                                deletesuperevent={deletesuperevent}
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
                    {/* </form> */}
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