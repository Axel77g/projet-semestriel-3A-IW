import Article from "../components/Article.js";
import { ArticlesList } from "../components/ArticlesList.js";
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
];
