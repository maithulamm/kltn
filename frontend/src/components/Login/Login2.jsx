import React, { useState, useEffect, Fragment } from "react";
import "./style2.css";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-green/theme.css";
import { Button } from "primereact/button";
import { device } from "../Home/Home";
import backgif from "../../data/Presentation1.gif";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loading, loginUser } from "../../redux/apiRequest";
const Login2 = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.isAdmin === true) {
      navigate("/admin/home");
    }
  }, [user]);
  useEffect(() => {
    document.querySelector(".container").style.display = "block";
    document.querySelector(".s2class").style.color = "#EE9BA3";
    document.querySelector(".s1class").style.color = "#748194";
    document.querySelector("#left").classList.remove("left_hover");
    document.querySelector("#right").classList.add("right_hover");
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "flex";
  }, []);

  const handleSignUpClick = () => {
    setIsSignUp(true);
    document.querySelector(".s2class").style.color = "#EE9BA3";
    document.querySelector(".s1class").style.color = "#748194";
    document.querySelector("#left").classList.remove("left_hover");
    document.querySelector("#right").classList.add("right_hover");
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "flex";
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    document.querySelector(".s1class").style.color = "#EE9BA3";
    document.querySelector(".s2class").style.color = "#748194";
    document.querySelector("#right").classList.remove("right_hover");
    document.querySelector("#left").classList.add("left_hover");
    document.querySelector(".signup").style.display = "none";
    document.querySelector(".signin").style.display = "flex";
  };
  useEffect(() => {
    document.title = "Du lịch An Giang";

    // Lấy đường dẫn tới file CSS từ node_modules
    const cssPath = require("primereact/resources/themes/lara-light-green/theme.css");

    // Tạo một thẻ link để thêm CSS từ PrimeReact
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = cssPath;

    // Thêm thẻ link vào phần tử <head> của trang
    document.head.appendChild(linkElement);
    const container = document.querySelector(".c11");
    if (isSignUp) {
      container.classList.remove("fade-in");
    } else {
      container.classList.add("fade-in");
    }
  }, [isSignUp]);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <Fragment>
      {loading()}
      {device() ? (
        <div className="container">
          <div
            className="c1"
            //   style={{display: 'none '}}
          >
            <div className="c11">
              <h3
                className="mainhead"
                style={{ top: "2rem", fontSize: "1rem" }}
              >
                BẢN ĐỒ DU LỊCH AN GIANG
              </h3>
              <p className="mainp m-3" style={{ top: "15rem" }}>
                Chào mừng bạn đến với phần mềm <br /> tra cứu du lịch An Giang.
                Chúc bạn có những trải nghiệm tuyệt vời nhất.
              </p>
            </div>
            <div id="left" onClick={handleSignInClick}>
              <h3 className="s1class">
                <span>ĐĂNG KÝ</span>
                {/* <span className="su"></span> */}
              </h3>
            </div>
            <div id="right" onClick={handleSignUpClick}>
              <h3 className="s2class">
                <span>ĐĂNG NHẬP</span>
                {/* <span className="su"></span> */}
              </h3>
            </div>
          </div>
          <div className="c2 ">
            <div
              className="signup formgrid grid gap-3 justify-conent-center mt-3 h-full"
              style={{
                display: isSignUp ? "flex" : "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: 'center',
                animationDuration: '0.5s',
                animationName: 'fade-in',
                animationFillMode: 'forwards',

              }}
            >
              {/* <h1 className="signup1">Đăng ký tài khoản</h1>
          <input name="username" type="text" placeholder="Username*" className="username" />
          <input name="email" type="text" placeholder="Email*" className="username" />
          <input name="password" type="password" placeholder="Password*" className="username" /> */}
              <div className="field ">
                <div className="flex justify-content-center">
                  <Button
                    icon="pi pi-users"
                    label="Tài khoản khách"
                    severity="info"
                    className={`mx-3 w-full  ${visibleLogin ? 'py-2' : 'py-3'}`}
                    tooltip="Sử dụng phần mềm mà không cần tài khoản"
                    onClick={() => navigate('/home')}
                  />
                </div>
                <div className={`flex justify-content-center my-${visibleLogin ? '1' : '4'}`}>
                  <div className=" col-12 flex align-items-center">
                    <div className="col-12 flex align-items-center border-bottom-1 surface-border"></div>
                  </div>
                </div>
                <div className="flex justify-content-center w-full">
                  <Button
                    icon="pi pi-google"
                    label="Google"
                    severity="danger"
                    className={`mx-3 ${visibleLogin ? 'py-2' : 'py-3'} w-12`}
                    tooltip="Đăng nhập bằng tài khoản Google"
                  />
                </div>
                <div className={`flex justify-content-center my-${visibleLogin ? '1' : '4'}`}>
                  <div className=" col-12 flex align-items-center">
                    <div className="col-12 flex align-items-center border-bottom-1 surface-border"></div>
                  </div>
                </div>
                <div style={{ display: visibleLogin ? "block" : "none" }}>
                  <FloatLabel className="m-2 mt-2 pt-2">
                    <InputText
                      id="username1"
                      className="text-base text-color surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username1" className="m-0">
                      Tên đăng nhập
                    </label>
                  </FloatLabel>
                  <FloatLabel className="m-2 mt-4 pt-2">
                    <Password
                      inputId="password1"
                      className=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      toggleMask
                      feedback={false}
                      inputClassName="text-base text-color surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                    <label htmlFor="password1" className="m-0">
                      Mật khẩu
                    </label>
                  </FloatLabel>
                </div>
                <div className="flex justify-content-center">
                  <Button
                    label={visibleLogin ? "Đăng nhập" : "Đăng nhập với tài khoản"}
                    className={`mx-3 p-2 w-full py-3 ${visibleLogin ? 'mt-3' : null}`}
                    onClick={
                      visibleLogin ? handleLogin : () => setVisibleLogin(true)
                    }
                    tooltip="Đăng nhập bằng tài khoản đã đăng ký"
                  />
                </div>
              </div>

              <Button
                label="Quên mật khẩu?"
                text
                severity="secondary"
                onClick={() => setResetPassword(true)}
                className="m-0 p-0"
                style={{ display: !visibleLogin ? "none" : "block" }}
              />
              {/* <Button label={`Chưa có tài khoản? Đăng ký ngay`} text severity="secondary" /> */}
              <Button
                label="Quản trị viên đăng nhập"
                text
                severity="secondary"
                onClick={() => navigate("/admin/login")}
                className="m-0 p-0"
              />
            </div>
            <div
              className="signin formgrid grid gap-3 justify-conent-center mt-3"
              style={{
                display: isSignUp ? "none" : "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="field ">
                <div className="flex justify-content-center">
                  <Button
                    // icon="pi pi-google"
                    text
                    severity="primary"
                    label="Đăng ký tài khoản"
                    onClick={null}
                  />
                </div>

                <FloatLabel className="m-2 mt-5 pt-2">
                  <InputText
                    id="username"
                    className="text-base text-color surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="username" className="m-0">
                    Tên đăng nhập
                  </label>
                </FloatLabel>
                <FloatLabel className="m-2 mt-4 pt-2">
                  <InputText
                    id="email"
                    className="text-base text-color surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email" className="m-0">
                    Email
                  </label>
                </FloatLabel>
                <FloatLabel className="m-2 mt-4 pt-2">
                  <Password
                    inputId="password"
                    className=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    toggleMask
                    inputClassName="text-base text-color surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                  />
                  <label htmlFor="password" className="m-0">
                    Mật khẩu
                  </label>
                </FloatLabel>
              </div>
              {/* <button className="btn mt-3">Đăng ký</button> */}
              <Button label="Đăng ký" className="btn mt-3" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container top-0 flex justify-content-center w-100 c22"
          style={{
            width: "100vw",
            backgroundImage: `url(${backgif})` /* "url(https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b)" */,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            borderRadius: "0",
            maxHeight: "100vh",
            overflow: "hidden",
            position: "fixed",
          }}
        >
          <div className="">
            <p className="mainhead" style={{ top: "3rem", fontSize: '1.2rem' }}>
              BẢN ĐỒ DU LỊCH AN GIANG
            </p>
          </div>
          <div className="c1" style={{ display: "none " }}>
            <div className="c11" style={{ overflow: "hidden" }}>
              <h3 className="mainhead">DU LỊCH AN GIANG</h3>
              <p className="mainp m-3">
                Chào mừng bạn đến với phần mềm <br /> tra cứu du lịch An Giang.
                Chúc bạn có những trải nghiệm tuyệt vời nhất.
              </p>
            </div>
            <div id="left" onClick={handleSignInClick}>
              <h1 className="s1class">
                <span>ĐĂNG</span>
                <span className="su">NHẬP</span>
              </h1>
            </div>
            <div id="right" onClick={handleSignUpClick}>
              <h1 className="s2class">
                <span>ĐĂNG</span>
                <span className="su">KÝ</span>
              </h1>
            </div>
          </div>
          <div
            className="c2 left-0"
            style={{ width: "100vw", background: "none", top: "20%" }}
          >
            <div
              className="signin formgrid grid gap-3 justify-conent-center mt-3"
              style={{
                display: isSignUp ? "none" : "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="field gap-1">
                <div className="flex justify-content-center border-0">
                  <Button
                    // icon="pi pi-google"
                    text
                    severity="primary"
                    label="Đăng ký tài khoản"
                    onClick={null}
                  />
                </div>
                {/* <div className="flex justify-content-center">
                  <Button icon="pi pi-google" rounded severity="danger" />
                </div>
                <div className="flex justify-content-center mt-3">
                  <div className=" col-4 flex align-items-center">
                    <div className="col-12 flex align-items-center border-bottom-1 surface-border"></div>
                  </div>
                  <span>Hoặc</span>
                  <div className=" col-4 flex align-items-center">
                    <div className="col-12 flex align-items-center border-bottom-1 surface-border"></div>
                  </div>{" "}
                </div> */}
                <FloatLabel className="m-2 mt-4 pt-2">
                  <InputText
                    id="username1"
                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    htmlFor="username1"
                    className="m-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Tên đăng nhập
                  </label>
                </FloatLabel>
                <FloatLabel className="m-2 mt-3 pt-2">
                  <InputText
                    id="email"
                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="m-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Email
                  </label>
                </FloatLabel>
                <FloatLabel className="m-2 mt-3 pt-2">
                  <Password
                    inputId="password1"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // toggleMask
                    inputClassName="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                  />
                  <label
                    htmlFor="password1"
                    className="m-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Mật khẩu
                  </label>
                </FloatLabel>
                <div className="flex justify-content-center m-0 flex-column">
                  <Button label="" text onClick={handleSignUpClick} className="py-0 w-full flex justify-content-center">
                    Bạn đã có tài khoản?{" "}
                    <p style={{ color: "red", marginLeft: "0.5rem" }}>
                      {" "}
                      Đăng nhập
                    </p>
                  </Button>
                  <Button label="" text onClick={() => navigate('/home')} className="py-0 h-2rem w-full flex justify-content-center">
                    Đăng nhập không cần tài khoản
                  </Button>
                </div>
              </div>
              <Button label="Đăng ký" className="btn m-0" />{" "}
            </div>
            <div
              className="signup formgrid grid gap-1 justify-conent-center mt-3"
              style={{
                display: isSignUp ? "flex" : "none",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className=" ">
                
                <div className="flex justify-content-evenly">
                  <Button icon="pi pi-users" severity="warning" label="Khách" onClick={() => navigate('/home')}/>
                  <Button icon="pi pi-google" severity="danger" label="Google"/>
                </div>
                <div className="flex justify-content-center mt-3">
                  <div className=" col-4 flex align-items-center">
                    <div className="col-12 flex align-items-center border-bottom-1 surface-border"></div>
                  </div>
                  <span style={{ color: "white" }}>Hoặc</span>
                  <div className=" col-4 flex align-items-center">
                    <div className="col-12 flex align-items-center border-bottom-1 surface-border"></div>
                  </div>{" "}
                </div>
                <FloatLabel className="m-2 mt-4 pt-2">
                  <InputText
                    id="username"
                    className="text-base text-color surface-overlay p-2 border-1 pt-3 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    htmlFor="username"
                    className="m-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Tên đăng nhập
                  </label>
                </FloatLabel>

                <FloatLabel className="m-2 mt-4 pt-1">
                  <Password
                    inputId="password"
                    className=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    inputClassName="text-base text-color surface-overlay p-2 pt-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                  />
                  <label
                    htmlFor="password"
                    className="m-0 p-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Mật khẩu
                  </label>
                </FloatLabel>
              </div>
              <div className="flex justify-content-center m-0">
                <Button
                  className="m-0 p-0"
                  label=""
                  text
                  onClick={handleSignInClick}
                >
                  Bạn chưa có tài khoản?{" "}
                  <p style={{ color: "red", marginLeft: "0.5rem" }}> Đăng ký</p>
                </Button>
              </div>
              <Button
                label="Đăng nhập"
                className="btn mt-2"
                onClick={handleLogin}
              />
              <Button
                label="Quên mật khẩu?"
                text
                onClick={() => setResetPassword(true)}
                className="m-0"
              />
              <Button
                className="btn m-0"
                label="Quản trị viên đăng nhập"
                text
                // severity="secondary"
                onClick={() => navigate("/admin/login")}
              />
            </div>
          </div>
        </div>
      )}
      {device() ? (
        <div
          style={{
            position: "fixed",
            bottom: "2%",
            width: "100%",
            //   height: "5%",
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: "var(--text-color)",
            textAlign: "center",
            zIndex: "100",
            fontWeight: "300",
          }}
        >
          <p>
            Mai Thư Lâm - Khóa luận tốt nghiệp - Chuyên ngành Bản đồ, Viễn thám
            và GIS
          </p>
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            bottom: "3%",
            width: "100%",
            //   height: "5%",
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: "white",
            textAlign: "center",
            zIndex: "100",
            fontWeight: "300",
            fontSize: "0.8rem",
          }}
        >
          <p className="m-0">Mai Thư Lâm - Khóa luận tốt nghiệp</p>
          <p className="m-0">Chuyên ngành Bản đồ, Viễn thám và GIS</p>
        </div>
      )}
      <Dialog
        // header="Header"
        visible={resetPassword}
        style={{ width: device() ? "50vw" : "90vw" }}
        onHide={() => {
          if (!resetPassword) return;
          setResetPassword(false);
        }}
        draggable={false}
        className="flex justify-content-center"
      >
        <p className="flex justify-content-center pb-3">
          Tính năng đang cập nhật. Vui lòng liên hệ với quản trị viên để được hỗ
          trợ.
        </p>
      </Dialog>
    </Fragment>
  );
};

export default Login2;
