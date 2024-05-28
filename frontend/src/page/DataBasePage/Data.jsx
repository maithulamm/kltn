import React, { Fragment } from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Admin } from "../../components/admin/admin"
// import { Place } from "../../components/Place/Place";
import { Col, ListGroup, Row } from "react-bootstrap";
import { SlidebarData } from "../../components/SlidebarData/SlidebarData";
import { Table } from "../../components/Table/Table";

import 'primereact/resources/primereact.min.css';
function Place() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header handleClick={handleShow}/>
      {/* <Navbar show={show} handleClose={handleClose} current={2}/> */}
      <Table />
    </Fragment>
      
  );
}

function User() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header handleClick={handleShow}/>
      <Navbar show={show} handleClose={handleClose} current={2}/>
      
    </Fragment>
      
  );
}


export { Place, User };