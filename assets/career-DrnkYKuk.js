import{B as u,a as f,o as m}from"./main-Bk-7U1Rx.js";function s(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function p(n){const e=(n.tags??[]).map(t=>`<span class="job-card-tag">${s(t)}</span>`);return e.length===0&&!n.employmentType?"":`
    <div class="job-card-tags-row">
      <div class="job-card-tags">${e.join("")}</div>
      ${n.employmentType?`<span class="job-card-type">${s(n.employmentType)}</span>`:""}
    </div>`}function b(n){return n.map(e=>`
        <div class="job-card-expand-section">
          <h4 class="job-card-expand-heading">${s(e.heading)}</h4>
          <ul class="job-card-expand-list">
            ${e.items.map(t=>`<li>${s(t)}</li>`).join("")}
          </ul>
        </div>`).join("")}function g(n,e){const t=s(n.title);return`
    <div class="job-card animate-on-scroll" data-job-index="${e}">
      <button
        type="button"
        class="job-card-face"
        aria-expanded="false"
        aria-controls="job-card-expand-${e}"
        aria-label="Show full job description for ${t}"
      >
        <div class="job-card-main">
          <div class="job-card-heading-row">
            <h3 class="job-card-title">${t}</h3>
            <span class="job-card-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H8M17 7v9"/></svg>
            </span>
          </div>
          ${n.location?`<p class="job-card-location">${s(n.location)}</p>`:""}
        </div>
        ${p(n)}
      </button>
      <div class="job-card-expand" id="job-card-expand-${e}" role="region">
        <div class="job-card-expand-inner">
          <div class="job-card-expand-body">
            ${b(n.sections)}
            ${n.linkedinPostUrl?`<a class="job-card-expand-linkedin" href="${n.linkedinPostUrl}" target="_blank" rel="noopener noreferrer">View original LinkedIn post</a>`:""}
            <a class="btn-accent job-card-expand-apply" href="${u}src/pages/contact/">Contact Us</a>
          </div>
        </div>
      </div>
    </div>`}function j(n,e){const t=document.getElementById(n);t&&(t.innerHTML=e.map(g).join(""))}function y(n,e,t){t?(n.classList.add("is-expanded"),e.style.height=`${e.scrollHeight}px`,e.addEventListener("transitionend",function o(r){r.propertyName==="height"&&(e.removeEventListener("transitionend",o),n.classList.contains("is-expanded")&&(e.style.height="auto"))})):(e.style.height=`${e.scrollHeight}px`,e.offsetHeight,n.classList.remove("is-expanded"),requestAnimationFrame(()=>{e.style.height="0px"}))}function h(n){const e=document.getElementById(n);e&&e.querySelectorAll(".job-card").forEach(t=>{const o=t.querySelector(".job-card-face"),r=t.querySelector(".job-card-expand");!o||!r||o.addEventListener("click",()=>{const l=!t.classList.contains("is-expanded");y(t,r,l),o.setAttribute("aria-expanded",String(l))})})}function v(n,e=3){const t=document.getElementById(n);t&&(t.innerHTML=Array.from({length:e}).map(()=>`
      <div class="job-card job-card-skeleton" aria-hidden="true">
        <div class="job-card-face">
          <div class="job-card-main">
            <div class="job-card-skeleton-line job-card-skeleton-line--title"></div>
            <div class="job-card-skeleton-line job-card-skeleton-line--location"></div>
          </div>
        </div>
      </div>`).join(""))}function k(n){const e=document.getElementById(n);e&&(e.innerHTML=`
    <div class="job-list-empty">
      <p>There are no open positions right now — check back soon, or follow us on LinkedIn below for future openings.</p>
    </div>`)}const a=[],x="https://www.linkedin.com/company/lbrinfosolutions/",c="https://script.google.com/macros/s/AKfycbzUPFnMBFULCIO1Pf3-xFnF9-6DsJRvIsEzM7iT-swmmYGk0YCvIG6Xq5njPkEvfm2v/exec";function i(n){return typeof n=="string"&&n.trim().length>0}function E(n){if(typeof n!="object"||n===null)return null;const e=n;if(!i(e.heading)||!Array.isArray(e.items))return null;const t=e.items.filter(i);return t.length===0?null:{heading:e.heading,items:t}}function $(n){if(typeof n!="object"||n===null)return null;const e=n;if(!i(e.title)||!i(e.summary)||!Array.isArray(e.sections))return null;const t=e.sections.map(E).filter(r=>r!==null);if(t.length===0)return null;const o={title:e.title,summary:e.summary,sections:t};if(i(e.id)&&(o.id=e.id),i(e.linkedinPostUrl)&&(o.linkedinPostUrl=e.linkedinPostUrl),i(e.location)&&(o.location=e.location),i(e.employmentType)&&(o.employmentType=e.employmentType),Array.isArray(e.tags)){const r=e.tags.filter(i);r.length>0&&(o.tags=r)}return o}function A(n){if(!Array.isArray(n))return{jobs:[],malformed:!0};if(n.length===0)return{jobs:[],malformed:!1};const e=n.map($).filter(t=>t!==null);return{jobs:e,malformed:e.length===0}}async function w(){if(!i(c))return a;try{const n=await fetch(c);if(!n.ok)return console.warn(`Careers API returned ${n.status}; using fallback job data.`),a;const e=await n.json(),{jobs:t,malformed:o}=A(e);return o?(console.warn("Careers API returned malformed data; using fallback job data."),a):t}catch(n){return console.warn("Careers API request failed; using fallback job data.",n),a}}async function d(){const n=document.getElementById("job-list");if(!n)return;const e=document.getElementById("view-all-openings");e instanceof HTMLAnchorElement&&(e.href=x),v("job-list");const t=await w();if(t.length===0){k("job-list");return}j("job-list",t),h("job-list"),f("#job-list",".job-card"),m(n)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
