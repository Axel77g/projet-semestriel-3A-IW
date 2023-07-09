import Api from "../../core/Api.js";
import Component from "../../core/Component.js";

export default class FilePicker extends Component {
  init() {
    this.state = {
      file: null,
      value: this?.props?.value || null,
    };
  }

  deleteFile() {
    this.state.value = null;
  }

  async uploadFile(file) {
    /** upload to the API */

    let api = new Api();

    let bodyContent = new FormData();
    bodyContent.append("test", file);

    let response = await api.post("api/upload", bodyContent);

    if (response) {
      this.setState({ value: response });
    }
    //api.post("api/upload", formData);
  }

  handleChange(e) {
    this.uploadFile(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return createElement("div", { class: ["input-group", "mb-3"] }, [
      createElement("div", { class: ["input-group-prepend"] }, [
        createElement("span", { class: ["input-group-text"] }, "Téléverser"),
      ]),
      createElement("div", { class: ["custom-file"] }, [
        createElement("input", {
          type: "file",
          class: ["custom-file-input"],
          id: this.props.id,
          onchange: this.handleChange.bind(this),
        }),
        createElement(
          "label",
          { class: ["custom-file-label"], for: this.props.id },
          this.state.value
            ? this.state.file.name
            : this.props.placeholder || "Choisir un fichier"
        ),
      ]),
    ]);
  }
}
