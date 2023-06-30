import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";

export default class ForgotPassword extends Component {
  init() {
    this.state = {
      success: false,
      email: "",
      messages: {},
    };
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
      return createElement("div", {}, [
        createElement("h1", { class: ["header"] }, "Forgot Password ?"),
        createElement(
          "form",
          { class: ["login-form"], onsubmit: this.handleSumbit },
          [
            new Input({
              name: "email",
              type: "email",
              id: "email",
              placeholder: "Email",
              onChange: this.handleChange.bind(this),
              value: this.state.email,
              message: this.state.messages.email,
            }),
            createElement(
              "button",
              { class: ["btn", "btn-primary", "login-button"] },
              "Send Email"
            ),
          ]
        ),
      ]);
    }
  }
}
