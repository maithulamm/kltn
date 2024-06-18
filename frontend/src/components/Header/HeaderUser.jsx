import React, { Fragment, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import avt from "../../assets/images/avatar.svg";
import "./style.css";
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import {
  getAllNews,
  getAllPlace2,
  getAllTypePlace,
  getDistance,
  getWeather,
  loading,
  logOut,
  showLoadingScreen,
} from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../redux/apiRequest";
import { getAllPlace } from "../../redux/apiRequest";
import { Menubar } from "primereact/menubar";
import { SplitButton } from "primereact/splitbutton";
import { Image } from "primereact/image";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-green/theme.css";
import { avtData } from "../../data/avtData";
import { Dialog } from "primereact/dialog";
import { getPlacesSuccess } from "../../redux/placeSlice";
import { getUsersSuccess } from "../../redux/userSlice";
import { getTypePlacesSuccess } from "../../redux/typePlaceSlice";
import { device } from "../Home/Home";
import { Button } from "primereact/button";
import { Dock } from "primereact/dock";
import { Card } from "primereact/card";
import { getPlaces2Success } from "../../redux/place2Slice";
export const HeaderUser = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const User = useSelector((state) => state.users?.users?.allUsers);
  const accessToken = user?.accessToken;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(dispatch, navigate);
    dispatch(getPlacesSuccess([]));
    dispatch(getUsersSuccess([]));
    dispatch(getTypePlacesSuccess([]));
    dispatch(getPlaces2Success([]));
    navigate("/login");
  };

  const confirm1 = () => {
    confirmDialog({
      message: `Bạn có muốn đăng xuất khỏi tài khoản ${user.username}?`,
      header: "Xác nhận đăng xuất",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      position: "top",
      accept: () => handleLogout(),
    });
  };

  const [visibleDialog, setVisibleDialog] = useState(false);

  const DialogCurrentUser = () => {
    return (
      <Dialog
        header="Thông tin cá nhân"
        visible={visibleDialog}
        style={{ width: "450px" }}
        onHide={() => setVisibleDialog(false)}
        draggable={false}
        maximizable
      >
        <div className="flex flex-column items-center justify-content-center align-items-start">
          <div className="flex justify-content-center align-items-start col-12">
            <Image
              src={
                avtData[User?.find((u) => u._id === user._id)?.avt || 3].path ||
                avtData[3].path
              }
              width={100}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="flex flex-column items-center justify-content-center align-items-start col-12">
            <div className="flex flex-column items-center justify-content-center align-items-start col-12">
              <span className="text-lg font-bold">{user.username}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </div>
      </Dialog>
    );
  };
  const [curDate, setCurrentTime] = useState(new Date().toLocaleString());
  const [curWeather, setCurWeather] = useState(
    JSON?.parse(localStorage?.getItem("weather")) || JSON?.parse("{}")
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, [curDate]);
  // console.log(curWeather);

  const page = [
    {
      label: "Trang chủ",
      icon: "pi pi-fw pi-home",
      url: "/home",
      command: () => showLoadingScreen(),
    },
    // {
    //   label: "Dữ liệu",
    //   icon: "pi pi-fw pi-database",
    //   items: [
    //     {
    //       label: "Địa điểm du lịch",
    //       icon: "pi pi-fw pi-map-marker",
    //       url: "/admin/data/place",
    //     },
    //     {
    //       label: "Loại địa điểm",
    //       icon: "pi pi-fw pi-list",
    //       url: "/admin/data/type",
    //     },
    //     {
    //       label: "Người dùng",
    //       icon: "pi pi-fw pi-address-book",
    //       url: "/admin/data/user",
    //     },
    //     {
    //       label: "Địa điểm tiện ích",
    //       icon: "pi pi-fw pi-objects-column",
    //       url: "/admin/data/place2",
    //     },
    //     // {
    //     //   label: "Sở thích",
    //     //   icon: "pi pi-fw pi-star",
    //     //   url: "/admin/data/prefer",
    //     // },
    //   ],
    // },
    {
      label: "Bản đồ",
      icon: "pi pi-fw pi-map",
      url: "/map",
      command: () => showLoadingScreen(),
    },
    {
      label: "Địa điểm",
      icon: "pi pi-fw pi-map-marker",
      url: "/place",
      command: () => {
        showLoadingScreen();
      },
    },
    {
      label: "Tiện ích",
      icon: "pi pi-fw pi-objects-column",
      url: "/place2",
      command: () => showLoadingScreen(),
    },
    {
      label: "Bản tin",
      icon: "pi pi-fw pi-book",
      url: "/news",
      command: () => showLoadingScreen(),
    },
    {
      label: "Góp ý",
      icon: "pi pi-fw pi-comments",
      url: "/rp",
      command: () => showLoadingScreen(),
    },
    ,
    {
      label: "Hướng dẫn",
      icon: "pi pi-fw pi-question-circle",
      url: "/guide",
    },
  ];
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude is :", latitude);
        console.log("Longitude is :", longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // console.log(getDistance("10.378172695497733", "105.43429861542022", "10.378471348476113", "105.4396288379375"));
    // getCurrentLocation();
    // getAllUser(accessToken, dispatch);
    getAllPlace(accessToken, dispatch);
    getAllPlace2(accessToken, dispatch);
    getAllTypePlace(accessToken, dispatch);
    getAllNews(accessToken, dispatch);
    // getWeather()

    const style = document.createElement("style");

    const hrefPage = window.location.pathname.split("/");
    // console.log(getWeather())
    style.innerHTML = `
          #HEADER > div.p-menubar.p-component > ul > li:nth-child(${
            hrefPage[1] === "home"
              ? 1
              : hrefPage[1] === "map"
              ? 2
              : hrefPage[1] === "place"
              ? 3
              : hrefPage[1] === "place2"
              ? 4
              : hrefPage[1] === "news"
              ? 5
              : hrefPage[1] === "rp"
              ? 6
              : null
          }) > div > a > span {
            font-weight: 700;
            border-radius: 10px;
            color: #10b981 ;
        }
        
    `;
    document.head.appendChild(style);

    // console.log(curDate);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <section id="HEADER">
      {loading()}
      <Menubar
        start={
          device() ? (
            <Link to="/home">
              {" "}
              <img
                alt="logo"
                src={logo}
                height="40"
                className="mr-2"
              ></img>{" "}
            </Link>
          ) : (
            <Link to="/home">
              {" "}
              <img
                alt="logo"
                src={logo}
                height="40"
                className="mr-2"
              ></img>{" "}
            </Link>
          )
        }
        model={page}
        end={
          <Fragment>
            {user ? (
              <div className="flex justify-content-center align-items-center">
                {device() ? (
                  <div className="h-2rem flex justify-content-center align-items-center mx-3">
                    {curDate} | Long Xuyên
                  </div>
                ) : (
                  <div className="h-2rem flex justify-content-center align-items-center">
                    <img
                      src={
                        curWeather?.current?.condition?.icon ||
                        "https://cdn-icons-png.flaticon.com/512/757/757401.png"
                      }
                      style={{
                        height: "3rem",
                        width: "2rem",
                        objectFit: "contain",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.9rem",
                      }}
                    >
                      {curWeather?.current?.temp_c || 30}°C
                    </p>
                  </div>
                )}{" "}
                {device() ? (
                  <div className="h-2rem flex justify-content-center align-items-center">
                    <img
                      src={
                        curWeather?.current?.condition?.icon ||
                        "https://cdn-icons-png.flaticon.com/512/757/757401.png"
                      }
                      style={{
                        height: "3rem",
                        width: "2rem",
                        objectFit: "contain",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.9rem",
                      }}
                    >
                      {curWeather?.current?.temp_c || 30}°C
                    </p>
                  </div>
                ) : null}
                <Image
                  className="rounded-full"
                  src={
                    avtData[User?.find((u) => u?._id === user?._id)?.avt || 3]
                      ?.path || avtData[3].path
                  }
                  width={"40vw"}
                  style={{ marginLeft: "1rem" }}
                  imageClassName="rounded-full h-3rem w-2rem"
                />
              </div>
            ) : (
              <div className="flex justify-content-center align-items-center">
                {device() ? (
                  <div className="h-2rem flex justify-content-center align-items-center mx-3">
                    {curDate}
                  </div>
                ) : null}
                |
                <Button
                  label="Đăng nhập"
                  onClick={() => navigate("/login")}
                  text
                />
              </div>
            )}
            {/* <SplitButton
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <a style={{ fontSize: "0.9rem" }}>
                    Xin chào, {user?.username}!
                  </a>
                  <Image
                    className="rounded-full"
                    src={
                      avtData[User?.find((u) => u._id === user._id)?.avt || 3]
                        ?.path || avtData[3].path
                    }
                    width={"40vw"}
                    style={{ marginLeft: "1rem" }}
                    imageClassName="rounded-full h-3rem w-2rem"
                  />
                </div>
              }
              draggable={false}
              onClick={() => setVisibleDialog(true)}
              model={[
                {
                  label: "Thông tin cá nhân",
                  icon: "pi pi-user",
                  command: () => setVisibleDialog(true),
                },
                { label: "Đổi mật khẩu", icon: "pi pi-key" },
                {
                  label: "Đăng xuất",
                  icon: "pi pi-sign-out",
                  command: () => confirm1(),
                },
              ]}
              text
              buttonClassName="p-0"
              menuButtonClassName="p-0"
            /> */}
          </Fragment>
        }
        menuIcon="pi pi-bars"
      />
      {!device() ? "" : null}
      <ConfirmDialog />
      {visibleDialog && <DialogCurrentUser />}
    </section>
  );
};
