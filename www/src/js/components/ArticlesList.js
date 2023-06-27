import Component from "../core/Component.js";
import { ArticlesCard } from "./ArticleCard.js";
import Api from "../core/Api.js";

export class ArticlesList extends Component {
  /* const api = new Api();
    api.get("articles", {}).then((articles) => {
      console.log(articles);
    }); */

  init() {
    this.state = {
      hidden: false,
    };
  }

  toogleHidden() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    return createElement("div", { class: ["artilce-container"] }, [
      ...(this.state.hidden
        ? [
            new List({
              title: "Liste 1",
            }),
          ]
        : [
            new List({
              title: "Liste 1",
            }),
            new List({
              title: "Liste 2",
            }),
          ]),
      createElement("button", { onclick: this.toogleHidden }, "refresh"),
      createElement(
        "button",
        { onclick: () => router.push("/") },
        "go to home"
      ),
    ]);
    /* return createElement("div", { class: ["aticle-list-container"] }, [
      !this.state.articles.length
        ? new NoArticle({
            fetchArticles: this.fetchArticles.bind(this),
          })
        : new List({ articles: this.state.articles }),
      new NoArticle({
        fetchArticles: this.fetchArticles.bind(this),
      }),
    ]); */
  }
}

class NoArticle extends Component {
  render() {
    return createElement("div", { class: ["test"] }, [
      createElement(
        "button",
        { onclick: this.props.fetchArticles },
        "Load articles"
      ),
    ]);
  }
}

class List extends Component {
  init() {
    this.state = {
      articles: [],
    };
  }
  fetchArticles() {
    console.log(this);
    this.setState({
      articles: [
        {
          title: "Article 1",
          description: "Description 1",
        },
        {
          title: "Article 2",
          description: "Description 2",
        },
        {
          title: "Article 3",
          description: "Description 3",
        },
      ],
    });
  }
  render() {
    return createElement("div", { class: ["articlesList"] }, [
      createElement("h1", {}, "Liste " + this.props.title),
      ...this.state.articles.map(
        (article) =>
          new ArticlesCard({
            article,
          })
      ),
      createElement("button", { onclick: this.fetchArticles }, "Load articles"),
    ]);
  }
}
