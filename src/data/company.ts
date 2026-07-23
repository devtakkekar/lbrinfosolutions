/**
 * Company Data
 * Centralized company information, values, and content blocks
 */

export const companyInfo = {
  name: 'LBR InfoSolutions',
  legalName: 'LBR InfoSolutions Pvt. Ltd.',
  founded: 2010,
  tagline: 'Enterprise Technology Solutions',
  description: 'LBR InfoSolutions brings disruptive enterprise technologies to market, helping organizations modernize their IT infrastructure with next-generation database, storage, AI, and data orchestration solutions.',

  mission: 'We are committed to bringing unique, new-age technology solutions to our customers, helping them solve complex problems faster and drive operational efficiency across their IT infrastructure.',

  vision: 'To be the trusted partner enterprises turn to when adopting disruptive technologies that transform how they manage data, secure systems, and power AI workloads.',

  values: [
    {
      title: 'Customer-Centric',
      description: 'Every solution we recommend is evaluated from the customer\'s operational perspective, ensuring measurable value and long-term ROI.',
    },
    {
      title: 'Technology Excellence',
      description: 'We partner exclusively with technology leaders who set industry benchmarks in performance, reliability, and innovation.',
    },
    {
      title: 'Agility & Speed',
      description: 'Our lean team structure allows rapid evaluation, deployment, and support cycles that keep pace with evolving enterprise demands.',
    },
    {
      title: 'Integrity',
      description: 'Transparent communication, honest assessments, and vendor-neutral guidance underpin every customer engagement.',
    },
  ],

  whyChooseUs: [
    {
      title: 'Deep Domain Expertise',
      description: 'Decades of combined experience in enterprise storage, database systems, and infrastructure technologies across industries.',
      icon: 'expertise',
    },
    {
      title: 'Curated Technology Portfolio',
      description: 'We partner only with proven, category-leading vendors — ensuring you get solutions that are battle-tested at enterprise scale.',
      icon: 'portfolio',
    },
    {
      title: 'End-to-End Support',
      description: 'From initial assessment and architecture design through deployment, migration, and ongoing managed services.',
      icon: 'support',
    },
    {
      title: 'Vendor-Neutral Guidance',
      description: 'Our recommendations are driven by your workload requirements, not vendor quotas. The right tool for the right job.',
      icon: 'guidance',
    },
    {
      title: 'Proven Track Record',
      description: 'Trusted by enterprises across banking, telecom, government, and manufacturing to deliver mission-critical infrastructure.',
      icon: 'track-record',
    },
    {
      title: 'Rapid Deployment',
      description: 'Streamlined procurement and implementation processes that minimize time-to-value for your organization.',
      icon: 'deployment',
    },
  ],

  stats: [
    { value: '15+', label: 'Years of Experience' },
    { value: '100+', label: 'Enterprise Clients' },
    { value: '6', label: 'Technology Partners' },
    { value: '24/7', label: 'Support Coverage' },
  ],

  industries: [
    'Banking & Financial Services',
    'Telecommunications',
    'Government & Public Sector',
    'Manufacturing',
    'Healthcare',
    'Media & Entertainment',
    'Energy & Utilities',
    'Retail & E-Commerce',
  ],
} as const;
