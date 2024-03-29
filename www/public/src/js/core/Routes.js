import Home from "../components/Home.js";
import Login from "../pages/Login/Login.js";
import Logout from "../pages/Logout/Logout.js";
import Register from "../pages/Register/Register.js";
import ForgotPassword from "../pages/ResetPassword/ForgotPassword.js";
import ChangePassword from "../pages/ResetPassword/ChangePassword.js";

import PageEdit from "../pages/Backoffice/PageEdit.js";
import MenuList from "../pages/Backoffice/MenuList.js";
import MenuEdit from "../pages/Backoffice/MenuEdit.js";
import Dashboard from "../pages/Backoffice/Dashboard.js";
import Page_404 from "../pages/Page_404/Page_404.js";
import PageList from "../pages/Backoffice/PageList.js";
import CommentList from "../pages/Backoffice/CommentList.js";
import CommentDetail from "../pages/Backoffice/CommentDetail.js";
import UserList from "../pages/Backoffice/UserList.js";
import UserEdit from "../pages/Backoffice/UserEdit.js";
import Profil from "../pages/Profil/index.js";
import Test from "../components/Test/index.js";

export default [
  {
    path: "",
    component: Home,
  },
  {
    path: "/test",
    component: Test,
  },

  // Auth --------------

  {
    path: "/login",
    component: Login,
  },
  {
    path: "/logout",
    component: Logout,
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
    path: "/profil",
    component: Profil,
  },

  // BACKOFFICE -----------------------------------

  {
    path: "/admin",
    component: Dashboard,
  },
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
  {
    path: "/admin/users",
    component: UserList,
  },
  {
    path: "/admin/users/edit/:id",
    component: UserEdit,
  },
  {
    path: "/admin/users/create",
    component: UserEdit,
  },

  // // Article --------------
  // {
  //   path: "/articles",
  //   component: ArticlesList,
  // },
  // {
  //   path: "/article/edit/:slug",
  //   component: ArticleForm,
  // },
  // {
  //   path: "/article/:slug",
  //   component: Article,
  // },
  // {
  //   path: "/pages/edit/:slug",
  //   component: PageEdit,
  // },

  // // Menu --------------
  // {
  //   path: "/menus",
  //   component: MenuList,
  // },
  // {
  //   path: "/menu/create",
  //   component: MenuForm,
  // },
  // {
  //   path: "/menu/edit/:id",
  //   component: MenuForm,
  // },

  // Comment --------------
  // {
  //   path: "/comments",
  //   component: CommentsList,
  // },

  {
    path: "/admin/comments",
    component: CommentList,
  },

  {
    path: "/admin/comment/more/:id",
    component: CommentDetail,
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
