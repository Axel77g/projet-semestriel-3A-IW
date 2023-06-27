import Home from "./components/Home.js";
import Element from "./core/Element.js";
import Renderer from "./core/Renderer.js";

function createElement(tag, attributes, children) {
  return new Element(tag, attributes, children);
}
globalThis.createElement = createElement;

window.app = new Home();
Renderer.execute(window.app, document.body);
