/**
 * Products Data
 * Complete content for all product pages, cards, and carousel
 */

import type { Product } from '../types/product';

// Partner/product logos — imported so Vite fingerprints and bundles them.
// Each resolves to a hashed URL string at build time.
import postgresProLogo from '../assets/logos/PostgresPro_logo.svg';
import infinidatLogo from '../assets/logos/lenovo_infinidat.svg';
import visionLabsLogo from '../assets/logos/vison_labs.svg';
import redhatLogo from '../assets/logos/redhat.svg';
import hpeLogo from '../assets/logos/hpe.svg';
import cloudianLogo from '../assets/logos/cloudian.svg';
import yubicoLogo from '../assets/logos/yubico.svg';

export const products: Product[] = [
  {
    id: 'postgres-pro',
    name: 'Postgres Pro',
    tagline: 'Enterprise-Grade PostgreSQL',
    shortDescription: 'Advanced PostgreSQL fork providing enhanced performance, scalability, reliability, and security for mission-critical enterprise workloads.',
    overview: 'Postgres Pro is developed by Postgres Professional, one of the world\'s leading PostgreSQL vendors and a top-3 contributor to the open-source PostgreSQL project. Postgres Pro DBMS builds on PostgreSQL with proprietary enhancements that boost performance, strengthen security, and simplify enterprise operations.\n\nAvailable in Standard and Enterprise editions, Postgres Pro delivers features like 64-bit transaction IDs, advanced query optimization, Oracle compatibility layers, and enterprise-grade security — all backed by 24/7/365 expert support, consulting, and migration assistance.',
    category: 'Database',
    logo: postgresProLogo,
    features: [
      { title: '64-bit Transaction IDs', description: 'Long-term stability for massive workloads without transaction ID wraparound concerns.' },
      { title: 'Advanced Query Optimization', description: 'AI-driven adaptive query tuning that automatically optimizes execution plans over time.' },
      { title: 'Oracle Compatibility', description: 'PL/SQL packages, collections, and Ora2pg Pro utility for seamless Oracle-to-Postgres migration.' },
      { title: 'Enterprise Security', description: 'pg_proaudit extension, advanced authentication policies, and fine-grained access control.' },
      { title: 'Compressed File System', description: 'CFS technology for storage efficiency when handling large data volumes.' },
      { title: 'Superfast Incremental Backup', description: 'Efficient recovery with minimal downtime through intelligent incremental backup strategies.' },
      { title: 'Table Partitioning', description: 'Optimized partitioning for large datasets, delivering better performance at scale.' },
      { title: 'Resource Management', description: 'Fine-grained control over resource-intensive operations to prevent workload contention.' },
    ],
    benefits: [
      { title: 'Reduced Licensing Costs', description: 'Open-source foundation with enterprise features eliminates expensive proprietary database licensing.' },
      { title: 'Simplified Migration', description: 'Purpose-built tools make Oracle and other proprietary database migrations predictable and low-risk.' },
      { title: 'Enterprise Reliability', description: '24/7 expert support from the team that contributes directly to PostgreSQL core development.' },
      { title: 'Future-Proof Investment', description: 'Built on the world\'s most advanced open-source database with guaranteed long-term roadmap.' },
    ],
    useCases: [
      { title: 'Oracle Migration', description: 'Organizations moving from Oracle to reduce costs while maintaining enterprise capabilities.', industries: ['Banking', 'Government', 'Telecom'] },
      { title: 'High-Volume OLTP', description: 'Transaction-heavy applications requiring consistent sub-millisecond response times.', industries: ['E-Commerce', 'Financial Services'] },
      { title: 'Data Warehousing', description: 'Large-scale analytics workloads benefiting from advanced partitioning and compression.', industries: ['Telecom', 'Media', 'Retail'] },
      { title: 'Mission-Critical Systems', description: 'Applications where downtime directly impacts revenue or safety.', industries: ['Healthcare', 'Manufacturing', 'Energy'] },
    ],
    industries: ['Banking & Financial Services', 'Government', 'Telecommunications', 'Healthcare', 'Manufacturing', 'Retail'],
    editions: [
      { name: 'Postgres Pro Standard', description: 'Reliable PostgreSQL with enterprise enhancements for mid-size deployments.' },
      { name: 'Postgres Pro Enterprise', description: 'Advanced clustering, security, and scalability for large organizations.' },
      { name: 'Postgres Pro Enterprise Manager', description: 'Centralized monitoring and management dashboard for fleet operations.' },
    ],
    faq: [
      { question: 'How does Postgres Pro differ from standard PostgreSQL?', answer: 'Postgres Pro extends PostgreSQL with proprietary features including 64-bit transaction IDs, adaptive query optimization, Oracle compatibility packages, enhanced security auditing, and compressed storage — all developed by top PostgreSQL contributors.' },
      { question: 'Is Postgres Pro compatible with existing PostgreSQL applications?', answer: 'Yes. Postgres Pro maintains full compatibility with PostgreSQL. Existing applications, tools, and extensions work without modification.' },
      { question: 'What support options are available?', answer: 'Postgres Professional offers 24/7/365 expert support, remote DBA services, technical audits, migration consulting, and professional training programs.' },
      { question: 'Can Postgres Pro handle Oracle-to-PostgreSQL migrations?', answer: 'Postgres Pro includes the Ora2pg Pro utility and Oracle-compatible PL/SQL packages specifically designed for smooth, low-risk Oracle migrations.' },
    ],
    officialUrl: 'https://postgrespro.com/',
    pagePath: '/src/pages/postgres-pro/index.html',
    featured: true,
    order: 1,
  },
  {
    id: 'infinidat',
    name: 'Infinidat',
    tagline: 'Enterprise Data Storage & Cyber Resilience',
    shortDescription: 'Petabyte-scale enterprise storage with InfiniSafe cyber protection, delivering unmatched performance and 99.99999% availability.',
    overview: 'Infinidat provides enterprise-class data storage and protection solutions designed for organizations that demand the highest levels of performance, availability, and cyber resilience. The InfiniBox platform delivers petabyte-scale storage with consistent sub-millisecond latency.\n\nWith InfiniSafe technology, Infinidat addresses the growing threat of ransomware and cyberattacks through immutable snapshots, logical air-gapping, and near-instantaneous recovery — ensuring your data remains protected and recoverable under any circumstance.',
    category: 'Storage',
    logo: infinidatLogo,
    features: [
      { title: 'InfiniBox', description: 'Petabyte-scale primary storage with consistent sub-millisecond performance and 99.99999% availability.' },
      { title: 'InfiniBox SSA', description: 'All-flash enterprise storage delivering unmatched real-world application performance.' },
      { title: 'InfiniGuard', description: 'Purpose-built data protection appliance with InfiniSafe cyber recovery capabilities.' },
      { title: 'InfiniSafe Technology', description: 'Immutable snapshots, logical air-gap, fenced forensic environments, and near-instant recovery.' },
      { title: 'Neural Cache', description: 'AI-powered caching algorithm that learns access patterns for optimized performance.' },
      { title: 'Autonomous Automation', description: 'Self-healing, self-optimizing storage that reduces operational overhead by up to 80%.' },
      { title: 'Multi-Protocol Support', description: 'Unified block, file, and object storage in a single platform.' },
      { title: 'Guaranteed SLAs', description: 'Industry-first 100% availability guarantee backed by contractual SLAs.' },
    ],
    benefits: [
      { title: 'Cyber Resilience', description: 'Comprehensive protection against ransomware with guaranteed recovery in under one minute.' },
      { title: 'Consolidation', description: 'Reduce storage sprawl by consolidating multiple workloads onto a single high-performance platform.' },
      { title: 'Lower TCO', description: 'Up to 70% reduction in total cost of ownership compared to competitive all-flash solutions.' },
      { title: 'Operational Simplicity', description: 'Autonomous operations reduce storage management time by 80%, freeing IT teams for strategic work.' },
    ],
    useCases: [
      { title: 'Data Center Consolidation', description: 'Replacing multiple storage arrays with a single high-performance platform.', industries: ['Enterprise IT', 'Financial Services'] },
      { title: 'Cyber Recovery', description: 'Protecting mission-critical data against ransomware with guaranteed rapid recovery.', industries: ['Healthcare', 'Government', 'Banking'] },
      { title: 'Database Storage', description: 'High-performance backend for Oracle, SQL Server, and SAP HANA workloads.', industries: ['Manufacturing', 'Telecom'] },
      { title: 'Virtual Infrastructure', description: 'Enterprise storage for large-scale VMware and container environments.', industries: ['Cloud Service Providers', 'Enterprise IT'] },
    ],
    industries: ['Banking & Financial Services', 'Healthcare', 'Government', 'Telecommunications', 'Manufacturing', 'Cloud Providers'],
    faq: [
      { question: 'What is the InfiniSafe cyber recovery solution?', answer: 'InfiniSafe provides four pillars of protection: immutable snapshots that cannot be altered or deleted, a logical air-gap separating backup from production, a fenced forensic environment for safe malware analysis, and near-instantaneous recovery validated across petabytes of data.' },
      { question: 'What availability guarantee does Infinidat offer?', answer: 'Infinidat provides a contractual 99.99999% availability guarantee — the industry\'s highest — translating to less than 3 seconds of unplanned downtime per year.' },
      { question: 'How does Infinidat reduce storage costs?', answer: 'Through neural cache algorithms, inline compression and deduplication, autonomous operations that reduce admin overhead, and a pricing model that delivers enterprise-class storage at significantly lower per-TB costs.' },
      { question: 'Is Infinidat suitable for hybrid cloud environments?', answer: 'Yes. Infinidat supports hybrid cloud architectures with cloud snapshot orchestration, enabling seamless data mobility between on-premises and cloud storage tiers.' },
    ],
    officialUrl: 'https://www.infinidat.com/',
    pagePath: '/src/pages/infinidat/index.html',
    featured: true,
    order: 2,
  },
  {
    id: 'visionlabs-ai',
    name: 'VisionLabs AI',
    tagline: 'Computer Vision & Biometric Intelligence',
    shortDescription: 'Global leader in computer vision and machine learning, delivering high-performance facial recognition and biometric identification at enterprise scale.',
    overview: 'VisionLabs is a global leader in computer vision and machine learning, specializing in high-performance facial recognition and biometric identification systems. With over a decade of expertise and top-ranked algorithms globally, VisionLabs delivers the LUNA Platform — a comprehensive solution for face and body recognition, video analytics, and object detection.\n\nThe platform powers secure digital identity experiences across banking, transportation, smart cities, and access control — combining AI precision with purpose-built hardware to deliver fast, accurate recognition that is designed to resist spoofing and deepfake attacks.',
    category: 'AI & Vision',
    logo: visionLabsLogo,
    features: [
      { title: 'LUNA Platform', description: 'Comprehensive face and body recognition engine for large-scale biometric identification and verification.' },
      { title: 'Liveness Detection', description: 'Advanced anti-spoofing including presentation attack detection and deepfake analysis.' },
      { title: 'Video Analytics', description: 'Real-time face detection and tracking across multiple video streams simultaneously.' },
      { title: 'ISO Compliance', description: 'Image quality checks conforming to ISO/IEC 19794-5:2011 and custom requirements.' },
      { title: 'Attribute Estimation', description: 'Age, gender, emotion, and appearance analysis from facial and body imagery.' },
      { title: '1:N Matching', description: 'High-speed identification against databases containing millions of descriptors.' },
      { title: 'Edge Deployment', description: 'Optimized models for deployment on edge devices, mobile platforms, and embedded hardware.' },
      { title: 'LUNA ID SDK', description: 'Mobile development tools in Kotlin and Swift for face recognition in native applications.' },
    ],
    benefits: [
      { title: 'World-Leading Accuracy', description: 'Top-ranked facial recognition algorithms with perfect liveness detection scores in international benchmarks.' },
      { title: 'Scalable Architecture', description: 'Process millions of identifications per day with horizontal scaling and distributed descriptor databases.' },
      { title: 'Anti-Fraud Protection', description: 'Multi-layered spoofing resistance including presentation attacks, deepfakes, and replay attacks.' },
      { title: 'Flexible Deployment', description: 'Deploy on-premises, in private cloud, or at the edge — maintaining full data sovereignty and compliance.' },
    ],
    useCases: [
      { title: 'Digital Identity Verification', description: 'KYC onboarding and identity verification for banking and financial services.', industries: ['Banking', 'Fintech', 'Insurance'] },
      { title: 'Access Control', description: 'Biometric access management for buildings, data centers, and secure facilities.', industries: ['Enterprise', 'Government', 'Defense'] },
      { title: 'Smart City & Transportation', description: 'Passenger verification, border control, and public safety surveillance systems.', industries: ['Government', 'Transportation', 'Aviation'] },
      { title: 'Retail Analytics', description: 'Customer behavior analysis, VIP recognition, and loss prevention.', industries: ['Retail', 'Hospitality', 'Entertainment'] },
    ],
    industries: ['Banking & Fintech', 'Government & Defense', 'Transportation & Aviation', 'Retail', 'Healthcare', 'Smart Cities'],
    faq: [
      { question: 'How accurate is VisionLabs facial recognition?', answer: 'VisionLabs algorithms consistently rank among the top globally in NIST FRVT benchmarks, with perfect liveness detection accuracy and sub-second identification against million-record databases.' },
      { question: 'Can VisionLabs detect deepfakes and spoofing attempts?', answer: 'Yes. The LUNA Platform includes multi-layered anti-spoofing with presentation attack detection, deepfake analysis, and liveness verification that works across 2D photos, 3D masks, and video replay attacks.' },
      { question: 'What deployment options are available?', answer: 'VisionLabs supports on-premises deployment for maximum data sovereignty, private cloud for scalability, edge deployment on embedded hardware, and mobile SDK integration for native applications.' },
      { question: 'Does VisionLabs comply with privacy regulations?', answer: 'The platform is designed with privacy-by-design principles, supporting GDPR compliance, data minimization, consent management, and configurable data retention policies.' },
    ],
    officialUrl: 'https://visionlabs.ai/',
    pagePath: '/src/pages/visionlabs-ai/index.html',
    featured: true,
    order: 6,
  },
  {
    id: 'rhel',
    name: 'Red Hat Enterprise Linux',
    tagline: 'The Open Source Enterprise Operating System',
    shortDescription: 'The world\'s leading enterprise Linux platform, delivering a stable, secure, and consistent foundation for workloads across bare metal, virtual, cloud, and edge environments.',
    overview: 'Red Hat Enterprise Linux (RHEL) is the industry-standard operating system for enterprise IT, built on open source innovation and backed by one of the largest commercial Linux support organizations in the world. RHEL provides a consistent, hardened foundation for running mission-critical applications across physical servers, virtual machines, private and public clouds, and edge devices.\\n\\nWith a predictable release cadence, extensive hardware and software certification ecosystem, and enterprise-grade lifecycle support, RHEL enables organizations to standardize operations, reduce risk, and modernize infrastructure at their own pace — from traditional workloads to containers and hybrid cloud deployments.',
    category: 'Operating System',
    logo: redhatLogo,
    features: [
      { title: 'Predictable Lifecycle', description: 'Long-term, predictable release and support lifecycle with up to 10 years of production support per major version.' },
      { title: 'Security & Compliance', description: 'SELinux mandatory access controls, FIPS 140-validated cryptography, and CVE remediation backed by Red Hat Product Security.' },
      { title: 'Image Builder', description: 'Build and deploy consistent, purpose-built OS images across bare metal, virtual, and cloud environments.' },
      { title: 'System Roles & Automation', description: 'Ansible-based automation content for consistent configuration management at scale.' },
      { title: 'Hybrid Cloud Ready', description: 'Certified across AWS, Azure, Google Cloud, and major hypervisors with consistent behavior everywhere it runs.' },
      { title: 'Application Streams', description: 'Multiple versions of user-space components and languages available without waiting for major OS releases.' },
      { title: 'Extensive Certification Ecosystem', description: 'Broadest hardware and ISV software certification matrix in the enterprise Linux market.' },
      { title: 'Red Hat Insights', description: 'Predictive analytics that proactively identify security, performance, and stability risks before they cause downtime.' },
    ],
    benefits: [
      { title: 'Reduced Operational Risk', description: 'Standardizing on a single, well-supported Linux distribution reduces configuration drift and operational surprises.' },
      { title: 'Enterprise-Grade Support', description: 'Direct access to Red Hat engineering, with defined SLAs and a global support organization.' },
      { title: 'Consistent Hybrid Cloud Foundation', description: 'The same OS and tooling across data center, public cloud, and edge simplifies operations and skills requirements.' },
      { title: 'Faster, Safer Modernization', description: 'A stable base for gradually adopting containers, automation, and cloud-native practices without disrupting existing workloads.' },
    ],
    useCases: [
      { title: 'Core Enterprise Workloads', description: 'Standardized OS foundation for ERP, databases, and business-critical applications.', industries: ['Banking', 'Manufacturing', 'Retail'] },
      { title: 'Hybrid Cloud Platforms', description: 'Consistent OS layer underpinning private and public cloud infrastructure.', industries: ['Telecommunications', 'Enterprise IT'] },
      { title: 'Regulated & Government Systems', description: 'Hardened, certified OS for environments with strict security and compliance requirements.', industries: ['Government', 'Defense', 'Healthcare'] },
      { title: 'Edge & Telco Deployments', description: 'Lightweight, consistent OS images for distributed edge and network function environments.', industries: ['Telecommunications', 'Manufacturing'] },
    ],
    industries: ['Banking & Financial Services', 'Government', 'Telecommunications', 'Healthcare', 'Manufacturing', 'Retail'],
    faq: [
      { question: 'What support lifecycle does RHEL offer?', answer: 'Each major RHEL release receives up to 10 years of production support through a phased lifecycle of full, maintenance, and extended update support, giving organizations a predictable upgrade path.' },
      { question: 'How does RHEL support hybrid and multi-cloud environments?', answer: 'RHEL is certified and consistently supported across on-premises infrastructure, major public clouds, and edge deployments, so the same operating environment and tooling can be used everywhere.' },
      { question: 'What security capabilities are built into RHEL?', answer: 'RHEL includes SELinux, FIPS-validated cryptographic modules, and continuous CVE remediation backed by Red Hat Product Security, along with Red Hat Insights for proactive risk detection.' },
      { question: 'Can RHEL run both traditional and containerized workloads?', answer: 'Yes. RHEL supports traditional applications alongside container workloads, with tooling such as Podman and integration paths into Red Hat OpenShift for organizations modernizing toward Kubernetes.' },
    ],
    officialUrl: 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux',
    pagePath: '/src/pages/rhel/index.html',
    featured: true,
    order: 5,
  },
  {
    id: 'hpe',
    name: 'HPE',
    tagline: 'Enterprise Compute, Storage & Hybrid Cloud',
    shortDescription: 'Hewlett Packard Enterprise delivers edge-to-cloud infrastructure, servers, storage, and networking, unified under the HPE GreenLake hybrid cloud platform.',
    overview: 'Hewlett Packard Enterprise (HPE) is a global edge-to-cloud technology company providing the compute, storage, networking, and software organizations need to run mission-critical infrastructure. HPE\'s portfolio spans ProLiant and Synergy servers, Alletra storage, Aruba networking, and high-performance computing.\\n\\nHPE GreenLake brings this portfolio together as a unified hybrid cloud platform, letting organizations consume infrastructure as a service — on-premises, at the edge, or in the cloud — with consistent management, elastic capacity, and pay-as-you-go economics.',
    category: 'Infrastructure',
    logo: hpeLogo,
    features: [
      { title: 'HPE GreenLake', description: 'Unified hybrid cloud platform delivering infrastructure as a service across data center, edge, and cloud.' },
      { title: 'ProLiant Servers', description: 'Industry-leading compute platform with embedded security and AI-driven operations.' },
      { title: 'Alletra Storage', description: 'Cloud-native, intelligent data storage with predictive analytics for uptime and performance.' },
      { title: 'Aruba Networking', description: 'AI-powered wired, wireless, and SD-WAN networking with unified security and visibility.' },
      { title: 'HPE InfoSight', description: 'AI-driven predictive analytics that identify and resolve infrastructure issues before they impact operations.' },
      { title: 'High Performance Computing', description: 'Purpose-built HPC and AI systems for large-scale simulation, modeling, and machine learning workloads.' },
      { title: 'Silicon Root of Trust', description: 'Hardware-anchored security embedded across the server portfolio to protect against firmware attacks.' },
      { title: 'Consumption-Based Economics', description: 'Pay-as-you-go and capacity-on-demand models that align infrastructure cost with actual usage.' },
    ],
    benefits: [
      { title: 'Edge-to-Cloud Consistency', description: 'A single operating model across data center, edge, and cloud reduces complexity and management overhead.' },
      { title: 'Elastic Capacity', description: 'Scale compute and storage up or down on demand without large upfront capital investment.' },
      { title: 'Proactive Operations', description: 'AI-driven analytics across the portfolio identify and resolve issues before they cause downtime.' },
      { title: 'Built-In Security', description: 'Hardware-anchored security from silicon to cloud reduces exposure to firmware and supply chain attacks.' },
    ],
    useCases: [
      { title: 'Hybrid Cloud Infrastructure', description: 'Consumption-based compute and storage spanning private data centers and public cloud.', industries: ['Enterprise IT', 'Financial Services'] },
      { title: 'Edge Computing', description: 'Distributed compute and networking for retail, manufacturing, and remote sites.', industries: ['Retail', 'Manufacturing'] },
      { title: 'High Performance Computing & AI', description: 'Purpose-built systems for scientific research, simulation, and large-scale AI training.', industries: ['Research', 'Healthcare', 'Energy'] },
      { title: 'Data Center Modernization', description: 'Replacing aging server and storage infrastructure with software-defined, AI-managed platforms.', industries: ['Telecommunications', 'Government'] },
    ],
    industries: ['Financial Services', 'Government', 'Telecommunications', 'Healthcare', 'Manufacturing', 'Research & Education'],
    faq: [
      { question: 'What is HPE GreenLake?', answer: 'HPE GreenLake is a hybrid cloud platform that delivers HPE\'s compute, storage, and networking portfolio as a consumption-based service, with unified management across on-premises, edge, and public cloud environments.' },
      { question: 'What server platforms does HPE offer?', answer: 'HPE\'s core compute lineup includes ProLiant rack and tower servers and Synergy composable infrastructure, spanning general-purpose enterprise workloads through high-performance computing and AI training.' },
      { question: 'How does HPE approach infrastructure security?', answer: 'HPE builds security in from the silicon up, including a hardware Root of Trust on ProLiant servers, to protect firmware integrity and reduce exposure to supply-chain and firmware-level attacks.' },
      { question: 'Can HPE infrastructure be consumed as a service?', answer: 'Yes. Through HPE GreenLake, compute, storage, and networking can be consumed on a pay-as-you-go basis with elastic capacity, rather than requiring traditional capital purchases.' },
    ],
    officialUrl: 'https://www.hpe.com/',
    pagePath: '/src/pages/hpe/index.html',
    featured: true,
    order: 7,
  },
  {
    id: 'cloudian',
    name: 'Cloudian',
    tagline: 'S3-Compatible Object Storage at Scale',
    shortDescription: 'Software-defined, S3-compatible object storage that scales from terabytes to exabytes on standard hardware, on-premises or in hybrid cloud.',
    overview: 'Cloudian HyperStore is a software-defined object storage platform built on native Amazon S3 API compatibility, giving organizations cloud-like storage economics and scalability without leaving their own data center. HyperStore runs on standard x86 hardware and scales out linearly from a few terabytes to hundreds of petabytes.\\n\\nDesigned for unstructured data — backups, archives, analytics data lakes, and AI/ML training sets — Cloudian provides a single, S3-compatible namespace that spans multiple sites, enabling geo-distributed data protection, hybrid cloud tiering, and simplified application integration.',
    category: 'Storage',
    logo: cloudianLogo,
    features: [
      { title: 'Native S3 API Compatibility', description: 'Broadest S3 API support in the industry, enabling drop-in compatibility with S3-native applications and tools.' },
      { title: 'Linear Scale-Out Architecture', description: 'Add nodes to grow capacity and performance without downtime or forklift upgrades.' },
      { title: 'Multi-Site Replication', description: 'Active-active geo-distributed replication across data centers for resilience and locality.' },
      { title: 'Hybrid Cloud Tiering', description: 'Automated policy-based tiering to public cloud storage for archival and cost optimization.' },
      { title: 'Erasure Coding', description: 'Configurable erasure coding delivers high durability with significantly less overhead than replication.' },
      { title: 'Multi-Tenancy & QoS', description: 'Built-in multi-tenant management with per-tenant quotas, billing, and quality-of-service controls.' },
      { title: 'Immutability & Object Lock', description: 'WORM-compliant object lock for ransomware protection and regulatory retention requirements.' },
      { title: 'HyperIQ Monitoring', description: 'Unified observability and analytics across the storage environment for capacity and performance planning.' },
    ],
    benefits: [
      { title: 'Cloud Economics On-Premises', description: 'S3-compatible object storage on standard hardware delivers cloud-like scalability without egress and storage cost unpredictability.' },
      { title: 'Investment Protection', description: 'Applications built for AWS S3 work against Cloudian without modification, protecting existing development investment.' },
      { title: 'Ransomware Resilience', description: 'Object lock immutability and geo-distributed replication protect backup and archive data from tampering.' },
      { title: 'Simplified Scaling', description: 'Linear, non-disruptive scale-out means capacity planning no longer requires large upfront over-provisioning.' },
    ],
    useCases: [
      { title: 'Backup & Ransomware Protection', description: 'Immutable, S3-compatible target for modern backup software with built-in object lock.', industries: ['Enterprise IT', 'Healthcare'] },
      { title: 'AI & Analytics Data Lakes', description: 'Massively scalable storage foundation for machine learning training data and analytics platforms.', industries: ['Financial Services', 'Research'] },
      { title: 'Media & Content Archives', description: 'Long-term, cost-effective storage for large unstructured media libraries.', industries: ['Media & Entertainment', 'Broadcasting'] },
      { title: 'Hybrid Cloud Storage', description: 'Unified namespace spanning on-premises and public cloud for tiering and disaster recovery.', industries: ['Telecommunications', 'Government'] },
    ],
    industries: ['Financial Services', 'Healthcare', 'Media & Entertainment', 'Government', 'Telecommunications', 'Research & Education'],
    faq: [
      { question: 'Is Cloudian compatible with existing S3 applications?', answer: 'Yes. Cloudian HyperStore implements the Amazon S3 API natively, so applications and tools built for S3 can point to Cloudian without code changes.' },
      { question: 'How does Cloudian scale?', answer: 'HyperStore uses a distributed, peer-to-peer architecture where adding nodes linearly increases both capacity and performance, without downtime or data migration.' },
      { question: 'How does Cloudian protect against ransomware?', answer: 'Cloudian supports S3 Object Lock for WORM immutability, along with geo-distributed erasure coding and replication, protecting backup and archive data from deletion or encryption attacks.' },
      { question: 'Can Cloudian tier data to public cloud?', answer: 'Yes. Cloudian supports policy-based automated tiering to AWS, Azure, Google Cloud, and other S3-compatible targets for archival and cost optimization.' },
    ],
    officialUrl: 'https://cloudian.com/',
    pagePath: '/src/pages/cloudian/index.html',
    featured: true,
    order: 8,
  },
  {
    id: 'yubico',
    name: 'Yubico',
    tagline: 'Hardware Security Keys for Phishing-Resistant Authentication',
    shortDescription: 'Maker of the YubiKey, a hardware security key delivering phishing-resistant multi-factor and passwordless authentication for enterprises and individuals.',
    overview: 'Yubico is the inventor of the YubiKey and a leading contributor to open authentication standards including FIDO2/WebAuthn, FIDO U2F, and OTP. YubiKeys are hardware security keys that provide strong, phishing-resistant authentication in a single touch, replacing or augmenting passwords across enterprise systems, cloud services, and consumer applications.\\n\\nDesigned for both high-security enterprise deployments and everyday users, YubiKeys work across a wide range of protocols and integrate with major identity providers, operating systems, and cloud platforms — enabling organizations to move toward passwordless, phishing-resistant authentication without disrupting existing workflows.',
    category: 'Security',
    logo: yubicoLogo,
    features: [
      { title: 'FIDO2 / WebAuthn Support', description: 'Passwordless and phishing-resistant authentication built on open FIDO2 and WebAuthn standards.' },
      { title: 'Multi-Protocol Hardware Key', description: 'A single key supports FIDO2, U2F, Smart Card (PIV), OpenPGP, and OTP protocols.' },
      { title: 'Touch-to-Authenticate', description: 'Simple physical touch confirms user presence, eliminating reliance on SMS or app-based codes vulnerable to interception.' },
      { title: 'YubiEnterprise Delivery', description: 'Streamlined global procurement and delivery of YubiKeys directly to employees at scale.' },
      { title: 'YubiEnterprise Subscription', description: 'Flexible subscription model for provisioning, managing, and refreshing hardware keys across the organization.' },
      { title: 'Cross-Platform Compatibility', description: 'Works across Windows, macOS, Linux, iOS, and Android, and integrates with major identity providers.' },
      { title: 'Durable, Portable Form Factor', description: 'Crush-resistant, water-resistant hardware designed to survive daily carry without a battery or network connection.' },
      { title: 'Biometric YubiKey Bio Series', description: 'Fingerprint-enabled keys combining hardware security with biometric convenience.' },
    ],
    benefits: [
      { title: 'Phishing-Resistant by Design', description: 'Public-key cryptography bound to the origin domain makes credential phishing and man-in-the-middle attacks structurally ineffective.' },
      { title: 'Reduced Account Takeover Risk', description: 'Hardware-backed authentication removes the weaknesses of SMS codes and authenticator apps as the primary MFA factor.' },
      { title: 'Simplified Compliance', description: 'Meets phishing-resistant MFA requirements referenced in frameworks such as NIST 800-63B and federal zero-trust mandates.' },
      { title: 'Better User Experience', description: 'A single touch replaces typing one-time codes, reducing login friction while increasing security.' },
    ],
    useCases: [
      { title: 'Workforce Passwordless Login', description: 'Replacing passwords and SMS-based MFA with hardware-backed authentication for employees.', industries: ['Financial Services', 'Enterprise IT'] },
      { title: 'Privileged Access Protection', description: 'Securing admin, developer, and privileged accounts against credential theft and phishing.', industries: ['Technology', 'Government'] },
      { title: 'Regulatory Compliance', description: 'Meeting phishing-resistant MFA requirements in regulated and government environments.', industries: ['Government', 'Defense', 'Healthcare'] },
      { title: 'Customer-Facing Authentication', description: 'Offering hardware MFA as a strong-authentication option for high-value consumer and business accounts.', industries: ['Banking', 'Technology'] },
    ],
    industries: ['Financial Services', 'Government', 'Defense', 'Healthcare', 'Technology', 'Enterprise IT'],
    faq: [
      { question: 'What is a YubiKey?', answer: 'A YubiKey is a hardware security key that plugs into a USB port or taps via NFC to provide strong, phishing-resistant authentication, supporting standards such as FIDO2/WebAuthn, U2F, PIV smart card, OpenPGP, and OTP.' },
      { question: 'How does a YubiKey prevent phishing?', answer: 'FIDO2/WebAuthn authentication cryptographically binds each login to the legitimate origin domain, so credentials generated for one site cannot be replayed against a fraudulent look-alike site.' },
      { question: 'Do YubiKeys require a battery or internet connection?', answer: 'No. YubiKeys are powered by the USB or NFC connection at the moment of use and require no battery, network connectivity, or companion app to function.' },
      { question: 'Can YubiKeys be deployed at enterprise scale?', answer: 'Yes. Yubico offers YubiEnterprise Delivery and YubiEnterprise Subscription services for global procurement, provisioning, and lifecycle management of hardware keys across large organizations.' },
    ],
    officialUrl: 'https://www.yubico.com/',
    pagePath: '/src/pages/yubico/index.html',
    featured: true,
    order: 9,
  },
];

/** Get all products sorted by order */
export const getProducts = (): Product[] => {
  return [...products].sort((a, b) => a.order - b.order);
};

/** Get a single product by ID */
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

/** Get featured products for homepage */
export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured).sort((a, b) => a.order - b.order);
};

/** Get related products (excluding current) */
export const getRelatedProducts = (currentId: string, limit = 3): Product[] => {
  return products
    .filter((p) => p.id !== currentId)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
};
