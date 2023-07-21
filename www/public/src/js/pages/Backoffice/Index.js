import { Link } from "../../components/ui/Link.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import authMixin from "../../mixins/authMixin.js";
import { AUTH_STATE } from "../../utils/auth.js";

export default class BackofficeContainer extends Component {
  get mixins() {
    return [authMixin];
  }
  init() {
    this.state = {
      navigation: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: "speedometer2",
        },
        {
          title: "Aller sur le site",
          url: "/",
          icon: "box-arrow-up-right",
        },
        {
          title: "Content",
          items: [
            {
              title: "Pages",
              url: "/admin/pages",
              icon: "file-earmark",
            },
            {
              title: "Menus",
              url: "/admin/menus",
              icon: "list",
            },
          ],
        },
        {
          title: "Modération",
          items: [
            {
              title: "Commentaire",
              url: "/admin/comments",
              icon: "chat",
            },
          ],
        },
        {
          title: "Settings",
          items: [
            {
              title: "Users",
              url: "/admin/users",
              icon: "people",
            },
            {
              title: "Profil",
              url: "/profil",
              icon: "person",
            },
            {
              title: "Logout",
              url: "/logout",
              icon: "arrow-return-left",
            },
          ],
        },
      ],
    };
  }

  render() {
    if (this.state.isAuth != AUTH_STATE.AUTH)
      return createElement("div", {}, "");
    if (this.state.user.role != "admin") return createElement("div", {}, "");

    return createElement("div", { class: ["backoffice"] }, [
      createElement("aside", { class: ["sidebar-panel"] }, [
        createElement("h1", { class: ["sidebar-title", "mb-4"] }, "Backoffice"),
        createElement("nav", { class: ["sidebar-navigation"] }, [
          createElement(
            "ul",
            {},

            this.state.navigation.map((menu) => {
              if (menu?.items) {
                return createElement("li", { class: ["has-children"] }, [
                  createElement("h3", {}, menu.title),
                  createElement(
                    "ul",
                    {},
                    menu.items.map((item) => {
                      return createElement("li", {}, [
                        createElement(Link, {
                          href: item.url,
                          children: [
                            createElement("i", { class: ["bi-" + item.icon] }),
                            createElement("span", {}, item.title),
                          ],
                        }),
                      ]);
                    })
                  ),
                ]);
              } else {
                return createElement("li", {}, [
                  createElement(Link, {
                    href: menu.url,
                    children: [
                      createElement("i", { class: ["bi-" + menu.icon] }),
                      createElement("span", {}, menu.title),
                    ],
                  }),
                ]);
              }
            })
          ),
        ]),
      ]),
      createElement(
        "main",
        { class: ["main-panel"] },
        Array.isArray(this.props.child) ? this.props.child : [this.props.child]
      ),
    ]);
  }
}
