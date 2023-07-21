import Api from "../core/Api.js";

// Components
import Component from "../core/Component.js";

export class Article extends Component {
  init() {
    this.state = {
      article: null,
    };
    this.fetchArticle();
  }

  fetchArticle() {
    let api = new Api();
    api.get("api/article/" + router.route.params.slug).then((response) => {
      this.setState({
        article: response,
      });
    });
  }

  render() {
    if (!this.state.article) return createElement("div", {}, "Chargement...");
    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement("h1", {}, this.state.article.title),
      createElement("p", {}, this.state.article.content),
    ]);   
  }
}
