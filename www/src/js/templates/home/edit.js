import FilePicker from "../../components/ui/FilePicker.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export class HomeEdit extends Component {
  init() {
    this.state = {
      content: "",
    };
  }
  render() {
    return createElement("div", { class: "mt-4" }, [
      createElement(WYSIWYG, {
        name: "content",
        placeholder: "Contenu rubrique à propos",
        value: this.state.content,
      }),
      createElement("div", { class: "mb-4" }, ""),
      createElement(FilePicker, {
        id: "banner_input",
        placeholder: "Image de banière",
      }),
    ]);
  }
}
