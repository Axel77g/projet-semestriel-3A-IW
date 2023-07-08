import Api from "../../core/Api.js";

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
            class: ["nav-link", "dropdown-toggle"],
            href: "#",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false",
          },
          this.state.menu.title
        ),
        createElement(
          "div",
          {
            class: ["dropdown-menu"],
            "aria-labelledby": "navbarDropdown",
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
              menu.title
            );
          })
        ),
      ]);
    }

    return createElement("li", { class: ["nav-item"] }, [
      createElement(
        "a",
        {
          class: ["dropdown-item"],
          onclick: (e) => {
            e.preventDefault();
            router.push(this.state.menu.url);
          },
        },
        this.state.menu.title
      ),
    ]);
  }
}
