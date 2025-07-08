import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { msg, localized, str } from '@lit/localize'
import { allLocales, getLocale } from './localization.js'
import styles from './my-element.css?raw';
import '@rhds/elements/rh-card/rh-card.js';
import '@rhds/elements/rh-cta/rh-cta.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
@localized()
export class MyElement extends LitElement {
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <div>
        ${this.renderLocalSelect()}
      </div>
      <rh-card>
        <h2 slot="header">${msg(html`My Red&nbsp;Hat® Dashboard`)}</h2>
        <p>${msg(html`Welcome to your customized Red&nbsp;Hat dashboard, where you can easily access your most relevant information and tasks.`)}</p>
        <rh-cta slot="footer" priority="primary">
          <a href="${msg('/en/dashboard', {desc: 'Footer CTA'})}" data-analytics-category="Footer">
            ${msg('Visit the dashboard', { desc: 'Footer CTA'})}
          </a>
        </rh-cta>
      </rh-card>
      <div class="card">
        <button @click=${this._onClick} part="button">
          ${msg(str`count is ${this.count}`)}<br>
        </button>
      </div>
      <p class="read-the-docs">${msg('Click on the Vite and Lit logos to learn more', { desc: 'Figma ref: https://www.figma.com/design/0OcAeiqx4MYnH7XQyeq0eN/My-Red-Hat---Security-CVE-component?node-id=885-3353&t=tICfpo0VVkrjsLim-4'})}</p>
      <p>${msg('Please, read the documentation.')}</p>
    `;
  }

  renderLocalSelect() {
    return html`
    <select @change=${this._localeChanged}>
      ${allLocales.map((locale) => html`<option value=${locale} ?selected=${locale === getLocale()}>${locale} </option>`)}
    </select>
    `;
  }

  private _localeChanged(event: Event) {
    const newLocale = (event.target as HTMLSelectElement).value
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.location.assign(url.toString())
  }

  private _onClick() {
    this.count++
  }

  static styles = unsafeCSS(styles);

  anchor(node: RefOrCallback<Element> | undefined) {
    console.log(node);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
