import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import BackofficeContainer from "./Index.js";
import { createElement } from "../../core/Element.js";
import { Table } from "../../components/ui/Table.js";

export default class CommentList extends Component {
  init() {
    this.state = {
      comments: [],
    };
    this.fetchComment();
  }

  // Fetch the /api/comments
  async fetchComment() {
    let api = new Api();
    try {
      const response = await api.get("api/comments");
      this.setState({
        comments: response,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  updateStatus(id, status) {
    let api = new Api();
    api
      .put(`api/comments/${id}`, {
        status: status,
      })
      .then((response) => {
        const comments = this.state.comments.map((comment) => {
          if (comment.id === response.id) {
            comment.status = response.status;
          }
          return comment;
        });
        this.setState({
          comments: comments,
        });
      });
  }

  render() {
    let child = createElement("div", {}, [
      createElement("div", { class: ["d-flex", "justify-content-between"] }, [
        createElement("h1", {}, "Liste des Commentaires"),
      ]),

      createElement(Table, {
        headers: [
          {
            label: "ID",
            key: "id",
          },
          {
            label: "Contenu",
            key: "content",
          },
          {
            label: "status",
            key: "status",
          },
        ],
        items: this.state.comments.sort((comment) => comment.createdAt),
        templates: {
          status: (item) => {
            if (item.status === "validated")
              return createElement(
                "span",
                { class: ["badge", "badge-success", "text-bg-success"] },
                item.status
              );
            if (item.status === "refused")
              return createElement(
                "span",
                { class: ["badge", "badge-danger", "text-bg-danger"] },
                item.status
              );

            return createElement(
              "span",
              { class: ["badge", "badge-warning", "text-bg-warning"] },
              item.status
            );
          },
          content: (item) => {
            if (item.content.length > 50) {
              return createElement(
                "p",
                {},
                item.content.substring(0, 50) + "..."
              );
            }
            return createElement("p", {}, item.content);
          },
        },
        itemActions: [
          {
            props: {
              class: ["btn-success"],
            },
            label: "Approuver",
            onClick: (item) => {
              this.updateStatus(item.id, "validated");
            },
          },
          {
            props: {
              class: ["btn-danger"],
            },
            label: "Rejeter",
            onClick: (item) => {
              this.updateStatus(item.id, "refused");
            },
          },
          {
            props: {
              class: ["btn-primary"],
            },
            label: "Voir plus",
            onClick: (item) => {
              router.push("/admin/comment/more/" + item.id);
            },
          },
        ],
      }),
    ]);

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
