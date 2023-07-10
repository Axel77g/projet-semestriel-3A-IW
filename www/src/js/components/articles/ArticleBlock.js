import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import FilePicker from "../ui/FilePicker.js";
import Select from "../ui/Select.js";
import WYSIWYG from "../ui/WYSIWYG.js";

export default class ArticleBlock extends Component {
  init() {
    console.log("Create ArticleBlock");
    this.state = {
      image: this.props?.image || null,
      image_position: this.props?.image_position || "left",
      content: this.props?.content || "",
    };
  }

  render() {
    return createElement("div", { id: this.key }, [
      createElement(FilePicker, {
        id: "image_input_article_block",
        placeholder: "Image",
        onChange: (file) => {
          this.setState({ image: file });
        },
      }),
      createElement(Select, {
        id: "image_position_input_article_block",
        placeholder: "Position de l'image",
        options: [
          { value: "left", label: "Gauche" },
          { value: "right", label: "Droite" },
        ],
        value: this.state.image_position,
      }),
      createElement(WYSIWYG, {
        key: "content_input_article_block-" + this.key,
        name: "content",
        placeholder: "Contenu du paragraph",
        value: this.state.content,
      }),
    ]);
  }
}
