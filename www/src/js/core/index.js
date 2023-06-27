import { ArticlesList } from "../components/ArticlesList.js";
import { Installer } from "../components/Installer/Installer.js";
import Component from "./Component.js";

window.createElement = function (tag, attrs = {}, children = []) {
  let component = new Component({ tag: tag });
  if (attrs != null) {
    for (let key in attrs) {
      component.setAttribute(key, attrs[key]);
    }
  }
  if (children != null) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach((child) => {
      component.addChild(child);
    });
  }
  return component;
};

window.app = new Installer();

app.build();
