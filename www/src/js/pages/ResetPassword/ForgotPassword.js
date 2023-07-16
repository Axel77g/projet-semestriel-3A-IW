import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";
import Button from "../../components/ui/Button.js";

export default class ForgotPassword extends Component {
  init() {
    this.state = {
      success: false,
      email: "",
      messages: {},
    };

    document.title = "Forgot Password";
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/forgot-password", this.state).then((response) => {
      if (response.success === true) {
        this.setState({ success: true });
      } else {
        this.setState({ messages: JSON.parse(response.messages) });
      }
    });
  }

  handleChange(e) {
    this.state[e.name] = e.value;
  }

  render() {
    if (this.state.success === true) {
      return createElement("div", { class: ["alert", "alert-success"] }, [
        createElement("h1", { class: ["header"] }, "Email Sent"),
        createElement(
          "p",
          {},
          "Please check your email for a link to reset your password."
        ),
      ]);
    } else {
      return createElement("div", { class: "box-wrapper" }, [
        createElement("h1", { class: ["header"] }, "Forgot Password ?"),
        createElement(
          "form",
          { class: ["login-form"], onsubmit: this.handleSumbit },
          [
            createElement(Input, {
              name: "email",
              type: "email",
              id: "email",
              placeholder: "Email",
              onChange: this.handleChange.bind(this),
              value: this.state.email,
              message: this.state.messages.email,
            }),
            createElement(Button, { class: ["my-3"], children: "Send Email" }),
          ]
        ),
      ]);
    }
  }
}
