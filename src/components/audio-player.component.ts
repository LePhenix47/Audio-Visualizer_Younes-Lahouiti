const templateElement = document.createElement("template");

const templateStyle = /*css*/ `
 
`;
const templateContent = /*html */ `
 <figure>
  <slot name="title" />
  <slot name="image" />
 </figure>
`;

templateElement.innerHTML = `
  <style>
    ${templateStyle}
  </style>
  
  ${templateContent}
`;

class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const clonedTemplate: Node = templateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);
  }

  /**
   *Static method used to store the array of all the custom attributes of the component
   */
  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["age"];
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "age": {
        //…
        break;
      }
      default:
        break;
    }
  }
}

customElements.define("audio-player", AudioPlayer);
