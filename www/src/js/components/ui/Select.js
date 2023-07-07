import Component from "../../core/Component.js";

export default class Select extends Component {
  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange({
        event: e,
        value: e.target.value,
        name: this.props?.name || null,
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
        createElement(
          "select",
          {
            onchange: this.handleChange.bind(this),
            class: ["form-select"],
          },
          [
            createElement(
              "option",
              { value: -1 },
              this.props?.placeholder || "Selectionner un élément"
            ),
            ...this.props?.options.map(({ value, label }) =>
              createElement("option", { value }, label)
            ),
          ]
        ),
      ]
    );
  }
}