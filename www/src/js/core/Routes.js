import Article from "../components/Article.js";
import Home from "../components/Home.js";

// Pages
import { ArticlesList } from "../pages/ArticlesList.js";

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
