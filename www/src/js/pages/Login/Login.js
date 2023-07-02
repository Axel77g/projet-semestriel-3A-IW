import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";

export default class Login extends Component {
  init() {
    this.state = {
      email: "",
      password: "",
      messages: {},
    };
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/login", this.state).then((response) => {
      if (response.success === true) {
        localStorage.setItem("authorization", response.token);
        router.push("/");
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
      createElement("h1", {}, "Login"),
      createElement("form", { onsubmit: this.handleSumbit.bind(this) }, [
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
        createElement(
          "button",
          { class: ["btn", "btn-primary", "login-button"] },
          "Login"
        ),
      ]),
      createElement(
        "a",
        { href: "/forgot-password", class: ["login-link"] },
        "Forgot password?"
      ),
      createElement(
        "a",
        { href: "/register", class: ["login-link"] },
        "Don't have an account? Register here"
      ),
    ]);
  }
}
