import React, { useState, useEffect, Fragment, useRef, useCallback } from "react";
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
import { useSelector } from "react-redux";
import { BreadCrumb } from "primereact/breadcrumb";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
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

function DynamicColumnsDemo() {
  const [data_ID, setData_ID] = useState("");
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
    filters();
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
              type="button"
              icon="pi pi-search"
              label=""
              onClick={(e) => op.current.toggle(e)}
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
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={(e) => onGlobalFilterChange(e)}
              placeholder="Nhập từ khóa"
            />
          </IconField>
        )}
      </div>
    );
  };
  const header = renderHeader();
  const [selectedProducts, setSelectedProducts] = useState(null);

  const columns = [
    // {field: 'code', header: 'Code'},
    { field: "intro", header: "Tên" },
    { field: "type", header: "Loại" },
    { field: "phone", header: "SĐT" },
    { field: "during", header: "Thời gian" },
    { field: "open", header: "Mở cửa" },
    { field: "close", header: "Đóng cửa" },
    { field: "email", header: "Email" },
    { field: "address", header: "Địa chỉ" },
    { field: "info", header: "Thông tin" },
    { field: "lat", header: "Vĩ độ" },
    { field: "long", header: "Kinh độ" },
  ];
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
        />
      </Fragment>
    );
  };

  const Dialog_C = () => {
    const [dataEdit, setDataEdit] = useState({
      intro: currentRowData.intro,
      type: currentRowData.type,
      phone: currentRowData.phone,
      during: currentRowData.during,
      open: currentRowData.open,
      close: currentRowData.close,
      email: currentRowData.email,
      address: currentRowData.address,
      info: currentRowData.info,
      lat: currentRowData.lat,
      long: currentRowData.long,
    });
    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const [markerPosition, setMarkerPosition] = useState([dataEdit.lat, dataEdit.long]);

    const handleMarkerPositionChange = (newPosition) => {
            setMarkerPosition([newPosition.lat, newPosition.lng]);
        } // Cập nhật trạng thái của vị trí marker khi nó thay đổi
    
    const update_data = {
        intro: dataEdit.intro,
        type: dataEdit.type,
        phone: dataEdit.phone,
        during: dataEdit.during,
        open: dataEdit.open,
        close: dataEdit.close,
        email: dataEdit.email,
        address: dataEdit.address,
        info: dataEdit.info,
        lat: markerPosition[0].toString(),
        long: markerPosition[1].toString(),
        };
    console.log(update_data);
    return (
      <Dialog
        header={`Thông tin chi tiết`}
        visible={visible_d}
        maximizable
        style={{ width: "70vw", Height: "95vh" }}
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
          <div className="field col-12 md:col-5">
            <label htmlFor="intro">Tên địa điểm</label>
            <InputText
              onChange={(e) => handleInputChange(e, "intro")}
              value={dataEdit.intro}
              id="intro"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Loại</label>
            <InputText
              onChange={(e) => handleInputChange(e, "type")}
              value={dataEdit.type}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
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
          <div className="field col-12 md:col-4">
            <label htmlFor="firstname6">Số điện thoại</label>
            <InputText
              keyfilter="num"
              onChange={(e) => handleInputChange(e, "phone")}
              value={dataEdit.phone}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-8">
            <label htmlFor="lastname6">Email</label>
            <InputText
              onChange={(e) => handleInputChange(e, "email")}
              value={dataEdit.email}
              type="text"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12">
            <label htmlFor="address">Địa chỉ</label>
            <InputText
              onChange={(e) => handleInputChange(e, "address")}
              value={dataEdit.address}
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
          <div className="field col-12 md:col-5">
            <MapOverlay LAT={dataEdit.lat} LNG={dataEdit.long} onPositionChange={handleMarkerPositionChange}/>
          </div>
          {/* <div className="field col-12 md:col-3"> </div> */}
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() =>
                alert(
                  `Tên: ${dataEdit.intro}\nLoại: ${dataEdit.type}\nMở cửa: ${dataEdit.open}\nĐóng cửa: ${dataEdit.close}\nSĐT: ${dataEdit.phone}\nEmail: ${dataEdit.email}\nĐịa chỉ: ${dataEdit.address}\nMô tả: ${dataEdit.info}\nVĩ độ: ${dataEdit.lat}\nKinh độ: ${dataEdit.long}`
                )
              }
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
          <div className="flex col-12 md:col-12 justify-content-center font-bold text-2xl">
            <label htmlFor="lastname6">
              Xác nhận xóa địa điểm {currentRowData?.intro}?
            </label>
            {/* <InputText readOnly={true}  value={currentRowData?.long} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/> */}
          </div>
          <div className="field col-12 md:col-12"> </div>
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Hủy"
              icon="pi pi-times"
              className="p-button-primary m-2 h-3rem"
              onClick={null}
            />
            <Button
              label="Xóa"
              icon="pi pi-trash"
              className="p-button-warning m-2 h-3rem"
              onClick={null}
            />
          </div>
        </div>
      </Dialog>
    );
  };

  const Dialog_A = () => {
    return (
      <Dialog
        header={`Thêm mới địa điểm`}
        visible={visible_a}
        maximizable
        style={{ width: "50vw", maxHeight: "90vh" }}
        onHide={() => setVisible_a(false)}
      >
        <div
          className="formgrid grid"
          style={{
            color: "black",
            textIndent: "0.4rem",
            fontWeight: "bold",
          }}
        >
          <div className="field col-12 md:col-5">
            <label htmlFor="firstname6">Tên địa điểm</label>
            <InputText
              readOnly={true}
              value={currentRowData?.intro}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Loại</label>
            <InputText
              readOnly={true}
              value={currentRowData?.type}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-2">
            <label htmlFor="firstname6">Mở cửa</label>
            <InputText
              readOnly={true}
              value={currentRowData?.open}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-2">
            <label htmlFor="lastname6">Đóng cửa</label>
            <InputText
              readOnly={true}
              value={currentRowData?.close}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="firstname6">Số điện thoại</label>
            <InputText
              readOnly={true}
              value={currentRowData?.phone}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-8">
            <label htmlFor="lastname6">Email</label>
            <InputText
              readOnly={true}
              value={currentRowData?.email}
              type="text"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12">
            <label htmlFor="address">Địa chỉ</label>
            <InputText
              readOnly={true}
              value={currentRowData?.address}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputText>
          </div>
          <div className="field col-12">
            <label htmlFor="address">Mô tả</label>
            <InputTextarea
              value={currentRowData?.info}
              rows="6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            ></InputTextarea>
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="firstname6">Vĩ độ</label>
            <InputText
              readOnly={true}
              value={currentRowData?.lat}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="lastname6">Kinh độ</label>
            <InputText
              readOnly={true}
              value={currentRowData?.long}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-5"> </div>
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu thêm mới"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={null}
            />
            <Button
              label="Hủy bỏ"
              icon="pi pi-times"
              className="p-button-danger m-2 h-3rem"
              onClick={null}
            />
          </div>
        </div>
      </Dialog>
    );
  };

  useEffect(() => {
    setProducts(
      Data.map((D, index) => {
        return {
          ID: index + 1,
          _id: D._id,
          intro: D.intro,
          type: D.type,
          phone: D.phone ? D.phone : "Đang cập nhật",
          during: D.during,
          open: D.open,
          close: D.close,
          email: D.email === "unknow@gmail.com" ? "Đang cập nhật" : D.email,
          address: D.address,
          info: D.info,
          lat: D.lat,
          long: D.long,
        };
      })
    );
    setLoading(false);
    // console.log(selectedProducts?.map((e) => e.ID));
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
            style={{ width: "auto", border: "none", padding: "1rem 0 0 0" }}
          />
          <Button
            label={null}
            icon="pi pi-plus"
            className="p-button-primary ml-3"
            onClick={() => {
              setVisible_a(true);
            }}
          />

          {selectedProducts?.length > 0 && (
            <Button
              label={
                window.innerWidth > window.innerHeight
                  ? `Xóa ${selectedProducts?.length} địa điểm đã chọn`
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
          header="Tên"
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
    </div>
  );
}

export { DynamicColumnsDemo as Table };
