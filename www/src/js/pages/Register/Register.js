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
      messages: {},
    };
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/register", this.state).then((response) => {
      if (response.success === true) {
        router.push("/login");
      } else {
        this.setState({ messages: response.messages });
      }
    });
  }
  handleChange(e) {
    this.state[e.name] = e.value;
  }
  render() {
    return createElement("div", {}, [
      createElement("h1", {}, "Register"),
      createElement("form", { onsubmit: this.handleSumbit }, [
        new Input({
          name: "firstname",
          type: "text",
          id: "firstname",
          placeholder: "Firstname",
          onChange: this.handleChange.bind(this),
          value: this.state.firstname,
          message: this.state.messages.firstname,
        }),
        new Input({
          name: "lastname",
          type: "text",
          id: "lastname",
          placeholder: "Lastname",
          onChange: this.handleChange.bind(this),
          value: this.state.lastname,
          message: this.state.messages.lastname,
        }),
        new Input({
          name: "email",
          type: "email",
          id: "email",
          placeholder: "Email",
          onChange: this.handleChange.bind(this),
          value: this.state.email,
          message: this.state.messages.email,
        }),
        new Input({
          name: "password",
          type: "password",
          id: "password",
          placeholder: "Password",
          onChange: this.handleChange.bind(this),
          value: this.state.password,
          message: this.state.messages.password,
        }),
        createElement(
          "button",
          { class: ["btn", "btn-primary", "login-button"] },
          "Create Account"
        ),
      ]),
    ]);
  }
}
