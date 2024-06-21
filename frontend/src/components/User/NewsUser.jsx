import { Button } from "primereact/button";
import React, { useState } from "react";
import { device } from "../Home/Home";
import { useSelector } from "react-redux";
import { showLoadingScreen } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

export const NewsUser = () => {
  const [visibleNews, setVisibleNews] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const news =
    useSelector((state) => state?.news?.news?.allNews)
      ?.filter((item, index) => index < 100)
      ?.reverse() || [];
  const navigate = useNavigate();
  // console.log(
  //   news?.filter((item, index) =>   index < 100).reverse()
  // );
  return (
    <div className="flex justify-content-center flex-wrap col-12 ">
      {/* <iframe src={
        "https://www.booking.com/searchresults.vi.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gDaGyIAQGYAQm4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqzZ7f4FwAIB0gIkZjQwZjQ4YjEtZjQwZi00ZjQ4LTk0ZjAtY2IwM2QwZjQwZi0xY2Iw"
      } width="340" height="500" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> */}

      <div className="col-12 md:col-10 flex-column justify-content-center">
        {" "}
        <div className="flex justify-content-between w-full">
          <Button
            label="Bản tin"
            icon="pi pi-book"
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
              navigate("/news");
            }}
          />
        </div>
      </div>

      <div className="flex justify-content-center col-12 md:col-10">
        {device() ? (
          <div
            className="flex justify-content-centercol-12 md:col-7 p-0 border-right-1 surface-border cursor-pointer hover:bg-primary-300 hover:text-50"
            style={{
              maxHeight: "20rem",
            }}
          >
            <div
              className="flex justify-content-center col-12 md:col-7"
              style={{
                backgroundImage: `url(${news[0]?.image})`,
                height: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                setCurrentNews(news[0]);
                setVisibleNews(true);
              }}
            ></div>
            <div className="flex-column justify-content-center col-12 md:col-5 p-0">
              {/* <div className="grid"> */}
              <div className="col-12">
                <div
                  className="text-center p-0 border-round-sm font-bold mx-3"
                  style={{
                    maxHeight: "4rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {news[0]?.title}
                </div>
              </div>
              <div className="col-12">
                <div
                  className=" p-0 border-round-sm font-light mx-3"
                  style={{
                    textAlign: "justify",
                    textIndent: "2rem",
                    maxHeight: "16rem",
                    overflow: "hidden",
                    webkitLineClamp: "14",
                    webkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                >
                  {news[0]?.content}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        ) : null}

        <div
          className="col-12 md:col-5 p-0"
          style={{
            maxHeight: "20rem",
          }}
        >
          <div
            className="grid"
            key={news
              ?.filter((item, index) => index > 0 && index < 4)
              ?.map((item, index) => {
                return index;
              })}
          >
            <div className="col-12">
              {news
                ?.filter((item, index) =>
                  device() ? index > 0 && index < 4 : index >= 0 && index < 3
                )
                ?.map((item, index) => {
                  return (
                    <div
                      className={`flex justify-content-center col-12 ${
                        index === 1
                          ? "border-bottom-1 border-top-1 surface-border"
                          : null
                      } cursor-pointer hover:bg-primary-300 hover:text-50`}
                      style={{
                        maxHeight: "6rem",
                      }}
                      key={index}
                      onClick={() => {
                        setCurrentNews(item);
                        setVisibleNews(true);
                      }}
                    >
                      <div
                        className=" col-3"
                        style={{
                          backgroundImage: `url(${item?.image})`,
                          height: "5rem",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className="col-9">
                        <div
                          className=" p-0 border-round-sm font-bold mx-3"
                          style={{
                            maxHeight: "4rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item?.title}
                        </div>
                        <div
                          className=" p-0 border-round-sm font-light mx-3 mt-1"
                          style={{
                            textAlign: "justify",
                            textIndent: "2rem",
                            maxHeight: "14rem",
                            overflow: "hidden",
                            webkitLineClamp: "3",
                            webkitBoxOrient: "vertical",
                            display: "-webkit-box",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item?.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              <Dialog
                header={`Bảng tin`}
                visible={visibleNews}
                style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
                onHide={() => {
                  if (!visibleNews) return;
                  setVisibleNews(false);
                }}
                draggable={false}
                contentClassName="flex justify-content-center"
                className="h-full"
              >
                <div
                  className={`${
                    device() ? "flex" : "flex-column"
                  } justify-content-center col-12`}
                >
                  <div
                    className="flex justify-content-center col-12 md:col-5 h-20rem md:h-full"
                    style={{
                      backgroundImage: `url(${currentNews?.image})`,
                      // height: "20rem",
                      maxWidth: "100%",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="flex justify-content-center col-12 md:col-6">
                    <div
                      className={`flex-column justify-content-center col-12 p-0 m-3`}
                    >
                      <div className="col-12">
                        <div
                          className="text-center p-0 border-round-sm font-bold mx-3"
                          style={{
                            maxHeight: "4rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "1rem",
                          }}
                        >
                          {currentNews?.title}
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className=" p-0 border-round-sm font-light m-3"
                          style={{
                            textAlign: "justify",
                            textIndent: "2rem",
                            maxHeight: "100%",
                            overflow: "hidden",
                            webkitLineClamp: "20",
                            webkitBoxOrient: "vertical",
                            display: "-webkit-box",
                            fontSize: `${device() ? "2rem" : "0.8rem"}`,
                          }}
                        >
                          {currentNews?.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewsUser2 = () => {
  const [visibleNews, setVisibleNews] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const news =
    useSelector((state) => state?.news?.news?.allNews)
      ?.filter((item, index) => index < 100)
      ?.reverse() || [];
  const navigate = useNavigate();
  // console.log(
  //   news?.filter((item, index) =>   index < 100).reverse()
  // );
  return (
    <div className="flex justify-content-center flex-wrap col-12 ">
      {/* <iframe src={
        "https://www.booking.com/searchresults.vi.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gDaGyIAQGYAQm4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqzZ7f4FwAIB0gIkZjQwZjQ4YjEtZjQwZi00ZjQ4LTk0ZjAtY2IwM2QwZjQwZi0xY2Iw"
      } width="340" height="500" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> */}

      <div className="col-12 md:col-10 flex-column justify-content-center">
        {" "}
        <div className="flex justify-content-between w-full">
          <Button
            label="Bản tin"
            icon="pi pi-book"
            text
            className="p-button-outlined p-button-success"
            onClick={null}
          />
          {/* <Button
            label="Xem thêm"
            //   icon="pi pi-plus"
            text
            className="p-button-outlined p-button-success my-2"
            onClick={() => {
              showLoadingScreen();
              navigate("/news");
            }}
          /> */}
        </div>
      </div>

      <div className="flex justify-content-center col-12 md:col-10">
        <div
          className="col-12 md:col-8 p-0"
          style={{
            maxHeight: "20rem",
          }}
        >
          <div
            className="grid"
            key={news
              ?.filter((item, index) => index > 0 && index < 4)
              ?.map((item, index) => {
                return index;
              })}
          >
            <div className="col-12">
              {news
                ?.filter((item, index) => index < 100)
                ?.map((item, index) => {
                  return (
                    <div
                      className={`flex justify-content-center col-12 ${
                        index === 1
                          ? "border-bottom-1 border-top-1 surface-border"
                          : null
                      } cursor-pointer hover:bg-primary-300 hover:text-50`}
                      style={{
                        maxHeight: "9rem",
                      }}
                      key={index}
                      onClick={() => {
                        setCurrentNews(item);
                        setVisibleNews(true);
                      }}
                    >
                      <div
                        className=" col-3"
                        style={{
                          backgroundImage: `url(${item?.image})`,
                          height: `${device() ? "8rem" : "5rem"}`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className="col-9">
                        <div
                          className=" p-0 border-round-sm font-bold mx-3"
                          style={{
                            maxHeight: "4rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item?.title}
                        </div>
                        <div
                          className=" p-0 border-round-sm font-light mx-3 mt-1"
                          style={{
                            textAlign: "justify",
                            textIndent: "2rem",
                            maxHeight: "14rem",
                            overflow: "hidden",
                            webkitLineClamp: `${device() ? "5" : "3"}`,
                            webkitBoxOrient: "vertical",
                            display: "-webkit-box",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item?.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              <Dialog
                header={`${currentNews?.title}`}
                visible={visibleNews}
                style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
                onHide={() => {
                  if (!visibleNews) return;
                  setVisibleNews(false);
                }}
                draggable={false}
                contentClassName="flex justify-content-center"
                className="h-full"
              >
                <div
                  className={`${
                    device() ? "flex" : "flex-column"
                  } justify-content-center col-12`}
                >
                  <div
                    className="flex justify-content-center col-12 md:col-5 h-20rem md:h-full"
                    style={{
                      backgroundImage: `url(${currentNews?.image})`,
                      // height: "20rem",
                      maxWidth: "100%",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="flex justify-content-center col-12 md:col-6">
                    <div
                      className={`flex-column justify-content-center col-12 p-0 m-3`}
                    >
                      <div className="col-12">
                        <div
                          className="text-center p-0 border-round-sm font-bold mx-3"
                          style={{
                            maxHeight: "4rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "1rem",
                          }}
                        >
                          {currentNews?.title}
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className=" p-0 border-round-sm font-light m-3"
                          style={{
                            textAlign: "justify",
                            textIndent: "2rem",
                            maxHeight: "100%",
                            overflow: "hidden",
                            webkitLineClamp: "20",
                            webkitBoxOrient: "vertical",
                            display: "-webkit-box",
                            fontSize: `${device() ? "2rem" : "0.8rem"}`,
                          }}
                        >
                          {currentNews?.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
