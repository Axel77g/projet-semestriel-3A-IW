import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class Graph extends Component {
  init() {
    
    this.state = {
      data: this.props.data ?? null,
      id: this.props.id ?? "myChart",
    };

    this.onUpdate();
  }

async onUpdate() {
  console.log(this.props);
    await Graph.addLibraries();
    this.onRerender();
  }

  onRerender() {
    if(this.state.data) {
      
      const container = document.getElementById(this.state.id);
      
      new Chart(container, this.state.data);
      }
  }

  static addScript() {
    return new Promise((resolve, reject) => {
      let exist = document.head.querySelector(
        "script[src='https://cdn.jsdelivr.net/npm/chart.js']"
      );

      if (!exist) {
        let script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        document.head.appendChild(script);
        script.onload = () => {
          resolve();
        };
      } else {
        resolve();
      }
    });
  }

  static async addLibraries() {
    await Promise.all([Graph.addScript()]);
  }

  render() {
    if (this.state.data) {
      return createElement("p", {}, "non vide");
    }
    return createElement("p", {}, "vide");
  }
}
