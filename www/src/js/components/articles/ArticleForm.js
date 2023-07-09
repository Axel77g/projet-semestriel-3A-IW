import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Button from "../ui/Button.js";
import FilePicker from "../ui/FilePicker.js";
import Input from "../ui/Input.js";
import WYSIWYG from "../ui/WYSIWYG.js";

export default class ArticleForm extends Component {
  init() {
    this.state = {
      article: null,
      title: "",
      content: "<p>test</p>",
      description: "",
    };
  }

  async fetchAticle() {
    let api = new Api();
    let article = await api.get("articles/" + router.route.params.slug);
    this.setState({ article });
  }

  async handleSubmit(e) {
    let api = new Api();
    let response = await api.put("articles/" + this.state.article.id, payload);
    this.setState(payloades);
  }

  render() {
    return createElement("form", { class: ["form-article"] }, [
      createElement(Input, {
        key: "title",
        name: "title",
        placeholder: "Titre de l'article",
        value: this.state.title,
        onChange: (e) => this.setState({ title: e.value }),
      }),
      createElement(Input, {
        key: "description",
        type: "textarea",
        name: "description",
        placeholder: "Description",
        value: this.state.description,
        onChange: (e) => this.setState({ description: e.value }),
      }),
      createElement(FilePicker, {
        name: "image",
        id: "file",
        placeholder: "Choisir une image",
        onChange: (e) => this.setState({ image: e.value }),
      }),
      createElement(WYSIWYG, {
        name: "content",
        value: this.state.content,
      }),
      createElement(Button, {
        color: "primary",
        onClick: (e) => this.handleSubmit(e),
        children: "Envoyer",
      }),
    ]);
  }
}
