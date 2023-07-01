import Component from "../../../core/Component.js";
import Input from "../../ui/Input.js";

export class Step1 extends Component {
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
        class: [this.props.currentStep == 1 ? "block" : "d-none", "container"],
      },
      [
        createElement(
          "h1",
          { class: ["mb-3", "text-center"] },
          "Database informations. Step 1/4"
        ),

        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_name_database",
            name: "input_name_database",
            placeholder: "Database name",
            value: this.props.form.input_name_database,
            onChange: (e) => {
              this.props.setForm({ input_name_database: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_username_database",
            name: "input_username_database",
            placeholder: "Username",
            value: this.props.form.input_username_database,
            onChange: (e) => {
              this.props.setForm({ input_username_database: e.value });
            },
          }),
        ]),

        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_password_database",
            name: "input_password_database",
            placeholder: "Password",
            type: "password",
            value: this.props.form.input_password_database,
            onChange: (e) => {
              this.props.setForm({ input_password_database: e.value });
            },
          }),
        ]),

        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_host_database",
            name: "input_host_database",
            placeholder: "Host",
            value: this.props.form.input_host_database,
            onChange: (e) => {
              this.props.setForm({ input_host_database: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_port_database",
            name: "input_port_database",
            placeholder: "Port",
            value: this.props.form.input_port_database,
            onChange: (e) => {
              this.props.setForm({ input_port_database: e.value });
            },
          }),
        ]),
        createElement("div", { class: ["mb-3"] }, [
          createElement(Input, {
            key: "input_table_prefix_database",
            name: "input_table_prefix_database",
            placeholder: "Table prefix",
            value: this.props.form.input_table_prefix_database,
            onChange: (e) => {
              this.props.setForm({ input_table_prefix_database: e.value });
            },
          }),
        ]),
      ]
    );
  }
}
