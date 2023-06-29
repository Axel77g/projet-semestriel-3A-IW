import Component from "../../../core/Component.js";
import Input from "../../ui/Input.js";

export class Step1 extends Component {
  init() {}
  render() {
    return createElement(
      "div",
      {
        class: [this.props.currentStep == 1 ? "block" : "d-none", "container"],
      },
      [
        createElement(
          "h1",
          { class: ["mb-3", "text-center"] },
          "Database informations. Step 1/4"
        ),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_name_database",
            placeholder: "Database name",
            value: this.props.form.input_name_database,
            message: this.props.messages.input_name_database,
            onChange: (e) => {},
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_username_database",
            placeholder: "Username",
            value: this.props.form.input_username_database,
            message: this.props.messages.input_username_database,
            onChange: (e) => {},
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_password_database",
            placeholder: "Password",
            type: "password",
            value: this.props.form.input_password_database,
            message: this.props.messages.input_password_database,
            onChange: (e) => {},
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_host_database",
            placeholder: "Host",
            value: this.props.form.input_host_database,
            message: this.props.messages.input_host_database,
            onChange: (e) => {},
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_port_database",
            placeholder: "Port",
            value: this.props.form.input_port_database,
            message: this.props.messages.input_port_database,
            onChange: (e) => {},
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          new Input({
            name: "input_table_prefix_database",
            placeholder: "Table prefix",
            value: this.props.form.input_table_prefix_database,
            message: this.props.messages.input_table_prefix_database,
            onChange: (e) => {},
          }),
        ]),
      ]
    );
  }
}
