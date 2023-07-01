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
  }

  static getStrucutre(component) {
    /**  @type {Element} */
    let element = component.structure;

    DomRenderer.getElementStruture(
      element,
      component,
      [...component.$components],
      0
    );
    return element;
  }

  static getElementStruture(element, component, oldComponents, componentIndex) {
    if (Array.isArray(element.children)) {
      element.children = element.children.map(
        /**
         * @param {Element} element
         */
        (childElement) => {
          if (typeof childElement.tag == "function") {
            let oldConstructor = Boolean(oldComponents[componentIndex])
              ? oldComponents[componentIndex].__proto__.constructor
              : null;
            let childComponent;

            if (
              childElement.tag == oldConstructor &&
              oldComponents[componentIndex]
            ) {
              childComponent = oldComponents[componentIndex];
              console.log(childComponent, childElement.attributes);
              childComponent.redefine(childElement.attributes);
            } else {
              childComponent = new childElement.tag(
                childElement.attributes,
                null,
                component
              );
            }
            component.$components.push(childComponent);
            childElement = DomRenderer.getStrucutre(childComponent);
            componentIndex++;
          } else {
            childElement = DomRenderer.getElementStruture(
              childElement,
              component,
              oldComponents,
              componentIndex
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
        if (attr.startsWith("on")) {
          element.addEventListener(attr.slice(2), obj.attributes[attr]);
          continue;
        }

        if (attr == "style") {
          for (let style in obj.attributes[attr]) {
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

    for (let i = oldChildren.length; i < newChildren.length; i++) {
      const newChild = newChildren[i];
      const newChildClone = newChild.cloneNode(true);
      oldElement.appendChild(newChildClone);
    }

    // Compare le texte des éléments
    /*   */
  }
}
