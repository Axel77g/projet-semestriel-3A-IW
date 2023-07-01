import Component from "../../core/Component.js";
import API from "../../core/Api.js";
import Renderer from "../../core/Renderer.js";
import Element from "../../core/Element.js";

import { Step0 } from "./forms/Step_0.js";
import { Step1 } from "./forms/Step_1.js";
import { Step2 } from "./forms/Step_2.js";
import { Step3 } from "./forms/Step_3.js";
import { Step4 } from "./forms/Step_4.js";
import Button from "../ui/Button.js";

export class Installer extends Component {
  init() {
    this.state = {
      form: {
        input_name_site: "",
        input_firstname_site: "",
        input_lastname_site: "",
        input_password_site: "",
        input_email_site: "",
        input_name_database: "",
        input_port_database: "",
        input_username_database: "",
        input_password_database: "",
        input_host_database: "",
        input_table_prefix_database: "",
        input_host_smtp: "",
        input_port_smtp: "",
        input_username_smtp: "",
        input_password_smtp: "",
      },
      messages: {},
      currentStep: 0,

      steps: [
        "Welcome",
        "Database informations",
        "Site informations",
        "Mail informations",
        "Finish",
      ],
    };
  }

  nextStep() {
    if (this.state.currentStep < this.state.steps.length - 1) {
      this.setState({ currentStep: this.state.currentStep + 1 });
    } else {
      this.submitForm();
    }
  }

  previousStep() {
    if (this.state.currentStep > 0) {
      this.setState({ currentStep: this.state.currentStep - 1 });
    }
  }

  setForm(payload) {
    this.state.form = { ...this.state.form, ...payload };
  }

  redirectFromError() {
    let stape = 4;
    for (let key in this.state.messages) {
      if (key.includes("_database")) {
        stape = 1;
      }
      if (key.includes("_site") && stape > 2) {
        stape = 2;
      }
      if (key.includes("_smtp") && stape > 3) {
        stape = 3;
      }
    }
    this.setState({ currentStep: stape });
  }

  submitForm() {
    const api = new API();
    api.post("api/install", this.state.form).then((response) => {
      if (!response.success) {
        this.setState({ messages: JSON.parse(response.messages) });
        this.redirectFromError();
      } else {
        window.location.href = "/";
      }
    });
  }

  render() {
    return createElement(
      "div",
      {
        class: [
          "container",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "min-vw-100",
          "min-vh-100",
        ],
      },
      [
        createElement(
          "div",
          {
            class: [
              "container",
              "d-flex",
              "flex-column",
              "w-50",
              "border",
              "rounded",
              "border-2",
              "p-5",
            ],
          },
          [
            createElement("form", {}, [
              new Step0({ currentStep: this.state.currentStep }),
              new Step1({
                currentStep: this.state.currentStep,
                form: this.state.form,
                setForm: this.setForm.bind(this),
                messages: this.state.messages,
              }),
              new Step2({
                currentStep: this.state.currentStep,
                form: this.state.form,
                setForm: this.setForm.bind(this),
                messages: this.state.messages,
              }),
              new Step3({
                currentStep: this.state.currentStep,
                form: this.state.form,
                setForm: this.setForm.bind(this),
                messages: this.state.messages,
              }),

              new Step4({ currentStep: this.state.currentStep }),

              createElement(
                "div",
                { class: ["d-flex", "justify-content-end"] },
                [
                  new Button({
                    class: ["mr-2"],
                    onClick: this.previousStep.bind(this),
                    children: "Previous",
                  }),
                  new Button({
                    onClick: this.nextStep.bind(this),
                    children:
                      this.state.currentStep < this.state.steps.length - 1
                        ? "Next"
                        : "Finish",
                  }),
                ]
              ),
            ]),
          ]
        ),
      ]
    );
  }
}

function createElement(tag, attributes, children) {
  return new Element(tag, attributes, children);
}
globalThis.createElement = createElement;

let component = new Installer();
Renderer.execute(component, document.body);
