import React, {useState, useEffect} from "react";
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import {useNavigate} from 'react-router-dom';

const EmployeeManagementPage = () => {
    let navigate = useNavigate();
    const [check, setcheck] = useState(false);
    useEffect(() => {
      setcheck(JSON.parse(window.localStorage.getItem('logoutbtn')));
    }, []);
    useEffect(()=>{
      if(check == null){
        navigate('/');
      }
    },[check])
    return(
        <div>
        <div>
          <HeaderWithLogout />
        </div>
        <div className="reportcontainer">
          <div className="pageheading">
            Employee Management
          </div>
        </div>
      </div>
    );
}
export default EmployeeManagementPage;