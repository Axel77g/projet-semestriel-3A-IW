import Switch from "../../components/ui/Switch.js";
import { Table } from "../../components/ui/Table.js";
import Api from "../../core/Api.js";
import Component from "../../core/Component.js";

export class ArticleListEdit extends Component {
  init() {
    this.state = {
      articles: [],
      selectedArticles: this.props?.initialContent?.selectedArticles || [],
    };
    this.fetchArticles();
  }

  async fetchArticles() {
    const api = new Api();
    const response = await api.get("api/pages?template=article");
    if (!Array.isArray(response)) return;
    this.setState({ articles: response.map((r) => ({ ...r, selected: "" })) });
  }

  get content() {
    return {
      selectedArticles: this.state.selectedArticles,
    };
  }

  onAskContent(callable) {
    callable(this.content);
  }

  onPatch() {
    this.init();
    this.update();
    this.forceUpdate();
  }

  handleToogle(id) {
    const selectedArticles = [...this.state.selectedArticles];
    const index = selectedArticles.indexOf(id);
    if (index === -1) {
      selectedArticles.push(id);
    } else {
      selectedArticles.splice(index, 1);
    }
    this.setState({ selectedArticles });
  }

  render() {
    return createElement("div", {}, [
      createElement(Table, {
        items: this.state.articles,
        headers: [
          {
            label: "Titre",
            key: "title",
          },
          {
            label: "Visible",
            key: "selected",
          },
        ],
        templates: {
          selected: (item) => {
            return createElement(Switch, {
              checked: this.state.selectedArticles.some((id) => id == item.id),
              onChange: (e) => {
                this.handleToogle(item.id);
              },
            });
          },
        },
      }),
    ]);
  }
}
