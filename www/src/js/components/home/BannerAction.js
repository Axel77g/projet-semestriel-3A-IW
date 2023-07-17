import Component from "../../core/Component.js";
import Button from "../ui/Button.js";
import Input from "../ui/Input.js";

export default class HomeAction extends Component {
  get action() {
    return this.props?.action;
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
  handleDelete() {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  render() {
    return createElement("div", { class: "form-row" }, [
      createElement("div", {}, [
        createElement(Input, {
          name: "label",
          placeholder: "Label action",
          value: this.action?.label,
          onChange: this.handleChange.bind(this),
        }),
      ]),
      createElement(Input, {
        name: "url",
        placeholder: "URL action",
        value: this.action?.url,
        onChange: this.handleChange.bind(this),
      }),
      createElement(Button, {
        class: ["btn-danger", "align-self-end"],
        children: [createElement("i", { class: ["bi", "bi-trash"] })],
        onClick: this.handleDelete.bind(this),
      }),
    ]);
  }
}
