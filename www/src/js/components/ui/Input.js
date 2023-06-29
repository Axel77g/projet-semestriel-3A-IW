import Component from "../../core/Component.js";

export default class Input extends Component {
  init() {}
  render() {
    return createElement("div", { class: ["has-validation"] }, [
      createElement(
        "label",
        { for: this.props.name, class: ["form-label"] },
        this.props.placeholder
      ),
      createElement(
        "input",
        {
          type: this.props.type ?? "text",
          name: this.props.name,
          class: [
            "form-control",
            // this.props.message ? "is-invalid" : "s-valid",
          ],
          id: this.props.name,
          placeholder: this.props.placeholder,
          value: this.state.value ?? "",
          onchange: this.handleChange.bind(this),
        },
        []
      ),

      createElement(
        "div",
        { class: ["text-danger", "fs-6"] },
        this.props.message ? this.props.message[0] : ""
      ),
    ]);
  }
}
