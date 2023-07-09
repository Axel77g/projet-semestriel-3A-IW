import Component from "../../core/Component.js";

export default class Switch extends Component {
  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange({
        event: e,
        checked: Boolean(e.target.checked),
        name: this?.props?.name,
        type: this?.props?.type,
        id: this?.props?.id,
      });
    }
  }

  render() {
    return createElement("div", { class: ["form-check", "form-switch"] }, [
      createElement("input", {
        class: "form-check-input",
        type: "checkbox",
        role: "switch",
        id: this.props.name,
        ...(this.props.checked ? { checked: true } : {}),
        onclick: (e) => {
          this.handleChange(e);
        },
      }),
      createElement(
        "label",
        {
          class: "form-check-label",
          for: this.props.name,
        },
        this.props.label
      ),
    ]);
  }
}
