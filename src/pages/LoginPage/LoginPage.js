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
  const [user, setuser] = useState({});
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
          // setuserid(res.data[0].id);
          api.get(`/employees/profile/${res.data[0].id}`, {})
            .then((res) => {
              setuser(res.data);
              userevent(res.data);
            })
          navigate('/main');
        }
        else{
          alert(res.data.msg);
        }
      })
  }
  return (
    <div>
      <div>
        <Header user={user} />
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