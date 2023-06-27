import Component from "../core/Component.js";

export default class HomeHeader extends Component {
  render() {
    return createElement("h1", { class: ["home-header"] }, "Home");
  }
}
