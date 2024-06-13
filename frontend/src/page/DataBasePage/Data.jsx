import React, { Fragment } from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { Admin } from "../../components/admin/admin"
// import { Place } from "../../components/Place/Place";
import { Col, ListGroup, Row } from "react-bootstrap";
import { SlidebarData } from "../../components/SlidebarData/SlidebarData";
import { Table } from "../../components/Table/Table";
import {Table as Table_User } from "../../components/Table/Table_User";
import {Table as Table_Types } from "../../components/Table/Table_Types";
import { Table2 } from "../../components/Table/Tabl2";

// import 'primereact/resources/primereact.min.css';
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

function Place2() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header handleClick={handleShow}/>
      {/* <Navbar show={show} handleClose={handleClose} current={2}/> */}
      <Table2 />
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
      <Table_User />
    </Fragment>
      
  );
}

function Type() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Header handleClick={handleShow}/>
      <Table_Types />

    </Fragment>
  );
}


export { Place, User, Type, Place2 };
