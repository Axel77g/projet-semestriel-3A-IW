import Component from "../../core/Component.js";
import Api from "../../core/Api.js";
import ArticleCard from "../articles/ArticleCard.js";

export default class ArticleList extends Component {
  init() {
    if (this.props.article_section.enabled) {
      if (this.props.article_section.type === "latest") {
        this.fetchLatestArticles();
        return;
      }
      if (this.props.article_section.type === "random") {
        this.fetchRandomArticles();
        return;
      }
      if (this.props.article_section.type === "popular") {
        this.fetchPopularArticles();
        return;
      }

      this.state({ articles: [], title: "" });
    }
  }

  fetchLatestArticles() {
    const api = new Api();
    api.get("api/pages/latest?withContent").then((response) => {
      this.setState({ articles: response, title: "Les derniers articles" });
    });
  }

  fetchRandomArticles() {
    const api = new Api();
    api.get("api/pages/random?withContent").then((response) => {
      this.setState({
        articles: response,
        title: "Quelques articles aléatoires",
      });
    });
  }

  fetchPopularArticles() {
    const api = new Api();
    api.get("api/pages/popular?withContent").then((response) => {
      this.setState({
        articles: response,
        title: "Les articles les plus populaires",
      });
    });
  }

  render() {
    if (this.state.articles) {
      let articles = this.state.articles.map((article) => {
        return createElement(ArticleCard, { article: article });
      });

      let list = createElement("div", { class: "home-articles" }, [
        createElement("h3", {}, this.state.title),
        createElement("div", { class: ["articles-list"] }, articles),
      ]);

      if (!this.props.article_section.enabled) {
        list = createElement("div", {}, "");
      }

      return list;
    }
    return createElement("div", {}, "Loading...");
  }
}
