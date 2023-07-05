import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Menu from "./Menu.js";
import Button from "../../components/ui/Button.js";

export default class MenuList extends Component {
  init() {
    this.state = {
      menus: [],
    };
    this.fetchMenus();
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
    if (this.state.menus.length === 0) {
      return createElement("div", { class: ["container-fluid", "mt-4"] }, [
        createElement("p", {}, "Loading"),
      ]);
    }

    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement("h1", {}, "Liste de tous les menus"),
      // Create the grid row
      createElement("div", { class: ["row"] }, [
        // Create the grid column
        createElement("div", { class: ["col-12"] }, [
          // Create the button
          createElement(Button, {
            class: ["btn", "btn-primary", "mb-4"],
            onClick: () => {
              router.push("menu/create");
            },
            children: "Créer un menu",
          }),
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
                          router.push("menu/edit/" + menu.id);
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
      ]),
    ]);
  }
}
