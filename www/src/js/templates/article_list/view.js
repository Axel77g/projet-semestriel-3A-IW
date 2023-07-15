import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import ArticleCard from "../../components/articles/ArticleCard.js";
import { createElement } from "../../core/Element.js";

export class ArticleListView extends Component {
  init() {
    this.state = {
      articles: [],
    };

    this.fetchArticles();
  }

  async fetchArticles() {
    const ids = this.props.page.content.selectedArticles;
    const api = new Api();
    const response = await api.get(
      "api/pages?ids=" + ids.join(",") + "&template=article&withContent"
    );

    if (!Array.isArray(response)) return;
    this.setState({ articles: response });
  }

  render() {
    return createElement("div", {}, [
      createElement("h1", {}, this.props.page.title),
      createElement("div", { class: "articles-list" }, [
        ...this.state.articles.map((article) => {
          return createElement(ArticleCard, { key: article.id, article });
        }),
      ]),
    ]);
  }
}
