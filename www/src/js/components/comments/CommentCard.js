import Component from "../../core/Component.js";
import Button from "../ui/Button.js";

import Api from "../../core/Api.js";

export default class CommentCard extends Component {
  render() {
    let comment = this.props.comment;

    if (comment.content.length > 100) {
      comment.content = comment.content.substring(0, 100) + "...";
    }

    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement("div", { class: ["card"] }, [
        createElement("div", { class: ["card-body"] }, [
          createElement("h5", { class: ["card-title"] }, comment.author_i),
          createElement("p", { class: ["card-text"] }, comment.content),
          createElement(Button, {
            class: ["btn", "btn-primary"],
            onClick: () => {
              router.push("/comment/");
            },
            children: "Lire le commentaire",
          }),
        ]),
      ]),
    ]);
  }
}
