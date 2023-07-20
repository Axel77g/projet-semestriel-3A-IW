import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class Alert extends Component {
  init() {
    this.state = {
      display: true,
    };
    setTimeout(() => {
      this.setState({ display: false });
    }, 5000);
  }

  render() {
    if (!this.state.display) return createElement("div", {}, "");
    return createElement(
      "div",
      { class: ["global-alert", "alert", "alert-" + this.props.type] },
      this.props.message
    );
  }
}
