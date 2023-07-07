import Api from "../../core/Api.js";
import Component from "../../core/Component.js";

export default class FilePicker extends Component {
  init() {
    this.state = {
      value: null,
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
    console.log(response);
    //api.post("api/upload", formData);
  }

  handleChange(e) {
    console.log("change in file picker", e);
    this.uploadFile(e.target.files[0]);
    this.setState({ value: e.target.files[0] });
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
            ? this.state.value.name
            : this.props.placeholder || "Choisir un fichier"
        ),
      ]),
    ]);
  }
}
