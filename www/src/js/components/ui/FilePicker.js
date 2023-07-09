import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import Button from "./Button.js";

export default class FilePicker extends Component {
  init() {
    this.state = {
      file: null,
    };
  }

  async deleteFile() {
    if (!this.props.value?.id) throw new Error("No file to delete");

    const api = new Api();

    const response = await api.delete("api/upload/" + this.props.value.id);
    if (response) {
      this.state = { file: null };
      if (this.props.onDelete) this.props.onDelete();
      if (this.props.onChange) this.props.onChange(null);
    } else {
      alert("Une erreur est survenue lors de la suppression du fichier");
    }
  }

  async uploadFile(file) {
    /** upload to the API */

    let api = new Api();

    let bodyContent = new FormData();
    bodyContent.append("file", file);

    let response = await api.post("api/upload", bodyContent);

    if (response) {
      if (this.props.onChange) this.props.onChange(response[0]);
    }
    //api.post("api/upload", formData);
  }

  handleChange(e) {
    this.uploadFile(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return createElement("div", { class: ["input-group", "mb-3"] }, [
      createElement("div", {}, [
        createElement(
          "label",
          { class: ["form-label", "d-block"], for: this.props.id },

          this.props.placeholder || "Choisir un fichier"
        ),
        !this.props.value?.id &&
          createElement("input", {
            type: "file",
            class: ["form-control"],
            accept: this.props?.accept || "",
            id: this.props.id,
            onchange: this.handleChange.bind(this),
          }),
        this.props.value?.id &&
          createElement("div", { class: ["input-group"] }, [
            createElement("input", {
              type: "text",
              class: ["form-control"],
              value: this.props.value?.name || "",
              disabled: true,
            }),

            createElement(Button, {
              class: ["btn-danger"],
              onClick: this.deleteFile.bind(this),
              children: [createElement("i", { class: ["bi", "bi-trash"] })],
            }),
          ]),
      ]),
    ]);
  }
}
