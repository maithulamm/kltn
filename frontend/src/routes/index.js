import HomePage from "../page/Home/HomePage";
import Map, { Mapapp, MapappUser } from "../page/Map/PageMap";
import { Place, Place2, Type, User } from "../page/DataBasePage/Data";
import Feedback from "../page/Feedback/Feedback";
import Links from "../page/LinkPage/LinkPage"
import Guide from "../page/Guide/Guide";
import Page404 from "../page/Page404/Page404";
import { LoginPage, LoginPageUser } from "../page/LoginPage/LoginPage"
import UserHomePage from "../page/Home/UserHomePage.jsx";
import { PlaceUserPage, PlaceUserPage1, PlaceUserPage2, NewsPage} from "../page/DataBasePage/PlaceUser.jsx";
import { NewsUser } from "../components/User/NewsUser.jsx";

const publicRoutes = [
  { path: "/", element: <LoginPageUser /> },
  { path: "/login", element: <LoginPageUser /> },
  { path: "/home", element: <UserHomePage /> },
  { path: "*", element: <Page404 /> },
  { path: "/place", element: <PlaceUserPage /> },
  { path: "/map", element: <MapappUser /> },
  {
    path: "/place0", element: <PlaceUserPage1 />
  },
  {
    path: "/place2", element: <PlaceUserPage2 />
  },
  {
    path: "/news", element: < NewsPage/>
  },
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

  { path: "/feedback", element: <Feedback /> },
  { path: "/link", element: <Links /> },
  { path: "/guide", element: <Guide /> },
  { path: "*", element: <Page404 /> },
];

export { publicRoutes, privateRoutes };
