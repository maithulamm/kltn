import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
} from "react";

import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumb } from "primereact/breadcrumb";
import "./style.css";
import { Link } from "react-router-dom";
import { Row } from "primereact/row";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { Card } from "primereact/card";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import MapOverlay from "./MapOverlay";
import { Calendar } from "primereact/calendar";
import DropAVT from "./dropAVT.jsx";
import { Image } from "primereact/image";
import { avtData } from "../../data/avtData.js";

import {
  addUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../../redux/apiRequest.js";
import { device } from "../Home/Home.jsx";
import { Toast } from "primereact/toast";
function DynamicColumnsDemo() {
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );

  const toast = useRef(null);

  const show = ({ severity, summary, detail }) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };
  const dispatch = useDispatch();

  const [currentRowData, setCurrentRowData] = useState(null);
  const [visible_d, setVisible_d] = useState(false);
  const [visible_x, setVisible_x] = useState(false);
  const [visible_a, setVisible_a] = useState(false);
  const Data = useSelector((state) => state.users?.users?.allUsers);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prefer: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isAdmin: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    updatedAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    birthday: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const clearFilter = () => {
    setGlobalFilterValue("");
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      intro: { value: null, matchMode: FilterMatchMode.CONTAINS },
      type: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS,
      },
      phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      address: { value: null, matchMode: FilterMatchMode.CONTAINS },
      info: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const op = useRef(null);
  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-center m-2"
        style={{ width: "auto" }}
      >
        {window.innerHeight > window.innerWidth ? (
          <Fragment>
            <Button
              label={null}
              icon="pi pi-filter-slash"
              className="p-button-primary"
              onClick={() => {
                clearFilter();
              }}
              text
              rounded
              // tooltip="Xóa tất cả bộ lọc"
            />
            <Button
              label={null}
              icon="pi pi-plus"
              className="p-button-primary"
              onClick={() => {
                setVisible_a(true);
              }}
              text
              rounded
              // tooltip="Thêm địa điểm mới"
            />
            <Button
              type="button"
              icon="pi pi-refresh"
              label=""
              onClick={() => {
                getAllUser(accessToken, dispatch);
              }}
              text
              rounded
              className=""
            />
            <Button
              type="button"
              icon="pi pi-search"
              label=""
              onClick={(e) => op.current.toggle(e)}
              text
              rounded
            />
            <OverlayPanel ref={op}>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                  value={globalFilterValue}
                  onChange={(e) => onGlobalFilterChange(e)}
                  placeholder="Nhập từ khóa"
                />
              </IconField>
            </OverlayPanel>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              label={null}
              icon="pi pi-filter-slash"
              className="p-button-primary"
              onClick={() => {
                clearFilter();
              }}
              text
              rounded
              tooltip="Xóa tất cả bộ lọc"
            />
            <Button
              label={null}
              icon="pi pi-plus"
              className="p-button-primary"
              onClick={() => {
                setVisible_a(true);
              }}
              text
              rounded
              tooltip="Thêm địa điểm mới"
            />
            <Button
              type="button"
              icon="pi pi-refresh"
              label=""
              onClick={() => {
                getAllUser(accessToken, dispatch);
              }}
              text
              rounded
              className="mr-2"
              tooltip="Làm mới"
            />
            <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText
                value={globalFilterValue}
                onChange={(e) => onGlobalFilterChange(e)}
                placeholder="Nhập từ khóa"
              />
            </IconField>
          </Fragment>
        )}
      </div>
    );
  };

  const header = renderHeader();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const iconItemTemplate = (item, options) => {
    return (
      <a className={options.className}>
        <span className={item.icon}></span>
      </a>
    );
  };
  const items = [
    { icon: "pi pi-database", template: iconItemTemplate },
    { icon: "pi pi-address-book", template: iconItemTemplate },
  ];
  const home = { icon: "pi pi-home", url: "../" };

  const body_cog = (rowData) => {
    return (
      <Fragment>
        <Button
          outlined
          icon={`pi pi-pencil`}
          onClick={() => {
            setVisible_d(true);
            setCurrentRowData(rowData);
          }}
          tooltip="Chỉnh sửa thông tin"
          className="p-button-success"
        />
      </Fragment>
    );
  };

  const body_trash = (rowData) => {
    return (
      <Fragment>
        <Button
          outlined
          icon={`pi pi-trash`}
          className="p-button-danger"
          onClick={() => {
            setVisible_x(true);
            setCurrentRowData(rowData);
          }}
          tooltip="Xóa người dùng"
        />
      </Fragment>
    );
  };

  // function convertISOToLocal(isoDateString) {
  //   const date = new Date(isoDateString);

  //   // Định dạng ngày giờ theo định dạng mong muốn
  //   const options = {
  //     weekday: "short",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     timeZoneName: "short",
  //   };

  //   // Lấy định dạng ngày giờ theo múi giờ hiện tại của hệ thống
  //   return date.toLocaleString("en-US", options);
  // }
  const Type = useSelector(
    (state) => state.typePlaces?.typePlaces?.allTypePlaces
  );
  const Dialog_C = () => {
    const [dataEdit, setDataEdit] = useState({
      id: currentRowData?._id,
      username: currentRowData?.username,
      email: currentRowData?.email,
      gender: currentRowData.gender,
      phone: currentRowData?.phone,
      prefer: currentRowData?.prefer,
      isAdmin: currentRowData?.isAdmin,
      fullName: currentRowData?.fullName,
      avt: currentRowData?.avt,
      birthday: currentRowData?.birthday,
      startDate: currentRowData?.createdAt,
      updatedAt: currentRowData?.updatedAt,
    });

    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const [selectedAvtID, setSelectedAvtID] = useState(dataEdit.avt);
    const handleAvtID = (id) => {
      setSelectedAvtID(id);
    };

    const [selectType, setSelectType] = useState(
      currentRowData?.prefer?.map((t) => t[0])
    );
    const Type = useSelector(
      (state) => state.typePlaces?.typePlaces?.allTypePlaces
    );
    const update_data = {
      id: dataEdit.id,
      username: dataEdit.username,
      email: dataEdit.email,
      phone: dataEdit.phone,
      prefer: selectType?.map((t) => ({ name: t })),
      isAdmin: dataEdit.isAdmin === "Quản trị viên" ? true : false,
      fullName: dataEdit.fullName,
      avt: selectedAvtID,
      birthday: dataEdit.birthday,
      gender: dataEdit.gender,
    };
    console.log(update_data);
    return (
      <Dialog
        header={`Thông tin chi tiết | ID: ${dataEdit.id}`}
        visible={visible_d}
        maximizable
        style={{ width: !device ? "70vw" : "90vw" }}
        onHide={() => setVisible_d(false)}
        draggable={false}
      >
        <div
          className="formgrid grid p-5"
          style={{
            color: "black",
            textIndent: "0.4rem",
            fontWeight: "bold",
            borderRadius: "12px",
            backgroundColor: "#fff",
          }}
        >
          <div className="field col-12 md:col-6 ">
            <label htmlFor="intro">Ngày tạo</label>
            <InputText
              disabled
              value={dataEdit.startDate}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-6 ">
            <label htmlFor="lastname6">Cập nhật gần nhất</label>
            <InputText
              disabled
              value={dataEdit.updatedAt}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3 ">
            <label htmlFor="intro">Tên đăng nhập</label>
            <InputText
              onChange={(e) => handleInputChange(e, "username")}
              value={dataEdit.username}
              id="intro"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3 ">
            <label htmlFor="lastname6">Họ và tên</label>
            <InputText
              onChange={(e) => handleInputChange(e, "fullName")}
              value={dataEdit.fullName}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3 ">
            <label htmlFor="lastname6">Email</label>
            <InputText
              onChange={(e) => handleInputChange(e, "email")}
              value={dataEdit.email}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3 ">
            <label htmlFor="firstname6">Số điện thoại</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "phone")}
              value={dataEdit.phone}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-4 ">
            <label htmlFor="lastname6">Giới tính</label>
            <Dropdown
              value={dataEdit.gender}
              options={[
                { label: "Nam", value: "Nam" },
                { label: "Nữ", value: "Nữ" },
              ]}
              onChange={(e) => handleInputChange(e, "gender")}
              placeholder="Chọn giới tính"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
            {/* <InputText onChange={(e) => handleInputChange(e, "gender")} value={dataEdit.gender} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="firstname6">Ngày sinh</label>
            <Calendar
              onChange={(e) => handleInputChange(e, "birthday")}
              dateFormat="dd/mm/yy"
              value={new Date(dataEdit.birthday)}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
            {/* <InputText keyfilter="num" onChange={(e) => handleInputChange(e, "birthday")} value={dataEdit.birthday} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="lastname6">Quyền</label>
            <Dropdown
              value={dataEdit.isAdmin}
              options={[
                { label: "Quản trị viên", value: "Quản trị viên" },
                { label: "Người dùng", value: "Người dùng" },
              ]}
              onChange={(e) => handleInputChange(e, "isAdmin")}
              placeholder="Chọn quyền"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
            {/* <InputText onChange={(e) => handleInputChange(e, "isAdmin")} value={dataEdit.isAdmin} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="lastname6">Sở thích</label>
            <MultiSelect
              value={selectType?.map((t) => ({ name: t }))}
              onChange={(e) => {
                setSelectType(e.value?.map((t) => t.name) || []);
              }}
              options={
                Type?.map((t) => ({
                  name: t.name
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
          <div className="field col-8 md:col-2">
            <label htmlFor="lastname6">Ảnh đại diện</label>
            <DropAVT returnAvtID={handleAvtID} state={currentRowData?.avt} />
            {/* <InputText onChange={(e) => handleInputChange(e, "avt")} value={dataEdit.avt} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
          </div>
          <div className="field col-4 md:col-3">
            <Image
              src={avtData[selectedAvtID]?.path || avtData[3].path}
              zoomSrc={avtData[selectedAvtID]?.path || avtData[3].path}
              alt="Image"
              width="100"
              height="100"
              preview
            />
          </div>
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (update_data.username === "" || update_data.email === "") {
                  show({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Tên đăng nhập và email không được để trống!",
                  });
                } else {
                  updateUser(update_data, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Success",
                    detail: "Cập nhật thông tin thành công!",
                  });
                  setVisible_d(false);
                  setTimeout(() => {
                    getAllUser(accessToken, dispatch);
                  }, 1000);
                  getAllUser(accessToken, dispatch);
                }
              }}
            />
            <Button
              label="Hủy bỏ"
              icon="pi pi-times"
              className="p-button-danger m-2 h-3rem"
              onClick={() => setVisible_d(false)}
            />
          </div>
        </div>
      </Dialog>
    );
  };

  const Dialog_X = () => {
    return (
      <Dialog
        header={`Xóa người dùng`}
        visible={visible_x}
        onHide={() => setVisible_x(false)}
      >
        <div
          className="formgrid grid"
          style={{
            width: window.innerWidth > window.innerHeight ? "40vw" : "95vw",
            maxHeight: "40vh",
          }}
        >
          <div className="flex col-12 2 justify-content-center font-bold text-xl">
            <label className="flex justify-content-center flex-column">
              <p className="flex justify-content-center m-0">
                Xác nhận xóa {currentRowData?.isAdmin}
              </p>{" "}
              <p
                className="flex justify-content-center m-0"
                style={{ color: "red" }}
              >
                {currentRowData?.username}
              </p>
              {/* <div>?</div> */}
            </label>
          </div>
          <div className="field col-12 md:col-6"> </div>
          <div className="flex col-12 2 justify-content-center">
            <Button
              label="Hủy"
              icon="pi pi-times"
              className="p-button-primary m-2 h-3rem"
              onClick={() => setVisible_x(false)}
            />
            <Button
              label="Xóa"
              icon="pi pi-trash"
              className="p-button-warning m-2 h-3rem"
              onClick={() => {
                deleteUser(currentRowData?._id, accessToken, dispatch);
                show({
                  severity: "success",
                  summary: "Success",
                  detail: "Xóa người dùng thành công!",
                });
                setVisible_x(false);
                setTimeout(() => {
                  getAllUser(accessToken, dispatch);
                }, 1000);
                // getAllUser(accessToken, dispatch);
              }}
            />
          </div>
        </div>
      </Dialog>
    );
  };

  const Dialog_A = () => {
    const [selectType, setSelectType] = useState([]);
    const [dataAdd, setDataAdd] = useState({
      username: "",
      gender: "Nam",
      email: "",
      phone: "0",
      // prefer: [],
      isAdmin: "Người dùng",
      fullName: "",
      avt: "",
      birthday: new Date("1999-12-31T17:00:00.000Z"),
    });
    const handleInputChange = (e, field) => {
      setDataAdd((prev) => ({ ...prev, [field]: e.target.value }));
    };
    const [selectedAvtID, setSelectedAvtID] = useState(null);
    const handleAvtID = (id) => {
      setSelectedAvtID(id);
    };
    const add_data = {
      username: dataAdd.username,
      email: dataAdd.email,
      phone: dataAdd.phone,
      prefer: selectType,
      isAdmin: dataAdd.isAdmin === "Quản trị viên" ? true : false,
      fullName: dataAdd.fullName,
      avt: selectedAvtID,
      birthday: dataAdd.birthday,
      password: "123456",
    };
    // console.log(add_data);
    return (
      <Dialog
        header={`Thêm người dùng mới`}
        visible={visible_a}
        style={{
          width: !device ? "70vw" : "90vw",
        }}
        onHide={() => setVisible_a(false)}
        draggable={false}
        maximizable
      >
        <div
          className="formgrid grid"
          style={{
            color: "black",
            textIndent: "0.4rem",
            fontWeight: "bold",
            borderRadius: "12px",
            backgroundColor: "#fff",
          }}
        >
          <div className="field col-12 md:col-3">
            <label htmlFor="intro">Tên đăng nhập</label>
            <InputText
              onChange={(e) => handleInputChange(e, "username")}
              value={dataAdd.username}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Họ và tên</label>
            <InputText
              onChange={(e) => handleInputChange(e, "fullName")}
              value={dataAdd.fullName}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Email</label>
            <InputText
              onChange={(e) => handleInputChange(e, "email")}
              value={dataAdd.email}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="firstname6">Số điện thoại</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "phone")}
              value={dataAdd.phone}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="lastname6">Giới tính</label>
            <Dropdown
              value={dataAdd.gender}
              options={[
                { label: "Nam", value: "Nam" },
                { label: "Nữ", value: "Nữ" },
              ]}
              onChange={(e) => handleInputChange(e, "gender")}
              placeholder="Chọn giới tính"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="firstname6">Ngày sinh</label>
            <Calendar
              onChange={(e) => handleInputChange(e, "birthday")}
              dateFormat="dd/mm/yy"
              value={new Date(dataAdd.birthday)}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="lastname6">Quyền</label>
            <Dropdown
              value={dataAdd.isAdmin}
              options={[
                { label: "Quản trị viên", value: "Quản trị viên" },
                { label: "Người dùng", value: "Người dùng" },
              ]}
              onChange={(e) => handleInputChange(e, "isAdmin")}
              placeholder="Chọn quyền"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="lastname6">Sở thích</label>
            <MultiSelect
              value={selectType}
              onChange={(e) => setSelectType(e.value)}
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
              itemTemplate={(option) => (
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
              )}
            />
          </div>
          <div className="field col-8 md:col-3">
            <label htmlFor="lastname6">Ảnh đại diện</label>
            <DropAVT returnAvtID={handleAvtID} />
          </div>
          <div className="field col-4 md:col-3">
            <Image
              src={avtData[selectedAvtID]?.path || avtData[3].path}
              zoomSrc={avtData[selectedAvtID]?.path || avtData[3].path}
              alt="Image"
              width="100"
              height="100"
              preview
            />
          </div>
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Tạo mới"
              icon="pi pi-plus"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (add_data.username === "" || add_data.email === "") {
                  show({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Tên đăng nhập và email không được để trống!",
                  });
                } else {
                  addUser(add_data, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Success",
                    detail: "Thêm người dùng thành công!",
                  });
                  setVisible_a(false);
                  setTimeout(() => {
                    getAllUser(accessToken, dispatch);
                  }, 1000);
                  getAllUser(accessToken, dispatch);
                }
              }}
            />
            <Button
              label="Hủy bỏ"
              icon="pi pi-times"
              className="p-button-danger m-2 h-3rem"
              onClick={() => setVisible_a(false)}
            />
          </div>
        </div>
      </Dialog>
    );
  };
  const [types] = useState(Type?.map((t) => [t.name]));
  // console.log(types);
  const bodyType = (rowData) => {
    // console.log(rowData);
    return (
      <div className={`grid flex justify-content-${"center"}`}>
        {rowData.prefer?.length > 0 ? (
          rowData.prefer[0] !== "" ? (
            rowData.prefer?.map((e, index) => {
              const findType = Type?.find((t) => t.name === e[0]);
              return findType?.name ? (
                <Tag
                  key={index}
                  value={findType?.name || null}
                  className="m-1"
                  style={{
                    backgroundColor: `#${findType?.color || "none"}`,
                    color:
                      parseInt(findType?.color, 16) > 0xffffff / 0.9
                        ? "gray"
                        : "white",
                    // boxShadow: "0 0 0 1px #d9d9d9",
                  }}
                />
              ) : null;
            })
          ) : (
            <Tag value="Đang cập nhật" severity="warning" />
          )
        ) : (
          <Tag value="Chưa cập nhật" severity="warning" />
        )}
      </div>
    );
  };

  const typesRowFilterTemplate = (options) => {
    // console.log(options);
    return (
      <MultiSelect
        value={options.value}
        options={types?.map((t) => ({ name: t })) || []}
        onChange={(e) => {
          options.filterCallback(e.value, options.field);
          // console.log(e);
        }}
        itemTemplate={typesItemTemplate}
        placeholder="Chọn loại"
        className="p-column-filter"
        optionLabel="name"
        optionValue="name"
        maxSelectedLabels={10}
        style={{ width: "100%" }}
        // selectedItemsLabel={(e) => `${e.length} loại đã chọn`}
      />
    );
  };

  const typesItemTemplate = (option) => {
    // console.log(option);
    return (
      <div className="flex">
        <Tag
          value={option.name[0]}
          className="m-1"
          style={{
            backgroundColor: `#${
              Type.find((t) => t.name === option.name[0])?.color
            }`,
            color:
              parseInt(Type.find((t) => t.name === option.name[0])?.color, 16) >
              0xffffff / 0.9
                ? "gray"
                : "white",
          }}
        />
      </div>
    );
  };
  useEffect(() => {
    setProducts(
      Data.filter((D) => D.username !== "admin")?.map((D, index) => {
        return {
          ID: index + 1,
          _id: D._id,
          gender: D.gender,
          phone: D.phone,
          prefer: D.prefer?.map((t) => [t.name]) || [],
          username: D.username,
          email: D.email,
          // password: bcrypt.compare(D.password, D.password) ? '********' : 'Chưa cập nhật',
          isAdmin: D.isAdmin === true ? "Quản trị viên" : "Người dùng",
          createdAt: D.createdAt
            ? new Date(D.createdAt).toLocaleString()
            : "Chưa cập nhật",
          updatedAt: D.updatedAt
            ? new Date(D.createdAt).toLocaleString()
            : "Chưa cập nhật",
          birthday: D.birthday
            ? new Date(D.birthday)
            : new Date("1999-12-31T17:00:00.000Z"),
          fullName: D.fullName,
          avt: D.avt,
        };
      })
    );
    setLoading(false);
    console.log(products);
    // console.log(Data);
  }, [Data, selectedProducts]);

  return (
    <div className="card ">
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className={`flex col-${
            window.innerWidth > window.innerHeight ? 6 : 9
          } justify-content-start`}
        >
          <BreadCrumb
            model={items}
            home={home}
            className="ml-3"
            style={{
              width: "auto",
              border: "none",
              padding: "1rem 0 0 0",
              backgroundColor: "transparent",
            }}
          />

          {selectedProducts?.length > 0 && (
            <Button
              label={
                window.innerWidth > window.innerHeight
                  ? `Xóa ${selectedProducts?.length} người dùng đã chọn`
                  : selectedProducts?.length
              }
              icon="pi pi-trash"
              className="p-button-warning ml-2"
              onClick={null}
            />
          )}
        </div>
        <div className="flex justify-content-end">{renderHeader()}</div>
      </div>
      <DataTable
        value={products}
        removableSort
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ maxWidth: "100vw" }}
        dataKey="_id"
        filters={filters}
        loading={loading}
        globalFilterFields={[
          "gender",
          "phone",
          "prefer",
          "username",
          "email",
          // 'password',
          "isAdmin",
          "createdAt",
          "updatedAt",
          "birthday",
        ]}
        className="p-datatable-customers"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        selectionMode="checkbox"
        scrollable
        showGridlines
        resizableColumns
        columnResizeMode="expand"
        reorderableColumns
        rowHover
        scrollHeight="70vh"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "2rem" }}
        ></Column>

        <Column
          alignHeader={"center"}
          align={"center"}
          header={<span className={"pi pi-pencil"}></span>}
          style={{ width: "3rem" }}
          body={body_cog}
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          header={<span className={"pi pi-trash"}></span>}
          style={{ width: "3rem" }}
          body={body_trash}
        />

        <Column
          alignHeader={"center"}
          align={"left"}
          field="username"
          header="Tên đăng nhập"
          sortable
          style={{ minWidth: "10rem" }}
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          field="type"
          header="Loại"
          sortable
          style={{ minWidth: "10rem" }}
          filter
          filterElement={typesRowFilterTemplate}
          body={bodyType}
          filterMenuStyle={{ width: "25rem" }}
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          field="isAdmin"
          header="Quyền"
          sortable
          style={{ minWidth: "10rem" }}
          filter
          filterPlaceholder="Search by type"
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          field="phone"
          header="Số điện thoại"
          sortable
          style={{ maxWidth: "12rem" }}
          filter
          filterPlaceholder="Search by phone number"
        />
        {/* <Column field="during" header="Thời gian" sortable style={{ minWidth: '10rem' }}/> */}
        {/* <Column alignHeader={'center'} align={'center'} field="open" header="Mở cửa" sortable style={{ minWidth: '10rem' }}/> */}
        {/* <Column alignHeader={'center'} align={'center'} field="close" header="Đóng cửa" sortable style={{ minWidth: '10rem' }}/> */}
        <Column
          alignHeader={"center"}
          align={"center"}
          field="email"
          header="Email"
          sortable
          style={{ maxWidth: "18rem", textOverflow: "ellipsis" }}
          filter
          filterPlaceholder="Search by email"
        />
        <Column
          alignHeader={"center"}
          align={"left"}
          field="createdAt"
          header="Thời gian tạo"
          sortable
          style={{ maxWidth: "20rem", textOverflow: "ellipsis" }}
          filter
        />
        {/* <Column alignHeader={'center'} align={'center'} field="lat" header="Vĩ độ" style={{ minWidth: '5rem' }} filter/>
                <Column alignHeader={'center'} align={'center'} field="long" header="Kinh độ" style={{ minWidth: '5rem' }} filter/> */}
      </DataTable>
      {visible_d && <Dialog_C />}
      {visible_x && <Dialog_X />}
      {visible_a && <Dialog_A />}
      <Toast ref={toast} />
    </div>
  );
}

export { DynamicColumnsDemo as Table };
