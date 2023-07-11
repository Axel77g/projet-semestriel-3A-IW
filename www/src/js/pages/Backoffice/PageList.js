import Button from "../../components/ui/Button.js";
import { Link } from "../../components/ui/Link.js";
import { Table } from "../../components/ui/Table.js";
import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import BackofficeContainer from "./Index.js";

export default class PageList extends Component {
  init() {
    this.state = {
      pages: [],
    };
    this.fetchPages();
  }

  async fetchPages() {
    const api = new Api();
    const pages = await api.get("api/pages");
    if (Array.isArray(pages)) this.setState({ pages });
  }

  render() {
    let child = createElement("div", {}, [
      createElement("div", { class: ["d-flex", "justify-content-between"] }, [
        createElement("h1", {}, "Liste des pages"),
        createElement(Button, {
          onClick: () => {
            router.push("/admin/pages/create");
          },
          children: "Créer une page",
        }),
      ]),

      createElement("div", {}, [
        createElement(Table, {
          items: this.state.pages,
          headers: [
            {
              label: "ID",
              key: "id",
            },
            {
              label: "Titre",
              key: "title",
            },
          ],
          templates: {
            title: (item) => {
              return createElement(
                "a",
                { href: "/admin/pages/edit/" + item.slug },
                item.title
              );
            },
          },
          itemActions: [
            {
              label: "Edit",
              props: {
                class: ["btn-secondary"],
              },
              onClick: (item) => {
                router.push("/admin/pages/edit/" + item.slug);
              },
            },
            {
              label: "Delete",
              props: {
                class: ["btn-danger"],
              },
              onClick: (item) => {
                if (confirm("Are you sure you want to delete this page?")) {
                  const api = new Api();
                  api.delete("api/pages/" + item.id).then(() => {
                    this.fetchPages();
                  });
                }
              },
            },
          ],
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
