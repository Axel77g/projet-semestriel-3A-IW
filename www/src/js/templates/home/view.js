import Component from "../../core/Component.js";
import ArticleList from "../../components/ui/ArticleList.js";
import BannerAction from "../../components/ui/BannerAction.js";

export class HomeView extends Component {
  init() {
    document.title = "Home";
  }

  render() {
    return createElement(
      "div",
      {
        class: ["container", "mt-3"],
      },
      [
        createElement("h1", {
          html: this.props.page.title,
        }),
        createElement(
          "div",
          {
            class: ["mt-3"],
          },
          [
            createElement("p", {
              html: this.props.page.content.about_section_content,
            }),
            createElement("article", {}, [
              createElement("img", {
                src: this.props.page.content.banner.file_banner.path,
                alt: this.props.page.content.banner.title,
                class: ["img-fluid", "rounded", "w-25"],
              }),
              createElement(
                "p",
                { class: "mb-0" },
                this.props.page.content.banner.title
              ),
              createElement("small", { class: ["text-muted"] }, [
                createElement("i", {}, this.props.page.content.banner.subtitle),
              ]),
            ]),

            createElement(BannerAction, {
              actions: this.props.page.content.banner.actions,
            }),

            createElement("hr", {}, ""),
            createElement(ArticleList, {
              article_section: this.props.page.content.articles_section,
            }),

            createElement("hr", {}, ""),
            createElement("h2", {}, "Contact"),
            createElement(
              "div",
              { class: ["d-flex", "flex-row", "justify-content-around"] },
              [
                createElement("div", { class: ["d-flex", "flex-row"] }, [
                  createElement("i", { class: ["bi-mailbox", "me-2"] }, ""),
                  createElement(
                    "a",
                    {
                      href:
                        "mailto:" +
                        this.props.page.content.contact_section.email,
                    },
                    this.props.page.content.contact_section.email
                  ),
                ]),
                createElement("div", { class: ["d-flex", "flex-row"] }, [
                  createElement("i", { class: ["bi-telephone", "me-2"] }, ""),
                  createElement(
                    "a",
                    {
                      href:
                        "tel:" + this.props.page.content.contact_section.phone,
                    },
                    this.props.page.content.contact_section.phone
                  ),
                ]),
              ]
            ),
          ]
        ),
      ]
    );
  }
}
