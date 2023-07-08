import { ArticlesList } from "../pages/ArticlesList.js";
import { Article } from "../pages/Article.js";
import { Installer } from "../components/Installer/Installer.js";

import Home from "../components/Home.js";
import Login from "../pages/Login/Login.js";
import Register from "../pages/Register/Register.js";
import ForgotPassword from "../pages/ResetPassword/ForgotPassword.js";
import ChangePassword from "../pages/ResetPassword/ChangePassword.js";
import ArticleForm from "../components/articles/ArticleForm.js";
import AboutUs from "../components/AboutUs/AboutUs.js";
import PageEdit from "../pages/Backoffice/PageEdit.js";
import MenuList from "../pages/menus/MenuList.js";
import MenuForm from "../components/menus/MenuForm.js";
import Page_404 from "../pages/Page_404/Page_404.js";
import CommentCard from "../components/comments/CommentCard.js";
import CommentsList from "../components/comments/CommentsList.js";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/articles",
    component: ArticlesList,
  },
  {
    path: "/article/edit/:slug",
    component: ArticleForm,
  },
  {
    path: "/article/:slug",
    component: Article,
  },
  {
    path: "/pages/edit/:slug",
    component: PageEdit,
  },
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
  {
    path: "/installer",
    component: Installer,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/menus",
    component: MenuList,
  },
  {
    path: "/menu/create",
    component: MenuForm,
  },
  {
    path: "/menu/edit/:id",
    component: MenuForm,
  },
  {
    path: "/404",
    component: Page_404,
  },
  {
    path: "/comments",
    component: CommentsList,
  },
];
