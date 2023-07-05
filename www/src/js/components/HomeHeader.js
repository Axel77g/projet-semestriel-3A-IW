import Api from "../core/Api.js";

// Components
import Component from "../core/Component.js";
import Button from "./ui/Button.js";

import Menu from "../pages/menus/Menu.js";

export default class HomeHeader extends Component {
  init() {
    this.state = {
      menus: [],
    };
    this.fetchMenus();
  }

  fetchMenus() {
    let api = new Api();
    api.get("api/menus").then((response) => {
      this.setState({
        menus: response,
      });
    });
  }

  render() {
    console.log(this.state.menus);
    return createElement(
      "nav",
      { class: ["navbar", "navbar-expand-lg", "navbar-light", "bg-light"] },
      [
        createElement("a", { class: "navbar-brand", href: "#" }, "Faraway"),
        createElement(
          "button",
          {
            class: "navbar-toggler",
            type: "button",
            "data-toggle": "collapse",
            "data-target": "#navbarNav",
            "aria-controls": "navbarNav",
            "aria-expanded": "false",
            "aria-label": "Toggle navigation",
          },
          createElement("span", { class: "navbar-toggler-icon" })
        ),
        createElement(
          "div",
          { class: ["collapse", "navbar-collapse"], id: "navbarNav" },
          [
            createElement(
              "ul",
              { class: ["navbar-nav"] },
              this.state.menus
                .filter((menu) => menu.parent_id == null)
                .map((menu) => {
                  return createElement(Menu, {
                    menu: menu,
                    menuChildren: this.state.menus.filter(
                      (menuChild) => menuChild.parent_id == menu.id
                    ),
                  });
                })
            ),
            // createElement("ul", { class: ["navbar-nav", "ml-auto"] }, [
            //   createElement(
            //     "li",
            //     { class: ["nav-item"] },
            //     createElement(
            //       Button,
            //       {
            //         class: ["btn", "btn-outline-light"],
            //         href: "#",
            //       },
            //       "Connexion"
            //     )
            //   ),
            // ]),
          ]
        ),
        // createElement(
        //   "div",
        //   { class: ["collapse", "navbar-collapse"], id: "navbarNavDropdown" },
        //   [
        //     createElement(
        //       "ul",
        //       { class: ["navbar-nav"] },
        //       this.state.menus
        //         .filter((menu) => menu.parent_id == null)
        //         .map((menu) => {
        //           return createElement(Menu, {
        //             menu: menu,
        //             menuChildren: this.state.menus.filter(
        //               (menuChild) => menuChild.parent_id == menu.id
        //             ),
        //           });
        //         })
        //     ),
        //   ]
        // ),
      ]
    );
  }
}
