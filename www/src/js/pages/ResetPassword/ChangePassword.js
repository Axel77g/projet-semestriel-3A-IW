import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";
import Button from "../../components/ui/Button.js";

export default class ChangePassword extends Component {
  init() {
    this.state = {
      password: "",
      confirmPassword: "",
      messages: {},
    };

    document.title = "Change Password";
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api
      .post("api/update-password" + window.location.search, this.state)
      .then((response) => {
        if (response.success === true) {
          router.push("/login");
        } else {
          this.setState({ messages: JSON.parse(response.messages) });
        }
      });
  }
  handleChange(e) {
    this.state[e.name] = e.value;
  }
  render() {
    if (router.route.query.has("email") && router.route.query.has("code")) {
      return createElement("div", { class: "box-wrapper" }, [
        createElement("h1", { class: ["header"] }, "Change your password"),
        createElement(
          "form",
          { class: ["login-form"], onsubmit: this.handleSumbit },
          [
            createElement(Input, {
              name: "password",
              type: "password",
              id: "password",
              placeholder: "New Password",
              onChange: this.handleChange.bind(this),
              value: this.state.password,
              message: this.state.messages.password,
            }),
            createElement(Input, {
              name: "confirmPassword",
              type: "password",
              class: ["form-control"],
              id: "confirmPassword",
              placeholder: "Confirm Password",
              onChange: this.handleChange.bind(this),
              value: this.state.confirmPassword,
              message: this.state.messages.confirmPassword,
            }),
            createElement(Button, {
              class: ["mb-3"],
              children: "Change Password",
            }),
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
