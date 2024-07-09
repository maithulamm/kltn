import React, { Fragment, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import avt from "../../assets/images/avatar.svg";
import "./style.css";
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import {
  getAllPlace2,
  getAllTypePlace,
  getWeather,
  loading,
  logOut,
  showConfirm,
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
import { logOutSuccess } from "../../redux/authSlice";

export const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const User = useSelector((state) => state.users.users.allUsers);
  // const [selectedIcon, setSelectedIcon] = useState(rl[selected_Item]);

  const accessToken = user?.accessToken;
  // localStorage.setItem('access_Token', accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toast = useRef(null);

  const handleLogout = () => {
    dispatch(logOutSuccess());
    navigate("/kltn/login");
    logOut(dispatch, navigate);
    // dispatch(getPlacesSuccess([]));
    dispatch(getUsersSuccess([]));
    dispatch(getTypePlacesSuccess([]));
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
              <span className="text-lg font-bold">{user?.username}</span>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
        </div>
      </Dialog>
    );
  };

  const page = [
    { label: "Trang chủ", icon: "pi pi-fw pi-home", url: "/kltn/admin/home" },
    {
      label: "Dữ liệu",
      icon: "pi pi-fw pi-database",
      items: [
        {
          label: "Địa điểm du lịch",
          icon: "pi pi-fw pi-map-marker",
          // url: "/kltn/admin/data/place",
          command: () => {
            showLoadingScreen();
            navigate("/kltn/admin/data/place");
          },
        },
        {
          label: "Loại địa điểm",
          icon: "pi pi-fw pi-list",
          // url: "/kltn/admin/data/type",
          command: () => {
            showLoadingScreen();
            navigate("/kltn/admin/data/type");
          },
        },
        {
          label: "Người dùng",
          icon: "pi pi-fw pi-address-book",
          // url: "/kltn/admin/data/user",
          command: () => {
            showLoadingScreen();
            navigate("/kltn/admin/data/user");
          },
        },
        {
          label: "Địa điểm tiện ích",
          icon: "pi pi-fw pi-objects-column",
          // url: "/kltn/admin/data/place2",
          command: () => {
            showLoadingScreen();
            navigate("/kltn/admin/data/place2");
          },
        },
        {
          label: "Bảng tin",
          icon: "pi pi-fw pi-bookmark",
          // url: "/kltn/data/news",
          command: () => {
            showLoadingScreen();
            navigate("/kltn/admin/data/news");
          },
        },
      ],
    },
    {
      label: "Bản đồ",
      icon: "pi pi-fw pi-map",
      // url: "/kltn/admin/map",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/admin/map");
      },
    },
    {
      label: "Phản hồi",
      icon: "pi pi-fw pi-comments",
      // url: "/kltn/admin/users",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/admin/users");
      },
    },
    {
      label: "[AI]  Huấn luyện Chatbot",
      icon: "",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/admin/chatbot");
      },
    },
    // {
    //   label: "Hướng dẫn",
    //   icon: "pi pi-fw pi-question-circle",
    //   // url: "/kltn/admin/guide",
    //   command: () => {
    //     showLoadingScreen();
    //     setTimeout(() => {
    //       showConfirm("");
    //     }, 500);
    //   },
    // },
  ];

  useEffect(() => {
    if (!user || user.isAdmin === false) {
      showLoadingScreen();
      navigate("/kltn");
    }
    getAllUser(accessToken, dispatch);
    getAllPlace(accessToken, dispatch);
    getAllPlace2(accessToken, dispatch);
    getAllTypePlace(accessToken, dispatch);

    const style = document.createElement("style");

    const hrefPage = window.location.pathname.split("/");

    style.innerHTML = `
          #HEADER > div.p-menubar.p-component > ul > li:nth-child(
          ${
            hrefPage[3] === "home"
              ? 1
              : hrefPage[3] === "data"
              ? 2
              : hrefPage[3] === "map"
              ? 3
              : hrefPage[3] === "feedback"
              ? 4
              : hrefPage[3] === "chatbot"
              ? 5
              : 6
          }) > div > a > span {
            font-weight: 700;
            border-radius: 10px;
            color: #10b981 ;
        }
        
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <section id="HEADER">
      {loading()}
      <Menubar
        start={
            <img alt="logo" src={logo} height="40" className="mr-2"
            onClick={() => navigate("/kltn/admin/home")}
            ></img>
        }
        model={page}
        end={
          <Fragment>
            <SplitButton
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <a style={{ fontSize: "0.9rem" }}>
                    Xin chào, {user?.username}!
                  </a>
                  <Image
                    className=""
                    src={
                      avtData[User?.find((u) => u?._id === user?._id)?.avt || 3]
                        ?.path || avtData[3].path
                    }
                    width={"40vw"}
                    style={{ marginLeft: "1rem" }}
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
            />
          </Fragment>
        }
        menuIcon="pi pi-bars"
      />
      <ConfirmDialog />
      {visibleDialog && <DialogCurrentUser />}
    </section>
  );
};
