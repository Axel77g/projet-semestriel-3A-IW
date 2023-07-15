import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class ArticleCard extends Component {
  init() {
    this.state = {};
  }

  get date() {
    return new Date(this.props.article.created_at).toLocaleDateString("fr-FR");
  }

  render() {
    return createElement("div", { class: "article-card" }, [
      createElement("a", { href: this.props.article.path }, [
        //image
        createElement("img", {
          src: "/" + this.props.article.content?.thumbnail?.path,
        }),
        createElement("div", { class: "article-card-content" }, [
          createElement("h3", {}, this.props.article.title),
          createElement("span", {}, "Publié le " + this.date),
        ]),
      ]),
    ]);
  }
}
