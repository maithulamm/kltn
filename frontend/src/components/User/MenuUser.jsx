import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { device } from "../Home/Home";
import { useNavigate } from "react-router-dom";
import {
  hideLoadingScreen,
  showConfirm,
  showLoadingScreen,
} from "../../redux/apiRequest";
import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import WeatherWidget from "./wt";

export const MenuUser = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [visibleBooking, setVisibleBooking] = useState(false);
  const [visibleChatbot, setVisibleChatbot] = useState(false);
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [visibleGuide, setVisibleGuide] = useState(false);
  const navigate = useNavigate();

  const listMenu = [
    {
      icon: "pi pi-star",
      title: "Địa điểm gần bạn",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          navigate("/kltn/place0");
        }, 500);
      },
    },
    {
      icon: "pi pi-map",
      title: "Bản đồ",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          navigate("/kltn/map");
        }, 500);
      },
    },
    {
      icon: "pi pi-map-marker",
      title: "Địa điểm du lịch",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          navigate("/kltn/place");
        }, 500);
      },
    },
    {
      icon: "pi pi-objects-column",
      title: "Tiện ích",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          navigate("/kltn/place2");
        }, 500);
      },
    },
    {
      icon: "pi pi-cloud",
      title: "Thời tiết",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          hideLoadingScreen();
        }, 500);
        setVisibleWeather(true);
      },
    },
    {
      icon: "pi pi-book",
      title: "Bản tin",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          navigate("/kltn/news");
        }, 500);
      },
    },
    {
      icon: "pi pi-comments",
      title: "Góp ý",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          showConfirm("Chức năng đang cập nhật");
        }, 500);
      },
    },
    {
      icon: "pi pi-calendar-plus",
      title: "Lưu trú",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          hideLoadingScreen();
        }, 1900);
        setVisibleBooking(true);
      },
    },
    {
      icon: "",
      title: "Chatbot AI",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          hideLoadingScreen();
        }, 1900);
        setVisibleChatbot(true);
      },
    },
    {
      icon: "pi pi-question-circle",
      title: "Hướng dẫn",
      ref: "/kltn/guide",
      onClick: () => {
        showLoadingScreen();
        setTimeout(() => {
          hideLoadingScreen();
        }, 500);
        setVisibleGuide(true);
      },
    },
  ];

  const [curDate, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, [curDate]);

  return (
    <div className="flex justify-content-center flex-wrap col-12 ">
      {device() ? (
        <div className="flex justify-content-around flex-wrap col-12 md:col-6 border-bottom-1 surface-border ">
          {listMenu?.map((item, index) => {
            return (
              <div
                className="flex flex-column align-items-center font-bold m-2 col-3 sm:col-2  text-primary hover:text-green-800 "
                key={index}
              >
                <Button
                  style={{ width: "3rem" }}
                  icon={index !== 8 ? item?.icon : null}
                  raised
                  onClick={item?.onClick}
                  label={index === 8 ? "AI" : null}
                  className="hover:text-primary-50 hover:shadow-4 px-0"
                />
                <label
                  htmlFor=""
                  className="mt-2 w-100 text-center h-2rem"
                  style={{ fontSize: "0.8rem" }}
                >
                  {item?.title}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-content-around flex-wrap col-12 md:col-6 border-bottom-1 surface-border">
          {listMenu
            ?.filter((item, index) => index < (showMenu ? 12 : 6))
            .map((item, index) => {
              return (
                <div
                  className="flex flex-column align-items-center  font-bold m-1 col-3 sm:col-2 "
                  key={index}
                >
                  <Button
                    style={{ width: "3rem" }}
                    icon={index !== 8 ? item?.icon : null}
                    raised
                    onClick={item?.onClick}
                    label={index === 8 ? "AI" : null}
                    className="px-0"
                  />
                  <label
                    htmlFor=""
                    className="mt-2 text-primary w-100 text-center"
                    style={{ fontSize: "0.8rem" }}
                    key={index}
                  >
                    {item?.title}
                  </label>
                </div>
              );
            })}
          <div className="flex align-items-center justify-content-end font-bold mx-2 col-12 p-0 my-0">
            <Button
              icon={`pi pi-angle-${showMenu ? "up" : "down"}`}
              text
              style={{ height: "0.5rem" }}
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      )}
      <Dialog
        header={`${curDate}`}
        visible={visibleWeather}
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        onHide={() => {
          if (!visibleWeather) return;
          setVisibleWeather(false);
        }}
        draggable={false}
        contentClassName="flex justify-content-center"
        className="h-full"
      >
        {/* <iframe
          src="https://thoitiet.vn/embed/vopgfypubzd?days=5&hC=%2310b982&hB=%23caf1d8&tC=%2310b981&bC=transpane&lC=%23dddddd"
          id="widgeturl"
          width="90%"
          height="100%"
          allowTransparency="true"
          style={{ border: "none", overflow: "hidden" }}
        ></iframe> */}
        <WeatherWidget />
      </Dialog>
      <Dialog
        header={`${curDate} | Booking.com`}
        visible={visibleBooking}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
        onHide={() => {
          if (!visibleBooking) return;
          setVisibleBooking(false);
        }}
        draggable={false}
        contentClassName="flex justify-content-center"
        className="h-full"
      >
        <iframe
          id="booking"
          src={
            "https://www.booking.com/searchresults.vi.html?ss=Long+Xuy%C3%AAn%2C+An+Giang%2C+Vietnam&label=gen173nr-1FCAEoggI46AdIM1gDaGyIAQGYAQm4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AqzZ7f4FwAIB0gIkZjQwZjQ4YjEtZjQwZi00ZjQ4LTk0ZjAtY2IwM2QwZjQwZi0xY2Iw&aid=304142&lang=vi&sb=1&src_elem=sb&src=searchresults&dest_id=-3720510&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=fb8752f524e10172&ac_meta=GhBmYjg3NTJmNTI0ZTEwMTcyIAAoATICZW46BkxvbmcgWEAASgBQAA%3D%3D&group_adults=2&no_rooms=1&group_children=0"
          }
          width="90%"
          height="80%"
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </Dialog>
      <Dialog
        header={`Hướng dẫn sử dụng`}
        visible={visibleGuide}
        style={{ width: "auto", height: "100%" }}
        onHide={() => {
          if (!visibleGuide) return;
          setVisibleGuide(false);
        }}
        draggable={false}
        contentClassName="flex justify-content-center"
        className="h-full"
      >
        <div className="card w-full">
          <Accordion activeIndex={0}>
            <AccordionTab header="Bản đồ">
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionTab>
            <AccordionTab header="Header II">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header="Header III">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
          </Accordion>
        </div>
      </Dialog>
      <Dialog
        header={`Chatbot AI`}
        visible={visibleChatbot}
        style={{ width: device() ? "70%" : "auto", height: "100%" }}
        onHide={() => {
          if (!visibleChatbot) return;
          setVisibleChatbot(false);
        }}
        draggable={false}
        contentClassName="flex justify-content-center"
        className="h-full"
      >
        <iframe
          src="https://api.coze.com/open-platform/sdk/chatapp?params=%7B%22chatClientId%22%3A%22_jwXrPJw7_erd-zsR5ajM%22%2C%22chatConfig%22%3A%7B%22bot_id%22%3A%227387681070575616016%22%2C%22user%22%3A%22Pxqh8XwF27fWQBXNHhsDa%22%2C%22conversation_id%22%3A%22g934EbHyXs0nq1a712wKB%22%7D%2C%22componentProps%22%3A%7B%22layout%22%3A%22mobile%22%2C%22lang%22%3A%22en%22%2C%22uploadable%22%3Atrue%2C%22title%22%3A%22Coze%22%7D%7D"
          width="100%"
          height="100%"
          style={{ border: "none", overflow: "hidden" }}
        ></iframe>
      </Dialog>
    </div>
  );
};
