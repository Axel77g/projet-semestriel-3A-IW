import Component from "../core/Component.js";
import HomeHeader from "./HomeHeader.js";
import Button from "./ui/Button.js";

export default class Home extends Component {
  render() {
    return createElement("div", { class: ["home"] }, [
      createElement(HomeHeader),
      createElement("div", { class: ["container-fluid", "mt-4"] }, [
        createElement("h1", {}, "Bienvenue sur Faraway - Blog"),
      ]),
    ]);
  }
}
