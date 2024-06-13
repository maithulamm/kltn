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
import {
  addPlace,
  addTypePlace,
  deletePlace,
  getAllPlace,
  updatePlace,
} from "../../redux/apiRequest";
import { device } from "../Home/Home";
import { Toast } from "primereact/toast";

function DynamicColumnsDemo() {
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );
  const dispatch = useDispatch();
  const toast = useRef(null);

  const show = ({ severity, summary, detail }) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  const [currentRowData, setCurrentRowData] = useState(null);
  const [visible_d, setVisible_d] = useState(false);
  const [visible_x, setVisible_x] = useState(false);
  const [visible_a, setVisible_a] = useState(false);
  const Data = useSelector((state) => state.places?.places?.allPlaces);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    intro: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    info: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
                getAllPlace(accessToken, dispatch);
              }}
              text
              rounded
              className=""
              // tooltip="Làm mới"
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
                  autoFocus
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
                getAllPlace(accessToken, dispatch);
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
    { icon: "pi pi-map-marker", template: iconItemTemplate },
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
          tooltip="Xóa địa điểm"
        />
      </Fragment>
    );
  };
  const Type = useSelector(
    (state) => state.typePlaces?.typePlaces?.allTypePlaces
  );
  const Dialog_C = () => {
    const [dataEdit, setDataEdit] = useState({
      id: currentRowData?._id,
      intro: currentRowData?.intro,
      type: currentRowData?.type,
      phone: currentRowData?.phone,
      during: currentRowData?.during,
      open: currentRowData?.open,
      close: currentRowData?.close,
      email: currentRowData?.email,
      address: currentRowData?.address,
      info: currentRowData?.info,
      lat: currentRowData?.lat,
      long: currentRowData?.long,
      startDate: currentRowData?.createdAt || "Đang cập nhật",
      updatedAt: currentRowData?.updatedAt || "Đang cập nhật",
      imgURL: currentRowData?.imgURL,
    });
    const [selectType, setSelectType] = useState(
      currentRowData?.type?.map((t) => t[0])
    );
    const Type = useSelector(
      (state) => state.typePlaces?.typePlaces?.allTypePlaces
    );
    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const [markerPosition, setMarkerPosition] = useState([
      dataEdit.lat,
      dataEdit.long,
    ]);

    const handleMarkerPositionChange = (newPosition) => {
      setMarkerPosition([newPosition.lat, newPosition.lng]);
    }; // Cập nhật trạng thái của vị trí marker khi nó thay đổi

    const update_data = {
      id: dataEdit.id,
      intro: dataEdit.intro,
      type: selectType?.map((t) => ({ name: t })),
      phone: dataEdit.phone,
      during: dataEdit.during,
      open: dataEdit.open,
      close: dataEdit.close,
      email: dataEdit.email,
      address: dataEdit.address,
      info: dataEdit.info,
      lat: markerPosition[0].toString(),
      long: markerPosition[1].toString(),
      imgURL: dataEdit.imgURL,
    };
    // console.log(selectType);
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
          <div className="field col-12 md:col-5">
            <label htmlFor="intro">Tên địa điểm</label>
            <InputText
              onChange={(e) => handleInputChange(e, "intro")}
              value={dataEdit.intro}
              id="intro"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-7">
            <label htmlFor="lastname6">Loại</label>
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
          <div className="field col-12 md:col-2">
            <label htmlFor="firstname6">Mở cửa</label>
            <InputText
              onChange={(e) => handleInputChange(e, "open")}
              value={dataEdit.open}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-2">
            <label htmlFor="lastname6">Đóng cửa</label>
            <InputText
              onChange={(e) => handleInputChange(e, "close")}
              value={dataEdit.close}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="firstname6">Số điện thoại</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "phone")}
              value={dataEdit.phone}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-5">
            <label htmlFor="lastname6">Email</label>
            <InputText
              onChange={(e) => handleInputChange(e, "email")}
              value={dataEdit.email}
              type="text"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-6">
            <label htmlFor="address">Địa chỉ</label>
            <InputText
              onChange={(e) => handleInputChange(e, "address")}
              value={dataEdit.address}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputText>
          </div>
          <div className="field col-6">
            <label htmlFor="address">Hình ảnh</label>
            <InputText
              onChange={(e) => handleInputChange(e, "imgURL")}
              value={dataEdit.imgURL}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputText>
          </div>
          <div className="field col-12">
            <label htmlFor="address">Mô tả</label>
            <InputTextarea
              onChange={(e) => handleInputChange(e, "info")}
              value={dataEdit.info}
              rows="6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputTextarea>
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="firstname6">Vĩ độ</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "lat")}
              value={markerPosition[0]}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Kinh độ</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "long")}
              value={markerPosition[1]}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-6 flex justify-content-start">
            <MapOverlay
              LAT={dataEdit.lat}
              LNG={dataEdit.long}
              onPositionChange={handleMarkerPositionChange}
            />
          </div>
          {/* <div className="field col-12 md:col-3"> </div> */}
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (
                  dataEdit.intro === "" ||
                  dataEdit.phone === "" ||
                  dataEdit.open === "" ||
                  dataEdit.close === "" ||
                  dataEdit.email === "" ||
                  dataEdit.address === "" ||
                  dataEdit.info === "" ||
                  dataEdit.lat === "" ||
                  dataEdit.long === ""
                ) {
                  show({
                    severity: "error",
                    summary: "Thất bại",
                    detail: "Vui lòng điền đầy đủ thông tin",
                  });
                } else {
                  updatePlace(update_data, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Đã cập nhật địa điểm",
                  });
                  setVisible_d(false);
                  setTimeout(() => {
                    getAllPlace(accessToken, dispatch);
                  }, 1000);
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
        header={`Xóa địa điểm`}
        visible={visible_x}
        style={{
          width: window.innerWidth > window.innerHeight ? "40vw" : "90vw",
          maxHeight: "40vh",
        }}
        onHide={() => setVisible_x(false)}
      >
        <div
          className="formgrid grid"
          style={{
            color: "black",
            textIndent: "0.4rem",
            fontWeight: "bold",
          }}
        >
          <div className="flex col-12 md:col-12 justify-content-center font-bold text-xl">
            <label className="flex justify-content-center flex-column">
              <p className="flex justify-content-center m-0">
                Xác nhận xóa địa điểm
              </p>{" "}
              <p
                className="flex justify-content-center m-0"
                style={{ color: "red" }}
              >
                {currentRowData?.intro}
              </p>
              {/* <p className="flex justify-content-center m-0"> ?</p> */}
            </label>
          </div>
          <div className="field col-12 md:col-12"> </div>
          <div className="flex col-12 md:col-12 justify-content-center">
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
                deletePlace(currentRowData?._id, accessToken, dispatch);
                show({
                  severity: "success",
                  summary: "Thành công",
                  detail: "Đã xóa địa điểm",
                });
                setVisible_x(false);
                setTimeout(() => {
                  getAllPlace(accessToken, dispatch);
                }, 1000);
                // getAllPlace(accessToken, dispatch);
              }}
            />
          </div>
        </div>
      </Dialog>
    );
  };

  const Dialog_A = () => {
    const [selectType, setSelectType] = useState([]);
    const [dataEdit, setDataEdit] = useState({
      intro: "",
      // type: "",
      phone: "",
      during: "",
      open: "",
      close: "",
      email: "",
      address: "",
      info: "",
      lat: "10.530582870379785",
      long: "105.21931237399188",
      imgURL:
        "https://i.pinimg.com/originals/72/66/03/7266036c9f3383d21730484150602f01.gif",
    });
    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const [markerPosition, setMarkerPosition] = useState([
      dataEdit.lat,
      dataEdit.long,
    ]);

    const handleMarkerPositionChange = (newPosition) => {
      setMarkerPosition([newPosition.lat, newPosition.lng]);
    }; // Cập nhật trạng thái của vị trí marker khi nó thay đổi

    const new_data = {
      intro: dataEdit.intro,
      type: selectType,
      phone: dataEdit.phone,
      during: dataEdit.during,
      open: dataEdit.open,
      close: dataEdit.close,
      email: dataEdit.email,
      address: dataEdit.address,
      info: dataEdit.info,
      lat: markerPosition[0].toString(),
      long: markerPosition[1].toString(),
      imgURL: dataEdit.imgURL,
    };
    // console.log(new_data);
    return (
      <Dialog
        header={`Thông tin chi tiết`}
        visible={visible_a}
        maximizable
        style={{ width: !device ? "70vw" : "90vw", Height: "95vh" }}
        onHide={() => setVisible_a(false)}
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
          <div className="field col-12 md:col-5">
            <label htmlFor="intro">Tên địa điểm</label>
            <InputText
              onChange={(e) => handleInputChange(e, "intro")}
              value={dataEdit.intro}
              id="intro"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-7">
            <label htmlFor="lastname6">Loại</label>
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
          <div className="field col-12 md:col-2">
            <label htmlFor="firstname6">Mở cửa</label>
            <InputText
              onChange={(e) => handleInputChange(e, "open")}
              value={dataEdit.open}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-2">
            <label htmlFor="lastname6">Đóng cửa</label>
            <InputText
              onChange={(e) => handleInputChange(e, "close")}
              value={dataEdit.close}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="firstname6">Số điện thoại</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "phone")}
              value={dataEdit.phone}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-5">
            <label htmlFor="lastname6">Email</label>
            <InputText
              onChange={(e) => handleInputChange(e, "email")}
              value={dataEdit.email}
              type="text"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-6">
            <label htmlFor="address">Địa chỉ</label>
            <InputText
              onChange={(e) => handleInputChange(e, "address")}
              value={dataEdit.address}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputText>
          </div>
          <div className="field col-6">
            <label htmlFor="address">Hình ảnh</label>
            <InputText
              onChange={(e) => handleInputChange(e, "imgURL")}
              value={dataEdit.imgURL}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputText>
          </div>
          <div className="field col-12">
            <label htmlFor="address">Mô tả</label>
            <InputTextarea
              onChange={(e) => handleInputChange(e, "info")}
              value={dataEdit.info}
              rows="6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputTextarea>
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="firstname6">Vĩ độ</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "lat")}
              value={markerPosition[0]}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Kinh độ</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "long")}
              value={markerPosition[1]}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-6 flex justify-content-st">
            <MapOverlay
              LAT={dataEdit.lat}
              LNG={dataEdit.long}
              onPositionChange={handleMarkerPositionChange}
            />
          </div>
          {/* <div className="field col-12 md:col-3"> </div> */}
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (
                  dataEdit.intro === "" ||
                  dataEdit.phone === "" ||
                  dataEdit.open === "" ||
                  dataEdit.close === "" ||
                  dataEdit.email === "" ||
                  dataEdit.address === "" ||
                  dataEdit.info === "" ||
                  dataEdit.lat === "" ||
                  dataEdit.long === ""
                ) {
                  show({
                    severity: "error",
                    summary: "Thất bại",
                    detail: "Vui lòng điền đầy đủ thông tin",
                  });
                } else {
                  addPlace(new_data, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Đã thêm địa điểm",
                  });
                  setVisible_a(false);
                  setTimeout(() => {
                    getAllPlace(accessToken, dispatch);
                  }, 1000);
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
    // console.log(rowData.type);
    return (
      <div className={`grid flex justify-content-${"center"}`}>
        {rowData.type?.length > 0 ? (
          rowData.type[0] ? (
            rowData.type?.map((e, index) => {
              const findType = Type?.find((t) => t.name === e[0]);
              // console.log(findType);
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
      Data?.map((D, index) => {
        return {
          ID: index + 1,
          _id: D._id,
          intro: D.intro,
          type: D.type?.map((t) => {
            return [t.name];
          }),
          phone: D.phone ? D.phone : "Đang cập nhật",
          during: D.during,
          open: D.open,
          close: D.close,
          email:
            D.email === "unknown@gmail.com" || D.email === "unknow@gmail.com"
              ? "Đang cập nhật"
              : D.email,
          address: D.address,
          info: D.info,
          lat: D.lat,
          long: D.long,
          createdAt: D.createdAt
            ? new Date(D.createdAt).toLocaleString()
            : "Chưa cập nhật",
          updatedAt: D.updatedAt
            ? new Date(D.updatedAt).toLocaleString()
            : "Chưa cập nhật",
          imgURL: D.imgURL,
        };
      })
    );
    setLoading(false);
    // console.log(filters);
    // console.log(products);
    // console.log(selectedProducts?.map((e) => e._id));
    // console.log(Data[0].type);
  }, [Data, selectedProducts]);
  // console.log(Type.map((t) => (t.name)))
  const removeData = selectedProducts?.map((e) => e._id);
  const clearSelect = () => {
    removeData.map((d) => {
      deletePlace(d, accessToken, dispatch);
    });
    show({
      severity: "success",
      summary: "Thành công",
      detail: `Đã xóa ${removeData?.length} địa điểm`,
    });
    setTimeout(() => {
      getAllPlace(accessToken, dispatch);
    }, 1000);
    window.location.reload();
  };
  return (
    <div className="card ">
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className={`flex col-${
            window.innerWidth > window.innerHeight ? 6 : 6
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

          {!selectedProducts ? null : (
            <Button
              label={
                window.innerWidth > window.innerHeight
                  ? `Xóa ${selectedProducts?.length} địa điểm đã chọn`
                  : selectedProducts?.length
              }
              icon="pi pi-trash"
              className="p-button-warning ml-2"
              onClick={clearSelect}
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
          "intro",
          "type",
          "phone",
          "during",
          "open",
          "close",
          "email",
          "address",
          "info",
          "lat",
          "long",
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
          field="intro"
          header="Tên địa điểm"
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
          field="address"
          header="Địa chỉ"
          sortable
          style={{ maxWidth: "20rem", textOverflow: "ellipsis" }}
          filter
        />
        <Column
          alignHeader={"center"}
          align={"left"}
          field="info"
          header="Thông tin"
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
