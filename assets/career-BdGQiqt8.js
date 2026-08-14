import{a as h,o as g}from"./main-8xLtAAve.js";function f(e,o){return`
    <button
      type="button"
      data-job-index="${o}"
      class="job-card animate-on-scroll"
      aria-haspopup="dialog"
      aria-label="View full job description for ${e.title}"
    >
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-content">
        <div class="job-card-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="job-card-briefcase-icon" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>Open Position</span>
        </div>
        <h3 class="job-card-title">${e.title}</h3>
        <p class="job-card-summary">${e.summary}</p>
      </div>
      <span class="go-corner" aria-hidden="true">
        <span class="go-arrow">&rarr;</span>
      </span>
      <span class="job-card-cta">View job description</span>
    </button>`}function v(e,o){const n=document.getElementById(e);n&&(n.innerHTML=o.map(f).join(""))}let t=null,l=null,r=null,i=null,d=null,s=null;function j(e){return e.sections.map(o=>`
        <div class="job-modal-section">
          <h4 class="job-modal-section-heading">${o.heading}</h4>
          <ul class="job-modal-list">
            ${o.items.map(n=>`<li>${n}</li>`).join("")}
          </ul>
        </div>`).join("")}function y(){if(t)return;const e=document.createElement("div");e.className="job-modal",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","job-modal-title"),e.innerHTML=`
    <div class="job-modal-backdrop" data-job-modal-close></div>
    <div class="job-modal-panel">
      <button type="button" class="job-modal-close" data-job-modal-close aria-label="Close job description">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="job-modal-header">
        <span class="job-modal-eyebrow">Open Position</span>
        <h3 id="job-modal-title" class="job-modal-title"></h3>
      </div>
      <div class="job-modal-body"></div>
      <div class="job-modal-footer">
        <a class="job-modal-linkedin-link" data-job-modal-linkedin-link target="_blank" rel="noopener noreferrer">
          View original LinkedIn post
        </a>
        <a class="btn-accent job-modal-apply" href="/lbrinfosolutions/src/pages/contact/">
          Contact Us
        </a>
      </div>
    </div>`,document.body.appendChild(e),t=e,l=e.querySelector("#job-modal-title"),r=e.querySelector(".job-modal-body"),i=e.querySelector("[data-job-modal-linkedin-link]"),d=e.querySelector("[data-job-modal-apply-link]"),e.querySelectorAll("[data-job-modal-close]").forEach(o=>o.addEventListener("click",p)),document.addEventListener("keydown",k)}function w(e,o){var n;y(),!(!t||!l||!r)&&(l.textContent=e.title,r.innerHTML=j(e),i&&(e.linkedinPostUrl?(i.href=e.linkedinPostUrl,i.classList.remove("is-hidden")):i.classList.add("is-hidden")),d&&(d.href=`mailto:info@lbrinfosolutions.com?subject=${encodeURIComponent(`Application: ${e.title}`)}`),s=o,t.classList.add("is-open"),document.body.classList.add("job-modal-open"),(n=t.querySelector(".job-modal-close"))==null||n.focus())}function p(){t!=null&&t.classList.contains("is-open")&&(t.classList.remove("is-open"),document.body.classList.remove("job-modal-open"),s==null||s.focus())}function k(e){t!=null&&t.classList.contains("is-open")&&e.key==="Escape"&&p()}function L(e,o){const n=document.getElementById(e);n&&n.querySelectorAll("[data-job-index]").forEach(a=>{a.addEventListener("click",()=>{const b=Number(a.dataset.jobIndex),c=o[b];c&&w(c,a)})})}const u=[{title:"Sales Manager",summary:"Drive new business and grow key accounts for our PostgreSQL solutions.",sections:[{heading:"Key Responsibilities",items:["Identify, develop, and close new business opportunities for PostgreSQL solutions.","Manage and grow relationships with customers, partners, and key stakeholders.","Conduct customer meetings, product demonstrations, and technical presentations.","Understand customer requirements and propose suitable database solutions.","Coordinate with pre-sales and technical teams for POCs, solution design, and proposal preparation.","Respond to RFPs/RFIs and prepare commercial proposals.","Achieve quarterly and annual sales targets.","Maintain an accurate sales pipeline and provide regular sales forecasts.","Represent LBR Infosolutions at customer events, seminars, and partner engagements."]},{heading:"Requirements",items:["4–5 years of experience in enterprise software, database, or PostgreSQL sales.","Strong understanding of PostgreSQL or other relational database technologies.","Proven track record of achieving sales targets.","Excellent communication, presentation, and negotiation skills.","Ability to build long-term customer relationships.","Self-motivated, proactive, and willing to travel as required."]}],linkedinPostUrl:"https://www.linkedin.com/posts/lbrinfosolutions_sales-manager-postgresql-location-mumbai-activity-7490659868060803072-2IIQ"},{title:"Intern",summary:"A 6-month, hands-on introduction to PostgreSQL support and implementation.",sections:[{heading:"What We're Looking For",items:["Strong technical aptitude and willingness to learn.","Interest in database technologies, especially PostgreSQL.","Good communication and problem-solving skills.","Team player with a proactive attitude.","Self-motivated and eager to learn new technologies.","Knowledge of Linux and databases will be an added advantage."]},{heading:"Key Responsibilities",items:["Learn and build expertise in PostgreSQL.","Resolve customer issues related to PostgreSQL.","Coordinate with OEM support teams across the globe.","Assist in product installation and implementation at client sites.","Support customer engagements, including RFIs/RFPs.","Assist with Proof of Concepts (POCs) at customer locations.","Maintain technical documentation and support logs."]},{heading:"Internship Details",items:["6-month internship program.","High-performing interns will be offered full-time employment with LBR Infosolutions.","Certificate of Completion upon successful completion."]}],linkedinPostUrl:"https://www.linkedin.com/posts/lbrinfosolutions_hiring-internship-postgresql-activity-7490658826669584384-M2Mn"}],S="https://www.linkedin.com/company/lbrinfosolutions/";function m(){const e=document.getElementById("job-list");if(!e)return;v("job-list",u),L("job-list",u),h("#job-list",".job-card"),g(e);const o=document.getElementById("view-all-openings");o instanceof HTMLAnchorElement&&(o.href=S)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m();
