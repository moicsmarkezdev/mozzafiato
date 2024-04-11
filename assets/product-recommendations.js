class ProductRecommendations extends HTMLElement{constructor(){super()}connectedCallback(){this.block=this.closest('[data-block-type="complementary-products"]'),this.container=this.querySelector("[data-products-container]"),this.intent=this.dataset.intent,this.max_products=this.getAttribute("data-max-products"),this.product_id=this.getAttribute("data-product-id"),this.load()}async load(){var t=await fetch(`${theme.urls.product_recommendations}?section_id=${this.intent}-products&limit=${this.max_products}&product_id=${this.product_id}&intent=`+this.intent);if(!t.ok)throw new Error(t.statusText);var e=await t.text(),o=theme.utils.parseHtml(e).querySelectorAll("[data-product-item]");if(o.length){const s=new DocumentFragment;o.forEach(t=>s.append(t)),this.container.innerHTML="",this.container.appendChild(s),theme.transitions.reload("related-products"),this.style.display="block"}else this.block&&(this.block.style.display="none")}}const productRecommendationsEl=customElements.get("product-recommendations-root");productRecommendationsEl||customElements.define("product-recommendations-root",ProductRecommendations);