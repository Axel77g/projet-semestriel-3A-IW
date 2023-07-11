import Component from "../core/Component.js";
import HomeHeader from "../components/HomeHeader.js";

import {
  HomeView as home,
  ArticleView as article,
  ArticleListView as article_list,
} from "../templates/index.js";

export class PageView extends Component {
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
      createElement(HomeHeader, {}, []),
      createElement(this.view, { page: this.page }, []),
    ]);
  }
}
