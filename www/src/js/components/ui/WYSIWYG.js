import Component from "../../core/Component.js";

export default class WYSIWYG extends Component {
  init() {
    this.state = {
      value: this.state.value ?? "",
    };
  }
  handleChange(e) {
    this.props.onChange({
      name: this.props.name,
      value: e.target.value,
      type: this.props.type,
      id: this.props.id,
      event: e,
    });
  }

  onUpdate() {
    const container = this.elements.domElement;
    let quill = new Quill(container.querySelector("#editor"), {
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["link", "image"],
        ],
      },
      placeholder: this.props.placeholder || "Écrivez ici...",
      theme: "snow",
    });

    quill.root.innerHTML = this.state.value;

    quill.on("text-change", () => {
      this.state.value = quill.root.innerHTML;
    });
  }

  render() {
    return createElement("div", {}, [
      createElement("div", { id: "toolbar" }, []),
      createElement(
        "div",
        {
          id: "editor",
        },
        []
      ),
    ]);
  }
}
