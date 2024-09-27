import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';

export class DtMultiSelectButtonGroup extends DtFormBase {
  static get styles() {
    return css`
      :host {
        margin-bottom: 5px;
      }
      span .icon {
        vertical-align: middle;
        padding: 0 2px;
      }
      .icon img {
        width: 15px !important;
        height: 15px !important;
        margin-right: 1px !important;
        vertical-align: sub;
      }
      .button-group {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `;
  }

  static get properties() {
    return {
      buttons: { type: Array },
      selectedButtons: { type: Array },
      value: { type: Array, reflect: true },
      icon: { type: String },
    };
  }

  constructor() {
    super();
    this.buttons = [];
    this.selectedButtons = [];
    this.value = [];
    this.custom = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.selectedButtons = this.value
      ? this.value.map(button => ({ value: button }))
      : [];
  }

  _handleButtonClick(event) {
    console.log('event.target.value', event.target.buttonLabel)
    console.log('event.target.value', event.target.value)
    const buttonValue = event.target.value;
    const index = this.selectedButtons.findIndex(
      button => button.value === buttonValue
    );
    if (index > -1) {
      this.selectedButtons.splice(index, 1);
      this.selectedButtons.push({ value: `-${buttonValue}` });
    } else {
      this.selectedButtons.push({ value: buttonValue });
    }
    this.value = this.selectedButtons
      .filter(button => !button.value.startsWith('-'))
      .map(button => button.value);

      if (event.target.id === 'button-that-opens-modal') {
        console.log('button-that-opens-moda clicked')
        // Trigger the opening of the dt-modal here
        const modal = document.querySelector('dt-modal');
        if (modal) {
          console.log('dshfkhsdfhkhkdhfskhfkhkshdkhfhskdhfksdhkfh')
          modal.openModal(); // You may need to add a method like openModal() in your dt-modal custom element
        }
      }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
          newValue: this.selectedButtons,
        },
      })
    );
    console.log('hiii---', this.value)
    this._setFormValue(this.value);
    this.requestUpdate();
  }

  _handleModalButtonClick(event) {
    const buttonValue = event.target.getAttribute('buttonlabel');
    console.log('event', event.target.shadowRoot.querySelector('button .button small opener dt-modal--success'))
    event.target.shadowRoot.querySelector('button .button small opener dt-modal--success').setAttribute('style', 'background-color: #000!important; color: #fff;');
    this.shadowRoot.querySelector('dt-multiselect-buttons-group').setAttribute('value', this.buttonLabel);
    const index = this.selectedButtons.findIndex(
      button => button.value === buttonValue
    );
    if (index > -1) {
      this.selectedButtons.splice(index, 1);
      this.selectedButtons.push({ value: `-${buttonValue}` });
    } else {
      this.selectedButtons.push({ value: buttonValue });
    }
    this.value = this.selectedButtons
      .filter(button => !button.value.startsWith('-'))
      .map(button => button.value);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
          newValue: this.selectedButtons,
        },
      })
    );

    this._setFormValue(this.value);
    this.requestUpdate();
  }

  _inputKeyDown(e) {
    const keycode = e.keyCode || e.which;
    switch (keycode) {
      case 13: // enter
        this._handleButtonClick(e);
        break;
      default:
        // handle other keycodes here
        break;
    }
  }

  render() {
    return html`
      ${this.labelTemplate()}
      ${this.loading
        ? html`<dt-spinner class="icon-overlay"></dt-spinner>`
        : null}
      ${this.saved
        ? html`<dt-checkmark class="icon-overlay success"></dt-checkmark>`
        : null}
      <div class="button-group">
        ${this.buttons.map(buttonSet => {
          const items = Object.keys(buttonSet);
          return items.map(item => {
            const isSelected = this.selectedButtons.some(
              selected => selected.value === item && !selected.delete
            );
            const context = isSelected ? 'success': 'disabled';
            if (buttonSet[item].openModal) {
              console.log('updated', this.value)
              return html`
              <dt-modal @click="${this._handleModalButtonClick}"  .value="${buttonSet[item].label}" buttonlabel="${buttonSet[item].label}" imagesrc="${buttonSet[item].icon}"
              imageStyle={"color":"#000","height":"15px"}
              buttonStyle={"background-color":"#e6e6e6","border":"1px","color":"#000","border-style":"solid","font-weight":"500","border-color":"#e6e6e6","font-size":"12px","display":"inline","padding":"10px"}>
                <span slot="content"> <!--?lit$6094553764$-->
                  <h2>
                Mauris Cursus<span style="font-size: 10px; padding-inline-start: 1em"></span>
              </h2></span>
              </dt-modal>

               `;
            }
            return html`
              <dt-button
                id=${item}
                type="success"
                custom=${this.custom}
                context=${context}
                .value=${item || this.value}
                @click="${this._handleButtonClick}"
                @keydown="${this._inputKeyDown}"
                role="button"
              >
                <span class="icon">
                  ${buttonSet[item].icon
                    ? html`<img
                        src="${buttonSet[item].icon}"
                        alt="${this.iconAltText}"
                      />`
                    : null}
                </span>
                ${buttonSet[item].label}</dt-button
              >
            `;
          });
        })}
      </div>
    `;
  }
}

window.customElements.define(
  'dt-multiselect-buttons-group',
  DtMultiSelectButtonGroup
);
