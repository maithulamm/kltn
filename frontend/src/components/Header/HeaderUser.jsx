import React, { Fragment, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import avt from "../../assets/images/avatar.svg";
import "./style.css";
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import {
  editUser,
  getAllNews,
  getAllPlace2,
  getAllTypePlace,
  getDistance,
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
import { device } from "../Home/Home";
import { Button } from "primereact/button";
import { Dock } from "primereact/dock";
import { Card } from "primereact/card";
import { getPlaces2Success } from "../../redux/place2Slice";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

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
    navigate("/kltn/login");
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

  const confirm2 = () => {
    confirmDialog({
      message: `Đăng nhập để sử dụng chức năng này!`,
      header: "Bạn chưa đăng nhập!",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-primary",
      position: "top",
      acceptLabel: "Đăng nhập",
      rejectLabel: "Để sau",
      draggable: false,
      accept: () => {
        showLoadingScreen();
        setTimeout(() => {
          navigate("/kltn/login");
        }, 1000);
      },
    });
  };

  const [visibleDialog, setVisibleDialog] = useState(false);
  const toast = useRef(null);
  const DialogCurrentUser = () => {
    const [dataEdit, setDataEdit] = useState({
      username: user?.username,
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
      gender: user?.gender,
      birthday: user?.birthday,
    });
    const updateData = {
      username: user?.username,
      fullName: dataEdit.fullName,
      email: dataEdit.email,
      phone: dataEdit.phone,
      gender: dataEdit.gender,
      birthday: dataEdit.birthday,
      accessToken: accessToken,
    };
    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };
    const Type = useSelector(
      (state) => state.typePlaces?.typePlaces?.allTypePlaces
    );
    const [selectType, setSelectType] = useState(
      user?.prefer?.map((t) => t[0])
    );
    

    const show = ({ severity, summary, detail }) => {
      toast.current.show({
        severity: severity,
        summary: summary,
        detail: detail,
      });
    };
    return (
      <Dialog
        header="Thông tin cá nhân"
        visible={visibleDialog}
        style={{ width: "50vw" }}
        onHide={() => setVisibleDialog(false)}
        draggable={false}
        maximizable
        maximized={device() ? false : true}
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
            <div className="field col-12 ">
              <label htmlFor="intro">Tên đăng nhập</label>
              <InputText
                onChange={(e) => handleInputChange(e, "username")}
                value={dataEdit?.username}
                id="intro"
                disabled
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div className="field col-12 ">
              <label htmlFor="lastname6">Họ và tên</label>
              <InputText
                onChange={(e) => handleInputChange(e, "fullName")}
                value={dataEdit?.fullName}
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div className="field col-12 ">
              <label htmlFor="lastname6">Email</label>
              <InputText
                onChange={(e) => handleInputChange(e, "email")}
                value={dataEdit?.email}
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div className="field col-12 ">
              <label htmlFor="firstname6">Số điện thoại</label>
              <InputText
                keyfilter="num"
                onChange={(e) => handleInputChange(e, "phone")}
                value={dataEdit?.phone}
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div className="w-full flex">
              <div className="field col-12 md:col-6 ">
                <label htmlFor="lastname6">Giới tính</label>
                <Dropdown
                  value={dataEdit?.gender}
                  options={[
                    { label: "Nam", value: "Nam" },
                    { label: "Nữ", value: "Nữ" },
                  ]}
                  onChange={(e) => handleInputChange(e, "gender")}
                  placeholder="Chọn giới tính"
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
                {/* <InputText onChange={(e) => handleInputChange(e, "gender")} value={user?.gender} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="firstname6">Ngày sinh</label>
                <Calendar
                  onChange={(e) => handleInputChange(e, "birthday")}
                  dateFormat="dd/mm/yy"
                  value={new Date(dataEdit?.birthday)}
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
                {/* <InputText keyfilter="num" onChange={(e) => handleInputChange(e, "birthday")} value={user?.birthday} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
              </div>
            </div>
            <div className="field col-12">
              <label htmlFor="lastname6">Sở thích</label>
              <MultiSelect
                value={selectType?.map((t) => ({ name: t }))}
                onChange={(e) => {
                  setSelectType(e.value?.map((t) => t.name) || []);
                }}
                options={
                  Type?.map((t) => ({
                    name: t.name,
                  })) || []
                }
                optionLabel="name"
                display="chip"
                placeholder="Chọn loại"
                maxSelectedLabels={10}
                className="w-full"
                itemTemplate={(option) => {
                  // console.log(option.name);
                  return (
                    <Tag
                      value={option.name}
                      style={{
                        backgroundColor: `#${
                          Type.find((t) => t.name === option.name)?.color
                        }`,
                        color:
                          parseInt(
                            Type.find((t) => t.name === option.name)?.color,
                            16
                          ) >
                          0xffffff / 0.9
                            ? "gray"
                            : "white",
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (updateData.username === "" || updateData.email === "") {
                  show({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Tên đăng nhập và email không được để trống!",
                  });
                } else {
                  editUser(updateData, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Success",
                    detail: "Cập nhật thông tin thành công!",
                  });
                  setVisibleDialog(false);
                  // setTimeout(() => {
                  //   getAllUser(accessToken, dispatch);
                  // }, 1000);
                  // getAllUser(accessToken, dispatch);
                }
              }}
            />
            <Button
              label="Hủy bỏ"
              icon="pi pi-times"
              className="p-button-danger m-2 h-3rem"
              onClick={() => setVisibleDialog(false)}
            />
          </div>
        </div>
      </Dialog>
    );
  };
  const [curDate, setCurrentTime] = useState(
    new Date().toLocaleString().split(" ")[1]
  );
  const [curWeather, setCurWeather] = useState(
    JSON?.parse(localStorage?.getItem("weather")) || JSON?.parse("{}")
  );

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString().split(" ")[1]);
    getWeather();
  }, [curDate]);
  // console.log(curWeather);

  const page = [
    {
      label: "Trang chủ",
      icon: "pi pi-fw pi-home",
      // url: "/kltn/home",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/home");
        return window.location.reload();
      },
    },
    {
      label: "Bản đồ",
      icon: "pi pi-fw pi-map",
      // url: "/kltn/map",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/map");
      },
    },
    {
      label: "Địa điểm",
      icon: "pi pi-fw pi-map-marker",
      // url: "/kltn/place",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/place");
      },
    },
    {
      label: "Tiện ích",
      icon: "pi pi-fw pi-objects-column",
      // url: "/kltn/place2",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/place2");
      },
    },
    {
      label: "Bản tin",
      icon: "pi pi-fw pi-book",
      // url: "/kltn/news",
      command: () => {
        showLoadingScreen();
        navigate("/kltn/news");
      },
    },
    {
      label: "Góp ý",
      icon: "pi pi-fw pi-comments",
      // url: "/kltn/feedback",
      command: () => {
        if (user) {
          showLoadingScreen();
          navigate("/kltn/feedback");
        } else {
          confirm2();
        }
      },
    },
  ];

  useEffect(() => {
    // setTimeout(() => {
    //   window.location.reload();
    // }, 60000 * 5);
    // getAllPlace(accessToken, dispatch);
    // getAllTypePlace(accessToken, dispatch);
    // getAllNews(accessToken, dispatch);

    const style = document.createElement("style", { type: "text/css" });

    const hrefPage = window.location.pathname.split("/kltn/");

    style.innerHTML = `
    #HEADER > div.p-menubar.p-component > ul > li:nth-child(
         ${
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
             : hrefPage[1] === "feedback"
             ? 6
             : hrefPage === "/kltn"
             ? 1
             : null
         }) > div > a > span {
            font-weight: 700;
            border-radius: 10px;
            color: #10b981 ;
            font-size: 1.1rem;
        }
        
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const op = useRef(null);
  return (
    <section id="HEADER">
      {loading()}
      <Toast ref={toast} />
      <Menubar
        start={
          device() ? (
            <img
              alt="logo"
              src={logo}
              height="40"
              className="mr-2 cursor-pointer"
              onClick={() => navigate("/kltn/home")}
            ></img>
          ) : (
            <img
              alt="logo"
              src={logo}
              height="40"
              className="mr-2"
              onClick={() => navigate("/kltn/home")}
            ></img>
          )
        }
        model={page}
        end={
          <Fragment>
            {user ? (
              <div className="flex justify-content-center align-items-center">
                {device() ? (
                  <div className="h-2rem flex justify-content-center align-items-center mx-3">
                    {curDate} | An Giang
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
                  className="rounded-full cursor-pointer"
                  src={
                    avtData[User?.find((u) => u?._id === user?._id)?.avt || 3]
                      ?.path || avtData[3].path
                  }
                  width={"40vw"}
                  style={{ marginLeft: "1rem" }}
                  imageClassName="rounded-full h-3rem w-2rem"
                  onClick={(e) => op.current.toggle(e)}
                />
                <OverlayPanel ref={op} className="p-0">
                  <div className="flex flex-column items-center justify-content-center align-items-start m-0 p-0">
                    <Button
                      label="Thông tin cá nhân"
                      onClick={() => setVisibleDialog(true)}
                      text
                    />
                    <Button
                      label="Đổi mật khẩu"
                      onClick={() => showConfirm("Chức năng đang cập nhật")}
                      text
                    />
                    <Button label="Đăng xuất" onClick={() => confirm1()} text />
                  </div>
                </OverlayPanel>
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
                  onClick={() => navigate("/kltn/login")}
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
