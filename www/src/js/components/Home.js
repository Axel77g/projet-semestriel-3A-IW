import Component from "../core/Component.js";
import HomeHeader from "./HomeHeader.js";

export default class Home extends Component {
  render() {
    return createElement("div", { class: ["home"] }, [new HomeHeader()]);
  }
}
