import Component from "./Component.js";
import Element from "./Element.js";

export default class DomRenderer {
  static root = null;
  static last_dom_rendered = null;
  static root_dom = document.body;
  /**
   *
   * @param {HTMLElement} domParent
   * @param {Component} component
   */
  static build(domParent, component) {
    DomRenderer.root_dom = domParent;
    DomRenderer.root = component;

    let structure = DomRenderer.getStrucutre(component);
    let dom = DomRenderer.getDOM(structure);
    DomRenderer.last_dom_rendered = dom;
    domParent.appendChild(DomRenderer.last_dom_rendered);
  }

  static update() {
    let structure = DomRenderer.getStrucutre(DomRenderer.root);
    let dom = DomRenderer.getDOM(structure);
    DomRenderer.compareAndModifyDOM(DomRenderer.last_dom_rendered, dom);
    DomRenderer.root.propagate("Rerender");
  }

  static getStrucutre(component) {
    /**  @type {Element} */
    let element = component.structure;
    component.componentIndex = 0;

    let oldComponents = [...component.$components];
    component.$components = [];
    DomRenderer.getElementStruture(element, component, oldComponents);
    component.renderElement = element;
    return element;
  }

  static getElementStruture(element, component, oldComponents) {
    if (Array.isArray(element.children)) {
      element.children = element.children.map(
        /**
         * @param {Element} element
         */
        (childElement) => {
          if (typeof childElement.tag == "function") {
            const old = component.findChildren(
              childElement.attributes?.key || childElement.tag.name,
              oldComponents,
              component.componentIndex
            );

            const oldConstructor = old ? old.protoConstructor : null;
            let childComponent;

            if (childElement.tag == oldConstructor && old) {
              childComponent = old;
              childComponent.redefine(childElement.attributes);
              component.$components.push(childComponent);
            } else {
              childComponent = new childElement.tag(
                childElement.attributes,
                {},
                component
              );
              component.$components.push(childComponent);
            }
            childElement = DomRenderer.getStrucutre(childComponent);
            component.componentIndex++;
          } else {
            childElement = DomRenderer.getElementStruture(
              childElement,
              component,
              oldComponents
            );
          }
          return childElement;
        }
      );
    }
    return element;
  }

  static getDOM(obj) {
    const element = document.createElement(obj.tag);
    if (obj.attributes) {
      for (const attr in obj.attributes) {
        if (["key", "ref", "html"].includes(attr)) continue;
        if (attr.startsWith("on")) {
          element.addEventListener(attr.slice(2), obj.attributes[attr]);
          continue;
        }

        if (attr == "style") {
          for (let style in obj.attributes[attr]) {
            if (style.startsWith("--")) {
              element.style.setProperty(style, obj.attributes[attr][style]);
              continue;
            }
            element.style[style] = obj.attributes[attr][style];
          }
          continue;
        }

        if (attr == "class") {
          if (Array.isArray(obj.attributes[attr])) {
            element.classList.add(...obj.attributes[attr]);
            continue;
          } else {
            element.classList.add(obj.attributes[attr]);
            continue;
          }
        }

        element.setAttribute(attr, obj.attributes[attr]);
      }
    }

    if (obj.children && Array.isArray(obj.children)) {
      obj.children.forEach((childObj) => {
        const childElement = this.getDOM(childObj);
        element.appendChild(childElement);
      });
    } else {
      const textNode = document.createTextNode(obj.children);
      element.appendChild(textNode);
    }

    if (obj.attributes?.html) {
      element.innerHTML = obj.attributes.html;
    }

    obj.domElement = element;
    element.shadowElement = obj;
    return element;
  }

  static compareAndModifyDOM(oldElement, newElement) {
    // Vérifie si les balises des éléments sont différentes
    if (oldElement.tagName !== newElement.tagName) {
      oldElement.parentNode.replaceChild(newElement, oldElement);
      return;
    }

    // Compare les attributs des éléments
    const oldAttrs = oldElement.attributes || {};
    const newAttrs = newElement.attributes || {};

    for (let i = oldAttrs.length - 1; i >= 0; i--) {
      const attr = oldAttrs[i];
      const name = attr.name;
      const value = attr.value;

      if (!newElement.hasAttribute(name)) {
        oldElement.removeAttribute(name);
      } else if (newElement.getAttribute(name) !== value) {
        oldElement.setAttribute(name, newElement.getAttribute(name));
      }
    }

    for (let i = newAttrs.length - 1; i >= 0; i--) {
      const attr = newAttrs[i];
      const name = attr.name;
      const value = attr.value;

      if (!oldElement.hasAttribute(name)) {
        oldElement.setAttribute(name, value);
      }
    }

    // Compare les enfants des éléments
    const oldChildren = oldElement.childNodes;
    const newChildren = newElement.childNodes;

    for (let i = oldChildren.length - 1; i >= 0; i--) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      if (newChild) {
        if (
          oldChild.nodeType === Node.TEXT_NODE &&
          newChild.nodeType === Node.TEXT_NODE
        ) {
          if (oldChild.textContent !== newChild.textContent) {
            oldChild.textContent = newChild.textContent;
          }
        } else {
          DomRenderer.compareAndModifyDOM(oldChild, newChild);
        }
      } else {
        oldElement.removeChild(oldChild);
      }
    }

    for (let i = 0; i < newChildren.length; i++) {
      if (oldChildren[i]?.tagName != newChildren[i].tagName) {
        const newChild = newChildren[i];
        const newChildClone = newChild.cloneNode(true);
        newChild.parentNode.replaceChild(newChildClone, newChild);
        oldElement.appendChild(newChild);
      }
    }

    if (newElement.shadowElement)
      newElement.shadowElement.domElement = oldElement;
  }
}
