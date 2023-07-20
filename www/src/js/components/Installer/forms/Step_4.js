import Component from "../../../core/Component.js";

export class Step4 extends Component {
  render() {
    return createElement(
      "div",
      {
        class: [this.props.currentStep == 4 ? "block" : "d-none", "container"],
      },
      [
        createElement(
          "h1",
          { class: ["mb-3", "text-center"] },
          "Merci d'avoir installé notre CMS ! Etape 4/4"
        ),
      ]
    );
  }
}
