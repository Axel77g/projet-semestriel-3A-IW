import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import authMix from "../../mixins/authMixin.js";
import { AUTH_STATE } from "../../utils/auth.js";
import Button from "../ui/Button.js";
import Input from "../ui/Input.js";
import { Link } from "../ui/Link.js";
export class CommentForm extends Component {
  get mixins() {
    return [authMix];
  }

  init() {
    this.state = {
      comment: "",
      success: null,
      errors: {},
    };
  }

  get page() {
    return router.route.page;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const payload = {
      author_id: this.state.user.id,
      content: this.state.comment,
      page_id: this.page.id,
      comment_id: this.props.comment?.id || undefined,
    };
    const api = new Api();
    const response = await api.post("api/comments", payload);
    if (response?.code == 422) {
      this.setState({
        errors: response.message,
      });
    } else {
      this.setState({
        success:
          "Votre commentaire a bien été posté, il est en attente de validation par un modérateur",
        comment: "",
      });
    }
    document.getElementById("form-comment").reset();
  }

  render() {
    return createElement(
      "form",
      { id: "form-comment", class: "comment-form" },
      [
        this.state.isAuth === AUTH_STATE.UNKOWN
          ? createElement("p", {}, "Chargement...")
          : this.state.isAuth === AUTH_STATE.NOT_AUTH
          ? createElement("p", {}, [
              createElement(
                "span",
                {},
                "Vous devez être connecté pour poster un commentaire, "
              ),
              createElement(Link, {
                href: "/login",
                children: "connectez-vous",
                class: ["link"],
              }),
            ])
          : createElement("div", {}, [
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
                id: "commentText",
                type: "textarea",
                placeholder: "Commentaire",
                name: "comment",
                value: this.state.comment,
                onChange: (e) => {
                  this.setState({
                    comment: e.value,
                  });
                },
                message: this.state.errors?.content,
              }),
              this.state.success &&
                createElement(
                  "p",
                  { class: "form-success" },
                  this.state.success
                ),
              createElement("div", { class: ["form-action"] }, [
                createElement(Button, {
                  type: "submit",
                  children: "Envoyer",
                  onClick: this.handleSubmit.bind(this),
                }),
                this.props.comment &&
                  createElement(Button, {
                    onClick: () => {
                      this.props.onCancel();
                    },
                    class: ["btn-secondary"],
                    children: "Annuler",
                  }),
              ]),
            ]),
      ]
    );
  }
}
