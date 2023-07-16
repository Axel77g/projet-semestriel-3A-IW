import Component from "../../core/Component.js";

export default class BannerAction extends Component {
  render() {
    let action = this.props.actions.map((action) => {
      return createElement(
        "a",
        {
          class: ["btn", "btn-primary", "me-2"],
          href: action.url,
        },
        action.label
      );
    });

    return createElement(
      "div",
      {
        class: ["d-flex", "flex-row", "justify-content-start", "mt-3"],
      },
      action
    );
  }
}
