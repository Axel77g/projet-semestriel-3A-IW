import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";

export default class Login extends Component {
  init() {
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/login", this.state).then((response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        router.push("/");
      }
    });
  }
  handleChange(e) {
    this.state[e.name] = e.value;
  }
  render() {
    return createElement("div", {}, [
      createElement("h1", {}, "Login"),
      createElement("form", { onsubmit: this.handleSumbit }, [
        new Input({
          name: "email",
          type: "email",
          id: "email",
          placeholder: "Email",
          onChange: this.handleChange.bind(this),
          value: this.state.email,
        }),
        new Input({
          name: "password",
          type: "password",
          id: "password",
          placeholder: "Password",
          onChange: this.handleChange.bind(this),
          value: this.state.password,
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
