import Renderer from "./Renderer.js";
import Routes from "./Routes.js";

export default class Router {
  constructor() {
    this.routes = [];
    this.lastRendered = null;
    window.addEventListener("routeChange", this.refresh.bind(this));
  }

  push(route, state = {}, unused = "") {
    window.history.pushState(state, unused, route);
    window.dispatchEvent(new Event("routeChange"));
  }

  back() {
    window.history.back();
    window.dispatchEvent(new Event("routeChange"));
  }

  refresh() {
    document.body.innerHTML = "";
    if (this.lastRendered != null) {
      this.lastRendered.destroy();
    }

    const pathname = window.location.pathname;
    let route = Routes.find((r) => r.path == pathname);
    if (route == null) {
      route = Routes.find((r) => r.path == "/");
    }

    let component = new route.component();
    Renderer.execute(component, document.body);
  }
}
