import Component from "../../core/Component.js";

export class ArticleListEdit extends Component {
  get content() {
    return {};
  }
  render() {
    return createElement("h1", {}, "Article List edit");
  }
}
