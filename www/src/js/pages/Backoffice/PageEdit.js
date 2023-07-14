import Button from "../../components/ui/Button.js";
import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";
import Switch from "../../components/ui/Switch.js";
import WYSIWYG from "../../components/ui/WYSIWYG.js";
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
      isEdit: Boolean(this.slug),
      
      slug: "",
      template: -1,
      parent_slug: null,
      content: {},
      is_commentable: false,
      
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
      
      parentOptions: [],
    };
    document.title = this.state.isEdit ? "Modifier une page" : "Créer une page";

    this.fetchPages().then((pages) => {
      if (this.state.isEdit) this.fetchPage(pages);
    });
    WYSIWYG.addLibraries().then(this.update.bind(this));
  }

  get editComponent() {
    if (this.state.template == -1) return null;
    return eval("_" + this.state.template);
  }

  get slug() {
    return router.route.params.slug;
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

  async handleSubmit(e) {
    this.getChildrenContent();

    const method = this.state.isEdit ? "put" : "post";
    const endpoint = this.state.isEdit
      ? "api/pages/" + router.route.params.slug
      : "api/pages";

    const payload = {
      title: this.state.title ?? null,
      template: this.state.template == -1 ? null : this.state.template,
      content: this.state.content,
      parent_slug: this.state.parent_slug ?? null,
      is_commentable: this.state.is_commentable,
    };

    const api = new Api();
    let response = await api[method](endpoint, payload);
    if (response?.id) {
      router.push("/admin/pages");
    } else {
      alert("Une erreur est survenue");
    }
  }

  async fetchPage(pages) {
    const page = pages.find((page) => page.slug == this.slug);
    if (page) {
      this.setState({
        slug: page.slug,
        title: page.title,
        template: page.template,
        parent_slug: page.parent_slug,
        content: page.content,
        is_commentable: page.is_commentable,
      });
    }
  }

  async fetchPages() {
    const api = new Api();
    const pages = await api.get("api/pages?withContent=true");

    if (Array.isArray(pages)) {
      this.setState({
        parentOptions: pages
          .filter((page) => page.slug != this.slug)
          .map((page) => ({
            label: page.title,
            value: page.slug,
          })),
      });

      return pages;
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
        createElement("div", { class: ["form-row"] }, [
          createElement(Input, {
            name: "title",
            placeholder: "Titre de la page ",
            onChange: this.handleChange.bind(this),
            value: this.state.title,
          }),
          createElement(Input, {
            name: "slug",
            placeholder: "Slug de la page",
            value: this.state.slug,
            attributes: {
              disabled: true,
            },
          }),
        ]),
        createElement("div", { class: ["form-row"] }, [
          createElement(Select, {
            options: this.state.typesOptions,
            name: "template",
            label: "Template de page",
            placeholder: "Template de page",
            onChange: this.handleChange.bind(this),
            value: this.state.template,
          }),
          createElement(Select, {
            options: this.state.parentOptions,
            name: "parent_slug",
            label: "Page parent",
            placeholder: "Aucune page parent",
            onChange: this.handleChange.bind(this),
            value: this.state.parent_slug,
          }),
        ]),
        createElement("div", { class: ["form-row"] }, [
          createElement(Switch, {
            name: "is_commentable",
            label: "Commentaires",
            checked: this.state.is_commentable,
            onChange: (e) => this.setState({ is_commentable: e.checked }),
          }),
        ]),
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
