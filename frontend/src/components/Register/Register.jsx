import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './style.css';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <section className="Login">
      <div className='Title'>
        {/* <h1>HỆ THỐNG QUẢN LÝ ĐỊA ĐIỂM DU LỊCH AN GIANG</h1> */}
        {/* <h6>(Ứng dụng di động Du lịch An Giang)</h6> */}
      </div>
      {/* <div className='Logo'>
        <img src={logo} alt="Logo" />
      </div> */}
      <div className='Login__form'>
        <form className="Back__login" onSubmit={handleRegister}>
          <div className="Title__login">
            <h2>Đăng ký</h2>
          </div>
          <div className="Username__case">
            <input 
              type="text" 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Username__case">
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="Password__case">
            <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <div className='eye'>
              <span className='eye__button'>
                <label className='eye_ch'>
                  <input type="checkbox" className='pass' onClick={togglePasswordVisibility} />
                  <i class="fa fa-eye-slash"></i>
                  <i class="fa fa-eye"></i>
                </label>
              </span>
            </div>
          </div>
          <div className="Button__login">
            <button id="login__button" type='submit'>Đăng ký</button>
          </div>
        </form>
      </div>
      <div id='copyright'>
              @CopyRight 2024 by Mai Thu Lam - HCMUSSH
      </div>
    </section>
  );
}


export {Register};
