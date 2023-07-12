import Component from "../../core/Component.js";
import API from "../../core/Api.js";
import DomRenderer from "../../core/DomRenderer.js";

import { createElement } from "../../core/Element.js";

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
        input_port_database: 5432,
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
    this.setState({ form: { ...this.state.form, ...payload } });
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
      if (response.code === 500 && response.message== "Database connection error") {
        this.setState({ messages: { 
          input_host_database: ["Erreur de Connexion à la base de données"], 
          input_name_database: ["Erreur de Connexion à la base de données"], 
          input_port_database: ["Erreur de Connexion à la base de données"],
          input_password_database: ["Erreur de Connexion à la base de données"],
          input_username_database: ["Erreur de Connexion à la base de données"],
       }, currentStep: 1 });
       return
      }
      if (!response.success) {
        this.setState({ messages: response.message });
        this.redirectFromError();
      } else {
        api.post("api/login", {email: this.state.form.input_email_site, password: this.state.form.input_password_site}).then((response) => {
          if (response.success === true) {
            localStorage.setItem("authorization", response.token);
            window.location = (response.role === "admin" ? "/admin" : "/");
          }
        });
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
        createElement("form", {}, [
          createElement(Step0, {
            currentStep: this.state.currentStep,
            messages: this.state.messages,
          }),
          createElement(Step1, {
            currentStep: this.state.currentStep,
            form: this.state.form,
            setForm: this.setForm.bind(this),
            messages: this.state.messages,
          }),
          createElement(Step2, {
            currentStep: this.state.currentStep,
            form: this.state.form,
            setForm: this.setForm.bind(this),
            messages: this.state.messages,
          }),
          createElement(Step3, {
            currentStep: this.state.currentStep,
            form: this.state.form,
            setForm: this.setForm.bind(this),
            messages: this.state.messages,
          }),
          createElement(Step4, {
            currentStep: this.state.currentStep,
            messages: this.state.messages,
          }),

          createElement("div", { class: ["d-flex", "justify-content-end"] }, [
            createElement(Button, {
              class: ["mr-2"],
              onClick: this.previousStep.bind(this),
              children: "Previous",
            }),
            createElement(Button, {
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

export function startInstaller() {
  globalThis.createElement = createElement;
  let component = new Installer();
  DomRenderer.build(document.body, component);
}
