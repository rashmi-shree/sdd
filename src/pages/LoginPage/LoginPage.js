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
  const onSubmitLogin = (event) => {
    event.preventDefault();
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
  //    const handleKeypress = (e) => {
  //     //it triggers by pressing the enter key
  //   if (e.key === 'Enter') {
  //     console.log("enter clicked");
  //     onSubmitLogin();
  //   }
  // };
  return (
    <div>
      <div>
        <Header user={user} />
      </div>
      <form onSubmit={onSubmitLogin}>
      <div className="loginPageContainer">
        <div className="loginPageContainerChild">
          <div className="usernameandpass">
            <TextAndTextInput
              onChangeEvent={onChangeEvent}
              type="username"
              typeofinput="text"
              textname="USER NAME:-" 
              // onKeyPress={handleKeypress}              
              />
            <TextAndTextInput
              onChangeEvent={onChangeEvent}
              type="password"
              typeofinput="password"
              textname="PASSWORD:-" 
              // onKeyPress={handleKeypress}
              />
          </div>
          <div className="loginPageBtnContainer">
            <button type="submit">Submit</button>
            {/* <a
              onClick={() => {
                onSubmitLogin();
              }}
            >
              Login
            </a> */}
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}
export default LoginPage;