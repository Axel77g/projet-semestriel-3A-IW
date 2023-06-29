import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";

export default class ForgotPassword extends Component {
  init() {
    this.state = {
      success: false,
      email: "",
    };
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/forgot-password", this.state).then((response) => {
      if (response.success === true) {
        this.setState({ success: true });
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.name]: e.value });
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
      return createElement("div", { class: ["login"] }, [
        createElement("h1", { class: ["header"] }, "Forgot Password ?"),
        createElement(
          "form",
          { class: ["login-form"], onsubmit: this.handleSumbit },
          [
            new Input({
              name: "email",
              type: "email",
              class: ["form-control"],
              id: "email",
              placeholder: "Email",
              onChange: this.handleChange.bind(this),
              value: this.state.email,
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
