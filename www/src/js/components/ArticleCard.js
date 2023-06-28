import Component from "../core/Component.js";

export class ArticlesCard extends Component {
  render() {
    let article = this.props.article;
    return createElement("div", { class: ["articlesCard"] }, [
      createElement("h1", {}, article.title),
      createElement("p", {}, article.content),
    ]);
  }
}
