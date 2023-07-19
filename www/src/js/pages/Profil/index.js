import Header from "../../components/global/Header.js";
import Button from "../../components/ui/Button.js";
import Input from "../../components/ui/Input.js";
import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import authMixin from "../../mixins/authMixin.js";
import { AUTH_STATE } from "../../utils/auth.js";

export default class Profil extends Component {
  get mixins() {
    return [authMixin];
  }

  init() {
    this.state = {
      password: "",
      passwordConfirm: "",

      errors: {},
      success: false,
    };
  }

  get passwordMatch() {
    return this.state.password === this.state.passwordConfirm;
  }

  async handleSubmit() {
    if (!this.passwordMatch)
      return this.setState({
        errors: {
          password: ["Les mots de passe ne correspondent pas"],
          password_confirmation: ["Les mots de passe ne correspondent pas"],
        },
      });
    const api = new Api();
    const response = await api.put(`api/users/${this.state.user.id}`, {
      firstname: this.state.user.firstname,
      lastname: this.state.user.lastname,
      email: this.state.user.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirm,
    });
    if (response?.id) {
      this.setState({
        errors: {},
        password: "",
        passwordConfirm: "",
        user: response,
        success: "Votre profil a bien été mis à jour",
      });
    } else {
      if (response.code == 422) {
        this.setState({
          errors: response.message,
        });
      }
    }
  }

  render() {
    let content = null;
    if (this.state.isAuth === AUTH_STATE.UNKOWN) content = "Chargement...";
    if (this.state.isAuth === AUTH_STATE.NOT_AUTH)
      content = "Vous devez être connecté";
    if (this.state.isAuth === AUTH_STATE.AUTH)
      content = [
        createElement("h1", {}, "Profil"),
        createElement("p", {
          html: `Vous êtes connecté en tant que : <b>${this.state.user?.email}</b>`,
        }),
        createElement("form", {}, [
          createElement("div", { class: "form-row" }, [
            createElement(Input, {
              type: "text",
              name: "name",
              placeholder: "Prénom",
              value: this.state.user?.firstname,
              message: this.state.errors?.firstname,
              onChange: (e) => {
                this.setState({
                  user: { ...this.state.user, firstname: e.value },
                });
              },
            }),
            createElement(Input, {
              type: "text",
              name: "name",
              placeholder: "Nom",
              value: this.state.user?.lastname,
              message: this.state.errors?.lastname,
              onChange: (e) => {
                this.setState({
                  user: { ...this.state.user, lastname: e.value },
                });
              },
            }),
          ]),
          createElement("div", { class: "form-row" }, [
            createElement(Input, {
              type: "email",
              name: "email",
              placeholder: "Email",
              value: this.state.user?.email,
              message: this.state.errors?.email,
              readonly: true,
              onChange: (e) => {
                this.setState({
                  user: { ...this.state.user, email: e.value },
                });
              },
            }),
          ]),
          createElement("div", { class: "form-row" }, [
            createElement(Input, {
              type: "password",
              name: "password",
              placeholder: "Mot de passe",
              value: this.state.password,
              attributes: {
                autocomplete: "new-password",
              },
              onChange: (e) => {
                this.setState({ password: e.value });
              },
              message: this.state.errors?.password,
            }),
            createElement(Input, {
              type: "password",
              name: "password",
              placeholder: "Confirmer le mot de passe",
              value: this.state.passwordConfirm,
              onChange: (e) => {
                this.setState({ passwordConfirm: e.value });
              },
              message: this.state.errors?.password_confirmation,
            }),
          ]),
          createElement(Button, {
            onClick: this.handleSubmit.bind(this),
            children: "Enregistrer",
          }),
          this.state.success &&
            createElement(
              "p",
              {
                class: ["success", "mt-2", "mb-0"],
              },
              this.state.success
            ),
        ]),
      ];

    return createElement("div", {}, [
      createElement(Header, {}),
      createElement("main", { class: "profil-container" }, content),
    ]);
  }
}
