import { Article } from "../legacy/Article.js";
import { Installer } from "../components/Installer/Installer.js";

import Home from "../components/Home.js";
import Login from "../pages/Login/Login.js";
import Register from "../pages/Register/Register.js";
import ForgotPassword from "../pages/ResetPassword/ForgotPassword.js";
import ChangePassword from "../pages/ResetPassword/ChangePassword.js";

import AboutUs from "../components/AboutUs/AboutUs.js";
import PageEdit from "../pages/Backoffice/PageEdit.js";
import MenuList from "../pages/Backoffice/MenuList.js";
import MenuEdit from "../pages/Backoffice/MenuEdit.js";
import Page_404 from "../pages/Page_404/Page_404.js";
import PageList from "../pages/Backoffice/PageList.js";

export default [
  {
    path: "/",
    component: Home,
  },

  // Auth --------------
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/change-password",
    component: ChangePassword,
  },

  // BACKOFFICE -----------------------------------
  {
    path: "/admin/pages",
    component: PageList,
  },
  {
    path: "/admin/pages/create",
    component: PageEdit,
  },
  {
    path: "/admin/pages/edit/:slug",
    component: PageEdit,
  },
  {
    path: "/admin/menus",
    component: MenuList,
  },
  {
    path: "/admin/menu/create",
    component: MenuEdit,
  },
  {
    path: "/admin/menu/edit/:id",
    component: MenuEdit,
  },

  // Other --------------------------------------
  {
    path: "/404",
    component: Page_404,
  },

  /* OLD */
  /* {
    path: "/article/edit/:slug",
    component: ArticleForm,
  }, 
  {
    path: "/article/:slug",
    component: Article,
  },
     {
    path: "/articles",
    component: ArticlesList,
  }, 
    {
    path: "/installer",
    component: Installer,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  */
];
