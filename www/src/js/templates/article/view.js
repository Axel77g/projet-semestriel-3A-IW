import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import { htmlDecode } from "../../utils/text_decode.js";

export class ArticleView extends Component {
  get date() {
    let date = new Date(this.props.page.created_at);
    return date.toLocaleDateString();
  }
  render() {
    return createElement("article", { class: "article-container" }, [
      createElement(
        "header",
        {
          class: "article-header",
        },
        [
          createElement("img", {
            src: "/" + this.props.page.content?.thumbnail?.path,
            alt: this.props.page.content?.thumbnail?.alternative_text || "",
          }),
          createElement("div", { class: "article-header-info" }, [
            createElement("h1", {}, htmlDecode(this.props.page.title)),
            createElement("span", {
              html: `Publié par <b>${
                this.props.page.author.firstname +
                " " +
                this.props.page.author.lastname.toLowerCase()
              }</b>`,
            }),
            createElement("time", {}, " le " + this.date),
          ]),
        ]
      ),
      createElement(
        "main",
        { class: "article-content" },
        this.props.page.content.blocs.map((bloc) => {
          let children = [
            createElement("div", { html: bloc.content }),
            bloc.file_image &&
              createElement("figure", { class: ["article-bloc-image"] }, [
                createElement("img", {
                  src: "/" + bloc.file_image.path,
                  alt: bloc.file_image?.alternative_text || "",
                }),
              ]),
          ];
          if (bloc.image_position === "left") children.reverse();
          return createElement(
            "section",
            {
              class: ["article-bloc"],
            },
            children
          );
        })
      ),
    ]);
  }
}
