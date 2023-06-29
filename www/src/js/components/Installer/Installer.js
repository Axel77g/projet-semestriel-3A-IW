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
      messages: {
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
      currentStep: 0,

      steps: [
        "Welcome",
        "Database informations",
        "Site informations",
        "Mail informations",
        "Finish",
      ],
    };

    this.validators = {
      input_name_site: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      input_firstname_site: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      input_lastname_site: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      input_password_site: {
        required: true,
        minLength: 8,
        maxLength: 20,
      },
      input_email_site: {
        required: true,
        minLength: 6,
        maxLength: 320,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message:
          "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.'",
      },
      input_name_database: {
        required: true,
        minLength: 1,
        maxLength: 64,
      },

      input_port_database: {
        required: true,
        regex: /^[0-9]{1,10}$/,
      },
      input_username_database: {
        required: true,
        minLength: 1,
        maxLength: 64,
      },
      input_password_database: {
        required: true,
        minLength: 1,
        maxLength: 255,
      },
      input_host_database: {
        required: true,
        minLength: 1,
        maxLength: 64,
      },
      input_table_prefix_database: {
        required: true,
        minLength: 1,
        maxLength: 10,
      },
      input_host_smtp: {
        required: true,
        minLength: 1,
        maxLength: 64,
      },
      input_port_smtp: {
        required: true,
        regex: /^[0-9]{1,10}$/,
      },
      input_username_smtp: {
        required: true,
        minLength: 1,
        maxLength: 64,
        message:
          "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.'",
      },
      input_password_smtp: {
        required: true,
        minLength: 1,
        maxLength: 255,
      },
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

  submitForm() {
    const api = new API();
    api.post("api/install", this.state.form).then((response) => {
      this.setState({ messages: response.data.messages });
    });
  }

  render() {
    return createElement(
      "div",
      { class: ["container", "d-flex", "flex-column", "w-50"] },
      [
        createElement("form", {}, [
          new Step0({ currentStep: this.state.currentStep }),
          new Step1({
            currentStep: this.state.currentStep,
            form: this.state.form,
            setForm: this.setForm.bind(this),
          }),
          new Step2({
            currentStep: this.state.currentStep,
            form: this.state.form,
            setForm: this.setForm.bind(this),
          }),
          new Step3({
            currentStep: this.state.currentStep,
            form: this.state.form,
            setForm: this.setForm.bind(this),
          }),

          new Step4({ currentStep: this.state.currentStep }),

          createElement("div", { class: ["d-flex", "justify-content-end"] }, [
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
          ]),
        ]),
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