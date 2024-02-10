import React from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";

function FB() {
  return (
    <div className="App">
      <Header />
      <Navbar selected_Item={3} />
    </div>

  );
}

export default FB;
