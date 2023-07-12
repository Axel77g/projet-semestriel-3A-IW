import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Menu from "../menus/Menu.js";
import Button from "../../components/ui/Button.js";
import BackofficeContainer from "./Index.js";
import { createElement } from "../../core/Element.js";
import { Table } from "../../components/ui/Table.js";

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
      const response = await api.get("api/menus");
      this.setState({
        menus: response,
      });
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
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
              { class: ["badge", "text-bg-primary"] },
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
            onClick: (item) => {
              console.log("Delete", item.id);
            },
          },
        ],
      }),
      // Create the grid row
      /* createElement("div", { class: ["row"] }, [
        // Create the grid column
        createElement("div", { class: ["col-12"] }, [
          // Create the button

          // Create the table
          createElement(
            "table",
            { class: ["table", "table-striped", "table-hover", "mt-4"] },
            [
              // Create the table head
              createElement("thead", {}, [
                // Create the table row
                createElement(
                  "tr",
                  {},
                  ["ID", "Parent ID", "Titre", "Visible", "Actions"].map(
                    (title) => createElement("th", {}, title)
                  )
                ),
              ]),
              // Create the table body
              createElement(
                "tbody",
                {},
                // Create the table rows
                this.state.menus.map((menu) =>
                  createElement("tr", { key: menu.id }, [
                    createElement("td", {}, menu.id),
                    createElement(
                      "td",
                      {},
                      menu.parent_id
                        ? this.state.menus.find((m) => m.id === menu.parent_id)
                            .title
                        : "Aucun"
                    ),
                    createElement("td", {}, menu.title),
                    createElement("td", {}, [
                      createElement(
                        "span",
                        { class: ["badge", "text-bg-primary"] },
                        menu.visible ? "Visible" : "Invisible"
                      ),
                    ]),
                    createElement("td", {}, [
                      createElement(Button, {
                        class: ["btn", "btn-primary", "mb-4"],
                        onClick: () => {
                          router.push("/admin/menu/edit/" + menu.id);
                        },
                        children: "Editer",
                      }),
                    ]),
                  ])
                )
              ),
            ]
          ),
        ]),
      ]), */
    ]);

    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
