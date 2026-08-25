import{b as S,a as E,o as M,i as A}from"./main-Bk-7U1Rx.js";function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function j(e){const t=e.images.map((s,f)=>{const m=n(s),k=f===0?`src="${m}" loading="eager" fetchpriority="high"`:`data-blog-src="${m}" loading="lazy"`;return`
        <img
          alt="${n(e.title)}"
          class="blog-image-slide absolute inset-0 w-full h-full object-cover${f===0?" is-active":""}"
          data-blog-slide
          ${k}
          decoding="async"
        />`}).join(""),o=`
        <button
          type="button"
          class="absolute inset-0 flex items-center justify-center bg-navy/0 group-hover:bg-navy/30 opacity-0 group-hover:opacity-100 transition-all duration-200"
          data-blog-zoom-trigger
          aria-label="View larger images for ${n(e.title)}"
        >
          <span class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-navy shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3"/>
            </svg>
          </span>
        </button>`;return`
      <div
        class="blog-image-frame group relative w-full sm:w-[220px] md:w-[240px] aspect-[4/3] sm:aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-navy/40"
        data-blog-frame
        data-blog-title="${n(e.title)}"
      >${t}${o}
      </div>`}function C(e){return`
    <article class="blog-post animate-on-scroll flex flex-col sm:flex-row gap-6 sm:gap-8 py-10 border-b border-white/10 last:border-0" data-blog-post>${j(e)}
      <div class="blog-post-content flex-1 min-w-0 sm:pt-1">
        <p class="text-blue-accent text-xs font-medium mb-2">${n(e.date)}</p>
        <h3 class="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">${n(e.title)}</h3>
        <p class="text-sm text-gray-400 leading-relaxed">${n(e.excerpt)}</p>
      </div>
    </article>`}function I(e){return e.map(C).join("")}function $(e,t){const o=document.getElementById(e);o&&(o.innerHTML=I(t))}const q=3e3;let l=null,g=null,b=null,r=null,a=null,i=null,c=0,d=null;const B=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function v(e){const t=e==null?void 0:e.dataset.blogSrc;t&&e instanceof HTMLImageElement&&!e.src&&(e.src=t,delete e.dataset.blogSrc,S(e))}function y(e,t){v(e.slides[t]),e.slides.forEach((o,s)=>o.classList.toggle("is-active",s===t)),e.index=t}function p(e){e.slides.length<=1||B()||(h(e),e.timer=window.setInterval(()=>{y(e,(e.index+1)%e.slides.length)},q))}function h(e){e.timer!==null&&(window.clearInterval(e.timer),e.timer=null)}function F(){if(l)return;const e=document.createElement("div");e.className="blog-lightbox",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label","Image viewer"),e.innerHTML=`
    <div class="blog-lightbox-backdrop" data-blog-lightbox-close></div>
    <button type="button" class="blog-lightbox-close" data-blog-lightbox-close aria-label="Close image viewer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <button type="button" class="blog-lightbox-arrow blog-lightbox-prev" data-blog-lightbox-prev aria-label="Previous image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <figure class="blog-lightbox-figure">
      <img class="blog-lightbox-img" alt="" />
      <figcaption class="blog-lightbox-counter"></figcaption>
    </figure>
    <button type="button" class="blog-lightbox-arrow blog-lightbox-next" data-blog-lightbox-next aria-label="Next image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </button>`,document.body.appendChild(e),l=e,g=e.querySelector(".blog-lightbox-img"),b=e.querySelector(".blog-lightbox-counter"),r=e.querySelector("[data-blog-lightbox-prev]"),a=e.querySelector("[data-blog-lightbox-next]"),e.querySelectorAll("[data-blog-lightbox-close]").forEach(t=>t.addEventListener("click",L)),r==null||r.addEventListener("click",()=>u(-1)),a==null||a.addEventListener("click",()=>u(1)),document.addEventListener("keydown",T)}function w(){if(!i||!g||!b)return;const e=i.slides[c];v(e);const t=(e==null?void 0:e.getAttribute("src"))??"",o=i.element.dataset.blogTitle??"";g.src=t,g.alt=o;const s=i.slides.length>1;b.textContent=s?`${c+1} / ${i.slides.length}`:o,r==null||r.classList.toggle("is-hidden",!s),a==null||a.classList.toggle("is-hidden",!s)}function u(e){if(!i)return;const t=i.slides.length;c=(c+e+t)%t,w()}function R(e){var t;F(),l&&(h(e),i=e,c=e.index,w(),d=document.activeElement,l.classList.add("is-open"),document.body.classList.add("blog-lightbox-open"),(t=l.querySelector(".blog-lightbox-close"))==null||t.focus())}function L(){!l||!i||(l.classList.remove("is-open"),document.body.classList.remove("blog-lightbox-open"),y(i,c),p(i),d==null||d.focus(),i=null)}function T(e){l!=null&&l.classList.contains("is-open")&&(e.key==="Escape"&&L(),e.key==="ArrowLeft"&&u(-1),e.key==="ArrowRight"&&u(1))}function z(){document.querySelectorAll("[data-blog-frame]").forEach(e=>{var s;const t=Array.from(e.querySelectorAll("[data-blog-slide]"));if(t.length===0)return;const o={element:e,slides:t,index:0,timer:null};p(o),e.addEventListener("mouseenter",()=>h(o)),e.addEventListener("mouseleave",()=>p(o)),(s=e.querySelector("[data-blog-zoom-trigger]"))==null||s.addEventListener("click",()=>{R(o)})})}const G="/lbrinfosolutions/assets/blog1-8OET_QQA.jpeg",H="/lbrinfosolutions/assets/blog2-PFCFAK80.jpeg",O="/lbrinfosolutions/assets/blog3-FR_EIN6j.jpeg",P="/lbrinfosolutions/assets/blog4-CSmnulo4.jpeg",V="/lbrinfosolutions/assets/blog5-BkPitmVi.jpeg",Q="/lbrinfosolutions/assets/blog6-D2sTspgL.jpeg",_="/lbrinfosolutions/assets/trophy1-DM-c0x9a.jpeg",D="/lbrinfosolutions/assets/trophy2-O2AM8rEp.jpeg",J="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20400'%3e%3cdefs%3e%3clinearGradient%20id='g'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%230B213F'/%3e%3cstop%20offset='60%25'%20stop-color='%231e3a63'/%3e%3cstop%20offset='100%25'%20stop-color='%232A87FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='400'%20height='400'%20fill='url(%23g)'/%3e%3cg%20opacity='0.9'%20stroke='%23ffffff'%20stroke-width='6'%20fill='none'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M200%20110%20L275%20140%20L275%20210%20C275%20265%20240%20300%20200%20315%20C160%20300%20125%20265%20125%20210%20L125%20140%20Z'/%3e%3cpath%20d='M170%20210%20L192%20232%20L235%20185'/%3e%3c/g%3e%3c/svg%3e",N="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20400'%3e%3cdefs%3e%3clinearGradient%20id='g'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%230B213F'/%3e%3cstop%20offset='55%25'%20stop-color='%231e3a63'/%3e%3cstop%20offset='100%25'%20stop-color='%231ed3b0'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='400'%20height='400'%20fill='url(%23g)'/%3e%3cg%20opacity='0.9'%20stroke='%23ffffff'%20stroke-width='6'%20fill='none'%3e%3cellipse%20cx='200'%20cy='150'%20rx='70'%20ry='26'/%3e%3cpath%20d='M130%20150%20L130%20250%20C130%20265%20162%20277%20200%20277%20C238%20277%20270%20265%20270%20250%20L270%20150'/%3e%3cpath%20d='M130%20200%20C130%20215%20162%20227%20200%20227%20C238%20227%20270%20215%20270%20200'/%3e%3c/g%3e%3c/svg%3e",K=[{id:"storage-infrastructure-modernization-signs",title:"5 Signs Your Storage Infrastructure Needs Modernizing",excerpt:"Aging storage rarely fails all at once — it shows up first as slow backups, capacity firefighting, and support contracts that keep getting more expensive. Here's what to look for before it becomes an outage.",date:"Jul 15, 2026",images:[G,H,O,P,V,Q,_,D]},{id:"phishing-resistant-mfa-why-it-matters",title:"Why Phishing-Resistant MFA Is No Longer Optional",excerpt:"SMS codes and push notifications stop casual attackers, not determined ones. A look at why hardware-backed, phishing-resistant authentication is quickly becoming the enterprise baseline rather than the exception.",date:"Jun 28, 2026",images:[J]},{id:"postgresql-enterprise-scale-best-practices",title:"Getting the Most Out of PostgreSQL at Enterprise Scale",excerpt:"PostgreSQL scales further than most teams assume, but only with the right operational discipline. Practical guidance on indexing, connection pooling, and high-availability patterns that hold up in production.",date:"Jun 10, 2026",images:[N]}];function x(){const e=document.getElementById("blog-list");e&&($("blog-list",K),e.style.removeProperty("--blog-post-count"),E("#blog-list",".blog-post"),M(e),z(),A(e))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",x):x();
