import Component from "../core/Component.js";
import Api from "../core/Api.js";
import Header from "./global/Header.js";

export default class Home extends Component {
  init() {
    document.title = "Blog";
    this.fetchHome();
  }

  async fetchHome() {
    const api = new Api();
    const home = await api.get("api/pages/home");

    router.push(home.path);
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
