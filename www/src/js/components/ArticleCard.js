import Component from "../core/Component.js";

export class ArticlesCard extends Component {
  render() {
    let article = this.props.article;
    return createElement("div", { class: ["col-3", "mt-2", "mb-4"] }, [
      createElement("div", { class: ["card"] }, [
        createElement("img", {
          src: "https://placehold.co/600x400",
          class: ["card-img-top"],
          alt: article.title,
        }),
        createElement("div", { class: ["card-body"] }, [
          createElement("h5", { class: ["card-title"] }, article.title),
          // createElement(
          //   "h6",
          //   { class: ["card-title"] },
          //   "Auteur de l'article : " + article.author.firstname
          // ),
          createElement("p", { class: ["card-text"] }, article.description),
          createElement(
            "button",
            {
              class: ["btn", "btn-primary"],
              onclick: () => {
                router.push("/article/" + article.slug);
              },
            },
            "Lire l'article"
          ),
        ]),
      ]),
    ]);
  }
}
