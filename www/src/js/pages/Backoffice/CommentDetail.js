import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Menu from "../menus/Menu.js";
import Button from "../../components/ui/Button.js";
import BackofficeContainer from "./Index.js";
import { createElement } from "../../core/Element.js";
import { Table } from "../../components/ui/Table.js";

export default class CommentDetail extends Component {
  init() {
    this.state = {
      comment: {},
      id: router.route.params.id,
    };
    this.fetchComment();
  }

  // Fetch the /api/comments
  async fetchComment() {
    let api = new Api();
    try {
      const response = await api.get("api/comments/" + this.state.id);
      this.setState({
        comment: response,
      });

      if (this.state.comment.author !== null) {
        api.get("api/users/" + this.state.comment.author).then((response) => {
          this.setState({ author: response });
          console.log(this.state);
        });
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }

    console.log(this.state);
  }

  updateStatus(id, status) {
    let api = new Api();
    api
      .put(`api/comments/${id}`, {
        status: status,
      })
      .then((response) => {
        this.setState({
          comment: response,
        });
      });

    console.log(this.state);
  }

  render() {
    /* if (this.state.menus.length === 0) {
      return createElement("div", { class: ["container-fluid", "mt-4"] }, [
        createElement("p", {}, "Loading"),
      ]);
    } */

    let child = createElement("div", {}, [
      createElement("div", { class: ["d-flex", "justify-content-between"] }, [
        createElement("h1", {}, "Commentaire"),
      ]),

      createElement("div", {}, [
        createElement("div", { class: ["d-flex", "justify-content-between"] }, [
          createElement("h2", { class: "my-4" }, [
            createElement("u", {}, "Fiche du commentaire"),
          ]),
        ]),
      ]),

      createElement("div", {}, [
        createElement("div", { class: ["d-flex", "justify-content-start"] }, [
          createElement("p", { class: ["px-3", "text-nowrap"] }, "Contenu :"),
          createElement(
            "p",
            {},
            this.state.comment.content
              ? this.state.comment.content
              : "Aucun contenu"
          ),
        ]),
      ]),
      createElement("div", {}, [
        createElement("div", { class: ["d-flex", "justify-content-start"] }, [
          createElement("p", { class: ["px-3", "text-nowrap"] }, "Auteur :"),
          createElement("details", {}, [
            createElement(
              "summary",
              { class: "mb-2" },
              this.state.author
                ? this.state.author.firstname + " " + this.state.author.lastname
                : "Aucun auteur"
            ),
            createElement(
              "p",
              { class: "mb-1" },
              this.state.author
                ? "Email : " + this.state.author.email
                : "Email : Aucun auteur"
            ),
            createElement(
              "p",
              { class: "mb-1" },
              this.state.author
                ? "Role : " + this.state.author.role
                : "Role : Aucun auteur"
            ),
            createElement(
              "div",
              { class: ["d-flex", "justify-content-start"] },
              [
                createElement(
                  "p",
                  { class: ["pe-2", "text-nowrap"] },
                  "Verifié :"
                ),
                createElement(
                  "p",
                  {
                    class: [
                      "badge",
                      "" + this.state.author
                        ? this.state.author?.is_verified
                          ? "badge-success"
                          : "badge-warning"
                        : "badge-warning",
                      "" + this.state.author
                        ? this.state.author?.is_verified
                          ? "text-bg-success"
                          : "text-bg-warning"
                        : "text-bg-warning",
                    ],
                  },
                  this.state.author
                    ? this.state.author.is_verified
                      ? "Vérifié"
                      : "Non Vérifié"
                    : "Aucun auteur"
                ),
              ]
            ),
          ]),
        ]),
      ]),
      createElement("div", {}, [
        createElement("div", { class: ["d-flex", "justify-content-start"] }, [
          createElement("p", { class: ["px-3", "text-nowrap"] }, "Status :"),
          createElement(
            "p",
            {
              class: [
                "badge",
                "" + this.state.comment.status
                  ? "" + this.state.comment.status === "pending"
                    ? "badge-warning"
                    : this.state.comment.status === "validated"
                    ? "badge-success"
                    : "badge-danger"
                  : "badge-warning",

                "" + this.state.comment.status
                  ? "" + this.state.comment.status === "pending"
                    ? "text-bg-warning"
                    : this.state.comment.status === "validated"
                    ? "text-bg-success"
                    : "text-bg-danger"
                  : "text-bg-warning",
              ],
            },
            this.state.comment.status
              ? "" + this.state.comment.status === "pending"
                ? "En attente"
                : this.state.comment.status === "validated"
                ? "Approuvé"
                : "Refusé"
              : "Aucun status"
          ),
        ]),
      ]),

      createElement("div", {}, [
        createElement("div", { class: ["d-flex", "justify-content-start"] }, [
          createElement("h2", { class: "my-4" }, [
            createElement("u", {}, "Actions"),
          ]),
        ]),

        createElement("div", { class: ["d-flex", "justify-content-start"] }, [
          createElement(Button, {
            class: ["btn", "btn-success", "me-2"],
            children: "Approuver",
            onClick: () => {
              this.updateStatus(this.state.comment.id, "validated");
            },
          }),

          createElement(Button, {
            class: ["btn", "btn-danger", "me-2"],
            children: "Rejeter",
            onClick: () => {
              this.updateStatus(this.state.comment.id, "refused");
            },
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
