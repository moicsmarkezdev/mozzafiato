class FeedbackBar extends HTMLElement{constructor(){super()}connectedCallback(){(theme.feedback=this).message_container=this.querySelector(".feedback-bar--message"),this.message_json=JSON.parse(this.querySelector("script").innerHTML),this.load()}load(t=!1){var e=window.location.hash.substring(1),s=t||e.replace("feedback-bar--","");this.message_json[s]&&(this.message_container.innerText=this.message_json[s],this.show()),t||history.pushState("",document.title,""+window.location.pathname+window.location.search)}show(){this.setAttribute("data-transition-active",!0),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(()=>this.setAttribute("data-transition-active",!1),5e3)}trigger(t,e){"copy"===t?this.loadCopy():"quantity"===t&&this.loadProductQuantity(e)}loadCopy(){navigator.clipboard.writeText(window.location.href),this.load("copied")}loadProductQuantity(t){var e;0===t?this.load("product--no-items"):1===t?this.load("product--one-item"):1<t&&(e=this.message_json["product--n-items"].replace("[num_items]",t),this.message_json[`product--${t}-items`]=e,this.load(`product--${t}-items`))}}customElements.define("feedback-bar-root",FeedbackBar);