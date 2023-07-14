import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import Comment from "./Comment.js";
import { CommentForm } from "./CommentForm.js";

export default class CommentConversation extends Component {
  init() {
    this.state = {
      comments: [],
    };
    this.fetchComments();
  }

  get page() {
    return router.route.page;
  }
  countAnswers(comments) {
    let count = 0;
    comments.forEach((comment) => {
      count++;
      if (comment.answers.length > 0) {
        count += this.countAnswers(comment.answers);
      }
    });
    return count;
  }
  get commentSize() {
    return this.countAnswers(this.state.comments);
  }
  async fetchComments() {
    const api = new Api();
    const response = await api.get(`api/comments?page_id=${this.page.id}`);
    this.setState({
      comments: response,
    });
  }

  render() {
    return createElement("div", {}, [
      createElement("h1", {}, this.commentSize + " commentaires"),
      createElement(CommentForm, {}),
      ...this.state.comments.map((comment) => {
        return createElement(Comment, {
          key: comment.id,
          comment,
          onChildDelete: this.fetchComments.bind(this),
        });
      }),
    ]);
  }
}
