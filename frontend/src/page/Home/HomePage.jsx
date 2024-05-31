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

      // // Tạo một thẻ link để thêm CSS từ PrimeReact
      // const linkElement = document.createElement('link');
      // linkElement.rel = 'stylesheet';
      // linkElement.href = require('mdb-react-ui-kit/dist/css/mdb.min.css');

      // // Thêm thẻ link vào phần tử <head> của trang
      // document.head.appendChild(linkElement);

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
      <div className="card justify-content-center my-4 w-12">
        <div className="justify-content-center w-8">
          <Map height={"50vh"} />
        </div>
        
      </div>
    </Fragment>
  );
}

export default HomePage;
