import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
// import { Navbar } from "../../components/Navbar/Navbar";
import { Statistic } from "../../components/statistic";
import { Map } from "../../components/Map";
import { AdminHome } from "../../components/admin/admin";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlace, getAllUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Home/Home.jsx";
import { Col, Row } from "react-bootstrap";
import { Notification } from "../../components/Home/Notification.jsx";
import { Chart_Pie } from "../../components/Home/Chart.jsx";

function HomePage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;


  // localStorage.setItem('access_Token', accessToken);
  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }

    if (accessToken) {
      // console.log("accessToken");
      getAllUser(accessToken, dispatch);
    }

    getAllPlace(accessToken, dispatch);
  }, [user, dispatch, accessToken, navigate]);

  return (
    <Fragment>
      <Header />
      {/* <Navbar show={show} handleClose={handleClose} current={0} /> */}
      <Dashboard />
      <Row className="justify-content-center m-0 p-0">
        <Col lg={11}>
          <Row className="my-3">
            <Col lg={8} className="">
              <Map height={"50vh"} />
            </Col>
            <Col lg={4} className=""></Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}

export default HomePage;
