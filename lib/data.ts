import { Course } from "@/types";

export const courseCategories = [
  "Development",
  "Data",
  "Design",
  "Marketing",
  "Business",
  "Photography"
];

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const seedCourses: Course[] = [
  {
    id: "frontend-masterclass-2026",
    title: "Frontend Masterclass with React and TypeScript",
    slug: "frontend-masterclass-react-typescript",
    shortDescription: "Build modern interfaces with reusable components, typed props, forms, routing, and polished UI patterns.",
    fullDescription: "A practical frontend program designed for learners who want to move from basic React to professional production interfaces. You will build reusable components, design responsive layouts, validate forms, manage client state, and understand how TypeScript makes a large frontend safer and easier to maintain.",
    price: 69,
    category: "Development",
    level: "Intermediate",
    rating: 4.8,
    reviewCount: 214,
    location: "Online",
    duration: "8 weeks",
    instructor: "Nadia Rahman",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["React", "TypeScript", "Forms", "Responsive UI", "Component Architecture"],
    language: "English",
    updatedAt: "2026-06-21",
    reviews: [
      { user: "Arif Hossain", rating: 5, comment: "The component architecture section helped me rebuild my portfolio with confidence.", date: "2026-06-30" },
      { user: "Maya Chen", rating: 4.7, comment: "Clear explanations, useful assignments, and very practical TypeScript examples.", date: "2026-06-24" }
    ]
  },
  {
    id: "fullstack-nextjs-mongodb",
    title: "Full Stack Next.js, MongoDB and JWT Bootcamp",
    slug: "fullstack-nextjs-mongodb-jwt",
    shortDescription: "Create secure applications with route handlers, protected pages, JWT cookies, MongoDB models, and deployment workflows.",
    fullDescription: "This bootcamp walks through the full lifecycle of a modern full-stack application. You will design API routes, connect MongoDB, protect pages with JWT cookies, validate request payloads, and deploy a professional application with environment variables and a clean repository structure.",
    price: 89,
    category: "Development",
    level: "Advanced",
    rating: 4.9,
    reviewCount: 187,
    location: "Online",
    duration: "10 weeks",
    instructor: "Samir Ahmed",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Next.js", "MongoDB", "JWT", "API Design", "Deployment"],
    language: "English",
    updatedAt: "2026-06-18",
    reviews: [
      { user: "Jannatul Ferdous", rating: 5, comment: "The auth flow and deployment checklist made the project feel industry-ready.", date: "2026-07-01" },
      { user: "Tanvir Islam", rating: 4.9, comment: "Best course for understanding backend logic inside a Next.js app.", date: "2026-06-28" }
    ]
  },
  {
    id: "data-analytics-dashboard",
    title: "Data Analytics Dashboard Design",
    slug: "data-analytics-dashboard-design",
    shortDescription: "Turn business metrics into readable dashboards with charts, filters, KPIs, and executive summaries.",
    fullDescription: "Learn how to design dashboards that are useful for real business decisions. The program covers data cleaning concepts, chart selection, KPI hierarchy, dashboard layout, and presenting insights with clarity. Final projects include an analytics dashboard and a written insight report.",
    price: 59,
    category: "Data",
    level: "Beginner",
    rating: 4.7,
    reviewCount: 142,
    location: "Online",
    duration: "6 weeks",
    instructor: "Taslima Noor",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["KPIs", "Recharts", "Analytics", "Data Storytelling", "Dashboard UX"],
    language: "English",
    updatedAt: "2026-06-12",
    reviews: [
      { user: "Nusrat Jahan", rating: 4.8, comment: "The KPI framework was simple and immediately useful for my office report.", date: "2026-06-20" }
    ]
  },
  {
    id: "ux-research-product-design",
    title: "UX Research and Product Design Sprint",
    slug: "ux-research-product-design-sprint",
    shortDescription: "Plan interviews, map user journeys, test prototypes, and build practical product design decisions.",
    fullDescription: "A project-based design sprint where learners define a product problem, interview target users, design wireframes, run usability tests, and present a complete product improvement proposal. The curriculum focuses on real UX research habits instead of decorative design only.",
    price: 64,
    category: "Design",
    level: "Intermediate",
    rating: 4.6,
    reviewCount: 98,
    location: "Dhaka + Online",
    duration: "5 weeks",
    instructor: "Farhana Karim",
    images: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["User Research", "Wireframes", "Usability Testing", "Product Thinking"],
    language: "English",
    updatedAt: "2026-05-30",
    reviews: [
      { user: "Rafiq Hasan", rating: 4.6, comment: "The interview scripts and testing templates were very practical.", date: "2026-06-19" }
    ]
  },
  {
    id: "digital-marketing-growth",
    title: "Digital Marketing Growth Lab",
    slug: "digital-marketing-growth-lab",
    shortDescription: "Create campaigns with SEO, content funnels, social ads, analytics tracking, and conversion experiments.",
    fullDescription: "This course teaches digital marketing through a complete campaign workflow. Learners build a content calendar, keyword strategy, ad brief, landing page message, analytics plan, and conversion experiment. Every module is connected to measurable growth outcomes.",
    price: 49,
    category: "Marketing",
    level: "Beginner",
    rating: 4.5,
    reviewCount: 176,
    location: "Online",
    duration: "6 weeks",
    instructor: "Imran Chowdhury",
    images: [
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["SEO", "Social Ads", "Analytics", "Campaign Strategy", "Conversion"],
    language: "English",
    updatedAt: "2026-06-08",
    reviews: [
      { user: "Sabrina Akter", rating: 4.5, comment: "The campaign plan helped me organize my small business marketing properly.", date: "2026-06-26" }
    ]
  },
  {
    id: "startup-finance-founders",
    title: "Startup Finance for New Founders",
    slug: "startup-finance-new-founders",
    shortDescription: "Understand revenue models, cash flow, pricing, unit economics, and investor-ready financial storytelling.",
    fullDescription: "Founders learn how to make practical financial decisions before scaling. Lessons cover pricing, customer acquisition cost, runway, profit margins, cash flow discipline, and communicating financial logic to investors or partners.",
    price: 79,
    category: "Business",
    level: "Intermediate",
    rating: 4.7,
    reviewCount: 121,
    location: "Online",
    duration: "7 weeks",
    instructor: "Mahmud Rahman",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Cash Flow", "Pricing", "Unit Economics", "Investor Pitch", "Budgeting"],
    language: "English",
    updatedAt: "2026-05-25",
    reviews: [
      { user: "Khalid Mahin", rating: 4.8, comment: "Very useful for understanding pricing and runway before launching.", date: "2026-06-14" }
    ]
  },
  {
    id: "mobile-photography-storytelling",
    title: "Mobile Photography and Visual Storytelling",
    slug: "mobile-photography-visual-storytelling",
    shortDescription: "Shoot better portraits, product photos, travel moments, and social visuals using only a smartphone.",
    fullDescription: "A hands-on visual storytelling course for creators and small businesses. Learners practice lighting, composition, editing, color consistency, and short-form storytelling for social platforms. Assignments are designed around everyday locations and affordable tools.",
    price: 39,
    category: "Photography",
    level: "Beginner",
    rating: 4.4,
    reviewCount: 88,
    location: "Chattogram + Online",
    duration: "4 weeks",
    instructor: "Raiyan Kabir",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Composition", "Lighting", "Editing", "Storytelling", "Social Content"],
    language: "Bangla + English",
    updatedAt: "2026-06-01",
    reviews: [
      { user: "Mehedi Hasan", rating: 4.5, comment: "My product photos improved after the lighting and framing lessons.", date: "2026-06-16" }
    ]
  },
  {
    id: "python-data-science-foundation",
    title: "Python Data Science Foundation",
    slug: "python-data-science-foundation",
    shortDescription: "Learn Python, notebooks, data cleaning, visualization, and beginner machine learning workflows.",
    fullDescription: "A structured data science foundation for learners who want to start with Python and progress to practical analysis. The course includes notebooks, datasets, cleaning workflows, visual summaries, and a beginner-friendly machine learning capstone.",
    price: 74,
    category: "Data",
    level: "Beginner",
    rating: 4.8,
    reviewCount: 203,
    location: "Online",
    duration: "9 weeks",
    instructor: "Dr. Ayesha Siddique",
    images: [
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Python", "Pandas", "Visualization", "Data Cleaning", "Machine Learning Basics"],
    language: "English",
    updatedAt: "2026-06-16",
    reviews: [
      { user: "Rumana Islam", rating: 4.9, comment: "A very friendly starting point for Python and data analysis.", date: "2026-06-27" }
    ]
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System Workshop",
    slug: "brand-identity-system-workshop",
    shortDescription: "Design logos, color rules, typography systems, social templates, and brand presentation boards.",
    fullDescription: "This workshop teaches the structure behind consistent branding. Students create a logo direction, color and typography rules, social media layouts, and a brand usage guide that can be presented professionally to a client or team.",
    price: 54,
    category: "Design",
    level: "Intermediate",
    rating: 4.6,
    reviewCount: 119,
    location: "Online",
    duration: "5 weeks",
    instructor: "Zara Mahmood",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Logo Direction", "Color System", "Typography", "Social Templates", "Brand Guide"],
    language: "English",
    updatedAt: "2026-06-05",
    reviews: [
      { user: "Riya Sen", rating: 4.6, comment: "The brand guide format made my client presentation look organized.", date: "2026-06-13" }
    ]
  },
  {
    id: "product-management-roadmap",
    title: "Product Management Roadmap Program",
    slug: "product-management-roadmap-program",
    shortDescription: "Learn product discovery, prioritization, roadmap planning, stakeholder updates, and launch review.",
    fullDescription: "A practical product management program for aspiring PMs and founders. It covers problem discovery, user stories, prioritization frameworks, roadmap communication, release planning, and evaluating launch outcomes with customer and business signals.",
    price: 84,
    category: "Business",
    level: "Advanced",
    rating: 4.7,
    reviewCount: 132,
    location: "Online",
    duration: "8 weeks",
    instructor: "Omar Faruq",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Discovery", "Roadmaps", "Prioritization", "Stakeholder Updates", "Launch Review"],
    language: "English",
    updatedAt: "2026-06-11",
    reviews: [
      { user: "Tariq Amin", rating: 4.7, comment: "The roadmap and release planning templates were the strongest parts.", date: "2026-06-22" }
    ]
  },
  {
    id: "content-writing-seo",
    title: "SEO Content Writing Studio",
    slug: "seo-content-writing-studio",
    shortDescription: "Write search-focused articles, service pages, product descriptions, and editorial calendars with measurable goals.",
    fullDescription: "A writing studio for people who want to create content that is useful to readers and discoverable in search. Learners practice keyword mapping, article outlines, content briefs, on-page SEO, internal links, and performance review.",
    price: 45,
    category: "Marketing",
    level: "Beginner",
    rating: 4.5,
    reviewCount: 91,
    location: "Online",
    duration: "4 weeks",
    instructor: "Sadia Anjum",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["SEO Writing", "Keyword Mapping", "Content Briefs", "Editorial Calendar"],
    language: "English",
    updatedAt: "2026-06-04",
    reviews: [
      { user: "Habib Rahman", rating: 4.5, comment: "The content brief workflow improved my writing speed.", date: "2026-06-17" }
    ]
  },
  {
    id: "advanced-node-api-security",
    title: "Advanced Node API Security",
    slug: "advanced-node-api-security",
    shortDescription: "Secure APIs with validation, authorization checks, rate-limit planning, error handling, and audit-ready logs.",
    fullDescription: "This advanced backend course focuses on safe API design. It covers request validation, authorization boundaries, JWT decisions, error response patterns, rate-limit planning, logging, and API documentation habits for professional teams.",
    price: 94,
    category: "Development",
    level: "Advanced",
    rating: 4.9,
    reviewCount: 101,
    location: "Online",
    duration: "7 weeks",
    instructor: "Hasan Mahmud",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80"
    ],
    skills: ["Node.js", "Authorization", "Validation", "Security", "API Logs"],
    language: "English",
    updatedAt: "2026-06-23",
    reviews: [
      { user: "Sohan Karim", rating: 4.9, comment: "Excellent for understanding authorization checks beyond basic login.", date: "2026-07-02" }
    ]
  }
];

export const testimonials = [
  {
    name: "Afsana Hoque",
    role: "Frontend Intern",
    quote: "CourseNest helped me choose a learning path with clear outcomes instead of random tutorials."
  },
  {
    name: "Rakib Hasan",
    role: "Small Business Owner",
    quote: "The marketing and photography courses gave me practical tasks I could apply to my shop immediately."
  },
  {
    name: "Jui Akter",
    role: "Data Learner",
    quote: "The course details, reviews, and filters made it easy to compare options before enrolling."
  }
];

export const blogPosts = [
  {
    title: "How to choose a course when every topic feels urgent",
    date: "2026-06-27",
    excerpt: "A simple decision framework for matching courses with your goal, schedule, current skill level, and portfolio needs."
  },
  {
    title: "Why project-based learning improves job readiness",
    date: "2026-06-18",
    excerpt: "Portfolio projects help learners explain what they can build, how they think, and how they solve real constraints."
  },
  {
    title: "A practical weekly study routine for busy learners",
    date: "2026-06-10",
    excerpt: "Use short review loops, focused practice blocks, and measurable weekly goals to stay consistent without burnout."
  }
];

export const faqs = [
  {
    question: "Can I preview course information without logging in?",
    answer: "Yes. Explore pages and details pages are public so visitors can compare courses before creating an account."
  },
  {
    question: "Why are add and manage pages protected?",
    answer: "Only signed-in users can create or manage items. The API also verifies the JWT token before accepting protected actions."
  },
  {
    question: "Does the project support MongoDB?",
    answer: "Yes. Add a MongoDB URI in the environment file and run the seed script to create demo users and courses."
  }
];
