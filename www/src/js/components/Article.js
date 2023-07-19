import Component from "../core/Component.js";

export default class Article extends Component {
  render() {
    return createElement(
      "div",
      { class: ["home"] },
      "Article " + router.route.params.slug
    );
  }
}
