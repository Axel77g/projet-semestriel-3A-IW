import ArticleBlock from "../../components/articles/ArticleBlock.js";
import Button from "../../components/ui/Button.js";
import FilePicker from "../../components/ui/FilePicker.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export class ArticleEdit extends Component {
  init() {
    this.state = {
      thumbnail: this.props?.initialContent?.thumbnail || null,
      blocs: this.props?.initialContent?.blocs || [
        {
          file_image: null,
          image_postion: "left",
          content: "",
        },
      ],
    };
  }

  onPatch() {
    this.init();
    this.update();
    this.forceUpdate();
  }

  onRerender() {}

  get content() {
    return {
      thumbnail: this.state.thumbnail,
      blocs: this.state.blocs,
    };
  }

  onAskContent(callable) {
    const content = this.content;
    if (!this.check(content)) return callable(new Error("Invalid content"));
    callable(content);
  }

  check(content) {
    let errors = {};
    if (!content.thumbnail) {
      errors = { ...errors, thumbnail: ["La thumbnail est requise"] };
    }
    this.setState({ errors });
    return !Boolean(Object.keys(errors).length);
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
      createElement("div", { class: "form-group" }, [
        createElement(FilePicker, {
          label: "Image de couverture",
          value: this.state.thumbnail,
          onChange: (value) => {
            this.setState({ thumbnail: value });
          },
          message: this.state.errors?.thumbnail,
        }),
      ]),
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
