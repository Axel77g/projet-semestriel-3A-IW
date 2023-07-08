import Api from "../core/Api.js";

// Components
import Component from "../core/Component.js";
import ArticlesCard from "../components/ArticleCard.js";

export class ArticlesList extends Component {
  init() {
    this.state = {
      articles: [],
    };
    setTimeout(() => {
      this.fetchArticles();
    }, 1000);
  }

  fetchArticles() {
    let api = new Api();
    api.get("api/articles").then((response) => {
      this.setState({
        articles: response,
      });
    });
  }

  render() {
    if (this.state.articles.length === 0)
      return createElement("div", { class: ["container-fluid", "mt-4"] }, [
        createElement("p", {}, "Loading"),
      ]);

    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement("h1", {}, "Liste de tous les articles"),
      createElement(
        "div",
        { class: ["row"] },
        this.state.articles.map((article) => {
          return createElement(ArticlesCard, {
            key: "article-" + article.id,
            article,
          });
        })
      ),
    ]);
  }
}
