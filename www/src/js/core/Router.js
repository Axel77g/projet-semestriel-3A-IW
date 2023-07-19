import DomRenderer from "./DomRenderer.js";
import Routes from "./Routes.js";

import Api from "./Api.js";
import PV from "../pages/_PageView.js";
import { AUTH_STATE, AuthUtils } from "../utils/auth.js";

export default class Router {
  constructor() {
    this.routes = [];
    this.lastRendered = null;
    window.addEventListener("routeChange", this.refresh.bind(this));
    window.addEventListener("popstate", () => {
      this.refresh();
    });
    this.route = null;
    this.auth = {
      user: null,
      isAuth: AUTH_STATE.UNKOWN,
    };
  }

  push(route, state = {}, unused = "") {
    window.history.pushState(state, unused, route);
    window.dispatchEvent(new Event("routeChange"));
  }

  back() {
    window.history.back();
    window.dispatchEvent(new Event("routeChange"));
  }

  async refresh() {
    if (this.auth.isAuth === AUTH_STATE.UNKOWN) {
      const auth = await AuthUtils.getAuth();
      this.auth = auth;
    } else {
      //load async the auth state if it is known
      AuthUtils.getAuth().then((auth) => {
        if (auth.isAuth !== this.auth.isAuth) {
          this.auth = auth;
          this.refresh();
        }
      });
    }

    document.body.innerHTML = "";
    if (this.lastRendered != null) {
      this.lastRendered.destroy();
    }

    const pathname = window.location.pathname.replace(/\/$/, "");
    let params = {};
    let pass = false;
    let target = null;
    for (let route of Routes) {
      pass = false;
      params = {};
      route.path = route.path.replace(/\/$/, "");
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
      const api = new Api();

      const page = await api.post("api/pages/resolve", {
        path: pathname,
      });

      if (page === null || page.code == 404) {
        target = Routes.find((r) => r.path == "/404");
      } else {
        target = {
          page: page,
          component: PV,
        };
      }
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
