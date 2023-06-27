import Element from "./core/Element.js";
import Router from "./core/Router.js";

function createElement(tag, attributes, children) {
  return new Element(tag, attributes, children);
}
globalThis.createElement = createElement;

window.router = new Router();
router.refresh();
