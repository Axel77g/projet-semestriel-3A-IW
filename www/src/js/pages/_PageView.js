import Component from "../core/Component.js";
import Header from "../components/global/Header.js";

import {
  HomeView as home,
  ArticleView as article,
  ArticleListView as article_list,
} from "../templates/index.js";
import CommentConversation from "../components/comments/CommentConversation.js";
import { createElement } from "../core/Element.js";
import Footer from "../components/global/Footer.js";

export default class PageView extends Component {
  init() {
    let existing = document.head.querySelector('meta[name="description"]');

    if (existing) {
      existing.content = this.page.meta_description;
    } else {
      let meta = document.createElement("meta");
      meta.name = "description";
      meta.content = this.page.meta_description;
      document.head.appendChild(meta);
    }
  }

  get view() {
    const template = router.route.page.template;

    return eval(template);
  }

  get page() {
    return router.route.page;
  }

  render() {
    return createElement("div", {}, [
      createElement(Header, {}),
      createElement(this.view, { page: this.page }),
      this.page.is_commentable &&
        createElement(CommentConversation, { page: this.page }),
      createElement(Footer, {}),
    ]);
  }
}
