import Component from "../../core/Component.js";
import BackofficeContainer from "./Index.js";
import Api from "../../core/Api.js";
import Graph from "../../components/ui/Chart.js";

export default class Dashboard extends Component {
  init() {
    const api = new Api();
    this.fetchTopArticle();
    this.state = {
      topArticles: null,
    };

    document.title = "Dashboard";
  }

  async fetchTopArticle() {
    const api = new Api();
    const response = await api.get("api/analytics/top-article");
    if (Array.isArray(response)) {
      this.setState({
        topArticles: {
          type: "bar",
          data: {
            labels: response.map((article) => article.title),
            datasets: [
              {
                label: "Article les plus vus",
                data: response.map((article) => article.views),
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        },
      });


    }
  }

  render() {
    console.log(this.state);
   
      let child = createElement("div", { class: "container" }, [
        createElement("h1", {}, "Dashboard"),
        createElement("canvas", { id: "mychart-main" }, ""),
        createElement(Graph, {
          id: "mychart-main",
          data: this.state.topArticles,
         
        }),

        createElement("canvas", { id: "mychart-second" }, ""),
        createElement(Graph, {
          id: "mychart-second",
          data: this.state.topArticles,
         
        }),
      ]);



    return createElement("div", {}, [
      createElement(BackofficeContainer, {
        child,
      }),
    ]);
  }
}
