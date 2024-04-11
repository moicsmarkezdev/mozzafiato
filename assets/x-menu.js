class XMenu extends HTMLElement{constructor(){super()}connectedCallback(){this.parent_links=this.querySelectorAll(".x-menu--level-1--link > a"),this.sub_menu_links=this.querySelectorAll('.x-menu--level-1--link:not([data-x-menu--depth="1"]) > a'),this.overlap_parent=parseInt(this.getAttribute("data-x-menu--overlap-parent")),this.header_root=document.querySelector(".header--root"),this.sub_menu_items=[],this.parents_with_sub_menu=[],this.sub_menu_links.forEach(e=>{var t=e.parentNode;this.parents_with_sub_menu.push(t),e.parentNode.querySelectorAll("ul a").forEach(e=>this.sub_menu_items.push(e))}),this.state="closed",this.load()}disconnectedCallback(){this.parent_links.off("focus.XMenu"),this.sub_menu_links.off("touchstart.XMenu focus.XMenu"),this.parents_with_sub_menu.off("mouseleave.XMenu"),this.parents_with_sub_menu.forEach(e=>{e.querySelectorAll(":scope > a").off("mouseenter.XMenu")})}load(){this.arrangeMegaNav(),this.listeners(),this.checkOverlap(),this.resizeObserver()}listeners(){this.parents_with_sub_menu.forEach(e=>{e.querySelectorAll(":scope > a").on("mouseenter.XMenu",e=>this.slideDown(e.target))}),this.parents_with_sub_menu.on("mouseleave.XMenu",()=>this.slideUp()),this.parent_links.on("focus.XMenu",()=>this.slideUp),this.sub_menu_links.on("focus.XMenu",e=>this.slideDown(e.target)),this.sub_menu_links.on("touchstart.XMenu",e=>{e.preventDefault(),"true"===e.target.parentNode.getAttribute("data-x-menu--open")?this.slideUp(!1):this.slideDown(e.target)})}checkOverlap(){if(theme.utils.isTouchDevice&&"large"!==theme.mqs.current_window)return this.setAttribute("data-x-menu--overlap",!0),this.header_root.setAttribute("data-x-menu--overlap",!0),window.trigger("theme:XMenu:loaded"),!1;this.setAttribute("data-x-menu--overlap",!1),this.header_root.setAttribute("data-x-menu--overlap",!1);let e=this;1===this.overlap_parent?e=e.parentNode:2===this.overlap_parent&&(e=e.parentNode.parentNode);var t,s,r,i,n=e.parentNode,a=e.index();let o=!1,u=(1<a&&(o=n.children[a-1]),!1);a+1<n.children.length&&(u=n.children[a+1]),o&&(s=(t=o.querySelector(":scope > :last-child")).offset().left+t.offsetWidth,e.offset().left-1<=s)&&(this.setAttribute("data-x-menu--overlap",!0),this.header_root.setAttribute("data-x-menu--overlap",!0)),u&&(i=(r=e.querySelector(":scope > :last-child")).offset().left+r.offsetWidth,u.offset().left-1<=i)&&(this.setAttribute("data-x-menu--overlap",!0),this.header_root.setAttribute("data-x-menu--overlap",!0)),window.trigger("theme:XMenu:loaded")}resizeObserver(){new ResizeObserver(()=>this.checkOverlap()).observe(this.header_root)}arrangeMegaNav(){var e=this.querySelectorAll(".x-menu--single-parents");0===this.parents_with_sub_menu.length||0<e.length||this.querySelectorAll('[data-x-menu--depth="3"] .x-menu--level-2--container').forEach(e=>{var t=e.querySelectorAll('[data-x-menu--single-parent="true"]');if(t.length){const r=new DocumentFragment;t.forEach(e=>r.appendChild(e));var s=theme.utils.parseHtml('<div class="x-menu--single-parents"><ul></ul></div>');s.querySelector("ul").appendChild(r),e.prepend(s)}})}slideDown(e,t=!1){clearTimeout(this.timer);var s=e.parentNode;if("true"===s.getAttribute("data-x-menu--open")||"closing"===this.state)return!1;if(this.slideUp(!1),t&&"complete"!==t)this.timer=setTimeout(()=>this.slideDown(e,"complete"),t);else{s.setAttribute("data-x-menu--open",!0),e.setAttribute("aria-expanded",!0),this.state="opened";const r=s.querySelector(".x-menu--level-2--container");r&&(r.removeAttribute("style"),setTimeout(()=>r.setAttribute("aria-hidden",!1),0))}}slideUp(e=300){let t=!1,s=!1,r;for(let i=0;i<this.parents_with_sub_menu.length;i++)if("true"===(r=this.parents_with_sub_menu[i]).getAttribute("data-x-menu--open")){s=r,t=s.querySelector(":scope > a");break}if(s)if(e)this.timer=setTimeout(()=>this.slideUp(!1),e);else{s.setAttribute("data-x-menu--open",!1),t&&t.setAttribute("aria-expanded",!1),this.state="closing";const n=s.querySelector(".x-menu--level-2--container");n&&(n.setAttribute("aria-hidden",!0),n.on("transitionend",()=>{this.state="closed",n.style.display="none"},{once:!0}))}}}class XMenuBlockshop extends XMenu{connectedCallback(){super.connectedCallback(),this.header_timer=null,this.headerListeners()}headerListeners(){this.parents_with_sub_menu.on("mouseenter",()=>clearTimeout(this.header_timer)),this.header_root.on("mouseenter touchstart",()=>{clearTimeout(this.header_timer),this.header_root.setAttribute("data-hovered",!0)}),this.header_root.on("mouseleave",()=>{this.header_timer=setTimeout(()=>this.hideHeader(),500)})}hideHeader(){const s=[];if(this.parents_with_sub_menu.forEach(e=>{var t=e.parentNode.querySelector('[data-main-menu--open="true"]');t&&s.push(t)}),s.length)return!1;this.header_root.setAttribute("data-hovered",!1),this.slideUp()}}customElements.define("x-menu-root",XMenuBlockshop);