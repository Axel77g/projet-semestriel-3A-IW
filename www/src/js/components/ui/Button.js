import Component from "../../core/Component.js";

export default class Button extends Component {
  init() {}

  get colorClass() {
    return "btn-" + this.props.color ?? "primary";
  }

  render() {
    return createElement(
      "button",
      {
        type: this.props.type ?? "button",
        class: ["btn", this.colorClass],
        onclick: (e) => this.props.onClick(e),
      },
      this.props.children
    );
  }
}
