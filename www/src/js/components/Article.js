import Component from "../core/Component.js";

export default class Article extends Component {
  render() {
    console.log(router);
    return createElement(
      "div",
      { class: ["home"] },
      "Article " + router.route.params.slug
    );
  }
}
