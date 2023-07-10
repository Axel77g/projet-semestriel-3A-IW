import ArticleBlock from "../../components/articles/ArticleBlock.js";
import Button from "../../components/ui/Button.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export class ArticleEdit extends Component {
  init() {
    this.state = {
      blocs: this.props?.initialContent?.blocs || [
        {
          image: null,
          image_postion: Math.random > 0.5 ? "left" : "right",
          content: "",
        },
        {
          image: null,
          image_postion: Math.random > 0.5 ? "left" : "right",
          content: "",
        },
      ],
    };
  }

  get content() {
    return {
      article_content: this.state.article_content,
    };
  }

  onAskContent(callable) {
    callable(this.content);
  }

  render() {
    console.log(this.state.blocs);
    return createElement("div", { class: "mt-4" }, [
      createElement(
        "div",
        { class: ["paragraphs"] },
        this.state.blocs.map((bloc, index) =>
          createElement("div", { id: index }, [
            createElement(ArticleBlock, {
              ...bloc,
              ke: "ArticleBlock" + index,
            }),
          ])
        )
      ),

      createElement("div", {}, [
        createElement(Button, {
          onClick: () => {
            this.setState({
              blocs: [
                ...this.state.blocs,
                {
                  image: null,
                  image_postion: Math.random > 0.5 ? "left" : "right",
                  content: "",
                },
              ],
            });
          },
          children: "Ajouter un paragraphe",
        }),
      ]),
    ]);
  }
}
