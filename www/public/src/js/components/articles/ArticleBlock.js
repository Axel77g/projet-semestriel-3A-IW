import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import Button from "../ui/Button.js";
import FilePicker from "../ui/FilePicker.js";
import Select from "../ui/Select.js";
import WYSIWYG from "../ui/WYSIWYG.js";

export default class ArticleBlock extends Component {
  forceUpdate() {
    this.$components.forEach((c) => {
      if (c instanceof WYSIWYG) {
        c.setState({ value: c.props?.value || "" });
      }
    });
  }

  handleChange(obj) {
    if (this.props.onChange) {
      this.props.onChange(obj);
    }
  }

  handleDelete() {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  handleMove(direction) {
    if (this.props.onMove) {
      this.props.onMove(direction);
    }
  }

  render() {
    return createElement("div", { id: this.key }, [
      createElement(FilePicker, {
        id: "image_input_article_block",
        placeholder: "Image",
        onChange: (file) => {
          this.handleChange({ file_image: file });
        },
        value: this.props.file_image,
      }),
      createElement(Select, {
        id: "image_position_input_article_block",
        placeholder: "Position de l'image",
        options: [
          { value: "left", label: "Gauche" },
          { value: "right", label: "Droite" },
        ],
        value: this.props.image_position,
        onChange: (e) => {
          this.handleChange({ image_position: e.value });
        },
      }),
      createElement(WYSIWYG, {
        key: "content_input_article_block-" + this.key,
        placeholder: "Contenu du paragraphe",
        value: this.props.content,
        onChange: (e) => {
          this.handleChange({ content: e.value });
        },
      }),

      createElement("div", { class: ["d-flex"] }, [
        createElement(Button, {
          class: ["btn-danger"],
          children: [createElement("i", { class: ["bi", "bi-trash"] })],
          onClick: () => {
            this.handleDelete();
          },
        }),
        createElement(Button, {
          class: ["btn-secondary", "d-block", "mx-2"],
          children: [createElement("i", { class: ["bi", "bi-arrow-down"] })],
          onClick: () => {
            this.handleMove("down");
          },
        }),
        createElement(Button, {
          class: ["btn-secondary"],
          children: [createElement("i", { class: ["bi", "bi-arrow-up"] })],
          onClick: () => {
            this.handleMove("up");
          },
        }),
      ]),
    ]);
  }
}
