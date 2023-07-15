import Button from "../../components/ui/Button.js";
import { Link } from "../../components/ui/Link.js";
import { Table } from "../../components/ui/Table.js";
import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import BackofficeContainer from "./Index.js";

export default class UserList extends Component {
  init() {
    this.state = {
      users: [],
    };
    this.fetchUsers();
  }

  async fetchUsers() {
    const api = new Api();
    const users = await api.get("api/users");
    if (Array.isArray(users)) this.setState({ users });
  }

  render() {
    let child = createElement("div", {}, [
      createElement("div", { class: ["d-flex", "justify-content-between"] }, [
        createElement("h1", {}, "Liste des utilisateurs"),
        createElement(Button, {
          onClick: () => {
            router.push("/admin/users/create");
          },
          children: "Créer un utilisateur",
        }),
      ]),

      createElement("div", {}, [
        createElement(Table, {
          items: this.state.users,
          headers: [
            {
              label: "ID",
              key: "id",
            },
            {
              label: "Nom",
              key: "lastname",
            },
            {
              label: "Prénom",
              key: "firstname",
            },
            {
              label: "Email",
              key: "email",
            },
            {
              label: "Rôle",
              key: "role",
            },
            {
              label: "Statut",
              key: "is_verified",
            },
          ],
          templates: {
            email: (item) => {
              item.email = item.email.replace(/(?<=.).(?=[^@]+?@)/g, "*");
              return createElement("span", {}, item.email);
            },

            is_verified: (item) => {
              return createElement(
                "span",
                item.is_verified
                  ? { class: ["badge", "text-bg-success"] }
                  : { class: ["badge", "text-bg-danger"] },
                item.is_verified ? "Verifié" : "Non vérifié"
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
                router.push("/admin/users/edit/" + item.id);
              },
            },
            {
              label: "Delete",
              props: {
                class: ["btn-danger"],
              },
              onClick: (item) => {
                if (
                  confirm("Voulez-vous vraiment supprimer cet utilisateur ?")
                ) {
                  const api = new Api();
                  api.delete("api/users/" + item.id).then(() => {
                    this.fetchUsers();
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
