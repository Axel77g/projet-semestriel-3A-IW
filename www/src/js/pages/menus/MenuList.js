import Api from "../../core/Api.js";

// Components
import Component from "../../core/Component.js";

import Menu from "./Menu.js";

export default class MenuList extends Component {
  init() {
    this.state = {
      menus: [],
    };
    this.fetchMenus();
  }

  // Fetch the /api/menus
  fetchMenus() {
    let api = new Api();
    api.get("api/menus").then((response) => {
      this.setState({
        menus: response,
      });
    });
  }

  render() {
    if (this.state.menus.length === 0)
      return createElement("div", { class: ["container-fluid", "mt-4"] }, [
        createElement("p", {}, "Loading"),
      ]);

    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement("h1", {}, "Liste de tous les menus"),
      createElement(
        "div",
        { class: ["row"] },
        this.state.menus
          .filter((menu) => menu.parent_id == null)
          .map((menu) => {
            return createElement(Menu, {
              key: "menu-" + menu.id,
              menu,
              menuChildren: this.state.menus.filter(
                (menuChild) => menuChild.parent_id == menu.id
              ),
            });
          })
      ),
    ]);
  }
}
