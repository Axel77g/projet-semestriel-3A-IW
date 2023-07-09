import Button from "../../components/ui/Button.js";
import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";
import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

/* templates */
import {
  HomeEdit as _home,
  ArticleEdit as _article,
  ArticleListEdit as _article_list,
} from "../../templates/index.js";
import BackofficeContainer from "./Index.js";

export default class PageEdit extends Component {
  init() {
    this.state = {
      isEdit: Boolean(router.route.params.slug),

      template: -1,
      parent_slug: null,
      content: {},

      typesOptions: [
        {
          label: "Home",
          value: "home",
        },
        {
          label: "Article",
          value: "article",
        },
        {
          label: "Articles list",
          value: "article_list",
        },
      ],
    };
    if (this.state.isEdit) this.fetchPage();
  }

  get editComponent() {
    if (this.state.template == -1) return null;
    return eval("_" + this.state.template);
  }

  handleChange(e) {
    this.setState({
      [e.name]: e.value,
    });
  }

  getChildrenContent() {
    this.propagate("AskContent", (content) => {
      this.setState({ content });
    });
  }

  setChildrenContent(content) {
    this.propagate("SetContent", content);
  }

  async handleSubmit(e) {
    this.getChildrenContent();

    const method = this.state.isEdit ? "put" : "post";
    const endpoint = this.state.isEdit
      ? "api/pages/" + router.route.params.slug
      : "api/pages";

    const payload = {
      title: this.state.title,
      template: this.state.template,
      content: this.state.content,
      parent_slug: this.state.parent_slug ?? null,
    };

    const api = new Api();
    let response = await api[method](endpoint, payload);

    if (response && response.code < 400) {
      router.push("/admin/pages");
    } else {
      alert("Une erreur est survenue");
    }
  }

  async fetchPage() {
    const api = new Api();
    const page = await api.get("api/pages/" + router.route.params.slug);

    if (!Boolean(page instanceof Error)) {
      this.setState({
        title: page.title,
        template: page.template,
        parent_slug: page.parent_slug,
        content: page.content,
      });
    }
  }

  render() {
    let child = createElement(
      "div",
      {},
      [
        createElement(
          "h1",
          {},
          this.state.isEdit ? "Modification de page" : "Creation de page"
        ),
        createElement(Input, {
          name: "title",
          placeholder: "Titre de la page ",
          onChange: this.handleChange.bind(this),
          value: this.state.title,
        }),
        createElement(Select, {
          options: this.state.typesOptions,
          name: "template",
          label: "Template de page",
          placeholder: "Template de page",
          onChange: this.handleChange.bind(this),
          value: this.state.template,
        }),

        createElement(
          "div",
          { class: ["my-4"] },
          this.editComponent
            ? [
                createElement(this.editComponent, {
                  initialContent: this.state.content,
                }),
              ]
            : "Aucun template selectionné"
        ),
        createElement("div", {}, [
          createElement(Button, {
            onClick: this.handleSubmit.bind(this),
            children: "Enregistrer",
          }),
        ]),
      ].filter(Boolean)
    );

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
