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

  async addLibraries() {
    await this.addScript();
    await this.addStyle();
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
