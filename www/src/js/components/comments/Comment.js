import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import authMixin from "../../mixins/authMixin.js";
import { CommentForm } from "./CommentForm.js";

export default class Comment extends Component {
  get mixins() {
    return [authMixin];
  }

  init() {
    this.state = {
      isCommenting: false,
      replyContent: "",
    };
  }
  get date() {
    return new Date(this.props.comment.created_at).toLocaleDateString("fr-FR");
  }
  get isAuthor() {
    return this.props.comment.author.id === this.state?.user?.id;
  }

  async handleDelete() {
    let api = new Api();
    await api.delete(`api/comments/${this.props.comment.id}`);
    this.props.onChildDelete();
  }

  handleChildDelete() {
    this.props.onChildDelete();
  }

  render() {
    return createElement("div", { class: "comment" }, [
      createElement("div", { class: ["comment-container"] }, [
        createElement("div", { class: ["comment-header"] }, [
          createElement(
            "div",
            {
              class: ["comment-header-left"],
            },
            [
              createElement(
                "h4",
                {},
                this.props.comment.author.firstname +
                  " " +
                  this.props.comment.author.lastname
              ),
              createElement("p", {}, "Le " + this.date),
            ]
          ),
          createElement(
            "div",
            {
              class: ["comment-header-actions"],
            },
            [
              createElement("span", {}, [
                createElement("i", { class: ["bi", "bi-reply"] }),
                createElement(
                  "span",
                  {
                    onclick: () => {
                      this.setState({
                        isCommenting: !this.state.isCommenting,
                      });
                    },
                  },
                  "Répondre"
                ),
              ]),
              this.isAuthor &&
                createElement("span", {}, [
                  createElement("i", { class: ["bi", "bi-trash"] }),
                  createElement(
                    "span",
                    {
                      onclick: this.handleDelete.bind(this),
                    },
                    "Supprimer"
                  ),
                ]),
            ]
          ),
        ]),

        createElement("p", {}, this.props.comment.content),
      ]),
      this.state.isCommenting &&
        createElement(CommentForm, {
          key: "form-" + this.props.comment.id,
          comment: this.props.comment,
          onCancel: () => {
            this.setState({
              isCommenting: false,
            });
          },
        }),
      createElement("div", { class: ["answers-list"] }, [
        ...this.props.comment.answers.map((answer) =>
          createElement(Comment, {
            key: answer.id,
            comment: answer,
            onChildDelete: this.handleChildDelete.bind(this),
          })
        ),
      ]),
    ]);
  }
}
