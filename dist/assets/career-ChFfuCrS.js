import{a as h,o as g}from"./main-gi_IYJgT.js";function f(e){return`
    <a
      href="${e.linkedinPostUrl}"
      target="_blank"
      rel="noopener noreferrer"
      class="job-card animate-on-scroll"
      aria-label="View the ${e.title} posting on LinkedIn"
    >
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-content">
        <div class="job-card-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="job-card-linkedin-icon" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
          </svg>
          <span>Open Position</span>
        </div>
        <h3 class="job-card-title">${e.title}</h3>
      </div>
      <span class="go-corner" aria-hidden="true">
        <span class="go-arrow">&rarr;</span>
      </span>
    </a>`}function v(e,o){const t=document.getElementById(e);t&&(t.innerHTML=o.map(f).join(""))}let n=null,l=null,r=null,i=null,d=null,s=null;function j(e){return e.sections.map(o=>`
        <div class="job-modal-section">
          <h4 class="job-modal-section-heading">${o.heading}</h4>
          <ul class="job-modal-list">
            ${o.items.map(t=>`<li>${t}</li>`).join("")}
          </ul>
        </div>`).join("")}function y(){if(n)return;const e=document.createElement("div");e.className="job-modal",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","job-modal-title"),e.innerHTML=`
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
        <a class="btn-accent job-modal-apply" data-job-modal-apply-link href="mailto:info@lbrinfosolutions.com">
          Apply for this role
        </a>
      </div>
    </div>`,document.body.appendChild(e),n=e,l=e.querySelector("#job-modal-title"),r=e.querySelector(".job-modal-body"),i=e.querySelector("[data-job-modal-linkedin-link]"),d=e.querySelector("[data-job-modal-apply-link]"),e.querySelectorAll("[data-job-modal-close]").forEach(o=>o.addEventListener("click",p)),document.addEventListener("keydown",w)}function k(e,o){var t;y(),!(!n||!l||!r)&&(l.textContent=e.title,r.innerHTML=j(e),i&&(e.linkedinPostUrl?(i.href=e.linkedinPostUrl,i.classList.remove("is-hidden")):i.classList.add("is-hidden")),d&&(d.href=`mailto:info@lbrinfosolutions.com?subject=${encodeURIComponent(`Application: ${e.title}`)}`),s=o,n.classList.add("is-open"),document.body.classList.add("job-modal-open"),(t=n.querySelector(".job-modal-close"))==null||t.focus())}function p(){n!=null&&n.classList.contains("is-open")&&(n.classList.remove("is-open"),document.body.classList.remove("job-modal-open"),s==null||s.focus())}function w(e){n!=null&&n.classList.contains("is-open")&&e.key==="Escape"&&p()}function L(e,o){const t=document.getElementById(e);t&&t.querySelectorAll("[data-job-index]").forEach(a=>{a.addEventListener("click",()=>{const b=Number(a.dataset.jobIndex),c=o[b];c&&k(c,a)})})}const u=[{title:"Sales Manager",summary:"Drive new business and grow key accounts for our PostgreSQL solutions.",sections:[{heading:"Key Responsibilities",items:["Identify, develop, and close new business opportunities for PostgreSQL solutions.","Manage and grow relationships with customers, partners, and key stakeholders.","Conduct customer meetings, product demonstrations, and technical presentations.","Understand customer requirements and propose suitable database solutions.","Coordinate with pre-sales and technical teams for POCs, solution design, and proposal preparation.","Respond to RFPs/RFIs and prepare commercial proposals.","Achieve quarterly and annual sales targets.","Maintain an accurate sales pipeline and provide regular sales forecasts.","Represent LBR Infosolutions at customer events, seminars, and partner engagements."]},{heading:"Requirements",items:["4–5 years of experience in enterprise software, database, or PostgreSQL sales.","Strong understanding of PostgreSQL or other relational database technologies.","Proven track record of achieving sales targets.","Excellent communication, presentation, and negotiation skills.","Ability to build long-term customer relationships.","Self-motivated, proactive, and willing to travel as required."]}],linkedinPostUrl:"https://www.linkedin.com/posts/lbrinfosolutions_sales-manager-postgresql-location-mumbai-activity-7490659868060803072-2IIQ"},{title:"Intern",summary:"A 6-month, hands-on introduction to PostgreSQL support and implementation.",sections:[{heading:"What We're Looking For",items:["Strong technical aptitude and willingness to learn.","Interest in database technologies, especially PostgreSQL.","Good communication and problem-solving skills.","Team player with a proactive attitude.","Self-motivated and eager to learn new technologies.","Knowledge of Linux and databases will be an added advantage."]},{heading:"Key Responsibilities",items:["Learn and build expertise in PostgreSQL.","Resolve customer issues related to PostgreSQL.","Coordinate with OEM support teams across the globe.","Assist in product installation and implementation at client sites.","Support customer engagements, including RFIs/RFPs.","Assist with Proof of Concepts (POCs) at customer locations.","Maintain technical documentation and support logs."]},{heading:"Internship Details",items:["6-month internship program.","High-performing interns will be offered full-time employment with LBR Infosolutions.","Certificate of Completion upon successful completion."]}],linkedinPostUrl:"https://www.linkedin.com/posts/lbrinfosolutions_hiring-internship-postgresql-activity-7490658826669584384-M2Mn"}],S="https://www.linkedin.com/company/lbrinfosolutions/";function m(){const e=document.getElementById("job-list");if(!e)return;v("job-list",u),L("job-list",u),h("#job-list",".job-card"),g(e);const o=document.getElementById("view-all-openings");o instanceof HTMLAnchorElement&&(o.href=S)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m();
