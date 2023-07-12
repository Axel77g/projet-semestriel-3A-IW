import Component from "../core/Component.js";
import { createElement } from "../core/Element.js";
import Header from "./global/Header.js";

export default class Home extends Component {
  init() {
    document.title = "Blog";
  }
  render() {
    return createElement("div", { class: ["home"] }, [
      createElement(Header, {}),
      createElement("div", { class: ["container-fluid", "mt-4"] }, [
        createElement("h1", {}, "Bienvenue sur Faraway - Blog"),
      ]),
    ]);
  }
}
