
import { Service, Project, Testimonial, NavItem, SectionId, TechDomain, ProcessStep } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Digital Mastery Engineered for Performance";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Workflow', href: '/process' },
  { label: 'Portfolio', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and market landscape to define a clear roadmap.',
    icon: 'Search',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our design team creates intuitive, user-centric interfaces and interactive prototypes for early validation.',
    icon: 'Layers',
  },
  {
    id: 'development',
    number: '03',
    title: 'Agile Development',
    description: 'Using high-performance tech stacks, we build your solution in sprints, ensuring transparency and quality.',
    icon: 'Code',
  },
  {
    id: 'testing',
    number: '04',
    title: 'Quality Assurance',
    description: 'Rigorous manual and automated testing ensures your product is bug-free, secure, and ready for scale.',
    icon: 'ShieldCheck',
  },
  {
    id: 'deployment',
    number: '05',
    title: 'Launch & Evolution',
    description: 'We handle the deployment and provide ongoing support to scale your product based on user feedback.',
    icon: 'Rocket',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Enterprise Web Solutions',
    description: 'Scalable, high-performance web applications built for business logic and seamless integration.',
    icon: 'Globe',
    features: ['React & Next.js Experts', 'SaaS Architecture', 'E-commerce Engine', 'Custom CMS'],
    longDescription: 'We build high-availability web platforms that scale horizontally with your business. Our focus is on atomic design principles, optimized bundle sizes, and robust server-side rendering to ensure peak performance and SEO dominance.',
    technicalSpecs: [
      { label: 'Frontend Stack', value: 'React 18+, Next.js (App Router), Tailwind CSS' },
      { label: 'State Management', value: 'Zustand, React Query, Redux Toolkit' },
      { label: 'Security', value: 'OWASP Top 10 compliance, JWT/OAuth2, CSRF protection' },
      { label: 'Performance', value: 'Core Web Vitals optimization, Edge caching' }
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Native Mobile Apps',
    description: 'High-fidelity iOS and Android applications that deliver native-grade performance and fluid UX.',
    icon: 'Smartphone',
    features: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter'],
    longDescription: 'Our mobile engineering team specializes in memory-efficient applications that provide smooth 60FPS interactions. From hardware-level integrations to offline-first synchronization, we ensure your app performs in any environment.',
    technicalSpecs: [
      { label: 'Native Tech', value: 'SwiftUI (iOS), Jetpack Compose (Android)' },
      { label: 'Cross-platform', value: 'Flutter 3.x, React Native (New Architecture)' },
      { label: 'Offline Sync', value: 'SQLite, Realm, WorkManager/Background Fetch' },
      { label: 'Testing', value: 'XCTest, Espresso, Detox for E2E' }
    ]
  },
  {
    id: 'dedicated-teams',
    title: 'Dedicated Teams',
    description: 'Expand your engineering capacity with our highly skilled full-time developers and designers.',
    icon: 'Users',
    features: ['Staff Augmentation', 'Project Management', 'Full-stack Experts', 'Agile Setup'],
    longDescription: 'Access a curated pool of top 1% engineering talent in Dhaka. Our dedicated teams integrate seamlessly into your Git workflow and Jira boards, operating as a natural extension of your internal product department.',
    technicalSpecs: [
      { label: 'Communication', value: 'Slack, Microsoft Teams, Daily Standups' },
      { label: 'Workflow', value: 'GitHub Flow / Trunk-based development' },
      { label: 'Transparency', value: 'Bi-weekly sprint demos and detailed Burndown charts' },
      { label: 'Compliance', value: 'IP protection agreements and strict NDA protocols' }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    description: 'Robust AWS/GCP infrastructure with automated CI/CD pipelines and high availability.',
    icon: 'Cloud',
    features: ['AWS / GCP / Azure', 'DevOps Automation', 'Cybersecurity', 'Database Tuning'],
    longDescription: 'We design resilient cloud architectures that handle millions of requests. Our DevOps-first approach emphasizes Infrastructure as Code (IaC), zero-downtime deployments, and automated security monitoring.',
    technicalSpecs: [
      { label: 'IaC Tools', value: 'Terraform, Pulumi, AWS CDK' },
      { label: 'Containerization', value: 'Docker, Kubernetes (EKS/GKE), Helm' },
      { label: 'Monitoring', value: 'Prometheus, Grafana, Datadog' },
      { label: 'Log Aggregation', value: 'ELK Stack, CloudWatch, Sentry' }
    ]
  },
  {
    id: 'tech-frontiers',
    title: 'Solutions for Technology Frontiers',
    description: 'Cutting-edge development in AI, ML, AR/VR, Blockchain, and IoT to stay ahead of the curve.',
    icon: 'Terminal',
    features: ['Intelligent Features & AI/ML Solutions', 'Immersive Solutions & AR/VR Apps', 'Blockchain & Web-3 (Dapps) Solutions', 'IoT & Edge Computing Solutions'],
    longDescription: 'We push the boundaries of what is possible with software. From fine-tuning LLMs for specialized business logic to building high-throughput decentralized finance protocols, we help you navigate the future of tech.',
    technicalSpecs: [
      { label: 'AI/ML', value: 'PyTorch, TensorFlow, OpenAI API, Vector DBs' },
      { label: 'Blockchain', value: 'Solidity, Rust, Web3.js, Hyperledger' },
      { label: 'IoT', value: 'MQTT, WebSockets, Embedded C++, Edge AI' },
      { label: 'XR', value: 'Unity, Unreal Engine, WebXR, ARKit' }
    ]
  },
  {
    id: 'cross-platform',
    title: 'Cross-platform Solutions',
    description: 'Unified experiences across devices using modern cross-platform frameworks.',
    icon: 'Smartphone',
    features: ['PWA', 'React Native', 'Flutter', 'WebAssembly'],
    longDescription: 'Maximize your ROI by reaching users on every screen with a single codebase. We balance build speed with native performance, ensuring that your core business logic remains consistent across web, mobile, and desktop.',
    technicalSpecs: [
      { label: 'PWA', value: 'Service Workers, Web App Manifests, Push API' },
      { label: 'Architecture', value: 'Clean Architecture with Repository pattern' },
      { label: 'Performance', value: 'AOT Compilation, Tree Shaking' },
      { label: 'Distro', value: 'App Store, Play Store, and Web deployment' }
    ]
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinTech Analytics Hub',
    category: 'Enterprise Software',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1200',
    description: 'Real-time crypto-to-fiat processing with high-performance visualization.',
    fullDescription: 'We developed a high-frequency data ingestion engine paired with a real-time visualization layer to help financial analysts make split-second decisions with confidence.',
    problemStatement: 'The client faced significant lag in data processing from global stock exchanges, leading to delayed decision-making and missed opportunities.',
    technicalApproach: 'Implemented a microservices architecture using Node.js for high-concurrency ingestion and React with D3.js for granular, low-latency data rendering.',
    results: 'Reduced data latency from 5 seconds to under 200ms and increased user retention by 45% within the first quarter.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '4-5 Months',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Luma Healthcare App',
    category: 'Mobile Application',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    description: 'HIPAA-compliant telemedicine platform with EHR synchronization.',
    fullDescription: 'Luma bridges the gap between patients and providers by offering a seamless, secure, and intuitive digital clinic experience accessible from any device.',
    problemStatement: 'Rural patients struggled with access to specialists, and existing telemedicine tools were non-compliant with strict HIPAA privacy regulations.',
    technicalApproach: 'Utilized Flutter for cross-platform efficiency and WebRTC for peer-to-peer encrypted video, backed by a Firebase infrastructure for real-time updates.',
    results: 'Successfully facilitated over 50,000 virtual consultations in the first 6 months with 99.9% uptime for video calls.',
    technologies: ['Flutter', 'Firebase', 'WebRTC'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '3-4 Months',
    status: 'Maintenance'
  },
  {
    id: '3',
    title: 'Global Logistics Engine',
    category: 'Supply Chain',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    description: 'AI-driven ERP specialized in global freight and ML routing.',
    fullDescription: 'An enterprise-grade ERP specialized in global freight, leveraging machine learning to predict shipping delays and optimize routing.',
    problemStatement: 'Manual tracking of thousands of containers across various carriers led to a 15% error rate in estimated arrival times.',
    technicalApproach: 'Integrated Python-based ML models on AWS SageMaker to analyze historical traffic and weather patterns for smarter predictive routing.',
    results: 'Improved ETD/ETA accuracy by 35% and reduced operational overhead by $1.2M annually through automation.',
    technologies: ['Next.js', 'Python', 'AWS SageMaker'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '6 Months',
    status: 'In Progress'
  },
  {
    id: '4',
    title: 'Retail POS System',
    category: 'Enterprise Software',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1200',
    description: 'Next-gen cloud POS with offline-first synchronization.',
    fullDescription: 'A robust retail management suite that synchronizes inventory across hundreds of locations while maintaining high speed at checkout.',
    problemStatement: 'Existing POS systems were slow during peak hours and completely non-functional during internet outages.',
    technicalApproach: 'Built a local-first architecture using Vue.js and IndexedDB, with a Rust-based backend for high-speed central synchronization and real-time concurrency.',
    results: 'Zero downtime recorded during peak holiday seasons and a 20% increase in transaction speed.',
    technologies: ['Vue.js', 'Rust'],
    duration: '4 Months',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'EduTrack LMS',
    category: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200',
    description: 'Modular learning system with real-time engagement tracking.',
    fullDescription: 'EduTrack redefines the digital classroom with modular course builders and real-time student engagement tracking.',
    problemStatement: 'Universities needed a system that could handle sudden spikes in traffic during exam periods without compromising user experience.',
    technicalApproach: 'Leveraged NestJS with horizontal scaling on Kubernetes to ensure high availability and PostgreSQL for robust academic record management.',
    results: 'Successfully hosted 10,000+ simultaneous users during final exam weeks with zero performance degradation.',
    technologies: ['React', 'NestJS', 'PostgreSQL'],
    duration: '5-6 Months',
    status: 'Completed'
  },
  {
    id: '6',
    title: 'TravelGo Mobile',
    category: 'Mobile Application',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200',
    description: 'Personalized travel companion with real-time group planning.',
    fullDescription: 'A travel app focused on discovery, allowing users to plan, book, and share their itineraries in a single elegant interface.',
    problemStatement: 'Travelers often find it difficult to coordinate group trips and access plans in areas with poor internet connectivity.',
    technicalApproach: 'Built with React Native for high-performance cross-platform UI and GraphQL for efficient, low-bandwidth data fetching.',
    results: 'Top-rated travel app on both App Store and Play Store within 3 months of launch, with 100k+ active users.',
    technologies: ['React Native', 'TypeScript', 'GraphQL'],
    duration: '3 Months',
    status: 'In Progress'
  },
  {
    id: '7',
    title: 'SecurePay Gateway',
    category: 'SaaS Platform',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200',
    description: 'High-security payment orchestration with fraud detection.',
    fullDescription: 'SecurePay provides developers with a robust API to manage complex global payments while ensuring total PCI-DSS compliance.',
    problemStatement: 'E-commerce platforms were losing significant revenue due to high transaction failure rates in cross-border payments.',
    technicalApproach: 'Implemented a multi-gateway routing algorithm in Node.js to dynamically choose the best path for every transaction.',
    results: 'Increased international payment success rate by 18% and reduced fraud incidents by 60%.',
    technologies: ['Node.js', 'Kubernetes', 'AWS'],
    duration: '6-8 Months',
    status: 'Maintenance'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechFlow Global',
    content: "OITS Dhaka is not just a vendor; they are our technology partners. Their ability to translate complex requirements into clean code is exceptional.",
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 't2',
    name: 'Rahat Ahmed',
    role: 'Founder',
    company: 'Pathao (Demo)',
    content: "The engineering discipline and communication standard maintained by OITS Dhaka helped us ship our MVP weeks ahead of schedule.",
    avatar: 'https://i.pravatar.cc/150?u=rahat',
  },
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "Flutter", "PostgreSQL", "Rust", "Kubernetes"
];

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'Vue.js',
      'TypeScript',
      'Tailwind CSS',
      'Three.js'
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      'Node.js',
      'Python',
      'Rust',
      'NestJS',
      'PostgreSQL',
      'GraphQL'
    ]
  },
  {
    id: 'cloud',
    label: 'Infrastructure',
    skills: [
      'AWS',
      'Google Cloud (GCP)',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD'
    ]
  },
  {
    id: 'specialized',
    label: 'Specialized',
    skills: [
      'AI & Machine Learning',
      'Internet of Things (IoT)',
      'AR & VR Solutions',
      'Blockchain, Web-3 & DApp',
      'Intelligent Features Augmentation',
      'Cross-Platform Solutions',
      'Progressive Web Apps (PWA)'
    ]
  }
];
