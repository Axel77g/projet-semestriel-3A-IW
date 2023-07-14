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
          file_image: null,
          image_postion: "left",
          content: "",
        },
      ],
    };
  }

  get content() {
    return {
      blocs: this.state.blocs,
    };
  }

  onAskContent(callable) {
    callable(this.content);
  }

  forceUpdate() {
    this.$components.forEach((c) => {
      if (c instanceof ArticleBlock) {
        c.forceUpdate();
      }
    });
  }

  handleDeleteBloc(index) {
    this.setState({
      blocs: this.state.blocs.filter((e, i) => i !== index),
    });
    this.forceUpdate();
  }

  handleMoveBloc(index, direction) {
    const newIndex =
      direction === "up"
        ? Math.max(index - 1, 0)
        : Math.min(index + 1, this.state.blocs.length - 1);

    let blocs = [...this.state.blocs];
    let bloc = { ...blocs[index] };
    blocs[index] = { ...blocs[newIndex] };
    blocs[newIndex] = bloc;
    this.setState({
      blocs: blocs,
    });
    this.forceUpdate();
  }

  handleChange(index, obj) {
    if (obj?.content) {
      this.state.blocs[index] = { ...this.state.blocs[index], ...obj };
    } else {
      let blocs = [...this.state.blocs];
      blocs[index] = { ...blocs[index], ...obj };
      this.setState({
        blocs: blocs,
      });
    }
  }

  render() {
    return createElement("div", { class: "mt-4" }, [
      createElement(
        "div",
        { class: ["article-edit-paragraphs"] },
        this.state.blocs.map((bloc, index) => {
          return createElement(ArticleBlock, {
            ...bloc,
            key: "ArticleBlock" + index,
            onChange: (obj) => {
              this.handleChange(index, obj);
            },
            onDelete: () => {
              this.handleDeleteBloc(index);
            },
            onMove: (direction) => {
              this.handleMoveBloc(index, direction);
            },
          });
        })
      ),

      createElement("div", {}, [
        createElement(Button, {
          class: ["mt-4"],
          onClick: () => {
            this.setState({
              blocs: [
                ...this.state.blocs,
                {
                  file_image: null,
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
