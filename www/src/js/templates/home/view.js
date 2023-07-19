import Component from "../../core/Component.js";
import ArticleList from "../../components/ui/ArticleList.js";
import BannerAction from "../../components/ui/BannerAction.js";
import { createElement } from "../../core/Element.js";

export class HomeView extends Component {
  init() {
    document.title = "Home";
  }

  get content() {
    return this.props.page.content;
  }

  render() {
    return createElement("main", { class: "home-container" }, [
      createElement("section", { class: "banner-container" }, [
        createElement("img", {
          src:
            this.content.banner.file_banner?.path ||
            "/src/assets/images/banner_placeholder.png",
          alt: this.content.banner.title,
        }),
        createElement(
          "div",
          {
            class: "banner-content",
          },
          [
            createElement("h1", {}, this.content.banner?.title),
            createElement("p", {}, this.content.banner?.subtitle),
            createElement(BannerAction, {
              actions: this.props.page.content.banner.actions,
            }),
          ]
        ),
      ]),
      createElement("section", { class: ["about-section", "home-wrapper"] }, [
        createElement("div", { html: this.content.about_section_content }),
      ]),
      createElement("section", { class: ["article-section", "home-wrapper"] }, [
        createElement(ArticleList, {
          article_section: this.props.page.content.articles_section,
        }),
      ]),

      createElement("section", { class: ["contact-section", "home-wrapper"] }, [
        createElement("h1", {}, "Contact"),
        createElement("div", { class: "contact-content" }, [
          this.content.contact_section?.email &&
            createElement("div", { class: "contact-item" }, [
              createElement("i", { class: ["bi", "bi-envelope"] }),
              createElement(
                "a",
                {
                  href: "mailto:" + this.content.contact_section.email,
                },
                this.content.contact_section.email
              ),
            ]),

          this.content.contact_section?.phone &&
            createElement("div", { class: "contact-item" }, [
              createElement("i", { class: ["bi", "bi-telephone"] }),
              createElement(
                "a",
                {
                  href: "tel:" + this.content.contact_section.phone,
                },
                this.content.contact_section.phone
              ),
            ]),
          this.content.contact_section?.address &&
            createElement("div", { class: "contact-item" }, [
              createElement("i", { class: ["bi", "bi-house"] }),
              createElement("p", {}, this.content.contact_section.address),
            ]),
        ]),
      ]),
    ]);
  }
}
