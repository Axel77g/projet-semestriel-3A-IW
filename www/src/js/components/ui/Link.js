import Component from "../../core/Component.js";

export class Link extends Component {
  render() {
    return createElement(
      "a",
      {
        class: this.props?.class ?? ["nav-link"],
        href: this.props.href,
        onclick: (e) => {
          e.preventDefault();
          router.push(this.props.href);
        },
      },
      this.props.children
    );
  }
}
