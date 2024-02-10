import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from "../../assets/images/logo.png"
import './style.css';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="Login">
      <div className='Title'>
        <h1>HỆ THỐNG QUẢN LÝ ĐỊA ĐIỂM DU LỊCH AN GIANG</h1>
        {/* <h6>(Ứng dụng di động Du lịch An Giang)</h6> */}
      </div>
      <div className='Logo'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='Login__form'>
        <div className="Back__login">
          <div className="Title__login">
            <h2>Đăng nhập</h2>
          </div>
          <div className="Username__case">
            <input type="text" placeholder="Username" />
          </div>
          <div className="Password__case">
            <input type={showPassword ? "text" : "password"} placeholder="Password" />
            <div className='eye'>
              <button className='eye__button'>
                <label className='eye_ch'>
                  <input type="checkbox" className='pass' onClick={togglePasswordVisibility} />
                  <i class="fa fa-eye-slash"></i>
                  <i class="fa fa-eye"></i>

                </label>
              </button>
            </div>
          </div>
          <Link to="/home" className="Button__login">
            <button id="login__button">Đăng nhập</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
