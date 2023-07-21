import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class Test extends Component {
  init() {
    console.log(this);
    this.state = {
      count: 0,
    };
  }
  onRerender() {
    console.log(this);
  }
  render() {
    return createElement("div", { class: "test" }, [
      createElement(
        "button",
        {
          onclick: () => {
            this.setState({
              count: this.state.count + 1,
            });
          },
        },
        "update" + this.state.count
      ),
    ]);
  }
}
