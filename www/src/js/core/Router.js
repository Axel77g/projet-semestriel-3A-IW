import Renderer from "./Renderer.js";
import Routes from "./Routes.js";

export default class Router {
  constructor() {
    this.routes = [];
    this.lastRendered = null;
    window.addEventListener("routeChange", this.refresh.bind(this));
    this.refresh();
  }

  push(route, ...parms) {
    window.dispatchEvent(new Event("routeChange"));
    window.history.pushState(route, ...parms);
  }

  back() {
    window.history.back();
    window.dispatchEvent(new Event("routeChange"));
  }

  refresh() {
    if (this.lastRendered != null) {
      this.lastRendered.destroy();
    }

    const pathname = window.location.pathname;
    let route = Routes.find((r) => r.path == pathname);
    if (route == null) {
      route = Routes.find((r) => r.path == "/");
    }

    console.log(route);
    let component = new route.component();
    Renderer.execute(component, document.body);
  }
}
