import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";

export default class Register extends Component {
  init() {
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/register", this.state).then((response) => {
      if (response.id) {
        router.push("/login");
      }
    });
  }
  handleChange(e) {
    this.setState({ [e.name]: e.value });
  }
  render() {
    return createElement("div", { class: ["login"] }, [
      createElement("h1", { class: ["header"] }, "Register"),
      createElement(
        "form",
        { class: ["login-form"], onsubmit: this.handleSumbit },
        [
          new Input({
            name: "firstname",
            type: "text",
            class: ["form-control"],
            id: "firstname",
            placeholder: "Firstname",
            onChange: this.handleChange.bind(this),
            value: this.state.firstname,
          }),
          new Input({
            name: "lastname",
            type: "text",
            class: ["form-control"],
            id: "lastname",
            placeholder: "Lastname",
            onChange: this.handleChange.bind(this),
            value: this.state.lastname,
          }),
          new Input({
            name: "email",
            type: "email",
            class: ["form-control"],
            id: "email",
            placeholder: "Email",
            onChange: this.handleChange.bind(this),
            value: this.state.email,
          }),
          new Input({
            name: "password",
            type: "password",
            class: ["form-control"],
            id: "password",
            placeholder: "Password",
            onChange: this.handleChange.bind(this),
            value: this.state.password,
          }),
          createElement(
            "button",
            { class: ["btn", "btn-primary", "login-button"] },
            "Create Account"
          ),
        ]
      ),
    ]);
  }
}
