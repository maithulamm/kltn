import React, { Fragment, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import avt from "../../assets/images/avatar.svg";
import "./style.css";
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import {
  editUser,
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
import { loginSuccess, logOutSuccess } from "../../redux/authSlice";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { device } from "../Home/Home";

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
  // const toast = useRef(null);
  const DialogCurrentUser = () => {
    const [dataEdit, setDataEdit] = useState({
      username: user?.username,
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
      gender: user?.gender,
      birthday: user?.birthday,
      avt: user?.avt,
    });
    const updateData = {
      username: user?.username,
      fullName: dataEdit.fullName,
      email: dataEdit.email,
      phone: dataEdit.phone,
      gender: dataEdit.gender,
      birthday: dataEdit.birthday,
      avt: dataEdit?.avt,
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
                  loginSuccess();
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
        navigate("/kltn/admin/feedback");
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
      <Toast ref={toast} />
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
