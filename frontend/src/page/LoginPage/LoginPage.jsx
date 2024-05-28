import React from "react";
import { Login, Login2 } from "../../components/Login/Login"
import { Header } from "../../components/Header/Header"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  return (
      <>
        {/* <Header selected_Item={1}/> */}
        <Login />
      </>
  );
}

function LoginPageUser() {
  return (
      <>
        {/* <Header selected_Item={1}/> */}
        <Login2 />
      </>
  );
}

export { LoginPage, LoginPageUser };
