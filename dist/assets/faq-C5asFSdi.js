function f(a,t){return`
    <div class="faq-item border border-gray-200 rounded mb-3 overflow-hidden transition-shadow duration-200 hover:shadow-card">
      <button
        class="faq-trigger w-full flex items-center justify-between px-5 py-4 text-left text-navy font-medium text-sm lg:text-base transition-colors hover:bg-gray-50"
        aria-expanded="false"
        aria-controls="faq-answer-${t}"
        id="faq-trigger-${t}"
      >
        <span class="pr-4">${a.question}</span>
        <svg class="faq-icon w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"/>
        </svg>
      </button>
      <div
        class="faq-content"
        id="faq-answer-${t}"
        role="region"
        aria-labelledby="faq-trigger-${t}"
        style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out;"
      >
        <div class="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
          ${a.answer}
        </div>
      </div>
    </div>
  `}function u(a,t){const s=document.getElementById(a);if(!s||t.length===0)return;s.innerHTML=`
    <div class="faq-accordion" role="list">
      ${t.map((e,i)=>f(e,i)).join("")}
    </div>
  `;const l=s.querySelectorAll(".faq-trigger");l.forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("aria-expanded")==="true",n=e.nextElementSibling,r=e.querySelector(".faq-icon");n&&(l.forEach(o=>{if(o!==e){const d=o.nextElementSibling,c=o.querySelector(".faq-icon");o.setAttribute("aria-expanded","false"),d&&(d.style.maxHeight="0"),c&&(c.style.transform="rotate(0deg)")}}),i?(e.setAttribute("aria-expanded","false"),n.style.maxHeight="0",r&&(r.style.transform="rotate(0deg)")):(e.setAttribute("aria-expanded","true"),n.style.maxHeight=`${n.scrollHeight}px`,r&&(r.style.transform="rotate(45deg)")))})})}export{u as r};
