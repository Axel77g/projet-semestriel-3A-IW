import DomRenderer from "./DomRenderer.js";
import Routes from "./Routes.js";

export default class Router {
  constructor() {
    this.routes = [];
    this.lastRendered = null;
    window.addEventListener("routeChange", this.refresh.bind(this));
    this.route = null;
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
    let params = {};
    let pass = false;
    let target = null;
    for (let route of Routes) {
      pass = false;
      params = {};
      let routePathnameSplited = route.path.split("/");
      let pathnameSplited = pathname.split("/");
      if (pathnameSplited.length != routePathnameSplited.length) continue;
      let i = 0;
      for (let segment of routePathnameSplited) {
        let pathSegment = pathnameSplited[i];
        if (segment.startsWith(":")) {
          pass = true;
          params[segment.substring(1)] = pathSegment;
        } else if (segment == pathSegment) {
          pass = true;
        } else {
          pass = false;
          break;
        }
        i++;
      }

      if (pass) {
        target = route;
        break;
      }
    }
    if (target == null) {
      target = Routes.find((r) => r.path == "/");
    }

    this.route = {
      ...target,
      params,
      query: new URLSearchParams(window.location.search),
    };
    let component = new target.component();
    DomRenderer.build(document.body, component);
  }
}
