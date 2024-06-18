import React, {Fragment, useState} from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Map } from "../../components/Map/Map";
import { HeaderUser } from "../../components/Header/HeaderUser";
import { MapUser } from "../../components/Map/MapUser";


const Mapapp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header />
      <Map height={'90vh'}/>
    </Fragment>
  );
}

const  MapappUser = ()   =>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <HeaderUser />
      <MapUser height={'90vh'}/>
    </Fragment>
  );
}

export {Mapapp, MapappUser}

