import Component from "../core/Component.js";
import { ArticlesCard } from "./ArticleCard.js";
import Api from "../core/Api.js";

export class ArticlesList extends Component {

  init() {
    this.state = {
      articles: [
        {
          title: "Article 1",
          description: "Description 1",
        },
        {
          title: "Article 2",
          description: "Description 2",
        },
        {
          title: "Article 3",
          description: "Description 3",
        },
      ],
    };
  }

  fetchArticles() {
    const api = new Api();
    api.get("articles", {}).then((articles) => {
      console.log(articles);
    });
  }



  render() {
    return createElement( "div", { onload: this.fetchArticles() }, [
      createElement("div",
      { class: ["articlesList"] },
      this.state.articles.map(
        (article) =>
          new ArticlesCard({
            article,
          })
      )
    )]);

  }
}
