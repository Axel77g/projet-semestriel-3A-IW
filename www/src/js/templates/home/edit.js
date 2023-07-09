import FilePicker from "../../components/ui/FilePicker.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export class HomeEdit extends Component {
  init() {
    this.state = {
      banner: null,
      about_content: "",
    };
  }

  get content() {
    return {
      banner_id: this.state.banner.id,
      about_content: this.state.about_content,
    };
  }
  render() {
    return createElement("div", { class: "mt-4" }, [
      createElement(FilePicker, {
        id: "banner_input",
        placeholder: "Image de banière",
        onChange: (e) => {},
        value: this.state.banner,
      }),
      createElement(WYSIWYG, {
        name: "content",
        placeholder: "Contenu rubrique à propos",
        value: this.state.content,
      }),
    ]);
  }
}
