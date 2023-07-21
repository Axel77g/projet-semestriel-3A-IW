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

    document.title = "Mot de passe oublié ?";
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/forgot-password", this.state).then((response) => {
      if (response.success === true) {
        this.setState({ success: true });
      } else {
        this.setState({ messages: response.message });
      }
    });
  }

  handleChange(e) {
    this.state[e.name] = e.value;
  }

  render() {
    if (this.state.success === true) {
      return createElement(
        "div",
        { class: ["alert", "alert-success", "ma-5"] },
        [
          createElement("h1", { class: ["header"] }, "Email envoyé"),
          createElement(
            "p",
            {},
            "Merci de vérifier votre boîte mail pour réinitialiser votre mot de passe."
          ),
        ]
      );
    } else {
      return createElement("div", { class: "box-wrapper" }, [
        createElement("h1", { class: ["header"] }, "Mot de passe oublié ?"),
        createElement(
          "form",
          { class: ["login-form"], onsubmit: this.handleSumbit.bind(this) },
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
            createElement(Button, {
              class: ["my-3"],
              children: "Envoyer un email de réinitialisation",
              type: "submit",
            }),
          ]
        ),
      ]);
    }
  }
}
