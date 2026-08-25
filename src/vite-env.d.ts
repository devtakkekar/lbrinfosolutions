/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Google Apps Script Web App URL that serves published Careers job
   * postings as JSON. Optional — if unset, the Careers page falls back
   * to the local job data in src/data/careers.ts. See
   * /google-apps-script and CAREERS_CMS.md for setup.
   */
  readonly VITE_CAREERS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
