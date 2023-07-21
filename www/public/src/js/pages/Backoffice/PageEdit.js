import Button from "../../components/ui/Button.js";
import { History } from "../../components/ui/History.js";
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
      template: "article",
      parent_slug: null,
      content: {},
      is_commentable: false,
      meta_description: "",

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

      errors: {},
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
    return new Promise((resolve, reject) => {
      this.propagate("AskContent", (content) => {
        if (content instanceof Error) {
          console.error(content);
          let container = document.querySelector(".text-danger");
          container.scrollIntoView({ behavior: "smooth" });
          return resolve(false);
        } else {
          this.setState({ content });
          return resolve(true);
        }
      });
    });
  }

  async handleSubmit(e) {
    let res = await this.getChildrenContent();
    if (!res) return;
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
      meta_description: this.state.meta_description ?? "",
    };

    const api = new Api();
    let response = await api[method](endpoint, payload);
    if (response?.id) {
      router.push("/admin/pages", {
        alert: {
          message: "Page enregistrée avec succès",
          type: "success",
        },
      });
    } else {
      if (response.code == 422) {
        this.setState({ errors: response.message });
      }
    }
  }

  async handleRemember(page) {
    this.setState({
      id: page.id,
      slug: page.slug,
      title: page.title,
      template: page.template,
      parent_slug: page.parent_slug,
      content: page.content,
      is_commentable: page.is_commentable,
      meta_description: page.meta_description,
    });

    this.propagate("Patch");
  }

  async fetchPage(pages) {
    const page = pages.find((page) => page.slug == this.slug);
    if (page) {
      this.setState({
        id: page.id,
        slug: page.slug,
        title: page.title,
        template: page.template,
        parent_slug: page.parent_slug,
        content: page.content,
        is_commentable: page.is_commentable,
        meta_description: page.meta_description,
        path: page.path,
      });

      this.propagate("Patch");
    }
  }

  async fetchPages() {
    const api = new Api();
    const pages = await api.get("api/pages");

    if (Array.isArray(pages)) {
      this.setState({
        parentOptions: pages
          .filter((page) => page.slug != this.slug && page.template != "home")
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
        createElement("div", { class: ["form-row"] }, [
          createElement(
            "h1",
            {},
            this.state.isEdit ? "Modification de page" : "Creation de page"
          ),
          createElement(Button, {
            children: "Voir la page",
            onClick: () => {
              router.push(
                this.state.template == "home" ? "/" : this.state.path
              );
            },
          }),
        ]),
        createElement("div", { class: ["form-row"] }, [
          createElement(Input, {
            name: "title",
            placeholder: "Titre de la page ",
            onChange: this.handleChange.bind(this),
            value: this.state.title,
            message: this.state.errors.title,
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
            noDefault: true,
            onChange: this.handleChange.bind(this),
            value: this.state.template,
            message: this.state.errors.template,
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
          createElement(Input, {
            name: "meta_description",
            placeholder: "Meta description",
            onChange: this.handleChange.bind(this),
            value: this.state.meta_description,
            message: this.state.errors.meta_description,
          }),
          createElement("div", { class: "align-self-end" }, [
            createElement(Switch, {
              name: "is_commentable",
              label: "Commentaires",
              checked: this.state.is_commentable,
              onChange: (e) => this.setState({ is_commentable: e.checked }),
            }),
          ]),
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
        ,
      ].filter(Boolean)
    );

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child: [
          child,
          this.state.isEdit &&
            createElement(History, {
              model_id: this.state.id,
              model: "App\\Models\\Page",
              onRemember: this.handleRemember.bind(this),
            }),
        ],
      }),
    ]);
  }
}
