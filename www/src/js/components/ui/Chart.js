import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class Graph extends Component {
  init() {
    
    this.state = {
      id: this.props.id ?? "myChart",
    };

    this.onUpdate();
  }

async onUpdate() {
  
    await Graph.addLibraries();
    this.onRerender();
  }

  onRerender() {
    console.log(this.props);
      if(this.c) this.c.destroy()
      const container = document.getElementById(this.state.id);
      
      this.c = new Chart(container, this.props.data);
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
    return createElement("hr", {}, "");
  }
}
