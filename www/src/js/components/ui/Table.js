import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import Button from "./Button.js";

export class Table extends Component {
  init() {
    /**
     * @type {{
     * items: Array,
     * headers: Array,
     * templates: Object
     * }}
     *
     */
    this.props = {
      items: this.props?.items ?? [],
      headers: this.props?.headers ?? [],
      templates: this.props?.templates ?? {},
      itemActions: this.props?.itemActions ?? [],
    };
  }

  getTDElement(header, item) {
    let template = this.props.templates[header.toLowerCase()];
    let element =
      typeof template == "function"
        ? template(item)
        : createElement("span", {}, item[header.toLowerCase()]);

    return createElement("td", {}, [element]);
  }

  setItemActionsBtns() {
    if (this.props.itemActions.length > 0) {
      this.props.headers.push({
        label: "Actions",
        key: "actions",
      });
      this.props.templates["actions"] = (item) => {
        return createElement(
          "div",
          { class: ["btn-group"] },
          this.props.itemActions.map((action) => {
            return createElement(Button, {
              onClick: (e) => {
                e.preventDefault();
                action.onClick(item);
              },
              children: action.label,
              ...(action?.props ?? {}),
            });
          })
        );
      };
    }
  }

  render() {
    this.setItemActionsBtns();

    return createElement(
      "table",
      {
        class: ["table", "table-striped", "table-hover", "mt-4"],
      },
      [
        //thead
        createElement("thead", {}, [
          createElement(
            "tr",
            {},
            this.props.headers.map((header) =>
              createElement("th", {}, header.label)
            )
          ),
        ]),
        //tbody
        createElement(
          "tbody",
          {},
          this?.props?.items?.length > 0
            ? this.props.items.map((item) => {
                return createElement(
                  "tr",
                  {},
                  this.props.headers.map((header) =>
                    this.getTDElement(header.key, item)
                  )
                );
              })
            : [
                createElement("tr", {}, [
                  createElement(
                    "td",
                    {
                      colspan: this.props.headers.length,
                      class: ["text-center"],
                    },
                    "Aucun élément"
                  ),
                ]),
              ]
        ),
      ]
    );
  }
}
