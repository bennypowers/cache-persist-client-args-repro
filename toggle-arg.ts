import { customElement, html, LitElement, css, property } from "lit-element";
import { installRouter } from "pwa-helpers/router";
import { getPathname } from "./router";

@customElement('toggle-arg')
class ToggleArg extends LitElement {
  @property() page = getPathname(window.location);

  createRenderRoot() {
    return this;
  }

  render() {
    const { page } = this;
    return html`
      <a href="${!!page ? '/' : '/page-1'}">
        <label>
          <input type="checkbox" .checked="${!!page}"/>
          View the list ${!!page ? 'without' : 'with'} a <code>page</code> arg passed to <code>selected</code>
        </label>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'toggle-arg': ToggleArg;
  }
}