/**
 * Careers Data
 *
 * To add a new opening: set `title` to the role name as you want it
 * displayed, and paste the full LinkedIn post URL — the kind you get
 * from "Copy link to post" or straight out of the browser address bar.
 * Nothing else needs extracting by hand; the numeric activity ID
 * LinkedIn's embed API needs is parsed automatically in
 * src/components/careers-list.ts.
 *
 * To remove a closed position, delete its entry. Nothing else references
 * this array — the whole page renders from it.
 */

export interface JobPosting {
  /** Displayed in bold on the card — e.g. "Sales Manager", "Intern". */
  title: string;
  linkedinPostUrl: string;
}

export const jobPostings: JobPosting[] = [
  {
    // NOTE: inferred from the post's URL slug ("sales-manager-postgresql-
    // location-mumbai") — double-check this is the exact title you want shown.
    title: 'Sales Manager',
    linkedinPostUrl:
      'https://www.linkedin.com/posts/lbrinfosolutions_sales-manager-postgresql-location-mumbai-activity-7490659868060803072-2IIQ',
  },
  {
    // NOTE: inferred from the post's URL slug ("hiring-internship-postgresql")
    // — double-check this is the exact title you want shown.
    title: 'Intern',
    linkedinPostUrl:
      'https://www.linkedin.com/posts/lbrinfosolutions_hiring-internship-postgresql-activity-7490658826669584384-M2Mn',
  },
];

// NOTE: inferred from the "lbrinfosolutions" slug in the post URLs above —
// please double-check this is actually your company's LinkedIn Page URL
// (Settings > "Public URL" on the Page) before shipping, since a personal
// profile and a company Page use different URL formats.
export const linkedinCompanyUrl = 'https://www.linkedin.com/company/lbrinfosolutions/';
