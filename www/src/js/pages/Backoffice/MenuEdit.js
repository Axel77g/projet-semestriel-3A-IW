import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Button from "../../components/ui/Button.js";

import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";
import Switch from "../../components/ui/Switch.js";
import { createElement } from "../../core/Element.js";
import BackofficeContainer from "./Index.js";
import { htmlDecode } from "../../utils/text_decode.js";

export default class MenuEdit extends Component {
  init() {
    this.state = {
      parent_id: null,
      pages: [],
      menus: [],

      isEdit: Boolean(router.route.params.id),
      title: "",
      url: "",
      position: 1,
      page_id: null,
      is_footer: false,
      is_header: false,

      visible: false,
      messages: {},
    };

    document.title = this.state.isEdit ? "Modifier un menu" : "Créer un menu";
    this.fetchPages();
    this.fetchMenus().then((menus) => {
      if (this.state.isEdit) this.fetchMenu(menus);
    });
  }

  async fetchMenu(menus) {
    const menu = menus.find((menu) => menu.id == router.route.params.id);
    this.setState({
      ...menu,
    });
  }

  async fetchMenus() {
    let api = new Api();
    let menus = await api.get("api/menus?all");
    this.setState({ menus });
    return menus;
  }

  async fetchPages() {
    let api = new Api();
    let pages = await api.get("api/pages");
    this.setState({ pages });
    return pages;
  }

  async handleSubmit(e) {
    let api = new Api();
    let payload = {
      title: this.state.title,
      parent_id: this.state.parent_id == "-1" ? null : this.state.parent_id,
      url: this.state.url,
      visible: this.state.visible,
      position: this.state.position,
      page_id: this.state.page_id == "-1" ? null : this.state.page_id,
      is_footer: this.state.is_footer,
      is_header: this.state.is_header,
    };

    let response;

    if (this.state.isEdit) {
      response = await api.put("api/menu/" + router.route.params.id, payload);
    } else {
      response = await api.post("api/menu", payload);
    }

    if (response.id) {
      router.push("/admin/menus", {
        alert: {
          message: "Menu enregistré avec succès",
          type: "success",
        },
      });
    } else if (response.message) {
      this.setState({ messages: response.message });
    }
  }

  render() {
    let child = createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement(
        "h1",
        {},
        this.state.isEdit ? "Editer le menu" : "Créer le menu"
      ),
      createElement("div", {}, [
        createElement("div", { class: ["form-row"] }, [
          createElement(Input, {
            key: "title",
            name: "title",
            placeholder: "Titre du menu",
            value: this.state.title,
            message: this.state.messages?.title,
            onChange: (e) => this.setState({ title: e.value }),
          }),

          createElement(Select, {
            key: "parent_id",
            name: "parent_id",
            label: "Parent",
            placeholder: "Aucun parent",
            options: this.state.menus
              .filter(({ id }) => id != router.route.params.id)
              .filter((page) => page.parent_id === null)
              .map(({ id, title }) => ({
                value: id,
                label: htmlDecode(title),
              })),
            value: this.state.parent_id,
            onChange: (e) => this.setState({ parent_id: e.value }),
          }),
        ]),
        createElement("div", { class: ["form-row"] }, [
          createElement(Select, {
            key: "page_id",
            name: "page_id",
            placeholder: "Page",
            options: this.state.pages.map(({ id, title }) => ({
              value: id,
              label: htmlDecode(title),
            })),
            value: this.state.page_id,
            message: this.state.messages?.page_id,
            onChange: (e) => this.setState({ page_id: e.value }),
          }),
          createElement(Input, {
            key: "position",
            name: "position",
            type: "number",
            placeholder: "Position",
            value: this.state.position,
            message: this.state.messages?.position,
            onChange: (e) => this.setState({ position: e.value }),
          }),
        ]),
        createElement("div", { class: ["form-row"] }, [
          createElement(Switch, {
            key: "visible",
            name: "visible",
            label: "Visible",
            checked: this.state.visible,
            message: this.state.messages?.visible,
            onChange: (e) => this.setState({ visible: e.checked }),
          }),
          createElement(Switch, {
            key: "is_header",
            name: "is_header",
            label: "Afficher dans le header",
            checked: this.state.is_header,
            message: this.state.messages?.is_header,
            onChange: (e) => this.setState({ is_header: e.checked }),
          }),
          createElement(Switch, {
            key: "is_footer",
            name: "is_footer",
            label: "Afficher dans le footer",
            checked: this.state.is_footer,
            message: this.state.messages?.is_footer,
            onChange: (e) => this.setState({ is_footer: e.checked }),
          }),
        ]),
        createElement(Button, {
          key: "submit",
          class: ["btn", "btn-primary", "mt-4"],
          onClick: this.handleSubmit.bind(this),
          children: "Enregistrer",
        }),
      ]),
    ]);

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
