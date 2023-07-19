import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Menu from "../menus/Menu.js";
import Button from "../../components/ui/Button.js";
import BackofficeContainer from "./Index.js";
import { createElement } from "../../core/Element.js";
import { Table } from "../../components/ui/Table.js";
import { htmlDecode } from "../../utils/text_decode.js";

export default class MenuList extends Component {
  init() {
    this.state = {
      menus: [],
    };
    this.fetchMenus();
    document.title = "Liste des menus";
  }

  // Fetch the /api/menusw
  async fetchMenus() {
    let api = new Api();
    try {
      const response = await api.get("api/menus?all");
      this.setState({
        menus: response,
      });
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  }

  handleDelete({ id }) {
    const api = new Api();
    api.delete(`api/menu/${id}`).then((response) => {
      this.fetchMenus();
    });
  }

  render() {
    let child = createElement("div", {}, [
      createElement("div", { class: ["d-flex", "justify-content-between"] }, [
        createElement("h1", {}, "Liste des menus"),
        createElement(Button, {
          onClick: () => {
            router.push("/admin/menu/create");
          },
          children: "Créer un menu",
        }),
      ]),

      createElement(Table, {
        headers: [
          {
            label: "ID",
            key: "id",
          },
          {
            label: "Parent ID",
            key: "parent_id",
          },
          {
            label: "Titre",
            key: "title",
          },
          {
            label: "Visible",
            key: "visible",
          },
        ],
        items: this.state.menus,
        templates: {
          visible: (item) => {
            return createElement(
              "span",
              {
                class: [
                  "badge",
                  "" + item.visible ? "text-bg-primary" : "text-bg-danger",
                ],
              },
              item.visible ? "Visible" : "Invisible"
            );
          },
          parent_id: (item) => {
            return createElement(
              "span",
              {},
              item.parent_id
                ? this.state.menus.find((m) => m.id === item.parent_id).title
                : "Aucun"
            );
          },
          title: (item) => {
            return createElement(
              "a",
              { href: "/admin/menu/edit/" + item.id },
              htmlDecode(item.title)
            );
          },
        },
        itemActions: [
          {
            props: {
              class: ["btn-secondary"],
            },
            label: "Editer",
            onClick: (item) => {
              router.push("/admin/menu/edit/" + item.id);
            },
          },
          {
            props: {
              class: ["btn-danger"],
            },
            label: "Supprimer",
            onClick: this.handleDelete.bind(this),
          },
        ],
      }),
    ]);

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
