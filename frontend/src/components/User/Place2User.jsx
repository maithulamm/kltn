import React, { useState, useEffect, Fragment, useRef } from "react";
// import { ProductService } from './service/ProductService';
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import { device } from "../Home/Home";
import { Dialog } from "primereact/dialog";
import { OverlayPanel } from "primereact/overlaypanel";
import { AutoComplete } from "primereact/autocomplete";
import { getDistance } from "../../redux/apiRequest";
import { Dropdown } from "primereact/dropdown";
import anUong from "../../data/icon/food_.gif";
import benhVien from "../../data/icon/hospital_.gif";
import tramXang from "../../data/icon/oil_.gif";
import atm from "../../data/icon/atm_.gif";
import { RadioButton } from "primereact/radiobutton";
import "./style.css";
export default function PlaceUser({ code }) {
  const place0 = useSelector((state) => state.places2?.places2?.allPlaces2);
  const place00 = place0?.map((item, index) => {
    return {
      ...item,
      distance: Number(
        getDistance(
          item?.lat,
          item?.long,
          10.377509021191718,
          105.43881918388423
        )
      ),
    };
  });

  const place = place00?.sort((a, b) => a.distance - b.distance) || [];

  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState(
    code === "1" ? "grid" : device() ? "list" : "grid"
  );

  const [currentProducts, setCurrentProducts] = useState(null);
  const [visiblePlace, setVisiblePlace] = useState(false);
  const listItem = (product, index) => {
    return (
      <div
        className="col-12 hover:bg-primary-300 cursor-pointer"
        key={product?.id}
        onClick={() => {
          setCurrentProducts(product);
          setVisiblePlace(true);
        }}
      >
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={
              product?.type === "Ăn uống"
                ? anUong
                : product?.type === "Cơ sở y tế"
                ? benhVien
                : product?.type === "Trạm xăng dầu"
                ? tramXang
                : atm
            }
            alt={product?.name}
            style={{
              objectFit: "contain",
              height: "7rem",
              objectPosition: "center",
            }}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product?.name}</div>
              <p
                className="mt-0 mb-1 col-12"
                style={{
                  whiteSpace: "nowrap",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product?.address}
              </p>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center">
                  <i className="pi pi-tag"></i>
                </span>
                {/* {product?.type?.map((tt) => {
                  const findType = typePlace?.find((t) => t.name === tt.name);
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
                      }}
                    />
                  );
                })} */}
                {product?.type}
              </div>
            </div>
            <div className="flex flex-column align-items-center gap-3">
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center">
                  <i className="pi pi-map-marker"></i>
                </span>
                <span>
                  {product?.distance > 1
                    ? Number(product?.distance).toFixed(2) + "km"
                    : Number(product?.distance * 1000).toFixed(0) + "m"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product) => {
    const randomRating = [5];

    return (
      <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2 " key={product?.id}>
        <div
          className="p-4 border-1 surface-border surface-card border-round hover:bg-primary-300 cursor-pointer hover:text-50"
          onClick={() => {
            setCurrentProducts(product);
            setVisiblePlace(true);
          }}
        >
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2 h-2rem">
              {/* {product?.type?.map((tt) => {
                const findType = typePlace?.find((t) => t.name === tt.name);
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
              })} */}
              {product?.type}
            </div>
          </div>
          <div className="flex flex-column align-items-center gap-2 pt-3 pb-0">
            <img
              className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              src={
                product?.type === "Ăn uống"
                  ? anUong
                  : product?.type === "Cơ sở y tế"
                  ? benhVien
                  : product?.type === "Trạm xăng dầu"
                  ? tramXang
                  : atm
              }
              alt={product?.name}
              style={{
                objectFit: "contain",
                height: "7rem",
                objectPosition: "center",
              }}
            />
            <div className="text font-bold">{product?.name}</div>
            <p
              className="mt-0 mb-1 col-12"
              style={{
                whiteSpace: "nowrap",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product?.address}
            </p>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text m-0 ">
              {product?.distance > 1
                ? Number(product?.distance).toFixed(2) + "km"
                : Number(product?.distance * 1000).toFixed(0) + "m"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product, index);
    else if (layout === "grid") return gridItem(product);
  };

  const listTemplate = (products, layout) => {
    return (
      <div className="grid grid-nogutter" key={1}>
        {products.map((product, index) => itemTemplate(product, layout, index))}
      </div>
    );
  };
  const op = useRef(null);
  const [value, setValue] = useState([null, "type"]);
  const [items, setItems] = useState([]);

  const search = (event) => {
    setItems(
      place
        .filter((product) => {
          return product?.name
            .toLowerCase()
            .includes(event.query.toLowerCase());
        })
        .map((product) => product?.name)
    );
  };

  const sortOptions = [
    { label: "Xếp theo khoản cách", value: "distance" },
    { label: "Xếp theo tên", value: "name" },
  ];

  const sortOptions2 = [
    { label: "Xếp theo khoản cách", value: "distance" },
    { label: "Xếp theo tên", value: "name" },
  ];
  const [sortKey, setSortKey] = useState("distance");
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState("distance");
  const onSortChange = (event) => {
    const value = event?.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };
  const header = () => {
    return (
      <Fragment>
        {device() ? (
          <div className="flex justify-content-between">
            <Dropdown
              options={code === "1" ? sortOptions : sortOptions2}
              value={sortKey}
              optionLabel="label"
              // placeholder={code === '1' ? }
              onChange={onSortChange}
              className="w-50"
            />
            <div>
              <div className="flex align-items-cente justify-content-center h-full gap-3">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient0"
                    name="pizza"
                    value=""
                    onChange={(e) => setValue([e.value, "type"])}
                    checked={!value[0]}
                  />
                  <label
                    htmlFor="ingredient0"
                    className={`ml-2 ${
                      !value[0] ? "text-primary" : null
                    } cursor-pointer`}
                  >
                    Tất cả
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient1"
                    name="pizza"
                    value="Ăn uống"
                    onChange={(e) => setValue([e.value, "type"])}
                    checked={value[0] === "Ăn uống"}
                  />
                  <label
                    htmlFor="ingredient1"
                    className={`ml-2 ${
                      value[0] === "Ăn uống" ? "text-primary" : null
                    } cursor-pointer`}
                  >
                    Ăn uống
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient2"
                    name="pizza"
                    value="Cơ sở y tế"
                    onChange={(e) => setValue([e.value, "type"])}
                    checked={value[0] === "Cơ sở y tế"}
                  />
                  <label
                    htmlFor="ingredient2"
                    className={`ml-2 ${
                      value[0] === "Cơ sở y tế" ? "text-primary" : null
                    } cursor-pointer`}
                  >
                    Y tế
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient3"
                    name="pizza"
                    value="Trạm xăng dầu"
                    onChange={(e) => setValue([e.value, "type"])}
                    checked={value[0] === "Trạm xăng dầu"}
                  />
                  <label
                    htmlFor="ingredient3"
                    className={`ml-2 ${
                      value[0] === "Trạm xăng dầu" ? "text-primary" : null
                    } cursor-pointer`}
                  >
                    Trạm xăng
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient4"
                    name="pizza"
                    value="ATM"
                    onChange={(e) => setValue([e.value, "type"])}
                    checked={value[0] === "ATM"}
                  />
                  <label
                    htmlFor="ingredient4"
                    className={`ml-2 ${
                      value[0] === "ATM" ? "text-primary" : null
                    } cursor-pointer`}
                  >
                    {" "}
                    ATM
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-content-end">
              <Button
                icon="pi pi-search"
                text
                className="mx-2"
                onClick={(e) => op.current.toggle(e)}
                rounded
              />
              <OverlayPanel ref={op}>
                <AutoComplete
                  value={value[0]}
                  suggestions={items}
                  completeMethod={search}
                  onChange={(e) => setValue([e.value, "type"])}
                  className="m-0"
                />
              </OverlayPanel>
              <DataViewLayoutOptions
                layout={layout}
                onChange={(e) => setLayout(e.value)}
              />
            </div>
          </div>
        ) : (
          <div className="">
            {" "}
            <div className="">
              <div className="flex-column">
                <div className="flex justify-content-between w-full">
                  <Dropdown
                    options={code === "1" ? sortOptions : sortOptions2}
                    value={sortKey}
                    optionLabel="label"
                    // placeholder={code === '1' ? }
                    onChange={onSortChange}
                    className="w-50"
                  />
                  <Button
                    icon="pi pi-search"
                    text
                    className="m-0 mx-2 p-0 h-2rem w-2rem"
                    onClick={(e) => op.current.toggle(e)}
                    rounded
                  />
                  <OverlayPanel ref={op}>
                    <AutoComplete
                      value={value[0]}
                      suggestions={items}
                      completeMethod={search}
                      onChange={(e) => setValue([e.value, "name"])}
                      className="m-0"
                    />
                  </OverlayPanel>
                </div>
                <div className="flex align-items-center justify-content-center w-full mb-1 mt-3">
                  <div className="flex align-items-center justify-content-between h-full w-full">
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="ingredient0"
                        name="pizza"
                        value=""
                        onChange={(e) => setValue([e.value, "type"])}
                        checked={!value[0]}
                      />
                      <label
                        htmlFor="ingredient0"
                        className={`ml-2 ${
                          !value[0] ? "text-primary" : null
                        } cursor-pointer`}
                      >
                        Tất cả
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="ingredient1"
                        name="pizza"
                        value="Ăn uống"
                        onChange={(e) => setValue([e.value, "type"])}
                        checked={value[0] === "Ăn uống"}
                      />
                      <label
                        htmlFor="ingredient1"
                        className={`ml-2 ${
                          value[0] === "Ăn uống" ? "text-primary" : null
                        } cursor-pointer`}
                      >
                        Ăn uống
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="ingredient2"
                        name="pizza"
                        value="Cơ sở y tế"
                        onChange={(e) => setValue([e.value, "type"])}
                        checked={value[0] === "Cơ sở y tế"}
                      />
                      <label
                        htmlFor="ingredient2"
                        className={`ml-2 ${
                          value[0] === "Cơ sở y tế" ? "text-primary" : null
                        } cursor-pointer`}
                      >
                        Y tế
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="ingredient3"
                        name="pizza"
                        value="Trạm xăng dầu"
                        onChange={(e) => setValue([e.value, "type"])}
                        checked={value[0] === "Trạm xăng dầu"}
                      />
                      <label
                        htmlFor="ingredient3"
                        className={`ml-2 ${
                          value[0] === "Trạm xăng dầu" ? "text-primary" : null
                        } cursor-pointer`}
                      >
                        Trạm xăng
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="ingredient4"
                        name="pizza"
                        value="ATM"
                        onChange={(e) => setValue([e.value, "type"])}
                        checked={value[0] === "ATM"}
                      />
                      <label
                        htmlFor="ingredient4"
                        className={`ml-2 ${
                          value[0] === "ATM" ? "text-primary" : null
                        } cursor-pointer`}
                      >
                        {" "}
                        ATM
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  useEffect(() => {
    // console.log(value);
    value[1] === "type"
      ? setProducts(
          value[0]
            ? place?.filter((product) => {
                return product?.type
                  ?.toLowerCase()
                  ?.includes(value[0]?.toLowerCase());
              })
            : place
        )
      : setProducts(
          value[0]
            ? place?.filter((product) => {
                return product?.name
                  ?.toLowerCase()
                  ?.includes(value[0]?.toLowerCase());
              })
            : place
        );
  }, [value, place]);
  return (
    <div className="card">
      <DataView
        value={products || []}
        listTemplate={listTemplate}
        layout={layout}
        header={header()}
        sortField={sortField}
        sortOrder={sortOrder}
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
            className="w-9 sm:w-16rem xl:w-10rem block xl:block mx-auto border-round"
            src={
              currentProducts?.type === "Ăn uống"
                ? anUong
                : currentProducts?.type === "Cơ sở y tế"
                ? benhVien
                : currentProducts?.type === "Trạm xăng dầu"
                ? tramXang
                : atm
            }
            alt={currentProducts?.name}
            style={{
              objectFit: "contain",
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
        <h2 className="text-center">{currentProducts?.name}</h2>
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
  );
}
