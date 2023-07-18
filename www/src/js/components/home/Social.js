import Component from "../../core/Component.js";
import Button from "../ui/Button.js";
import FilePicker from "../ui/FilePicker.js";
import Input from "../ui/Input.js";

export default class Social extends Component {
  get social() {
    return this.props?.social;
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
        createElement(FilePicker, {
          name: "file_icon",
          placeholder: "Icon réseau du social",
          value: this.social?.file_icon,
          onChange: (value) => {
            this.handleChange({ value, name: "file_icon" });
          },
        }),
      ]),
      createElement(Input, {
        name: "url",
        placeholder: "URL réseau du profil social",
        value: this.social?.url,
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
