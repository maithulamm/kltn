import React from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";


function Data() {
  return (
    <div className="App">
      <Header />
      <Navbar selected_Item={2} />
    </div>

  );
}

export default Data;
