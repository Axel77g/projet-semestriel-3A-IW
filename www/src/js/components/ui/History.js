import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";
import { Table } from "../../components/ui/Table.js";
import Api from "../../core/Api.js";

export class History extends Component {
  init() {
    this.state = {
      history: [],
    };
  }
  onRerender() {
    this.fetchHistory();
  }

  async handleRemember(item) {
    const api = new Api();
    const response = await api.put("api/history/back/" + item.id);
    if (response?.id) {
      this?.props?.onRemember(response);
    }
  }

  async fetchHistory() {
    if (!this.props.model_id) return;
    if (this?.hasFetched) return;
    const api = new Api();
    const payload = {
      model_id: this.props.model_id,
      model: this.props.model,
    };
    const history = await api.post("api/history/", payload);
    this.setState({ history, id: this.props.model_id });
    this.hasFetched = true;
  }

  render() {
    return createElement("div", {}, [
      createElement("div", { class: ["d-flex", "justify-content-between"] }, [
        createElement("h1", {}, "Historique"),
      ]),
      createElement("div", {}, [
        createElement(Table, {
          items: this.state.history,
          headers: [
            {
              label: "Date de création",
              key: "updated_at",
            },
          ],
          itemActions: [
            {
              label: "Prévisualiser cette version",
              props: {
                class: ["btn", "btn-primary"],
              },
              onClick: this.handleRemember.bind(this),
            },
          ],
          templates: {
            updated_at: (item) => {
              let date = new Date(item.updated_at);
              return createElement("span", {}, date.toLocaleDateString());
            },
          },
        }),
      ]),
    ]);
  }
}
