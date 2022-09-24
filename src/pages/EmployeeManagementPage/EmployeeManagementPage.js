import React, {useState, useEffect} from "react";
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const EmployeeManagementPage = ({api}) => {
    let navigate = useNavigate();
    const [employees, setemployees] = useState({});
    const [check, setcheck] = useState(false);
    console.log("employees",employees);
    useEffect(() => {
      setcheck(JSON.parse(window.localStorage.getItem('logoutbtn')));
    }, []);
    useEffect(()=>{
      if(check == null){
        navigate('/');
      }
    },[check])
    useEffect(()=>{
        api.get('/employees/getusers')
        .then((res) => {
            console.log("hi", res);
            setemployees(res.data);
        })
    },[])
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
                                    {/* {
                                        employees.map((data, i) => (
                                            <tr key={i}>
                                                <td>{data.username}</td>
                                                <td>{data.password}</td>
                                                <td>
                                                    <div className='btnstyle'>
                                                        <Button 
                                                            id="btn"
                                                            // onClick={()=>{
                                                            //     openinvoiceevent(data.invoice_no);
                                                            // }}
                                                            >
                                                                Edit
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    } */}
                                </tbody>
                            </table>
                        }
                    </div>
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