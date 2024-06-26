// class QuantitySelector extends HTMLElement{constructor(){super()}connectedCallback(){this.minus=this.querySelector(".quantity-selector--minus"),this.plus=this.querySelector(".quantity-selector--plus"),this.input=this.querySelector(".quantity-selector--input"),this.remove=this.querySelector(".quantity-selector--remove"),this.inputListener(),this.plusListener(),this.minusListener(),this.type=this.getAttribute("data-type"),"cart"===this.type?(this.cart=this.closest(".cart--root"),this.line_num=this.closest(".cart--item").getAttribute("data-line-num"),this.removeListener()):"product"===this.type&&this.updateValueListener()}inputListener(){let e;this.input.on("keydown",t=>{var e=t["which"];(e<48||57<e)&&(e<37||40<e)&&8!==e&&9!==e&&t.preventDefault()}),this.input.on("focusin",async({target:t})=>e=parseInt(t.value)),this.input.on("focusout",async()=>{var t=parseInt(this.input.value);isNaN(t)||t===e?this.input.value=e:(this.input.value=t,this.callback(t))})}plusListener(){this.plus.on("click keydown",t=>{var e;"keydown"===t.type&&"Enter"!==t.key||(t.preventDefault(),e=0<parseInt(this.input.value)?parseInt(this.input.value)+1:1,this.input.value=e,this.callback(e))})}minusListener(){this.minus.on("click keydown",t=>{var e;"keydown"===t.type&&"Enter"!==t.key||(t.preventDefault(),1!==parseInt(this.input.value)&&(e=1<parseInt(this.input.value)-1?parseInt(this.input.value)-1:1,this.input.value=e,this.callback(e)))})}removeListener(){this.remove.on("click keydown",t=>{"keydown"===t.type&&"Enter"!==t.key||this.callback(0)})}updateValueListener(){window.on(`theme:product:${this.dataset.id}:updateQuantity`,({detail:t})=>{this.input.value=t,this.input.trigger("focusout")})}callback(t){"cart"===this.type?this.cart.tryToUpdateQuantity(this.line_num,t):"product"===this.type&&window.trigger(`theme:product:${this.dataset.id}:quantityChanged`,t)}}customElements.define("quantity-selector",QuantitySelector);

class QuantitySelector extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.minus = this.querySelector(".quantity-selector--minus"), this.plus = this.querySelector(".quantity-selector--plus"), this.input = this.querySelector(".quantity-selector--input"), this.remove = this.querySelector(".quantity-selector--remove"), this.inputListener(), this.plusListener(), this.minusListener(), this.type = this.getAttribute("data-type"), "cart" === this.type ? (this.cart = this.closest(".cart--root"), this.line_num = this.closest(".cart--item").getAttribute("data-line-num"), this.removeListener()) : "product" === this.type && this.updateValueListener();
    }
    inputListener() {
      if(!this.input) return;

      let e;
      this.input.on("keydown", t => {
        var e = t["which"];
        (e < 48 || 57 < e) && (e < 37 || 40 < e) && 8 !== e && 9 !== e && t.preventDefault();
      }), this.input.on("focusin", async ({target: t}) => e = parseInt(t.value)), this.input.on("focusout", async () => {
        var t = parseInt(this.input.value);
        isNaN(t) || t === e ? this.input.value = e : (this.input.value = t, this.callback(t));
      });
    }
    plusListener() {
      if(!this.plus) return;
      this.plus.on("click keydown", t => {
        var e;
        "keydown" === t.type && "Enter" !== t.key || (t.preventDefault(), e = 0 < parseInt(this.input.value) ? parseInt(this.input.value) + 1 : 1, this.input.value = e, this.callback(e));
      });
    }
    minusListener() {
      if(!this.minus) return;
      this.minus.on("click keydown", t => {
        var e;
        "keydown" === t.type && "Enter" !== t.key || (t.preventDefault(), 1 !== parseInt(this.input.value) && (e = 1 < parseInt(this.input.value) - 1 ? parseInt(this.input.value) - 1 : 1, this.input.value = e, this.callback(e)));
      });
    }
    removeListener() {
      this.remove.on("click keydown", t => {
        let combinesIDs = this.getAttribute("data-comnbine-ids");
        
        if(combinesIDs == '' || combinesIDs == null) {
            "keydown" === t.type && "Enter" !== t.key || this.callback(0);
        }else{
            // let removeElms = document.querySelectorAll(`[data-comnbine-ids="${combinesIDs}"]`);
            let arr_index = combinesIDs.split('_');
            let idsRm = {};
            arr_index.forEach((elm, index) => idsRm[elm] = 0);

            console.log('ttt', t);
  
            this.cart.tryToUpdateQuantityCombines(idsRm, 0);
        }
      });
    }
    updateValueListener() {
      window.on(`theme:product:${this.dataset.id}:updateQuantity`, ({detail: t}) => {
        this.input.value = t, this.input.trigger("focusout");
      });
    }
    callback(t) {
      "cart" === this.type ? this.cart.tryToUpdateQuantity(this.line_num, t) : "product" === this.type && window.trigger(`theme:product:${this.dataset.id}:quantityChanged`, t);
    }
  }
  customElements.define("quantity-selector", QuantitySelector);
  