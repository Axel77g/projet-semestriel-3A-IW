import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import { htmlDecode } from "../../utils/text_decode.js";

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
          alt: this.props.article.content?.thumbnail?.alternative_text || "",
        }),
        createElement("div", { class: "article-card-content" }, [
          createElement("h3", {}, htmlDecode(this.props.article.title)),
          createElement("span", {}, "Publié le " + this.date),
        ]),
      ]),
    ]);
  }
}
