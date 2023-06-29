import Component from "../../core/Component.js";

export default class Input extends Component {
  init() {
    this.state = {
      value: this.state.value ?? "",
    };
  }
  handleChange(e) {
    if (this.props.onChange)
      this.props.onChange({
        name: this.props.name,
        value: e.target.value,
        type: this.props.type,
        id: this.props.id,
        event: e,
      });

    this.setState({ value: e.target.value });
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
          value: this.state.value ?? "",
          onchange: this.handleChange.bind(this),
        },
        this.state.value ?? ""
      );
    } else {
      return createElement(
        "input",
        {
          type: this.props.type ?? "text",
          name: this.props.name,
          class: ["form-control"],
          id: this.props.name,
          placeholder: this.props.placeholder,
          value: this.state.value ?? "",
          onchange: this.handleChange.bind(this),
        },
        []
      );
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
      ]
    );
  }
}
