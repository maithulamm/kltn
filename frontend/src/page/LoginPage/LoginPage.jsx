import React, { Fragment } from "react";
import { Login } from "../../components/Login/Login"
import { Header } from "../../components/Header/Header"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login2 from "../../components/Login/Login2";

function LoginPage() {

  return (
      <Fragment>
        {/* <Header selected_Item={1}/> */}
        <Login />
      </Fragment>
  );
}

function LoginPageUser() {
  return (
      <Fragment>
        {/* <Header selected_Item={1}/> */}
        <Login2 />
      </Fragment>
  );
}

export { LoginPage, LoginPageUser };
