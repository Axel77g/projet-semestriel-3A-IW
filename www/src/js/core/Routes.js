import Article from "../components/Article.js";
import { ArticlesList } from "../components/ArticlesList.js";
import { Installer } from "../components/Installer/Installer.js";
import Home from "../components/Home.js";

export default [
  {
    path: "/",
    component: Home,
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
  }
];
