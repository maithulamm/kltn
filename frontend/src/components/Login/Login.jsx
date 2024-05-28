import { useNavigate } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import './style.css';
import { loginUser } from '../../redux/apiRequest';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBCarousel, MDBCarouselItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Password } from 'primereact/password'
import 'primereact/resources/primereact.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
const Login = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) { 
      navigate("/admin/home");
    };
    
  }, [ user]);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password
    };
    loginUser(newUser, dispatch, navigate);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event); // Pass the event object to handleLogin
    }
  };
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);
  return (
    <section className="Login">
      {/* <div className='Title'>
        <h1>HỆ THỐNG QUẢN LÝ ĐỊA ĐIỂM DU LỊCH AN GIANG</h1>
        <h6>(Ứng dụng di động Du lịch An Giang)</h6>
      </div>
      <div className='Logo'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='Login__form'>
        <form className="Back__login" onSubmit={handleLogin}>
          <div className="Title__login">
            <h2>Đăng nhập</h2>
          </div>
          <div className="Username__case">
            <i class="fa fa-user"></i>
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="Password__case">
            <i class="fa fa-lock"></i>
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
            <button id="login__button" type='submit'>Đăng nhập</button>
          </div>
          <div className="Button__login">
          </div>
        </form>
      </div>
      <div id='copyright'>
              @CopyRight 2024 by Mai Thu Lam - HCMUSSH
      </div> */}
      <MDBRow className='d-flex align-items-center justify-content-center m-1 my-3'>
        <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>
          PHẦN MỀM QUẢN LÝ {window.innerWidth < window.innerHeight ? <br/> : null} DU LỊCH AN GIANG
          
        </h1>

      </MDBRow>
      <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='0' md='0' lg='3'></MDBCol>
        <MDBCol sm='6' md='6' lg='4'>
          <div className='d-flex flex-row ps-5 pt-5'>
            {/* <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085',  }}/> */}
          </div>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Đăng nhập</h3>
              <MDBInput required wrapperClass='mb-4 mx-5' label='Tên đăng nhập' id='formControlLg' type='email' size="lg" onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
              <MDBInput required wrapperClass='mb-4 mx-5' label='Mật khẩu'  type='password' size="lg"  onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
              {/* <Password onChange={(e) => setPassword(e.target.value)} toggleMask /> */}
            <MDBBtn className="mb-4 mx-5 w-50" color='info' size='lg' onClick={handleLogin}>Đăng nhập</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5" ><a className="text-muted" onClick={toggleOpen} style={{cursor: 'pointer'}}>Quên mật khẩu</a></p>
          </div>
          <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Quên mật khẩu</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Vui lòng liên hệ nhà cung cấp để được hỗ trợ.
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='danger' onClick={toggleOpen}>
                Close
              </MDBBtn>
              {/* <MDBBtn>Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </MDBCol>

        <MDBCol sm='6' md='6' lg='3' className='d-none d-sm-block px-0'>
          <MDBCarousel className='h-100' showIndicators fade interval={1500}>
            <MDBCarouselItem itemId={1} className='h-100'>
              <img src="https://cdn3.ivivu.com/2022/06/du-lich-an-giang-b.jpg" alt="Login image" className='img-fluid shadow-4 h-100' style={{objectFit: 'cover', objectPosition: 'center'}} />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2} className='h-100'>
              <img src="https://thanhnienmoi.com/upload/images/canh-dep-an-giang-2020-01.jpg" alt="Login image" className='img-fluid shadow-4 h-100' style={{objectFit: 'cover', objectPosition: 'center'}} />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3} className='h-100'>
              <img src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-an-giang-cover.jpeg" alt="Login image" className='img-fluid shadow-4 h-100' style={{objectFit: 'cover', objectPosition: 'center'}} />
            </MDBCarouselItem>
          </MDBCarousel>
        </MDBCol>
        <MDBCol sm='0' lg='2'></MDBCol>
      </MDBRow>
    </MDBContainer>
    </section>
  );
}




const Login2 = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  // const user = onSuccess();
  // localStorage.setItem('currentUser', user);
  
  // const accessToken = user?.accessToken;
  
  useEffect(() => {
    if (user) { 
      navigate("/home");
    };
    
  }, [ user]);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password
    };
    loginUser(newUser, dispatch, navigate);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event); // Pass the event object to handleLogin
    }
  };
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);
  return (
    <section className="Login">
     <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <i className='fab fa-google'></i>
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
    </section>
  );
}





export {Login, Login2};
