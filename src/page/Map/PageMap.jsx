import React from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Map } from "../../components/Map/Map";

function Mapapp() {
  return (
    <div className="App">
      <Header />
      <Navbar selected_Item={1} />
      <Map whtl={["95vw", "92vh", "8vh", "5vw"]} />
    </div>

  );
}

export default Mapapp;
