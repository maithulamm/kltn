import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MapContainer,
  ScaleControl,
  Popup,
  Marker,
  LayersControl,
  LayerGroup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import dulich from "../../data/icon/dulich.png";
import dulich2 from "../../data/icon/dulich.gif";
import food2 from "../../data/icon/food.gif";
import food from "../../data/icon/food.png";
import food3 from "../../data/icon/food_.gif";
import oil from "../../data/icon/oil.png";
import oil2 from "../../data/icon/oil.gif";
import oil3 from "../../data/icon/oil_.gif";
import hospital from "../../data/icon/hospital.png";
import atm from "../../data/icon/atm.png";
import hospital2 from "../../data/icon/hospital.gif";
import atm2 from "../../data/icon/atm.gif";
import atm3 from "../../data/icon/atm_.gif";
import hospital3 from "../../data/icon/hospital_.gif";
// import { place } from "../../assets/data/place";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sidebar } from "primereact/sidebar";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { device } from "../Home/Home";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import MapOverlay from "../Table/MapOverlay";
import { deletePlace, updatePlace } from "../../redux/apiRequest";
import { getAllPlace } from "../../redux/apiRequest";
import { Toast } from "primereact/toast";

const Map = ({ height }) => {
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );
  const dispatch = useDispatch();
  const toast = useRef(null);

  const place = useSelector((state) => state.places.places?.allPlaces);
  const place2 = useSelector((state) => state.places2.places2?.allPlaces2);
  const Type = useSelector(
    (state) => state.typePlaces.typePlaces?.allTypePlaces
  );
  const [visibleSlide, setVisibleSlide] = useState(false);
  const [visibleSlide2, setVisibleSlide2] = useState(false);

  const [currentPlaceID, setCurrentPlaceID] = useState(null);
  const currentPlace = place?.find((p) => p._id === currentPlaceID);
  const currentPlace2 = place2?.find((p) => p._id === currentPlaceID);
  // const [currentPlace, setCurrentPlace] = useState();

  // console.log(place2);
  const apiKey =
    "AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn";
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([
    10.580582870379785, 105.21931237399188,
  ]);
  const [zoom, setZoom] = useState(device() ? 10 : 9);
  function layersControlData() {
    return (
      <Fragment>
        <LayersControl position="topright" collapsed={device() ? false : true}>
          {basemap.map((b) => (
            <LayersControl.BaseLayer
              key={b}
              name={b[1]}
              checked={b[0] === "ArcGIS:Navigation"}
            >
              <LayerGroup>
                <VectorBasemapLayer apiKey={apiKey} name={b[0]} />
              </LayerGroup>
            </LayersControl.BaseLayer>
          ))}
          <LayersControl.Overlay name="Địa điểm du lịch" checked>
            <LayerGroup>{add_Data()}</LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Địa điểm ăn uống" checked>
            <LayerGroup>{add_Data2("Ăn uống", food2, food)}</LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Trạm xăng dầu" checked>
            <LayerGroup>{add_Data2("Trạm xăng dầu", oil2, oil)}</LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Cơ sở y tế" checked>
            <LayerGroup>
              {add_Data2("Cơ sở y tế", hospital2, hospital)}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Điểm giao dịch - ATM" checked>
            <LayerGroup>{add_Data2("ATM", atm2, atm)}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <ScaleControl position="bottomleft" />
      </Fragment>
    );
  }

  const [getZoom, setGetZoom] = useState(() => map?.getZoom());
  // const [position, setPosition] = useState(() => map.getCenter());

  // const onMove = useCallback(() => {
  //   setPosition(map.getCenter());
  // }, [map]);

  const onZoom = useCallback(() => {
    setGetZoom(map.getZoom());
  }, [map]);
  useEffect(() => {
    // map.on("move", onMove);
    // return () => {
    //   map.off("move", onMove);
    // };
    // map.on("zoom", onZoom);
  }, [map, onZoom]);

  const add_Data = () => {
    return (
      <Fragment>
        {place?.map((p) => (
          <Marker
            key={p._id}
            position={[p.lat, p.long]}
            icon={L.divIcon({
              className: "my-div-icon",
              html:
                p?.intro === currentPlace?.intro
                  ? `<img src=${dulich2} class="icon-image2"/>`
                  : `<img src=${dulich} class="icon-image"/>`,
            })}
            eventHandlers={{
              click: () => {
                setVisibleSlide(true);
                setVisibleSlide2(false);
                setCurrentPlaceID(p._id);
                map.flyTo([p.lat, p.long], 18);
              },
            }}
          >
            <Tooltip direction="right" offset={[20, 0]} opacity={1}>
              {p.intro}
            </Tooltip>
          </Marker>
        ))}
      </Fragment>
    );
  };

  const add_Data2 = (type, icons, icon) => {
    return (
      <Fragment>
        {place2
          ?.filter((f) => f.type === type)
          .map((p) => (
            <Marker
              key={p._id}
              position={[p.lat, p.long]}
              icon={L.divIcon({
                className: "my-div-icon",
                html:
                  p?.name === currentPlace2?.name
                    ? `<img src=${icons} class="icon-image2"/>`
                    : `<img src=${icon} class="icon-image"/>`,
              })}
              eventHandlers={{
                click: () => {
                  setVisibleSlide2(true);
                  setVisibleSlide(false);
                  setCurrentPlaceID(p._id);
                  map.flyTo([p.lat, p.long], 18);
                },
              }}
            >
              <Tooltip direction="right" offset={[20, 0]} opacity={1}>
                {p.name}
              </Tooltip>
            </Marker>
          ))}
      </Fragment>
    );
  };

  const basemap = [
    ["ArcGIS:Navigation", "Đường phố"],
    ["ArcGIS:Imagery", "Vệ tinh"],
  ];

  const [visible_d, setVisible_d] = useState(false);
  const [visible_x, setVisible_x] = useState(false);

  const show = ({ severity, summary, detail }) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };
  const Dialog_C = () => {
    const [dataEdit, setDataEdit] = useState({
      id: currentPlace?._id,
      intro: currentPlace?.intro,
      type: currentPlace?.type,
      phone: currentPlace?.phone,
      during: currentPlace?.during,
      open: currentPlace?.open,
      close: currentPlace?.close,
      email: currentPlace?.email,
      address: currentPlace?.address,
      info: currentPlace?.info,
      lat: currentPlace?.lat,
      long: currentPlace?.long,
      startDate: currentPlace?.createdAt || "Đang cập nhật",
      updatedAt: currentPlace?.updatedAt || "Đang cập nhật",
      imgURL: currentPlace?.imgURL,
    });
    const [selectType, setSelectType] = useState(
      currentPlace?.type?.map((t) => t.name) || []
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
      type: selectType.map((t) => ({ name: t })),
      phone: dataEdit.phone,
      during: dataEdit.during,
      open: dataEdit.open,
      close: dataEdit.close,
      email: dataEdit.email,
      address: dataEdit.address,
      info: dataEdit.info,
      lat: markerPosition[0]?.toString(),
      long: markerPosition[1]?.toString(),
      imgURL: currentPlace?.imgURL,
    };
    // console.log(currentPlace);

    return (
      <Dialog
        header={`Thông tin chi tiết | ID: ${dataEdit.id}`}
        visible={visible_d}
        maximizable
        style={{ width: !device ? "90vw" : "70vw" }}
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
            {/* <Button onClick={() => {}} label="Show" /> */}
            <Button
              label="Lưu"
              icon="pi pi-save"
              className="p-button-success m-2 h-3rem"
              onClick={() => {
                if (
                  dataEdit.intro === "" ||
                  dataEdit.phone === "" ||
                  dataEdit.email === ""
                ) {
                  show({
                    severity: "error",
                    summary: "Thất bại",
                    detail: "Vui lòng điền đầy đủ thông tin",
                  });
                } else {
                  show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Đã cập nhật địa điểm",
                  });
                  updatePlace(update_data, accessToken, dispatch);

                  setTimeout(() => {
                    getAllPlace(accessToken, dispatch);
                  }, 1000);
                  // setVisible_d(false);
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
        <Toast ref={toast} />
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
                {currentPlace?.intro}
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
            <Toast ref={toast} />
            <Button
              label="Xóa"
              icon="pi pi-trash"
              className="p-button-warning m-2 h-3rem"
              onClick={() => {
                // deletePlace(currentPlace?._id, accessToken, dispatch);
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

  const popupSidiebar = () => {
    return (
      <Sidebar
        visible={visibleSlide}
        onHide={() => {
          setVisibleSlide(false);
          setCurrentPlaceID(null);
          map.flyTo(center, zoom);
        }}
        header={"Thông tin địa điểm du lịch"}
        className={`w-full ${device() ? "h-100" : "h-auto"} md:w-12`}
        maskClassName="w-full md:w-3"
        position={device() ? "left" : "bottom"}
      >
        {/* <Toast ref={toast} /> */}
        <div className="formgrid grid" key={currentPlace?._id}>
          <div
            className="col-12 flex justify-content-center"
            id="hhh"
            // style={{backgroundImage:  `url(${currentPlace?.imgURL})`, backgroundSize: "cover", backgroundPosition: "center", height: "15rem"}}
          >
            <Image
              key={currentPlace?._id}
              src={
                currentPlace?.imgURL ||
                "https://i.pinimg.com/originals/72/66/03/7266036c9f3383d21730484150602f01.gif"
              }
              alt={currentPlace?.intro}
              preview="true"
              imageClassName="w-12 h-15rem"
              className="w-12 h-15rem"
              downloadIcon="pi pi-download"
              downloadable
              loading="lazy"
              imageStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
              // style={{opacity: "0"}}
            />
          </div>
          <div className="field col-12 flex align-items-center">
            <h3 className="col-12" key={currentPlace?._id}>
              {currentPlace?.intro}
            </h3>
          </div>
          <div className="field col-12 ">
            {currentPlace?.type?.map((tt) => {
              const findType = Type?.find((t) => t.name === tt.name);
              return (
                <Tag
                  key={tt._id}
                  value={tt.name || null}
                  className="m-1"
                  style={{
                    backgroundColor: ` #${findType?.color || "d9d9d9"}`,
                    color:
                      parseInt(findType?.color, 16) > 0xffffff / 0.9
                        ? "gray"
                        : "white",
                    // boxShadow: "0 0 0 1px #d9d9d9",
                  }}
                />
              );
            })}
          </div>
          <div className="field col-12 flex align-items-center border-bottom-1 surface-border"></div>
          <div className="field col-12 flex align-items-center"></div>
          <div className="field col-12 flex align-items-center ">
            <span
              className={"pi pi-map-marker col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <span className="col-11">{currentPlace?.address}</span>
          </div>
          <div className="field col-12 flex align-items-center">
            <span
              className={"pi pi-phone col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11">
              {currentPlace?.phone || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center">
            <span
              className={"pi pi-envelope col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className="col-11">
              {currentPlace?.email || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center">
            <span
              className={"pi pi-clock col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11">
              {currentPlace?.open}
              {" - "}
              {currentPlace?.close}
            </div>
          </div>
          <div className="field col-12 flex align-items-center">
            <span
              className={"pi pi-money-bill col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11">
              {currentPlace?.price || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center"></div>
          <div className="field col-12 flex align-items-center border-bottom-1 surface-border "></div>
          <div className="field col-12 flex align-items-center my-3">
            <div className="field col-6 flex justify-content-end">
              <Button
                label="Sửa"
                severity="info"
                icon="pi pi-pen-to-square"
                className="mx-3"
                onClick={() => setVisible_d(true)}
              />
            </div>
            <div className="field col-6 flex justify-content-start">
              <Button
                label="Xóa"
                severity="danger"
                icon="pi pi-trash"
                className="mx-3"
                onClick={() => {
                  setVisible_x(true);
                }}
              />
            </div>
          </div>
        </div>
        {visible_d && <Dialog_C />}
        {visible_x && <Dialog_X />}
      </Sidebar>
    );
  };

  const popupSidiebar2 = () => {
    return (
      <Sidebar
        visible={visibleSlide2}
        onHide={() => {
          setVisibleSlide2(false);
          setCurrentPlaceID(null);
          map.flyTo(center, zoom);
        }}
        header={"Thông tin địa điểm tiện ích"}
        className={`w-full ${device() ? "h-100" : "h-auto"} md:w-12`}
        maskClassName="w-full md:w-2"
        position={device() ? "left" : "bottom"}
      >
        {/* <Toast ref={toast} /> */}
        <div className="formgrid grid" key={currentPlace2?._id}>
          <div
            className="col-12 flex justify-content-center"
            id="hhh"
          >
            <Image
              key={currentPlace2?._id}
              src={
                currentPlace2?.type === "Ăn uống"
                  ? food3
                  : currentPlace2?.type === "Trạm xăng dầu"
                  ? oil3
                  : currentPlace2?.type === "Cơ sở y tế"
                  ? hospital3
                  : atm3 ||
                    "https://i.pinimg.com/originals/72/66/03/7266036c9f3383d21730484150602f01.gif"
              }
              alt={currentPlace2?.name}
              preview="true"
              imageClassName="w-12"
              className="w-12 h-15rem"
              downloadIcon="pi pi-download"
              downloadable
              loading="lazy"
              imageStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
              // style={{opacity: "0"}}
            />
          </div>
          <div className="field col-12 flex align-items-center">
            <h3 className="col-12" key={currentPlace2?._id}>
              {currentPlace2?.name}
            </h3>
          </div>
          <div className="field col-12 ">
            <Tag
              key={currentPlace2?._id}
              value={currentPlace2?.type || null}
              className="m-1"
            />
          </div>
          <div className="field col-12 flex align-items-center border-bottom-1 surface-border"></div>
          <div className="field col-12 flex align-items-center"></div>
          <div className="field col-12 flex align-items-center ">
            <span
              className={"pi pi-map-marker col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <span className="col-11">{currentPlace2?.address}</span>
          </div>
          <div className="field col-12 flex align-items-center">
            <span
              className={"pi pi-phone col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11">
              {currentPlace2?.phone || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center"></div>
          {/* <div className="field col-12 flex align-items-center border-bottom-1 surface-border "></div>
          <div className="field col-12 flex align-items-center my-3">
            <div className="field col-6 flex justify-content-end">
              <Button
                label="Sửa"
                severity="info"
                icon="pi pi-pen-to-square"
                className="mx-3"
                onClick={() => setVisible_d(true)}
              />
            </div>
            <div className="field col-6 flex justify-content-start">
              <Button
                label="Xóa"
                severity="danger"
                icon="pi pi-trash"
                className="mx-3"
                onClick={() => {
                  setVisible_x(true);
                }}
              />
            </div>
          </div> */}
        </div>
        {visible_d && <Dialog_C />}
        {visible_x && <Dialog_X />}
      </Sidebar>
    );
  };

  return (
    <div style={{ height: height, maxHeight: "90vh" }}>
      {popupSidiebar()}
      {popupSidiebar2()}
      <MapContainer
        ref={setMap}
        center={center}
        zoom={zoom}
        minZoom={6}
        maxZoom={18}
        crollWheelZoom={true}
        maxBounds={L.latLngBounds(
          L.latLng(11.530582870379785, 106.21931237399188),
          L.latLng(9.530582870379785, 104.21931237399188)
        )}
      >
        {layersControlData()}
      </MapContainer>
      {/* {map ? <DisplayPosition map={map} /> : null} */}
    </div>
  );
};

export { Map };
