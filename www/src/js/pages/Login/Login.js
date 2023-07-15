import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";
import { createElement } from "../../core/Element.js";
import HomeHeader from "../../components/global/Header.js";
import Button from "../../components/ui/Button.js";

export default class Login extends Component {
  init() {
    this.state = {
      email: "",
      password: "",
      messages: {},
    };
    document.title = "Login";
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/login", this.state).then((response) => {
      if (response.success === true) {
        localStorage.setItem("authorization", response.token);
        router.push(response.role === "admin" ? "/admin" : "/");
      } else {
        this.setState({ messages: response.message });
      }
    });
  }
  handleChange(e) {
    this.setState(e);
  }
  render() {
    return createElement("div", {}, [
      createElement(HomeHeader, {}),

      createElement("main", { class: "box-wrapper" }, [
        createElement("h1", {}, "Login"),
        createElement("form", { onsubmit: this.handleSumbit.bind(this) }, [
          createElement(
            "div",
            {
              class: ["form-row"],
            },
            [
              createElement(Input, {
                name: "email",
                type: "email",
                id: "email",
                placeholder: "Email",
                onChange: (e) => {
                  this.handleChange({ email: e.value });
                },
                // onChange: this..bind(this),
                value: this.state.email,
                message: this.state.messages.email,
              }),
            ]
          ),

          createElement(Input, {
            name: "password",
            type: "password",
            id: "password",
            placeholder: "Password",
            onChange: (e) => {
              this.handleChange({ password: e.value });
            },
            value: this.state.password,
            message: this.state.messages.password,
          }),
          createElement(Button, {
            class: ["my-3"],
            children: "Connexion",
          }),
        ]),
        createElement("div", {}, [
          createElement(
            "a",
            { href: "/forgot-password", class: ["login-link"] },
            "Forgot password?"
          ),
        ]),
        createElement("div", {}, [
          createElement(
            "a",
            { href: "/register", class: ["login-link"] },
            "Don't have an account? Register here"
          ),
        ]),
      ]),
    ]);
  }
}
