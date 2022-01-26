import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axiosInstance from '../Apis/AxiosInstance';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("token"));
  }, []);

  const handleClick = () => {
    console.log(localStorage.getItem('token'))
    axiosInstance.get('/user/me')
    .then(data => {
      console.log("me data",data)
      if(!data) {          
        navigate('/');
        // axiosInstance.post('/user/refreshToken', {
        //   refreshToken: localStorage.getItem('refreshToken')
        // })
        // .then(data => {
        //   localStorage.removeItem("token");
        //   localStorage.setItem("token", data.data.token);

        // })
        // .catch(err => console.log(err))
      }
    })
    .catch(err => {
      console.log("me err",err);
      
    });
    
  }

  return (
    <div>
      HomePage
      <button onClick={handleClick}>Get Me</button>
    </div>
  )
}

export default HomePage
