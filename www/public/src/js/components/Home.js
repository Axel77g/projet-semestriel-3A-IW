import Component from "../core/Component.js";
import Api from "../core/Api.js";
import Header from "./global/Header.js";

import { HomeView as home } from "../templates/index.js";
import CommentConversation from "./comments/CommentConversation.js";
import { createElement } from "../core/Element.js";
import Footer from "./global/Footer.js";

export default class Home extends Component {
  init() {
    document.title = SITE_NAME + " - Accueil";
    this.fetchHome();
  }

  async fetchHome() {
    const api = new Api();
    const home = await api.get("api/pages/home?withContent");
    if (!home) return;

    let existing = document.head.querySelector('meta[name="description"]');

    if (existing) {
      existing.content = home.meta_description;
    } else {
      let meta = document.createElement("meta");
      meta.name = "description";
      meta.content = home.meta_description;
      document.head.appendChild(meta);
    }

    this.setState({ page: home });
  }

  get view() {
    const template = this.state.page.template;

    return eval(template);
  }

  get page() {
    return this.state.page;
  }

  render() {
    if (!this.state.page) return createElement("div", {}, "");
    return createElement("div", {}, [
      createElement(Header, {}),
      createElement(this.view, { page: this.page }),
      this.page.is_commentable &&
        createElement(CommentConversation, { page: this.page }),
      createElement(Footer, {}),
    ]);
  }
}
