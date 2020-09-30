/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
class DOMCreator {
  createElement({ tag = 'div', elementClass = '', innerHTML = '', name = '', list }) {
    const element = document.createElement(tag);

    if (name !== '' && list) this.addToLinksList(element, name, list);

    this.addClasses(element, elementClass);
    this.addInnerHTML(element, innerHTML);

    return element;
  }

  addToLinksList(element, name, list) {
    list[name] = element;
  }

  addClasses(element, elementClass) {
    if (Array.isArray(elementClass)) {
      elementClass.forEach((item) => {
        element.classList.add(item);
      });
    } else if (elementClass !== '') element.classList.add(elementClass);
  }

  addInnerHTML(element, innerHTML) {
    if (Array.isArray(innerHTML)) {
      innerHTML.forEach((child) => {
        const childElement = this.createElement(child);
        element.appendChild(childElement);
      });
    } else if (typeof innerHTML === 'object') {
      const child = this.createElement(innerHTML);
      element.appendChild(child);
    } else element.innerHTML = innerHTML;
  }
}

export default DOMCreator;
