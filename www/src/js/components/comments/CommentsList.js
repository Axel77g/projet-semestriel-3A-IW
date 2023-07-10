import Component from "../../core/Component.js";
import Api from "../../core/Api.js";

import CommentCard from "./CommentCard.js";

export default class CommentsList extends Component {
  init() {
    this.state = {
      comment: [],
    };
    this.fetchComments();
  }

  fetchComments() {
    let api = new Api();
    api.get("api/comments").then((response) => {
      this.setState({
        comment: response,
      });
      console.log(response);
    });
  }

  render() {
    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement("h1", {}, "Liste de tous les commentaires"),
      createElement(
        "div",
        { class: ["row"] },
        this.state.comment.map((comment) => {
          return createElement(CommentCard, {
            key: "comment-" + comment.id,
            comment,
          });
        })
      ),
    ]);
  }
}
