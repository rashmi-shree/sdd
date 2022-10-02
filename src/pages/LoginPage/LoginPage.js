import React, { useEffect, useState } from "react";
import TextAndTextInput from "../../components/molecules/TextAndTextInput/TextAndTextInput";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import '../../style/style.css';

const LoginPage = ({ 
  api,
  logoutbuttonevent,
  userevent
 }) => {
  let navigate = useNavigate();
  const [logindata, setlogindata] = useState();
  const [userid, setuserid] = useState();
  const onChangeEvent = (event) => {
    setlogindata({ ...logindata, [event.target.name]: event.target.value });
  }
  const onSubmitLogin = () => {
    api.post('/users/login', {
      params: {
        logindata
      }
    }
    )
      .then((res) => {
        if (res.data.length > 0) {
          logoutbuttonevent(true);
          console.log("res.data[0].username",res.data[0].username)
          console.log("res.data",res.data)
          console.log("res.data",res.data[0].id)
          setuserid(res.data[0].id)
          navigate('/main');
        }
        else{
          alert(res.data.msg);
        }
      })
  }
  useEffect(()=>{
    api.get(`/employees/profile/${userid}`, {})
    .then((res) => {
        console.log("profile", res)
        console.log("profile", res.data)
    })
  },[])
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="loginPageContainer">
        <div className="loginPageContainerChild">
          <div className="usernameandpass">
            <TextAndTextInput
              onChangeEvent={onChangeEvent}
              type="username"
              typeofinput="text"
              textname="USER NAME:-" />
            <TextAndTextInput
              onChangeEvent={onChangeEvent}
              type="password"
              typeofinput="password"
              textname="PASSWORD:-" />
          </div>
          <div className="loginPageBtnContainer">
            <a
              onClick={() => {
                onSubmitLogin();
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;