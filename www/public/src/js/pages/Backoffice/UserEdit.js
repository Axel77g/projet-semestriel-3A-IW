import Button from "../../components/ui/Button.js";
import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";
import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import BackofficeContainer from "./Index.js";

export default class UserEdit extends Component {
  init() {
    this.state = {
      isEdit: Boolean(router.route.params.id),
      firstname: "",
      lastname: "",
      role: "",
      messages: {},

      typesOptions: [
        {
          label: "User",
          value: "user",
        },
        {
          label: "Admin",
          value: "admin",
        },
      ],
    };
    this.fetchUser();
  }

  handleChange(e) {
    this.setState({
      [e.name]: e.value,
    });
  }

  async fetchUser() {
    let api = new Api();
    let user = await api.get("api/users/" + router.route.params.id);
    this.setState({ ...user });
  }

  async handleSubmit(e) {
    let api = new Api();
    const method = this.state.isEdit ? "put" : "post";
    const endpoint = this.state.isEdit
      ? "api/users/" + router.route.params.id
      : "api/register";
    let payload = {};
    if (this.state.isEdit) {
      payload = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        role: this.state.role,
      };
    } else {
      payload = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      };
    }

    let response = await api[method](endpoint, payload);
    if (response?.code == 422) {
      this.setState({ messages: response.data });
    } else if (response) {
      router.push("/admin/users", {
        alert: {
          message: "Utilisateur enregistré avec succès",
          type: "success",
        },
      });
    }
  }

  render() {
    let child = createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement(
        "h1",
        {},
        this.state.isEdit ? "Editer l'utilisateur" : "Créer un utilisateur"
      ),
      createElement("div", { class: "row" }, [
        createElement("div", { class: "col-6" }, [
          createElement(Input, {
            key: "firstname",
            name: "firstname",
            placeholder: "Prénom",
            value: this.state.firstname,
            message: this.state.messages?.firstname,
            onChange: this.handleChange.bind(this),
          }),
          createElement(Input, {
            key: "lastname",
            name: "lastname",
            placeholder: "Nom",
            value: this.state.lastname,
            message: this.state.messages?.lastname,
            onChange: this.handleChange.bind(this),
          }),
          !this.state.isEdit &&
            createElement(Input, {
              key: "email",
              name: "email",
              type: "email",
              placeholder: "Email",
              value: this.state.email,
              message: this.state.messages?.email,
              onChange: this.handleChange.bind(this),
            }),
          !this.state.isEdit &&
            createElement(Input, {
              key: "password",
              name: "password",
              type: "password",
              placeholder: "Mot de passe",
              value: this.state.password,
              message: this.state.messages?.password,
              onChange: this.handleChange.bind(this),
            }),
          createElement(Select, {
            options: this.state.typesOptions,
            key: "role",
            name: "role",
            placeholder: "Role",
            value: this.state.role,
            onChange: this.handleChange.bind(this),
          }),
          createElement(Button, {
            key: "submit",
            class: ["btn", "btn-primary", "mt-4"],
            onClick: this.handleSubmit.bind(this),
            children: "Enregistrer",
          }),
        ]),
      ]),
    ]);

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
