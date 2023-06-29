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
      content: "",
      description: "",
    };
  }

  async fetchAticle() {
    let api = new Api();
    let article = await api.get("articles/" + router.route.params.slug);
    this.setState({ article });
  }

  async handleSubmit(e) {
    let payload = {};
    this.children.forEach((child) => {
      if (child.props.name)
        payload[child.props.name] = child.state?.value || null;
    });

    let api = new Api();
    let response = await api.put("articles/" + this.state.article.id, payload);
    console.log(response);
    this.setState(rpayloades);
  }

  render() {
    return createElement("form", { class: ["form-article"] }, [
      new Input({
        name: "title",
        placeholder: "Title",
        value: this.state.title,
      }),
      new Input({
        type: "textarea",
        name: "description",
        placeholder: "Description",
        value: this.state.description,
      }),
      new FilePicker({
        name: "image",
        id: "file",
        placeholder: "Choisir une image",
      }),
      new WYSIWYG({
        name: "content",
      }),
      new Button({
        color: "primary",
        onClick: (e) => this.handleSubmit(e),
        children: "Envoyer",
      }),
    ]);
  }
}
