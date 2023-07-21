import { createElement } from "./core/Element.js";
import Router from "./core/Router.js";

globalThis.createElement = createElement;

window.router = new Router();
router.refresh();
