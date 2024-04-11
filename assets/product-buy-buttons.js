class ProductBuyButtons extends HTMLElement{constructor(){super()}connectedCallback(){this.button_container=this.querySelector(".product-buy-buttons--primary"),this.button_text=this.querySelector(".product-buy-buttons--cta-text"),this.form=this.querySelector(".product-buy-buttons--form"),this.quantity=1,this.select_input=this.querySelector(".product-buy-buttons--select"),this.smart_button=this.querySelector(".product-buy-buttons--smart"),this.primary_button=this.querySelector(".product-buy-buttons--cta"),this.addToCartListener(),this.updateViewListener(),this.updateQuantityListener()}addToCartListener(){this.form.on("submit",async t=>{var e=this.form.querySelector("option[selected]")["dataset"],i=this.form.querySelector('input[name="selling_plan"]'),s=theme.utils.getQuantity(this.dataset.id,e,this.quantity);if("drawer"!==theme.settings.cart_type&&!1!==s||(t.preventDefault(),t.stopPropagation()),s&&(this.button_container.setAttribute("data-loading",!0),"drawer"===theme.settings.cart_type))try{await theme.cart.addItem(e.id,s,i?i.value:null),this.button_container.setAttribute("data-loading",!1),theme.drawer.open("right","cart-drawer",this.primary_button)}catch(t){throw this.button_container.setAttribute("data-loading",!1),new Error(t)}})}updateViewListener(){window.on(`theme:product:${this.dataset.id}:variantChanged`,({detail:{variant:t}})=>{var e=this.select_input.querySelector("option[selected]");e&&e.removeAttribute("selected"),t&&t.available?(this.selectVariant(t.id),this.updateView(!0,!0)):t&&!t.available?(this.selectVariant(t.id),this.updateView(!1,!0)):this.updateView(!1,!1)})}selectVariant(t){var e=this.select_input.querySelector(`option[value='${t}']`);e&&e.setAttribute("selected",!0)}updateView(t,e){t?(this.primary_button.removeAttribute("disabled"),this.button_text.innerText=theme.translations.add_to_cart,this.smart_button&&(this.smart_button.style.display="block")):(this.primary_button.setAttribute("disabled",!0),this.smart_button&&(this.smart_button.style.display="none"),this.button_text.innerText=e?theme.translations.out_of_stock:theme.translations.unavailable)}updateQuantityListener(){window.on(`theme:product:${this.dataset.id}:quantityChanged`,({detail:t})=>{this.quantity=t})}}const productBuyButtonsEl=customElements.get("product-buy-buttons-root");productBuyButtonsEl||customElements.define("product-buy-buttons-root",ProductBuyButtons);