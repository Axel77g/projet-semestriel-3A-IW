import FilePicker from "../../components/ui/FilePicker.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export class HomeEdit extends Component {
  init() {
    this.state = {
      banner: this.props?.initialContent?.file_banner || null,
      about_content: this.props?.initialContent?.about_content || "",
    };
  }

  get content() {
    return {
      file_banner: this.state.banner?.id || null,
      about_content: this.state.about_content,
    };
  }

  onAskContent(callable) {
    callable(this.content);
  }

  render() {
    return createElement("div", { class: "mt-4" }, [
      createElement(FilePicker, {
        id: "banner_input",
        placeholder: "Image de banière",
        onChange: (file) => {
          this.setState({ banner: file });
        },
        value: this.state.banner,
        accept: "image/*",
      }),
      createElement(WYSIWYG, {
        name: "about_content",
        placeholder: "Contenu rubrique à propos",
        value: this.state.about_content,
      }),
    ]);
  }
}
