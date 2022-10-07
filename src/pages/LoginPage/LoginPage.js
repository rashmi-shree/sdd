import React, { useEffect, useState } from "react";
import TextAndTextInput from "../../components/molecules/TextAndTextInput/TextAndTextInput";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import '../../style/style.css';

const LoginPage = ({ 
  api,
  // logoutbuttonevent,
  userevent
 }) => {
  let navigate = useNavigate();
  const [logindata, setlogindata] = useState();
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
          // logoutbuttonevent(true);
          window.localStorage.setItem('logoutbtn', "true");
          window.localStorage.setItem('adminloggedin', res.data[0].username);
          api.get(`/employees/profile/${res.data[0].id}`, {})
            .then((res) => {
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
        <Header
        />
      </div>
      <div className="loginPageContainer">
      <form onSubmit={onSubmitLogin} className="inputandsubmitdesign">
      <div className="inputstyle">
        <p>USER NAME:-<input
          type="text"
          name="username"
          onChange={onChangeEvent}
          autoComplete="off"
        /></p>
        </div>
        <div className="inputstyle">
        <p>PASSWORD:-<input
          type="password"
          name="password"
          onChange={onChangeEvent}
          autoComplete="off"
        />
        </p>
        </div>
        <div className="btnstyle BtnContainerstyle">
          <button type="submit" id="btn">Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}
export default LoginPage;