import React, {Fragment, useState} from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Map } from "../../components/Map/Map";


function Mapapp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header handleClick={handleShow}/>
      {/* <Navbar show={show} handleClose={handleClose} current={1}/> */}
      <Map height={'91vh'}/>
    </Fragment>
  );
}

export default Mapapp;
