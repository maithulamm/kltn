import { useNavigate } from "react-router-dom";
import React, { Fragment, useRef, useState } from "react";
// import styles from "./style.css";
import { loading, loginUser } from "../../redux/apiRequest";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

import { device } from "../Home/Home";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

const Login = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Quản trị viên đăng nhập"

    if (user && user.isAdmin === true) {
      navigate("/admin/home");
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: "info",
      summary: "Quên mật khẩu",
      detail: "Vui lòng liên hệ nhà cung cấp",
    });
  };
  return (
    <section
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
         
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem" }}>
        PHẦN MỀM QUẢN LÝ{" "}
        {window.innerWidth < window.innerHeight ? <br /> : null} DU LỊCH AN
        GIANG
      </h1>
      <br />
      <Card className="formgrid grid gap-4 col-12 md:col-4 flex justify-content-center">
        {/* <div className="formgrid grid"> */}
        <h2 className="col-12 flex justify-content-center">
          Quản trị viên đăng nhập
        </h2>
        <div className="field my-5 col-12">
          <FloatLabel className="field ">
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-100"
              style={{ paddingRight: "2.5rem" }}
            />
            <label for="username">Tên đăng nhập</label>
          </FloatLabel>
          <div className="field mt-5">
            <FloatLabel className="m-0">
              <Password
                inputId="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                className="w-100"
              />
              <label htmlFor="password">Mật khẩu</label>
            </FloatLabel>
          </div>
        </div>
        <p className="col-12 flex justify-content-start">
          <a
            className="text-muted"
            onClick={show}
            style={{ cursor: "pointer" }}
          >
            Quên mật khẩu
          </a>
          {/* <Button onClick={show} label="Show" /> */}
        </p>
        <div className="col-12 flex justify-content-center">
          <Button className="" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </div>
        {/* </div> */}
      </Card>
      <Toast ref={toast} />
      {/* <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
          
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
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal> */}

      {/* {!device ? null 
          : 
          <MDBCol sm='6' md='6' lg='3' className='d-none d-sm-block px-0'>
          <MDBCarousel className='h-100' showIndicators fade interval={1500}>
            <MDBCarouselItem itemId={1} className='h-100'>
              <img src="https://cdn3.ivivu.com/2022/06/du-lich-an-giang-b.jpg" alt="Login image" className='img-fluid shadow-4' style={{objectFit: 'cover', objectPosition: 'center', width: '120rem', height: '20rem'}} />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2} className='h-100'>
              <img src="https://thanhnienmoi.com/upload/images/canh-dep-an-giang-2020-01.jpg" alt="Login image" className='img-fluid shadow-4' style={{objectFit: 'cover', objectPosition: 'center', width: '120rem', height: '20rem'}} />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3} className='h-100'>
              <img src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-an-giang-cover.jpeg" alt="Login image" className='img-fluid shadow-4' style={{objectFit: 'cover', objectPosition: 'center', width: '120rem', height: '20rem'}} />
            </MDBCarouselItem>
          </MDBCarousel>
        </MDBCol>  
        } */}
    </section>
  );
};


export { Login };
