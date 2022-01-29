import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../Apis/AxiosInstance';

function LoginForm() {
  const [alertUsername, setAlertUsername] = useState(false);
  const [alertPassword, setAlertPassword] = useState(false);
  const [alertUser, setAlertUser] = useState(false);
  const [alertPass, setAlertPass] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if(e.target.username.value === "" || e.target.password.value === "") {
      if(e.target.username.value === "") {
        setAlertUsername(true);
      } else {
        setAlertUsername(false);
      }
      if(e.target.password.value === "") {
        setAlertPassword(true);
      } else {
        setAlertPassword(false);
      }
    } else {
      axiosInstance.post('/user/login', {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then(res => {
        console.log("res", res.data);
        localStorage.removeItem("token");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate('/home');           
        window.location.reload();     
      })
      .catch(err => console.log("err", err))
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if(e.target.user.value === "" || e.target.pass.value === "") {
      if(e.target.user.value === "") {
        setAlertUser(true);
      } else {
        setAlertUser(false);
      }
      if(e.target.pass.value === "") {
        setAlertPass(true);
      } else {
        setAlertPass(false);
      }
    } else {
      axios.post('https://pkh-app.herokuapp.com/user/signup', {
        username: e.target.user.value,
        password: e.target.pass.value,
      })
      .then(res => console.log("data", res.data))
      .catch(err => console.log("err", err))
    }
  }


  return (
    <React.Fragment>
      <div className="form__wrapper">
        <form onSubmit={e => handleSignIn(e)} className="loginForm">
            <h3 className="loginForm_username">Username</h3>
            {alertUsername && <p style={{color: "red"}}>Chưa nhập tên người dùng.</p>}
            <input 
              name="username"
              id="username"
              type="text" 
              placeholder="Enter your username..."
              onInput={() => setAlertUsername(false)}
            />

            <h3 className="loginForm_password">Password</h3>
            {alertPassword && <p style={{color: "red"}}>Chưa nhập mật khẩu.</p>}
            <input 
              name="password"
              id="password"
              type="password" 
              placeholder="Enter your password..."
              onInput={() => setAlertPassword(false)}
            />

            <div className="loginForm_signin">
              <input
                type="submit"
                value="Sign in"
              />
            </div>
        </form>

        <form onSubmit={e => handleSignUp(e)} className="loginForm">
            <h3 className="loginForm_username">Username</h3>
            {alertUser && <p style={{color: "red"}}>Chưa nhập tên người dùng.</p>}
            <input 
              name="user"
              id="user"
              type="text" 
              placeholder="Enter your username..."
              onInput={() => setAlertUser(false)}
            />

            <h3 className="loginForm_password">Password</h3>
            {alertPass && <p style={{color: "red"}}>Chưa nhập mật khẩu.</p>}
            <input 
              name="pass"
              id="pass"
              type="password" 
              placeholder="Enter your password..."
              onInput={() => setAlertPass(false)}
            />

            <div className="loginForm_signup">
              <h4>Don't have account?</h4>
              <input
                type="submit"
                value="Sign up"
              />
            </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default LoginForm
