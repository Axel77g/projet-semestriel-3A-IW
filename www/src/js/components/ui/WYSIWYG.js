import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class WYSIWYG extends Component {
  init() {
    this.state = {
      value: this.state.value ?? this.props.value ?? "",
    };
    this.onUpdate();
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

  async addLibraries() {
    await Promise.all([this.addScript(), this.addStyle()]);
  }

  addScript() {
    return new Promise((resolve, reject) => {
      let exist = document.head.querySelector(
        "script[src='https://cdn.quilljs.com/1.1.9/quill.js']"
      );

      if (!exist) {
        let script = document.createElement("script");
        script.src = "https://cdn.quilljs.com/1.1.9/quill.js";
        document.head.appendChild(script);
        script.onload = () => {
          console.log("loaded script");
          resolve();
        };
      } else {
        resolve();
      }
    });
  }

  addStyle() {
    return new Promise((resolve, reject) => {
      let exist = document.head.querySelector(
        "link[href='https://cdn.quilljs.com/1.1.9/quill.snow.css']"
      );
      if (!exist) {
        let link = document.createElement("link");
        link.href = "https://cdn.quilljs.com/1.1.9/quill.snow.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        link.onload = () => {
          console.log("loaded style");
          resolve();
        };
      } else resolve();
    });
  }

  async onUpdate() {
    await this.addLibraries();
    this.onRerender();
  }

  onRerender() {
    const container = document.querySelector("#editor-container");
    this.quill = new Quill(container.querySelector("#editor"), {
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["link", "image"],
        ],
      },
      placeholder: this.props.placeholder || "Écrivez ici...",
      theme: "snow",
    });

    this.quill.root.innerHTML = this.state.value;

    this.quill.on("text-change", () => {
      if (this.state.value !== this.quill.root.innerHTML) {
        this.state.value = this.quill.root.innerHTML;
        if (this.props.name) {
          this.$parent.state[this.props.name] = this.state.value;
        }
      }
    });
  }

  render() {
    return createElement("div", { id: "editor-container" }, [
      createElement("label", {}, this.props.placeholder),
      createElement(
        "div",
        {
          id: "editor",
        },
        [createElement("div", { id: "toolbar" }, [])]
      ),
    ]);
  }
}
