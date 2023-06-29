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
          "Site informations. Step 2/4"
        ),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_name_site",
            placeholder: "Site name",
            value: this.props.form.input_name_site,
            onChange: (e) => {
              this.props.setForm({ input_name_site: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_firstname_site",
            placeholder: "Firstname",
            value: this.props.form.input_firstname_site,
            onChange: (e) => {
              this.props.setForm({ input_firstname_site: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_lastname_site",
            placeholder: "Lastname",
            value: this.props.form.input_lastname_site,
            onChange: (e) => {
              this.props.setForm({ input_lastname_site: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_password_site",
            type: "password",
            placeholder: "Password",
            value: this.props.form.input_password_site,
            onChange: (e) => {
              this.props.setForm({ input_password_site: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_email_site",
            placeholder: "Email",
            value: this.props.form.input_email_site,
            onChange: (e) => {
              this.props.setForm({ input_email_site: e.value });
            },
          }),
        ]),
      ]
    );
  }
}
