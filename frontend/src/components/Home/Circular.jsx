import React, { useState, useEffect, Fragment } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { useSelector } from "react-redux";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { device } from "./Home";
import { useNavigate } from "react-router-dom";
import { showLoadingScreen } from "../../redux/apiRequest";
// import { ProductService } from './service/ProductService';

export default function Circular() {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState(null);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const navigate = useNavigate();
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const place = useSelector((state) => state.places?.places?.allPlaces);

  useEffect(() => {
    place?.filter((item, index) => index < 6).map((product) =>
      setProducts((prevProducts) => [...prevProducts, product])
    );
  }, []);
  const [visiblePlace, setVisiblePlace] = useState(false);
  const productTemplate = (product) => {
    return (
      <Fragment>
        <div
          className="border-1 surface-border m-2 text-center cursor-pointer hover:bg-primary-300 hover:text-50"
          onClick={() => {
            setCurrentProducts(product);
            setVisiblePlace(true);
          }}
          style={{ cursor: "pointer" }}
        >
          {/* <div className="mb-3">
          <img
            src={`${product?.imgURL}`}
            alt={product.intro}
            className="w-10 shadow-2"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "8rem",
              objectPosition: "center",
            }}
          />
        </div> */}
          <Image
            src={product.imgURL}
            alt={product.intro}
            className="mb-3"
            imageClassName="w-12 h-10rem "
          />
          <div className=" flex flex-wrap justify-content-center">
            <h4
              className="m-0 col-12"
              style={{
                whiteSpace: "nowrap",
                width: "15rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product?.intro}
            </h4>
            <p
              className="mt-0 mb-1 col-12"
              style={{
                whiteSpace: "nowrap",
                width: "15rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.address}
            </p>
            {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="w-12 flex justify-content-center">
      <div className="col-12 md:col-10 flex-column justify-content-center">
        <div className="flex justify-content-between w-full">
          <Button
            label="Địa điểm du lịch"
            icon="pi pi-map-marker"
            text
            className="p-button-outlined p-button-success"
            onClick={null}
          />
          <Button
            label="Xem thêm"
            //   icon="pi pi-plus"
            text
            className="p-button-outlined p-button-success my-2"
            onClick={() => {
              showLoadingScreen();
              navigate("/kltn/place");
            }}
          />
        </div>
        <Carousel
          value={products}
          numVisible={5}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
          showIndicators={false}
        />
        <Dialog
          // maximizable
          visible={visiblePlace}
          style={{ width: device() ? "50vw" : "100vw" }}
          onHide={() => {
            if (!visiblePlace) return;
            setVisiblePlace(false);
          }}
          header={
            <img
              src={currentProducts?.imgURL}
              alt={currentProducts?.intro}
              style={{
                objectFit: "cover",
                width: "50%",
                height: "15rem",
                objectPosition: "center",
                paddingLeft: "2rem",
              }}
            />
          }
          className="p-fluid"
          headerClassName="text-center w-full flex justify-content-center mb-0"
          draggable={false}
        >
          <h2 className="text-center">{currentProducts?.intro}</h2>
          <div className="field col-12 flex align-items-center m-0 p-0">
            <span
              className={"pi pi-map-marker col-1 m-0"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <span className="col-11 m-0 p-0">{currentProducts?.address}</span>
          </div>
          <div className="field col-12 flex align-items-center m-0 p-0">
            <span
              className={"pi pi-phone col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11 m-0 p-0">
              {currentProducts?.phone || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center m-0 p-0">
            <span
              className={"pi pi-envelope col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className="col-11 m-0 p-0">
              {currentProducts?.email || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center m-0 p-0">
            <span
              className={"pi pi-clock col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11 m-0 p-0">
              {currentProducts?.open}
              {" - "}
              {currentProducts?.close}
            </div>
          </div>
          <div className="field col-12 flex align-items-center m-0 p-0">
            <span
              className={"pi pi-money-bill col-1"}
              style={{ color: "var(--primary-color)" }}
            ></span>
            <div className=" col-11 m-0 p-0">
              {currentProducts?.price || "Đang cập nhật"}
            </div>
          </div>
          <div className="field col-12 flex align-items-center m-0 p-0">
            <div
              className=" col-12 m-0 p-3"
              style={{
                textIndent: "3rem",
                textAlign: "justify",
              }}
            >
              {currentProducts?.info || "Đang cập nhật"}
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
