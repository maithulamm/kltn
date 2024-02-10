import HomePage from "../page/Home/HomePage";
import Map from "../page/Map/PageMap";
import Data from "../page/DataBase/Data";
import Feedback from "../page/Feedback/Feedback";
import Links from "../page/LinkPage/LinkPage"
import Guide from "../page/Guide/Guide";
import Page404 from "../page/Page404/Page404";
import LoginPage from "../page/LoginPage/LoginPage"

const publicRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/map", element: <Map /> },
  { path: "/data", element: <Data /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/link", element: <Links /> },
  { path: "/guide", element: <Guide /> },
  { path: "*", element: <Page404 /> }, 
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
