/**
 * Careers Data
 *
 * This array is the FALLBACK job data used by careers-api.ts whenever
 * VITE_CAREERS_API_URL is unset, unreachable, or returns malformed data
 * (including local `npm run dev` with no env var configured). The live
 * site normally renders postings fetched from Google Sheets at runtime —
 * see careers-api.ts for that data layer. This file is what keeps the
 * Careers page working even if that API is down.
 *
 * Each opening's full job description lives here, point-wise.
 * `linkedinPostUrl` is optional and only used as a secondary "View
 * original post" link in the modal footer; if a post gets taken down,
 * deleted, or was never posted, just omit it (or delete it) and
 * everything keeps working.
 *
 * To add a new opening: add an entry with a `title`, a one-line
 * `summary` (shown on the card face), and one or more `sections` —
 * each a heading plus a bullet list. Keep bullets short (one line each)
 * so cards stay visually consistent regardless of how long a role's
 * full description runs; the summary/card is fixed-height, the full
 * detail opens in a modal.
 *
 * To remove a closed position, delete its entry. Nothing else
 * references this array — the whole page renders from it.
 */

export interface JobSection {
  /** e.g. "Key Responsibilities", "Requirements", "Internship Details" */
  heading: string;
  /** One bullet per line item. Keep each to a single short line. */
  items: string[];
}

export interface JobPosting {
  /**
   * Optional stable identifier (e.g. a Google Sheet row id). Not used by
   * the UI directly — cards/modal are keyed by array index like before —
   * but kept so a remote data source (see careers-api.ts) has something
   * stable to key rows on.
   */
  id?: string;
  /** Displayed in bold on the card — e.g. "Sales Manager", "Intern". */
  title: string;
  /** Short one-line teaser shown on the card face (not the full JD). */
  summary: string;
  /** Full job description, rendered point-wise in the modal. */
  sections: JobSection[];
  /** Optional — secondary "View original post" link in the modal footer. */
  linkedinPostUrl?: string;
}

export const jobPostings: JobPosting[] = [
  {
    title: 'Sales Manager',
    summary: 'Drive new business and grow key accounts for our PostgreSQL solutions.',
    sections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Identify, develop, and close new business opportunities for PostgreSQL solutions.',
          'Manage and grow relationships with customers, partners, and key stakeholders.',
          'Conduct customer meetings, product demonstrations, and technical presentations.',
          'Understand customer requirements and propose suitable database solutions.',
          'Coordinate with pre-sales and technical teams for POCs, solution design, and proposal preparation.',
          'Respond to RFPs/RFIs and prepare commercial proposals.',
          'Achieve quarterly and annual sales targets.',
          'Maintain an accurate sales pipeline and provide regular sales forecasts.',
          'Represent LBR Infosolutions at customer events, seminars, and partner engagements.',
        ],
      },
      {
        heading: 'Requirements',
        items: [
          '4–5 years of experience in enterprise software, database, or PostgreSQL sales.',
          'Strong understanding of PostgreSQL or other relational database technologies.',
          'Proven track record of achieving sales targets.',
          'Excellent communication, presentation, and negotiation skills.',
          'Ability to build long-term customer relationships.',
          'Self-motivated, proactive, and willing to travel as required.',
        ],
      },
    ],
    linkedinPostUrl:
      'https://www.linkedin.com/posts/lbrinfosolutions_sales-manager-postgresql-location-mumbai-activity-7490659868060803072-2IIQ',
  },
  {
    title: 'Intern',
    summary: 'A 6-month, hands-on introduction to PostgreSQL support and implementation.',
    sections: [
      {
        heading: "What We're Looking For",
        items: [
          'Strong technical aptitude and willingness to learn.',
          'Interest in database technologies, especially PostgreSQL.',
          'Good communication and problem-solving skills.',
          'Team player with a proactive attitude.',
          'Self-motivated and eager to learn new technologies.',
          'Knowledge of Linux and databases will be an added advantage.',
        ],
      },
      {
        heading: 'Key Responsibilities',
        items: [
          'Learn and build expertise in PostgreSQL.',
          'Resolve customer issues related to PostgreSQL.',
          'Coordinate with OEM support teams across the globe.',
          'Assist in product installation and implementation at client sites.',
          'Support customer engagements, including RFIs/RFPs.',
          'Assist with Proof of Concepts (POCs) at customer locations.',
          'Maintain technical documentation and support logs.',
        ],
      },
      {
        heading: 'Internship Details',
        items: [
          '6-month internship program.',
          'High-performing interns will be offered full-time employment with LBR Infosolutions.',
          'Certificate of Completion upon successful completion.',
        ],
      },
    ],
    linkedinPostUrl:
      'https://www.linkedin.com/posts/lbrinfosolutions_hiring-internship-postgresql-activity-7490658826669584384-M2Mn',
  },
];

// NOTE: inferred from the "lbrinfosolutions" slug in the post URLs above —
// please double-check this is actually your company's LinkedIn Page URL
// (Settings > "Public URL" on the Page) before shipping, since a personal
// profile and a company Page use different URL formats.
export const linkedinCompanyUrl = 'https://www.linkedin.com/company/lbrinfosolutions/';