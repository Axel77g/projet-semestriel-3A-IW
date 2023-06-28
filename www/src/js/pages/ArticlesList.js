import Api from "../core/Api.js";
import Component from "../core/Component.js";

// Components
import { ArticlesCard } from "../components/ArticleCard.js";

export class ArticlesList extends Component {
  init() {
    this.state = {
      articles: [],
    };
    this.fetchArticles();
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
    return createElement("div", { class: ["article-container"] }, [
      createElement("h1", {}, "Liste de tous les articles"),
      createElement(
        "div",
        { class: ["article-list"] },
        this.state.articles.map((article) => {
          return new ArticlesCard({ article: article });
        })
      ),
    ]);
  }
}
