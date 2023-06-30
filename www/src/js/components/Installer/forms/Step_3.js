import Component from "../../../core/Component.js";
import Input from "../../ui/Input.js";

export class Step3 extends Component {
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
        class: [this.props.currentStep == 3 ? "block" : "d-none", "container"],
      },
      [
        createElement(
          "h1",
          { class: ["mb-3", "text-center"] },
          "Mailer informations. Step 3/4"
        ),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_host_smtp",
            placeholder: "SMTP Host",
            value: this.props.form.input_host_smtp,
            message: this.props.messages.input_host_smtp,
            onChange: (e) => {
              this.props.setForm({ input_host_smtp: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_port_smtp",
            placeholder: "SMTP Port",
            value: this.props.form.input_port_smtp,
            message: this.props.messages.input_port_smtp,
            onChange: (e) => {
              this.props.setForm({ input_port_smtp: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_username_smtp",
            placeholder: "SMTP Username",
            value: this.props.form.input_username_smtp,
            message: this.props.messages.input_username_smtp,
            onChange: (e) => {
              this.props.setForm({ input_username_smtp: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_password_smtp",
            type: "password",
            placeholder: "SMTP Password",
            value: this.props.form.input_password_smtp,
            message: this.props.messages.input_password_smtp,
            onChange: (e) => {
              this.props.setForm({ input_password_smtp: e.value });
            },
          }),
        ]),
      ]
    );
  }
}
