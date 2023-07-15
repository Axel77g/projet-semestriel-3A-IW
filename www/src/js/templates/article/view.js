import Component from "../../core/Component.js";

export class ArticleView extends Component {
  render() {
    return createElement("div", { class: "article-container" }, [
      createElement("h1", {}, this.props.page.title),
      ...this.props.page.content.blocs.map((bloc) => {
        let children = [
          createElement("div", { html: bloc.content }),
          bloc.file_image &&
            createElement("div", { class: ["article-bloc-image"] }, [
              createElement("img", { src: "/" + bloc.file_image.path }),
            ]),
        ];
        if (bloc.image_position === "left") children.reverse();
        return createElement(
          "div",
          {
            class: ["article-bloc"],
          },
          children
        );
      }),
    ]);
  }
}
