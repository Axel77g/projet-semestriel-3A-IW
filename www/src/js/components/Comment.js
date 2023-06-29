import Component from "../core/Component.js";

export default class Comment extends Component {
  render() {
    return createElement("div", { class: ["comment"] }, "Comment");
  }
}
