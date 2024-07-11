import HomePage from "../page/Home/HomePage";
import Map, { Mapapp, MapappUser } from "../page/Map/PageMap";
import { News, Place, Place2, Type, User } from "../page/DataBasePage/Data";
import {Feedback, Feedback2} from "../page/Feedback/Feedback";
import Links from "../page/LinkPage/LinkPage"
import Guide from "../page/Guide/Guide";
import Page404 from "../page/Page404/Page404";
import { LoginPage, LoginPageUser } from "../page/LoginPage/LoginPage"
import UserHomePage from "../page/Home/UserHomePage.jsx";
import { PlaceUserPage, PlaceUserPage1, PlaceUserPage2, NewsPage } from "../page/DataBasePage/PlaceUser.jsx";
import { NewsUser } from "../components/User/NewsUser.jsx";
import ChatbotPage from "../page/Chatbot/ChatbotPage.jsx";

const publicRoutes = [
  { path: "/", element: <UserHomePage /> },
  { path: "/login", element: <LoginPageUser /> },
  { path: "*", element: <LoginPageUser /> },
  { path: "/home", element: <UserHomePage /> },
  { path: "/place", element: <PlaceUserPage /> },
  { path: "/map", element: <MapappUser /> },
  {
    path: "/place0", element: <PlaceUserPage1 />
  },
  {
    path: "/place2", element: <PlaceUserPage2 />
  },
  {
    path: "/news", element: < NewsPage />
  },
  { path: "/feedback", element: <Feedback /> },
];

const privateRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPageUser /> },
  { path: "/home", element: <HomePage /> },
  { path: "/map", element: <Mapapp /> },


  { path: "/data", element: <Place /> },
  { path: "/data/place", element: <Place /> },
  { path: "/data/place2", element: <Place2 /> },
  { path: "/data/user", element: <User /> },
  { path: "/data/type", element: <Type /> },
  { path: "/data/news", element: <News /> },


  { path: "/feedback", element: <Feedback2 /> },
  { path: "/chatbot", element: <ChatbotPage /> },
  { path: "/guide", element: <Guide /> },
  { path: "*", element: <LoginPageUser /> },
];

export { publicRoutes, privateRoutes };
