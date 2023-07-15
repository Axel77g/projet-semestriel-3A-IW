import Component from "../../core/Component.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";
import Button from "../../components/ui/Button.js";
import { createElement } from "../../core/Element.js";
import HomeHeader from "../../components/global/Header.js";

export default class Register extends Component {
  init() {
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      messages: {},
    };
    document.title = "Register";
  }
  handleSumbit(e) {
    e.preventDefault();
    let api = new Api();
    api.post("api/register", this.state).then((response) => {
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
    let content = createElement("div", { class: "box-wrapper" }, [
      createElement("h1", {}, "Register"),
      createElement("form", { onsubmit: this.handleSumbit }, [
        createElement(Input, {
          name: "firstname",
          type: "text",
          id: "firstname",
          placeholder: "Firstname",
          onChange: this.handleChange.bind(this),
          value: this.state.firstname,
          message: this.state.messages.firstname,
        }),
        createElement(Input, {
          name: "lastname",
          type: "text",
          id: "lastname",
          placeholder: "Lastname",
          onChange: this.handleChange.bind(this),
          value: this.state.lastname,
          message: this.state.messages.lastname,
        }),
        createElement(Input, {
          name: "email",
          type: "email",
          id: "email",
          placeholder: "Email",
          onChange: this.handleChange.bind(this),
          value: this.state.email,
          message: this.state.messages.email,
        }),
        createElement(Input, {
          name: "password",
          type: "password",
          id: "password",
          placeholder: "Password",
          onChange: this.handleChange.bind(this),
          value: this.state.password,
          message: this.state.messages.password,
        }),
        createElement(Button, { class: ["my-3"], children: "Create Account" }),
      ]),
    ]);

    return createElement("div", {}, [createElement(HomeHeader, {}), content]);
  }
}
