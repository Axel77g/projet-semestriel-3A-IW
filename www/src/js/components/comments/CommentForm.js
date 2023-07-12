import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import authMix, { AUTH_STATE } from "../../mixins/authMixin.js";
import Button from "../ui/Button.js";
import Input from "../ui/Input.js";
export class CommentForm extends Component {
  get mixins() {
    return [authMix];
  }

  init() {
    this.state = {
      comment: "",
    };
  }

  render() {
    console.log(this.state);
    return createElement("div", {}, [
      this.state.isAuth === AUTH_STATE.UNKOWN
        ? createElement("p", {}, "Chargement...")
        : this.state.isAuth === AUTH_STATE.NOT_AUTH
        ? createElement(
            "p",
            {},
            "Vous devez être connecté pour poster un commentaire"
          )
        : createElement("form", {}, [
            createElement(Input, {
              type: "text",
              placeholder: "Votre nom",
              name: "name",
              value:
                this.state.user?.firstname + " " + this.state.user?.lastname,
              attributes: {
                disabled: true,
              },
            }),
            createElement(Input, {
              type: "textarea",
              placeholder: "Commentaire",
              name: "comment",
              value: this.state.comment,
              onChange: (e) => {},
            }),
            createElement(Button, {
              type: "submit",
              children: "Envoyer",
            }),
          ]),
    ]);
  }
}
