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

  static async addLibraries() {
    await Promise.all([WYSIWYG.addScript(), WYSIWYG.addStyle()]);
  }

  static addScript() {
    return new Promise((resolve, reject) => {
      let exist = document.head.querySelector(
        "script[src='https://cdn.quilljs.com/1.1.9/quill.js']"
      );

      if (!exist) {
        let script = document.createElement("script");
        script.src = "https://cdn.quilljs.com/1.1.9/quill.js";
        document.head.appendChild(script);
        script.onload = () => {
          console.log("[WYSIWYG] Quill loaded JS");
          resolve();
        };
      } else {
        resolve();
      }
    });
  }

  static addStyle() {
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
          console.log("[WYSIWYG] Quill loaded Style");
          resolve();
        };
      } else resolve();
    });
  }

  async onUpdate() {
    await WYSIWYG.addLibraries();
    this.onRerender();
  }

  onRerender() {
    const container = document.querySelector("#editor-container-" + this.key);
    if (!container || typeof Quill == "undefined") return; //wait for the container to be created
    this.quill = new Quill(container.querySelector("#editor-" + this.key), {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline"], // toggled buttons
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ direction: "rtl" }], // text direction

          ["clean"],
        ],
      },
      placeholder: this.props.placeholder || "Écrivez ici...",
      theme: "snow",
    });

    let toolbars = container.querySelectorAll(".ql-toolbar");
    if (toolbars.length > 1) {
      toolbars[0].remove();
    }

    this.quill.root.innerHTML = this.state.value;

    this.quill.on("text-change", () => {
      if (this.state.value !== this.quill.root.innerHTML) {
        this.state.value = this.quill.root.innerHTML;
        if (this.props.onChange)
          this.props.onChange({ value: this.state.value });
        if (this.props.name) {
          this.$parent.state[this.props.name] = this.state.value;
        }
      }
    });
  }

  render() {
    return createElement("div", { id: "editor-container-" + this.key }, [
      createElement("label", { class: ["form-label"] }, this.props.placeholder),
      createElement("div", {
        id: "editor-" + this.key,
      }),
    ]);
  }
}
