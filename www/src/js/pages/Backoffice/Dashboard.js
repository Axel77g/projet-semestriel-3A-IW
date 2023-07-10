import Component from "../../core/Component.js";
import BackofficeContainer from "./Index.js";
import Api from "../../core/Api.js";

export default class Dashboard extends Component {
  init() {
    const api = new Api();
    api.get("api/isAdmin");
  }
  render() {
    return createElement("div", {}, [createElement(BackofficeContainer, {})]);
  }
}
