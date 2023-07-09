import Component from "../../core/Component.js";

export class ArticleEdit extends Component {
  get content() {
    return {};
  }
  render() {
    return createElement("h1", {}, "Article edit");
  }
}
