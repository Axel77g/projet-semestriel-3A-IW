import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import { Link } from "../ui/Link.js";

export default class Footer extends Component {
  init() {
    this.state = {
      menus: [],
    };
    this.fetchMenus();
  }

  fetchMenus() {
    let api = new Api();
    api.get("api/menus?footer").then((response) => {
      this.setState({
        menus: response,
      });
    });
  }
  render() {
    return createElement("footer", {}, [
      createElement("div", {}, SITE_NAME + " © " + new Date().getFullYear()),
      createElement("nav", {}, [
        createElement(
          "ul",
          {},
          this.state.menus
            .filter((menu) => menu.parent_id == null)
            .map((menu) => {
              return createElement("li", {}, [
                createElement(Link, {
                  href: menu.url,
                  children: menu.title,
                }),
              ]);
            })
        ),
      ]),
    ]);
  }
}
