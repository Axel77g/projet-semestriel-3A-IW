import { Link } from "../../components/ui/Link.js";
import { htmlDecode } from "../../utils/text_decode.js";
// Components
import Component from "../../core/Component.js";

export default class Menu extends Component {
  init() {
    this.state = {
      menu: this.props.menu,
    };
  }

  render() {
    if (this.props.menuChildren && this.props.menuChildren.length > 0) {
      return createElement("li", { class: ["nav-item", "dropdown"] }, [
        createElement(
          "a",
          {
            id: "menu-item-dropdown-" + this.key,
            class: ["nav-link", "dropdown-toggle"],
            role: "button",
            href: "#",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
          },
          htmlDecode(this.state.menu.title)
        ),
        createElement(
          "div",
          {
            class: ["dropdown-menu"],
            "aria-labelledby": "menu-item-dropdown-" + this.key,
          },
          this.props.menuChildren.map((menu) => {
            return createElement(
              "a",
              {
                class: ["dropdown-item"],
                onclick: (e) => {
                  e.preventDefault();
                  router.push(menu.url);
                },
              },
              htmlDecode(menu.title)
            );
          })
        ),
      ]);
    }

    return createElement("li", { class: ["nav-item"] }, [
      createElement(Link, {
        class: ["nav-link"],
        href: this.state.menu.url,
        children: htmlDecode(this.state.menu.title),
      }),
    ]);
  }
}
