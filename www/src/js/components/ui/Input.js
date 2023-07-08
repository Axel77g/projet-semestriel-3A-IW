import Component from "../../core/Component.js";

export default class Input extends Component {
  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange({
        event: e,
        value: e.target.value,
        name: this?.props?.name,
        type: this?.props?.type,
        id: this?.props?.id,
      });
    }
  }

  get input() {
    if (this.props.type === "textarea") {
      return createElement(
        "textarea",
        {
          name: this.props.name,
          class: ["form-control"],
          id: this.props.name,
          placeholder: this.props.placeholder,
          value: this.props.value ?? "",
          onchange: this.handleChange.bind(this),
        },
        this.state.value ?? ""
      );
    } else {
      return createElement("input", {
        type: this.props.type ?? "text",
        name: this.props.name,
        class: ["form-control"],
        id: this.props.name,
        placeholder: this.props.placeholder,
        value: this.props.value ?? "",
        onchange: this.handleChange.bind(this),
      });
    }
  }

  render() {
    return createElement(
      "div",
      {
        class: ["form-group"],
      },
      [
        createElement(
          "label",
          {
            for: this.props.name,
            class: ["form-label"],
          },
          this.props.placeholder
        ),
        this.input,
        createElement(
          "div",
          { class: ["text-danger", "fs-6"] },
          this.props.message ? this.props.message[0] : ""
        ),
      ]
    );
  }
}
