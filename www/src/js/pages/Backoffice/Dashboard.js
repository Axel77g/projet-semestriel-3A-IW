import Component from "../../core/Component.js";
import BackofficeContainer from "./Index.js";
import Api from "../../core/Api.js";
import Graph from "../../components/ui/Chart.js";

export default class Dashboard extends Component {
  init() {
    const api = new Api();
    this.state = {
      topArticles: null,
    };

    this.fetchTopArticle();
    this.statLogs();
    this.statComments();
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
                label: "Articles les plus lus",
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

  async statLogs() {
    const api = new Api();
    const response = await api.get("api/analytics/stat-logs");
    let stats = response.map((log) => {
      log.date = new Date(new Date(log["created_at"]).toDateString());
      return log;
    });

    const lastWeek = Dashboard.getLastWeek();
    stats = stats.filter((log) => {
      return (
        log.date.getTime() <= lastWeek[0].getTime() &&
        log.date.getTime() >= lastWeek[6].getTime()
      );
    });

    let statsByDay = [];

    for (let i = 0; i < 7; i++) {
      let stat = stats.filter((log) => {
        return log.date.getTime() === lastWeek[i].getTime();
      });
      statsByDay.push(stat.length);
    }

    this.setState({
      totalLogs: response.length,
      statLogs: {
        type: "bar",
        data: {
          labels: lastWeek.map((date) => date.toLocaleDateString()).reverse(),
          datasets: [
            {
              label: "Statistiques des logs",
              data: statsByDay.reverse(),
              borderWidth: 1,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
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

  static getLastWeek() {
    let today = new Date();
    const week = [];

    for (let i = 0; i < 7; i++) {
      week.push(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      );
    }
    return week;
  }

  async statComments() {
    const api = new Api();
    const response = await api.get("api/analytics/stat-comments");

    let stats = response.map((log) => {
      log.date = new Date(new Date(log["created_at"]).toDateString());
      return log;
    });

    const lastWeek = Dashboard.getLastWeek();
    stats = stats.filter((log) => {
      return (
        log.date.getTime() <= lastWeek[0].getTime() &&
        log.date.getTime() >= lastWeek[6].getTime()
      );
    });

    let statsByDay = [];

    for (let i = 0; i < 7; i++) {
      let stat = stats.filter((log) => {
        return log.date.getTime() === lastWeek[i].getTime();
      });
      statsByDay.push(stat.length);
    }

    this.setState({
      totalComments: response.length,
      statComments: {
        type: "bar",
        data: {
          labels: lastWeek.map((date) => date.toLocaleDateString()).reverse(),
          datasets: [
            {
              label: "Statistiques des Commentaires",
              data: statsByDay.reverse(),
              borderWidth: 1,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgb(153, 102, 255)",
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

  render() {
    let child = createElement("div", { class: "container" }, [
      createElement("h1", {}, "Dashboard"),
      createElement("div", { class: "container" }, [
        //  Statistiques des logs
        createElement("h2", {}, "Logs"),
        createElement("p", {}, "Total de connexion : " + this.state.totalLogs),
        createElement("canvas", { id: "mychart-second" }, ""),
        createElement(Graph, {
          id: "mychart-second",
          data: this.state.statLogs,
        }),

        //  Articles les plus lus
        createElement("h2", {}, "Articles les plus lus"),
        createElement("canvas", { id: "mychart-main" }, ""),
        createElement(Graph, {
          id: "mychart-main",
          data: this.state.topArticles,
        }),

        //  Statistiques des commentaires
        createElement("h2", {}, "Commentaires"),
        createElement(
          "p",
          {},
          "Total de commentaires : " + this.state.totalComments
        ),
        createElement("canvas", { id: "mychart-third" }, ""),
        createElement(Graph, {
          id: "mychart-third",
          data: this.state.statComments,
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
