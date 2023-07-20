import Component from "../../../core/Component.js";
import Input from "../../ui/Input.js";

export class Step2 extends Component {
  get values() {
    let res = {};
    this.children.forEach((child) => {
      if (child instanceof Input) {
        res[child.props.name] = child.state.value;
      }
    });
    return res;
  }
  render() {
    return createElement(
      "div",
      {
        class: [this.props.currentStep == 2 ? "block" : "d-none", "container"],
      },
      [
        createElement(
          "h1",
          { class: ["mb-3", "text-center"] },
          "Informations du site. Etape 2/4"
        ),
        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_name_site",
            name: "input_name_site",
            placeholder: "Nom du site",
            value: this.props.form.input_name_site,
            message: this.props.messages.input_name_site,
            onChange: (e) => {
              this.props.setForm({ input_name_site: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_firstname_site",
            name: "input_firstname_site",
            placeholder: "Prénom",
            value: this.props.form.input_firstname_site,
            message: this.props.messages.input_firstname_site,
            onChange: (e) => {
              this.props.setForm({ input_firstname_site: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_lastname_site",
            name: "input_lastname_site",
            placeholder: "Nom",
            value: this.props.form.input_lastname_site,
            message: this.props.messages.input_lastname_site,
            onChange: (e) => {
              this.props.setForm({ input_lastname_site: e.value });
            },
          }),
        ]),

        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_email_site",
            name: "input_email_site",
            placeholder: "Email",
            value: this.props.form.input_email_site,
            message: this.props.messages.input_email_site,
            onChange: (e) => {
              this.props.setForm({ input_email_site: e.value });
            },
          }),
        ]),

        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_password_site",
            name: "input_password_site",
            type: "password",
            placeholder: "Mot de passe",
            value: this.props.form.input_password_site,
            message: this.props.messages.input_password_site,
            onChange: (e) => {
              this.props.setForm({ input_password_site: e.value });
            },
          }),
        ]),
      ]
    );
  }
}
