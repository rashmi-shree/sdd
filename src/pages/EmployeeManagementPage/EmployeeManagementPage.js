import React, {useState, useEffect} from "react";
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
        <div>employee management</div>
    );
}
export default EmployeeManagementPage;