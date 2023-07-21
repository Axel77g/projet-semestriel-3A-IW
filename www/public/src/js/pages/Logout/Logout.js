import Component from "../../core/Component.js";

export default class Logout extends Component {
  init() {
    localStorage.removeItem("authorization");
    router.push("/login");
    document.title = "Logout";
  }
  render() {
    return createElement("div", {}, "logout");
  }
}
