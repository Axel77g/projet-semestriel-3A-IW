import Component from "../../../core/Component.js";

export class Step0 extends Component {
  render() {
    return createElement(
      "div",
      {
        class: [this.props.currentStep == 0 ? "block" : "d-none", "container"],
      },
      [
        createElement("h1", { class: ["mb-3", "text-center"] }, "Installer"),
        createElement(
          "h2",
          { class: ["mb-3", "text-center"] },
          "This the first step of the installation"
        ),
        createElement(
          "h3",
          { class: ["mb-3", "text-center"] },
          "Please fill the form below"
        ),
      ]
    );
  }
}
