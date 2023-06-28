import Component from "../../core/Component.js";

export default class Input extends Component {
  init() {}
  render() {
    return createElement("div", {}, [
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
          class: ["form-control"],
          id: this.props.name,
          placeholder: this.props.placeholder,
          value: this.props.value ?? "",
          onchange(e) {
            this.props.onChange({
              name: this.props.name,
              value: e.target.value,
              type: this.props.type,
              id: this.props.id,
              event: e,
            });
          },
        },
        []
      ),
    ]);
  }
}
