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
import { getAllNews, getAllPlace, getAllTypePlace, loading, logOut } from "../../redux/apiRequest.js";
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

  // localStorage.setItem('access_Token', accessToken);
  useEffect(() => {
    getAllPlace(accessToken, dispatch);
    // getAllPlace2(accessToken, dispatch);
    getAllTypePlace(accessToken, dispatch);
    getAllNews(accessToken, dispatch);
    document.title = "Du lịch An Giang";
    // if (user === null || !user) {
    //   navigate("/login");
    // }
    // Lấy đường dẫn tới file CSS từ node_modules
    // const cssPath = require('primereact/resources/themes/lara-light-green/theme.css');

    // Tạo một thẻ link để thêm CSS từ PrimeReact
    // const linkElement = document.createElement('link');
    // linkElement.rel = 'stylesheet';
    // linkElement.href = cssPath;

    // Thêm thẻ link vào phần tử <head> của trang
    // document.head.appendChild(linkElement);
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
