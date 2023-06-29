import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";

export default class ChangePassword extends Component {
  init() {
    this.state = {
      password: "",
      confirmPassword: "",
    };
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api
      .post("api/update-password" + window.location.search, this.state)
      .then((response) => {
        if (response.success === true) {
          router.push("/login");
        }
      });
  }
  handleChange(e) {
    this.setState({ [e.name]: e.value });
  }
  render() {
    if (router.route.query.has("email") && router.route.query.has("code")) {
      return createElement("div", { class: ["login"] }, [
        createElement("h1", { class: ["header"] }, "Change your password"),
        createElement(
          "form",
          { class: ["login-form"], onsubmit: this.handleSumbit },
          [
            new Input({
              name: "password",
              type: "password",
              class: ["form-control"],
              id: "password",
              placeholder: "New Password",
              onChange: this.handleChange.bind(this),
              value: this.state.password,
            }),
            new Input({
              name: "confirmPassword",
              type: "password",
              class: ["form-control"],
              id: "confirmPassword",
              placeholder: "Confirm Password",
              onChange: this.handleChange.bind(this),
              value: this.state.confirmPassword,
            }),
            createElement(
              "button",
              { class: ["btn", "btn-primary", "login-button"] },
              "Change Password"
            ),
          ]
        ),
      ]);
    } else {
      return createElement("div", { class: ["alert", "alert-danger"] }, [
        createElement("h1", { class: ["header"] }, "Invalid Link"),
      ]);
    }
  }
}
