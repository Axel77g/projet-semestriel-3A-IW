import Api from "../../core/Api.js";

// Components
import Component from "../../core/Component.js";
import Button from "../ui/Button.js";

import Menu from "../../pages/menus/Menu.js";
import { createElement } from "../../core/Element.js";
import { Link } from "../ui/Link.js";
import authMixin from "../../mixins/authMixin.js";

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

  get mixins() {
    return [authMixin];
  }

  render() {
    return createElement(
      "nav",
      { class: ["navbar", "navbar-expand-md", "navbar-light", "bg-light"] },
      [
        createElement("div", { class: "container-fluid" }, [
          createElement(Link, {
            key: "brand",
            class: "navbar-brand",
            href: "/",
            children: "Faraway",
          }),

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
                      key: menu.id,
                      menuChildren: this.state.menus.filter(
                        (menuChild) => menuChild.parent_id == menu.id
                      ),
                    });
                  })
              ),
            ]
          ),
          createElement("div", { class: ["d-flex", "align-items-center"] }, [
            this.state.isAuth &&
              createElement("span", { class: ["nav-item", "dropdown"] }, [
                createElement(
                  "a",
                  {
                    id: "user-dropdown",
                    class: ["nav-link", "dropdown-toggle"],
                    role: "button",
                    href: "#",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false",
                  },
                  this.state.user.firstname
                ),
                createElement(
                  "div",
                  {
                    class: ["dropdown-menu", "dropdown-menu-end"],
                    "aria-labelledby": "user-dropdown",
                  },
                  [
                    createElement(Link, {
                      key: "profil-link",
                      href: "/profil",
                      class: ["dropdown-item"],
                      children: [
                        createElement("i", {
                          class: ["bi", "bi-person"],
                        }),
                        createElement("span", { class: "pl-3" }, "Profil"),
                      ],
                    }),
                    this.state.user.role == "admin" &&
                      createElement(Link, {
                        key: "profil-dashboard",
                        href: "/admin",
                        class: ["dropdown-item"],
                        children: [
                          createElement("i", {
                            class: ["bi", "bi-speedometer2"],
                          }),
                          createElement("span", { class: "pl-3" }, "Dashboard"),
                        ],
                      }),
                    createElement(Link, {
                      key: "profil-logout",
                      href: "/logout",
                      class: ["dropdown-item"],
                      children: [
                        createElement("i", {
                          class: ["bi", "bi-box-arrow-left"],
                        }),
                        createElement("span", { class: "pl-3" }, "Déconnexion"),
                      ],
                    }),
                  ]
                ),
              ]),
            createElement(
              "button",
              {
                class: ["navbar-toggler", "ml-5"],
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#navbarNav",
                "aria-controls": "navbarNav",
                "aria-expanded": "false",
                "aria-label": "Toggle navigation",
              },
              [createElement("span", { class: "navbar-toggler-icon" })]
            ),
          ]),
        ]),
      ]
    );
  }
}
