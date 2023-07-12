import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import { CommentForm } from "./CommentForm.js";

export default class CommentConversation extends Component {
  init() {
    this.state = {
      comments: [],
    };
  }
  render() {
    return createElement("div", {}, [
      createElement("h1", {}, this.state.comments.length + " commentaires"),
      createElement(CommentForm, {}),
    ]);
  }
}
