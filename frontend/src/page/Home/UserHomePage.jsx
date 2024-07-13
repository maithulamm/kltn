import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
// import { Navbar } from "../../components/Navbar/Navbar";
import { Statistic } from "../../components/statistic";
import { Map } from "../../components/Map";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard, { device } from "../../components/Home/Home.jsx";
import PieChart from "../../components/Home/Chart.jsx";
import {
  getAllFeedback,
  getAllNews,
  getAllPlace,
  getAllPlace2,
  getAllTypePlace,
  hideLoadingScreen,
  loading,
  logOut,
  showLoadingScreen,
} from "../../redux/apiRequest.js";
import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/primereact.min.css";
import { HeaderUser } from "../../components/Header/HeaderUser.jsx";
import Circular from "../../components/Home/Circular.jsx";
import { MenuUser } from "../../components/User/MenuUser.jsx";
import { NewsUser } from "../../components/User/NewsUser.jsx";
function UserHomePage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;
  const places = useSelector((state) => state.places?.places?.allPlaces);
  useEffect(() => {
    getAllPlace(accessToken, dispatch);
    getAllPlace2(accessToken, dispatch);
    getAllTypePlace(accessToken, dispatch);
    getAllNews(accessToken, dispatch);
    getAllFeedback(accessToken, dispatch);
    document.title = "Du lịch An Giang";
    showLoadingScreen();
    setTimeout(() => {
      hideLoadingScreen();
      // return window.location.reload();
    }, 2000);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        return localStorage.setItem("location", [
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    } else {
      localStorage.setItem("location", []);
    }
  }, []);

  return (
    <Fragment>
      <HeaderUser />
      <MenuUser />
      <NewsUser />
      <Circular />
      {/* <Dashboard /> */}
      {/* <div className="card flex justify-content-center col-12 grid m-0">
        <div className="justify-content-center col-12 md:col-8">
          <Map height={device() ? "65vh" : '30vh'} />
        </div>
        <div className="justify-content-center col-12 md:col-4">
          <PieChart />
        </div>
      </div> */}
    </Fragment>
  );
}

export default UserHomePage;
