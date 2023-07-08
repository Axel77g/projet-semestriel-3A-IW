import Button from "../../components/ui/Button.js";
import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

/* templates */
import {
  HomeEdit,
  ArticleEdit,
  ArticleListEdit,
} from "../../templates/index.js";

export default class PageEdit extends Component {
  init() {
    this.state = {
      template: -1,
      typesOptions: [
        {
          label: "Home",
          value: "Home",
        },
        {
          label: "Article",
          value: "Article",
        },
        {
          label: "Articles list",
          value: "ArticleList",
        },
      ],
    };
  }

  get editComponent() {
    if (this.state.template == -1) return null;
    return eval(this.state.template + "Edit");
  }

  handleChange(e) {
    this.setState({
      [e.name]: e.value,
    });
  }
  handleSubmit(e) {
    console.log("submit");
    console.log(this);
    console.log(e);
  }
  render() {
    return createElement(
      "div",
      {},
      [
        createElement(Input, {
          name: "title",
          placeholder: "Titre de la page",
          onChange: this.handleChange.bind(this),
        }),
        createElement(Select, {
          options: this.state.typesOptions,
          name: "template",
          label: "Template de page",
          placeholder: "Template de page",
          onChange: this.handleChange.bind(this),
        }),
        createElement("div", {}, [
          createElement(Button, {
            onClick: this.handleSubmit.bind(this),
            children: "Enregistrer",
          }),
        ]),
        this.editComponent ? createElement(this.editComponent, {}) : null,
      ].filter(Boolean)
    );
  }
}
