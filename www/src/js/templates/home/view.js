import Component from "../../core/Component.js";

export class HomeView extends Component {
  render() {
    return createElement("h1", {
      html: JSON.stringify(this.props.page.content),
    });
  }
}
