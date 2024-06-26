// class Cart extends HTMLElement{static counts=document.querySelectorAll(".cart--external--total-items");static icons=document.querySelectorAll(".cart--external--icon");static prices=document.querySelectorAll(".cart--external--total-price");static instances=[];static basket={};constructor(){super()}connectedCallback(){Cart.instances.push(this),this.abort_controllers={},this.checkout_button=this.querySelector(".cart--checkout-button button"),this.dynamic_checkout_buttons=this.querySelector(".cart--additional-buttons"),this.note=this.querySelector(".cart--notes--textarea"),this.toggleLoadingOnSubmit(),this.note&&this.noteTypingListener(),this.dynamic_checkout_buttons&&this.renderDynamicCheckoutButtons()}toggleLoadingOnSubmit(){this.checkout_button&&this.checkout_button.on("click",()=>this.checkout_button.setAttribute("data-loading",!0))}noteTypingListener(){this.note.on("input",()=>{this.updateNote(this.note.value),Cart.instances.not(this).forEach(t=>t.note.value=this.note.value)})}async updateNote(t){this.abort_controllers.note&&this.abort_controllers.note.abort(),this.abort_controllers.note=new AbortController;try{await fetch(theme.urls.cart_update+".js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({note:t}),signal:this.abort_controllers.note.signal})}catch{}}renderDynamicCheckoutButtons(){var t,e;window.location.pathname===theme.urls.cart&&((t=theme.drawer.querySelector(".cart--additional-buttons"))&&t.remove(),"small"===theme.mqs.current_window)&&(e=theme.drawer.querySelector('[data-view="desktop"] .cart--additional-buttons'))&&e.remove()}toggleLoadingDisplay(t,e){var a;!t&&e&&(a=this.querySelector(`.cart--item[data-line-num='${e}'] input`))&&a.setAttribute("data-loading",!0),this.checkout_button.setAttribute("data-disabled",!t),this.dynamic_checkout_buttons&&this.dynamic_checkout_buttons.setAttribute("data-disabled",!t)}async tryToUpdateQuantity(t,e){this.toggleLoadingDisplay(!1,t);try{var a=await this.updateQuantity(t,e);await Cart.updateAllHtml(),a||0===e||this.showQuantityError(t)}catch{}}showQuantityError(t){var e=this.querySelector(`.cart--item[data-line-num='${t}']`);e&&e.querySelector(".cart--error").removeAttribute("style")}async updateQuantity(t,e){this.abort_controllers.line_num&&this.abort_controllers.line_num.abort(),this.abort_controllers.line_num=new AbortController;var{management:a,policy:r,quantity:o}=this.querySelector(`.cart--item[data-line-num='${t}']`).dataset,i=e>parseInt(o)&&"shopify"===a&&"continue"!==r;i&&(e=parseInt(o));try{var n=await fetch(theme.urls.cart_change+".js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({line:t,quantity:e}),signal:this.abort_controllers.line_num.signal});if(n.ok)return Cart.fetchTotals(),!i;throw new Error(n.statusText)}catch{throw new Error("aborted")}}static updateAllHtml(e){var t=Cart.instances.map(t=>t.updateHtml(e));return Promise.allSettled(t)}async updateHtml(t){var e,a,r=await fetch(theme.urls.cart+"?view=ajax-"+this.dataset.view);if(r.ok)return e=await r.text(),a=theme.utils.parseHtml(e,".cart--form"),this.swapInNewContent(a),this.toggleLoadingDisplay(!0),theme.transitions.reload("cart-"+this.dataset.view),t&&theme.transitions.reset("cart-"+this.dataset.view),window.trigger("theme:cart:updated",this),!0;throw new Error(r.statusText)}swapInNewContent(t){var e=this.querySelector(".cart--body"),a=t.querySelector(".cart--body"),a=this.swapInImages(e,a),r=(e&&a&&e.replaceWith(a),this.querySelector(".cart--total--price")),o=t.querySelector(".cart--total--price");r&&o&&r.replaceWith(o)}swapInImages(r,t){var e=t.querySelectorAll(".cart--item");return 0!==e.length&&(e.forEach(t=>{var e=t.querySelector(".cart--item--image"),a=r.querySelector(`[data-variant-id='${t.getAttribute("data-variant-id")}'] .cart--item--image`);a&&e&&e.replaceWith(a)}),t)}static async addItem(t,e,a){try{var r=await fetch(theme.urls.cart_add+".js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{id:t,quantity:e,selling_plan:a}]})});if(!r.ok)throw new Error(r.statusText);Cart.fetchTotals(),await Cart.updateAllHtml(!0),window.trigger("theme:cart:productAdded",t)}catch(t){throw new Error(t)}}static async fetchTotals(t=!1){var e=await fetch(theme.urls.cart+".js");if(!e.ok)throw new Error(e.statusText);var a=await e.json();Cart.fillBasket(a.items),t||Cart.updateTotals(a)}static fillBasket(t){Cart.basket={},t.forEach(({id:t,quantity:e})=>Cart.basket[t]=e)}static updateTotals({item_count:a,total_price:e}){var{counts:t,icons:r,prices:o,instances:i}=Cart;t.forEach(t=>t.textContent=a),r.forEach(t=>t.setAttribute("data-item-count",a)),o.forEach(t=>t.innerHTML=theme.utils.formatMoney(e)),i.forEach((t,e)=>{t.setAttribute("data-has-items",0<a),0===a&&(t.note.value="",0===e)&&t.updateNote("")})}}theme.cart=Cart,theme.cart.fetchTotals(!0),customElements.define("cart-root",Cart);

class Cart extends HTMLElement {
    static counts = document.querySelectorAll(".cart--external--total-items");
    static icons=document.querySelectorAll(".cart--external--icon");
    static prices=document.querySelectorAll(".cart--external--total-price");
    static instances=[];
    static basket={};

    constructor() {
      super();
    }
    connectedCallback() {
      Cart.instances.push(this), this.abort_controllers = {}, this.checkout_button = this.querySelector(".cart--checkout-button button"), this.dynamic_checkout_buttons = this.querySelector(".cart--additional-buttons"), this.note = this.querySelector(".cart--notes--textarea"), this.toggleLoadingOnSubmit(), this.note && this.noteTypingListener(), this.dynamic_checkout_buttons && this.renderDynamicCheckoutButtons();
    }
    toggleLoadingOnSubmit() {
      this.checkout_button && this.checkout_button.on("click", () => this.checkout_button.setAttribute("data-loading", !0));
    }
    noteTypingListener() {
      this.note.on("input", () => {
        this.updateNote(this.note.value), Cart.instances.not(this).forEach(t => t.note.value = this.note.value);
      });
    }
    async updateNote(t) {
      this.abort_controllers.note && this.abort_controllers.note.abort(), this.abort_controllers.note = new AbortController;
      try {
        await fetch(theme.urls.cart_update + ".js", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({note: t}), signal: this.abort_controllers.note.signal});
      } catch {}
    }
    renderDynamicCheckoutButtons() {
      var t, e;
      window.location.pathname === theme.urls.cart && ((t = theme.drawer.querySelector(".cart--additional-buttons")) && t.remove(), "small" === theme.mqs.current_window) && (e = theme.drawer.querySelector('[data-view="desktop"] .cart--additional-buttons')) && e.remove();
    }
    toggleLoadingDisplay(t, e) {
      var a;
      !t && e && (a = this.querySelector(`.cart--item[data-line-num='${e}'] input`)) && a.setAttribute("data-loading", !0), this.checkout_button.setAttribute("data-disabled", !t), this.dynamic_checkout_buttons && this.dynamic_checkout_buttons.setAttribute("data-disabled", !t);
    }
    async tryToUpdateQuantity(t, e) {
      this.toggleLoadingDisplay(!1, t);
      try {
        var a = await this.updateQuantity(t, e);
        await Cart.updateAllHtml(), a || 0 === e || this.showQuantityError(t);
      } catch {}
    }

    async tryToUpdateQuantityCombines(t, e) {
    //   this.toggleLoadingDisplay(!1, t);
      try {
        var a = await this.updateQuantityCombines(t, e);
        await Cart.updateAllHtml();
      } catch {}
    }
    showQuantityError(t) {
      var e = this.querySelector(`.cart--item[data-line-num='${t}']`);
      e && e.querySelector(".cart--error").removeAttribute("style");
    }
    async updateQuantity(t, e) {
      this.abort_controllers.line_num && this.abort_controllers.line_num.abort(), this.abort_controllers.line_num = new AbortController;
      var {management: a, policy: r, quantity: o} = this.querySelector(`.cart--item[data-line-num='${t}']`).dataset, i = e > parseInt(o) && "shopify" === a && "continue" !== r;
      i && (e = parseInt(o));
      try {
        var n = await fetch(theme.urls.cart_change + ".js", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({line: t, quantity: e}), signal: this.abort_controllers.line_num.signal});
        if (n.ok) return Cart.fetchTotals(), !i;
        throw new Error(n.statusText);
      } catch {
        throw new Error("aborted");
      }
    }

    async updateQuantityCombines(t, e) {
        this.abort_controllers.line_num && this.abort_controllers.line_num.abort(), this.abort_controllers.line_num = new AbortController;
        // var {management: a, policy: r, quantity: o} = this.querySelector(`.cart--item[data-line-num='${t}']`).dataset, i = e > parseInt(o) && "shopify" === a && "continue" !== r;
        // i && (e = parseInt(o));
        try {
          let entries = Object.entries(t);
          entries.splice(0,1);
          t = Object.fromEntries(entries);

          var n = await fetch(theme.urls.cart_update + ".js", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({updates: t}), signal: this.abort_controllers.line_num.signal});
          if (n.ok) return Cart.fetchTotals();
          throw new Error(n.statusText);
        } catch {
          throw new Error("aborted");
        }
      }

    static updateAllHtml(e) {
      var t = Cart.instances.map(t => t.updateHtml(e));
      return Promise.allSettled(t);
    }
    async updateHtml(t) {
      var e, a, r = await fetch(theme.urls.cart + "?view=ajax-" + this.dataset.view);
      if (r.ok) return e = await r.text(), a = theme.utils.parseHtml(e, '.cart--root'), this.swapInNewContent(a), this.toggleLoadingDisplay(!0), theme.transitions.reload("cart-" + this.dataset.view), t && theme.transitions.reset("cart-" + this.dataset.view), window.trigger("theme:cart:updated", this), !0;
      throw new Error(r.statusText);
    }
    swapInNewContent(t) {
      var e = this.querySelector(".cart--body"), a = t.querySelector(".cart--body"), a = this.swapInImages(e, a), r = (e && a && e.replaceWith(a), this.querySelector(".cart--total--price")), o = t.querySelector(".cart--total--price"), zz = this.querySelector('.cart-popup-message-bar'), yy = t.querySelector('.cart-popup-message-bar');
      r && o && r.replaceWith(o);
      zz && yy && zz.replaceWith(yy);
    }
    swapInImages(r, t) {
      var e = t.querySelectorAll(".cart--item");
      return 0 !== e.length && (e.forEach(t => {
        var e = t.querySelector(".cart--item--image"), a = r.querySelector(`[data-variant-id='${t.getAttribute("data-variant-id")}'] .cart--item--image`);
        a && e && e.replaceWith(a);
      }), t);
    }
    static async addItem(t, e, a) {
      try {
        var r = await fetch(theme.urls.cart_add + ".js", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({items: [{id: t, quantity: e, selling_plan: a}]})});
        if (!r.ok) throw new Error(r.statusText);
        Cart.fetchTotals(), await Cart.updateAllHtml(!0), window.trigger("theme:cart:productAdded", t);
      } catch (t) {
        throw new Error(t);
      }
    }
    static async fetchTotals(t = !1) {
      var e = await fetch(theme.urls.cart + ".js");
      if (!e.ok) throw new Error(e.statusText);
      var a = await e.json();
      Cart.fillBasket(a.items), t || Cart.updateTotals(a);
    }
    static fillBasket(t) {
      Cart.basket = {}, t.forEach(({id: t, quantity: e}) => Cart.basket[t] = e);
    }
    static updateTotals({item_count: a, total_price: e}) {
      var {counts: t, icons: r, prices: o, instances: i} = Cart;
      t.forEach(t => t.textContent = a), r.forEach(t => t.setAttribute("data-item-count", a)), o.forEach(t => t.innerHTML = theme.utils.formatMoney(e)), i.forEach((t, e) => {
        t.setAttribute("data-has-items", 0 < a), 0 === a && (t.note.value = "", 0 === e) && t.updateNote("");
      });
    }
  }
  theme.cart = Cart, theme.cart.fetchTotals(!0), customElements.define("cart-root", Cart);
  