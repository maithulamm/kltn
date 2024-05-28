import React from "react";
import { Register } from "../../components/Register/Register"
import { Header } from "../../components/Header/Header"

function RegisterPage() {
  return (
      <>
        <Header selected_Item={0}/>
        <Register />
      </>
  );
}

export default RegisterPage;