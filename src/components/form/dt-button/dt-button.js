import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';

export class DtButton extends DtBase {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        width: fit-content;
        height: fit-content;
      }

      .dt-button {
        cursor: pointer;
        display: flex;
        margin: 5px;
        padding: var(--dt-button-padding-y, 10px)
          var(--dt-button-padding-x, 10px);
        font-family: var(--dt-button-font-family);
        font-size: var(--dt-button-font-size, 14px);
        line-height: var(--dt-button-line-height, inherit);
        font-weight: var(--dt-button-font-weight, 700);
        background-color: var(
          --dt-button-context-background-color,
          var(--dt-button-background-color)
        );
        border: var(--dt-button-border-width, 1px) solid
          var(--dt-button-context-border-color, var(--dt-button-border-color));
        border-radius: var(--dt-button-border-radius, 10px);
        box-shadow: var(
          --dt-button-box-shadow,
          --dt-button-context-box-shadow(0 2px 4px rgb(0 0 0 / 25%))
        );
        color: var(--dt-button-context-text-color, var(--dt-button-text-color));
        text-rendering: optimizeLegibility;
        gap: var(--dt-button-gap, 10px);
        justify-content: var(--dt-button-justify-content, center);
        align-content: var(--dt-button-align-content, center);
        align-items: var(--dt-button-align-items, center);
        text-decoration: var(
          --dt-button-text-decoration,
          var(--dt-button-context-text-decoration, none)
        );
        text-transform: var(--dt-button-text-transform, none);
        letter-spacing: var(--dt-button-letter-spacing, normal);
        width: var(--dt-button-width, 100%);
        height: var(--dt-button-height, auto);
        aspect-ratio: var(--dt-button-aspect-ratio, auto);
        position: relative;
      }

      .dt-button.dt-button--outline {
        background-color: transparent;
        color: var(--dt-button-context-text-color, var(--text-color-inverse));
      }

      .dt-button--primary:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--primary-color);
        --dt-button-context-background-color: var(--primary-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--link:not(.dt-button--outline) {
        --dt-button-context-text-decoration: underline;
        --dt-button-context-box-shadow: none;
        --dt-button-context-border-color: transparent;
        --dt-button-context-background-color: transparent;
        --dt-button-context-text-color: var(--dt-button-text-color-dark);
      }

      .dt-button--alert:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--alert-color);
        --dt-button-context-background-color: var(--alert-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--caution:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--caution-color);
        --dt-button-context-background-color: var(--caution-color);
        --dt-button-context-text-color: var(--dt-button-text-color-dark);
      }

      .dt-button--success:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--success-color);
        --dt-button-context-background-color: var(--success-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--inactive:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--inactive-color);
        --dt-button-context-background-color: var(--inactive-color);
        --dt-button-context-text-color: var(--dt-button-text-color-light);
      }

      .dt-button--disabled:not(.dt-button--outline) {
        --dt-button-context-border-color: var(--disabled-color);
        --dt-button-context-background-color: var(--disabled-color);
        --dt-button-context-text-color: var(--dt-button-text-color-dark);
      }

      .dt-button--primary.dt-button--outline {
        --dt-button-context-border-color: var(--primary-color);
        --dt-button-context-text-color: var(--primary-color);
      }

      .dt-button--alert.dt-button--outline {
        --dt-button-context-border-color: var(--alert-color);
        --dt-button-context-text-color: var(--alert-color);
      }

      .dt-button--caution.dt-button--outline {
        --dt-button-context-border-color: var(--caution-color);
        --dt-button-context-text-color: var(--caution-color);
      }

      .dt-button--success.dt-button--outline {
        --dt-button-context-border-color: var(--success-color);
        --dt-button-context-text-color: var(--success-color);
      }

      .dt-button--inactive.dt-button--outline {
        --dt-button-context-border-color: var(--inactive-color);
      }

      .dt-button--disabled.dt-button--outline {
        --dt-button-context-border-color: var(--disabled-color);
      }

      .dt-button.dt-button--rounded {
        --dt-button-border-radius: 50%;
        --dt-button-padding-x: 0px;
        --dt-button-padding-y: 0px;
        --dt-button-aspect-ratio: var(--dt-button-rounded-aspect-ratio, 1/1);
      }

      button.toggle {
        margin-inline-end: 0;
        margin-inline-start: auto;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      context: { type: String },
      type: { type: String },
      outline: { type: Boolean },
      href: { type: String },
      title: { type: String },
      onClick: { type: Function },
      rounded: { type: Boolean },
      confirm: { type: String },
      buttonClass: { type: String },
    };
  }

  get classes() {
    const classes = {
      'dt-button': true,
      'dt-button--outline': this.outline,
      'dt-button--rounded': this.rounded,
    };
    const contextClass = `dt-button--${this.context}`;
    classes[contextClass] = true;
    return classes;
  }

  constructor() {
    super();
    this.context = 'default';
    this.favorite = false; // Initialize with a default value
  }

  connectedCallback() {
    // Code that runs after the component's initial render
    console.log('Connected callback called');
    super.connectedCallback();
    if (this.id === 'favorite-button' || this.id === 'follow-button' || this.id === 'following-button') {
      window.addEventListener('load', async () => {
      const event = await new CustomEvent('dt:get-data', {
        bubbles: true,
        detail: {
          field: this.id,
          postType: this.postType,
          onSuccess: result => {
            const key = Object.keys(result).find( item => ['favorite', 'unfollow', 'follow'].includes(item));
            switch (key) {
              case 'favorite': {
                console.log('BEFORE favorite', this.favorite);
                this.favorite = result.favorite; // Updated state
                console.log('AFTER favorite', this.favorite);
                const slot = this.shadowRoot.querySelector('slot');
                const slottedElements = slot.assignedNodes({ flatten: true });
                const svg = slottedElements.find(node =>
                 node.nodeType === Node.ELEMENT_NODE && node.classList.contains('icon-star')
               );
                if(this.favorite) {
                    svg.classList.add('selected');// Add the class
                } else {
                  svg.classList.remove('selected'); // Remove the class
                }
                this.requestUpdate();
              }
              break;

              case 'follow':
                this.following = true; // Updated state
                this.requestUpdate();
              break;

              case 'unfollow':
              this.following = false;
              this.requestUpdate();
              break;

              default:
                console.log('No matching Key found!');
              break;
                // this.requestUpdate();

            }
          },
          onError: error => {
            console.warn(error);
          },
        },
      });
      this.dispatchEvent(event);
    })
   }

  }

  handleClick(e) {
    e.preventDefault();
      if (this.confirm) {
      if (!confirm(this.confirm)) {
        e.preventDefault();
        return;
      }
    }
    if (this.onClick) {
      e.preventDefault();
      this.onClick(e);
      if (this.id === 'favorite-button' || this.id === 'follow-button' || this.id === 'following-button') {
        console.log('Favorite Button Clicked', this.favorite);
        this.onClick(e);
      }
    } else {
      const form = this.closest('form');
      if (form) {
        form.submit();
      }
    }
  }


  onClick(e){
    e.preventDefault();
    if (this.id === 'favorite-button') {
      console.log('Favorite Button Clicked', this.favorite);
     const event = new CustomEvent('customClick', {
      detail: {
        field: this.id,
        toggleState: !this.favorite,
      }
    });
    this.favorite = !this.favorite;
       const slot = this.shadowRoot.querySelector('slot');
       const slottedElements = slot.assignedNodes({ flatten: true });
       const svg = slottedElements.find(node =>
        node.nodeType === Node.ELEMENT_NODE && node.classList.contains('icon-star')
      );
       if (svg) {
        if (svg.classList.contains('selected')) {
          svg.classList.remove('selected'); // Remove the class
        } else {
          svg.classList.add('selected'); // Add the class
        }
       };
      this.dispatchEvent(event);
      this.requestUpdate();
    } else if (this.id === 'follow-button' || this.id === 'following-button') {
      const toggleState = this.following;
      const event = new CustomEvent('change', {
        detail: {
          field: this.id,
          toggleState,
        }
      });
      this.id = this.id === 'follow-button' ? 'following-button' : 'follow-button';
      this.label= this.label === 'Follow' ? 'Following' : 'Follow';
      this.outline = !this.outline;
      this.following = !this.following;
      this.requestUpdate();
      this.dispatchEvent(event);
    };

  }

  _getSVGIcon() {
    return this.id === 'follow-button' || this.id === 'following-button'
      ? html`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor"
          d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
  </svg>`
      : '';
  }

  _dismiss() {
    this.hide = true;
  }

  render() {
    if (this.hide) {
      return html``;
    }

    if (this.href) {
      return html`
        <a
          class=${classMap(this.classes)}
          href=${this.href}
          title=${this.title}
          type=${this.type}
          @click=${() => this.handleClick()}
        >
          <div>
            <slot></slot>
          </div>
        </a>
      `;
    }
    return html`
      <button
        class=${classMap(this.classes)}
        title=${this.title}
        type=${this.type}
        .value=${this.value}
        @click=${this.handleClick}
      >
        <div>
          <slot></slot>
        </div>
      </button>
    `;
  }
}

window.customElements.define('dt-button', DtButton);
