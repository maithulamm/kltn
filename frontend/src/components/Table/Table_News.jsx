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
  addNews,
  addTypePlace,
  deleteNews,
  deletePlace,
  deleteTypePlace,
  getAllNews,
  updateNews,
  updateTypePlace,
} from "../../redux/apiRequest";
import { ColorPicker } from "primereact/colorpicker";
import { device } from "../Home/Home";
import Toast_CPN from "./Toast";
import { Toast } from "primereact/toast";
import { Badge } from "primereact/badge";

function DynamicColumnsDemo() {
  const Place = useSelector((state) => state.places?.places?.allPlaces);
  const User = useSelector((state) => state.users?.users?.allUsers);
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
  const [data_ID, setData_ID] = useState("");
  const [currentRowData, setCurrentRowData] = useState(null);
  const [visible_d, setVisible_d] = useState(false);
  const [visible_x, setVisible_x] = useState(false);
  const [visible_a, setVisible_a] = useState(false);
  const Data = useSelector((state) => state.news?.news?.allNews);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    color: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const clearFilter = () => {
    setGlobalFilterValue("");
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      color: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
                getAllNews(accessToken, dispatch);
              }}
              text
              rounded
              className="mr-2"
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
                getAllNews(accessToken, dispatch);
              }}
              text
              rounded
              className="mr-2"
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
    { icon: "pi pi-bookmark", template: iconItemTemplate },
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
          tooltip="Chỉnh sửa"
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
          tooltip="Xóa bài viết"
          disabled={
            Place?.filter((item) =>
              item.type.some((t) => t.name === rowData.name)
            ).length > 0 ||
            User?.filter((item) =>
              item.prefer.some((t) => t.name === rowData.name)
            ).length > 0
          }
        />
      </Fragment>
    );
  };

  const Dialog_C = () => {
    const [dataEdit, setDataEdit] = useState({
      id: currentRowData?._id,
      title: currentRowData?.title,
      content: currentRowData?.content,
      image: currentRowData?.image,
      createdAt: currentRowData?.createdAt,
      updatedAt: currentRowData?.updatedAt,
    });
    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const update_data = {
      title: dataEdit?.title,
      content: dataEdit?.content,
      image: dataEdit?.image,
    };
    console.log(update_data);
    return (
      <Dialog
        header={`Thông tin chi tiết`}
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
              value={dataEdit?.createdAt}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-6 ">
            <label htmlFor="lastname6">Cập nhật gần nhất</label>
            <InputText
              disabled
              value={dataEdit?.updatedAt}
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-12 ">
            <label htmlFor="intro">Tiêu đề</label>
            <InputText
              onChange={(e) => handleInputChange(e, "title")}
              value={dataEdit?.title}
              id="intro"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="lastname6">Nội dung</label>
            <InputTextarea
              onChange={(e) => handleInputChange(e, "content")}
              value={dataEdit?.content}
              id="lastname6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full h-10rem"
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="lastname6">URL ảnh</label>
            <InputText
              onChange={(e) => handleInputChange(e, "image")}
              value={dataEdit?.image}
              id="lastname6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full "
            />
          </div>
          <div className="flex col-12 md:col-12 justify-content-center">
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (update_data.name === "") {
                  show({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Vui lòng điền đủ thông tin",
                  });
                } else {
                  updateNews(update_data, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Success",
                    detail: "Cập nhật bài viết thành công",
                  });
                  setVisible_d(false);
                  setTimeout(() => {
                    getAllNews(accessToken, dispatch);
                  }, 1000);
                  getAllNews(accessToken, dispatch);
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
        header={`Xóa bài viết`}
        visible={visible_x}
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
            <label className="flex">
              <div>Xác nhận xóa bài viết?</div>
            </label>
          </div>
          <div className="field col-12 md:col-12"></div>
          <div className="field col-12 md:col-12"></div>
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
                deleteNews(currentRowData?._id, accessToken, dispatch);
                show({
                  severity: "success",
                  summary: "Success",
                  detail: "Xóa bài viết thành công",
                });
                setVisible_x(false);
                setTimeout(() => {
                  getAllNews(accessToken, dispatch);
                }, 1000);
              }}
            />
          </div>
        </div>
      </Dialog>
    );
  };

  const Dialog_A = () => {
    const [dataEdit, setDataEdit] = useState({
      title: "",
      content: "",
      image: "",
    });
    const handleInputChange = (e, field) => {
      setDataEdit((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const new_data = {
      title: dataEdit?.title,
      content: dataEdit?.content,
      image: dataEdit?.image,
    };
    console.log(new_data);

    return (
      <Dialog
        header={`Thêm bài viết mới`}
        visible={visible_a}
        maximizable
        style={{ width: !device ? "70vw" : "90vw" }}
        onHide={() => setVisible_a(false)}
        draggable={false}
      >
        <div
          className="formgrid grid"
          style={{
            color: "black",
            textIndent: "0.4rem",
            fontWeight: "bold",
          }}
        >
          <div className="field col-12 md:col-12 ">
            <label htmlFor="intro">Tiêu đề</label>
            <InputText
              onChange={(e) => handleInputChange(e, "title")}
              value={dataEdit?.title}
              id="intro"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="lastname6">Nội dung</label>
            <InputTextarea
              onChange={(e) => handleInputChange(e, "content")}
              value={dataEdit?.content}
              id="lastname6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full h-10rem"
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="lastname6">URL ảnh</label>
            <InputText
              onChange={(e) => handleInputChange(e, "image")}
              value={dataEdit?.image}
              id="lastname6"
              className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full "
            />
          </div>

          <div className="flex col-12 md:col-12 justify-content-center">
            {/* <Toast_CPN label={'Lưu'} icon={"pi pi-save"} severity={'warn'} summary={'Warning'} detail={'Vui lòng điền đủ thông tin'}/> */}

            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (new_data.name === "") {
                  show({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Vui lòng điền đủ thông tin",
                  });
                } else {
                  addNews(new_data, accessToken, dispatch);
                  show({
                    severity: "success",
                    summary: "Success",
                    detail: "Thêm bài viết thành công",
                  });
                  setVisible_a(false);
                  setTimeout(() => {
                    getAllNews(accessToken, dispatch);
                  }, 1000);
                  getAllNews(accessToken, dispatch);
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

  useEffect(() => {
    setProducts(
      Data.map((D, index) => {
        return {
          ID: index + 1,
          _id: D._id,
          title: D.title,
          content: D.content,
          image: D.image,
          createdAt: D.createdAt
            ? new Date(D.createdAt).toLocaleString()
            : "Chưa cập nhật",
          updatedAt: D.updatedAt
            ? new Date(D.updatedAt).toLocaleString()
            : "Chưa cập nhật",
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
            style={{
              width: "auto",
              border: "none",
              padding: "1rem 0 0 0",
              backgroundColor: "transparent",
            }}
          />
          {/* <Button
              label={null}
              icon="pi pi-plus"
              className="p-button-primary ml-3"
              onClick={() => {
                setVisible_a(true);
              }}
              rounded
              outlined
              tooltip="Thêm địa điểm mới"
            /> */}

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
        globalFilterFields={["name", "color", "createdAt", "updatedAt"]}
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
          field="title"
          header="Tên bài viết"
          sortable
          style={{ maxWidth: "25rem", textOverflow: "ellipsis" }}
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          field="content"
          header="Nội dung"
          sortable
          style={{ maxWidth: "18rem", textOverflow: "ellipsis" }}
          filter
          filterPlaceholder="Search by type"
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          field="createdAt"
          header="Ngày tạo"
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column
          alignHeader={"center"}
          align={"center"}
          field="updatedAt"
          header="Cập nhật gần nhất"
          sortable
          style={{ minWidth: "10rem" }}
        />
      </DataTable>
      {visible_d && <Dialog_C />}
      {visible_x && <Dialog_X />}
      {visible_a && <Dialog_A />}
      <Toast ref={toast} />
    </div>
  );
}

export { DynamicColumnsDemo as Table };
