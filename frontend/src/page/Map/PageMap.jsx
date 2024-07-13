import React, { Fragment, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Map } from "../../components/Map/Map";
import { HeaderUser } from "../../components/Header/HeaderUser";
import { MapUser } from "../../components/Map/MapUser";
import { getAllPlace2 } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { device } from "../../components/Home/Home";

const Mapapp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header />
      <Map height={"90vh"} />
    </Fragment>
  );
};

const MapappUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;

  useEffect(() => {
    getAllPlace2(accessToken, dispatch);
  }, []);
  return (
    <Fragment>
      <HeaderUser />
      <MapUser height={device() ? "90vh" : "80vh"} />
    </Fragment>
  );
};

export { Mapapp, MapappUser };
