import{a as o,o as s}from"./main-CZXfFU7L.js";function a(n){return`
    <a
      href="${n.linkedinPostUrl}"
      target="_blank"
      rel="noopener noreferrer"
      class="job-card animate-on-scroll"
      aria-label="View the ${n.title} posting on LinkedIn"
    >
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-content">
        <div class="job-card-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="job-card-linkedin-icon" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
          </svg>
          <span>Open Position</span>
        </div>
        <h3 class="job-card-title">${n.title}</h3>
      </div>
      <span class="go-corner" aria-hidden="true">
        <span class="go-arrow">&rarr;</span>
      </span>
    </a>`}function r(n,e){const t=document.getElementById(n);t&&(t.innerHTML=e.map(a).join(""))}const l=[{title:"Sales Manager",linkedinPostUrl:"https://www.linkedin.com/posts/lbrinfosolutions_sales-manager-postgresql-location-mumbai-activity-7490659868060803072-2IIQ"},{title:"Intern",linkedinPostUrl:"https://www.linkedin.com/posts/lbrinfosolutions_hiring-internship-postgresql-activity-7490658826669584384-M2Mn"}],d="https://www.linkedin.com/company/lbrinfosolutions/";function i(){const n=document.getElementById("job-list");if(!n)return;r("job-list",l),o("#job-list",".job-card"),s(n);const e=document.getElementById("view-all-openings");e instanceof HTMLAnchorElement&&(e.href=d)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i();
