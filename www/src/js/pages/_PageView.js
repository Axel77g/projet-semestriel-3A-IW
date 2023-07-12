import Component from "../core/Component.js";
import Header from "../components/global/Header.js";

import {
  HomeView as home,
  ArticleView as article,
  ArticleListView as article_list,
} from "../templates/index.js";
import { createElement } from "../core/Element.js";
import CommentConversation from "../components/comments/CommentConversation.js";

export default class PageView extends Component {
  init() {}

  get view() {
    const template = router.route.page.template;

    return eval(template);
  }

  get page() {
    return router.route.page;
  }

  render() {
    return createElement("div", {}, [
      createElement(Header, {}, []),
      createElement(this.view, { page: this.page }, []),
      createElement(CommentConversation, { page: this.page }, []),
    ]);
  }
}
