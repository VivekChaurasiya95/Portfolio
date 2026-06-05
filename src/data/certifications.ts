import { SOCIAL_LINKS } from "@/data/siteLinks";

export interface Certificate {
  title: string;
  issuer: string;
  period: string;
  credentialUrl: string;
  image: string;
  skills: string[];
  description: string;
}

const credentialUrl = `${SOCIAL_LINKS.linkedin}/details/certifications/`;

const featuredCertificates: Certificate[] = [
  // Priority items shown first in My Certifications
  {
    title: "GFG CodeRush Certificate",
    issuer: "GeeksforGeeks",
    period: "2026",
    credentialUrl,
    image: "/certificates/GFG%20CodeRsh%20Certificate_page-0001.jpg",
    skills: ["Problem Solving", "Algorithms"],
    description:
      "Certificate of achievement for completing the GFG CodeRush challenge.",
  },
  {
    title: "Google Agentic Premier League Hackathon Certificate",
    issuer: "Google Developer Group Cloud Udaipur",
    period: "2026",
    credentialUrl,
    image: "/certificates/GAPL%20certificate.png",
    skills: ["Hackathon", "AI", "Agentic Workflows"],
    description:
      "Certificate of participation for the Google Agentic Premier League hackathon.",
  },
  {
    title: "ByteEdu Internship Completion Certificate",
    issuer: "ByteEdu Learning Platform",
    period: "January 2026 to May 2026",
    credentialUrl,
    image: "/experience-proofs/byteedu-badge.png",
    skills: ["Internship", "Web Development", "Full-Stack Delivery"],
    description:
      "Certificate recognizing the successful completion of the ByteEdu internship program.",
  },
  {
    title: "Certificate of Appreciation - Finalist",
    issuer: "HACKSAGON 2026 (ABV-IIITM Gwalior)",
    period: "3-5 April 2026",
    credentialUrl,
    image: "/certificates/hacksagon.png",
    skills: ["Hackathon", "Innovation", "Technical Excellence"],
    description:
      "For successfully emerging as a Finalist among over 2100+ registered teams at HACKSAGON 2026.",
  },
  {
    title: "Certificate of Participation - From Idea to App in 60 Minutes",
    issuer: "Product Space",
    period: "16 March, 2026",
    credentialUrl,
    image: "/certificates/product-space.png",
    skills: ["No-Code Tools", "Rapid Prototyping"],
    description:
      "In Recognition of participation during the 'From Idea to App in 60 Minutes' event.",
  },
  {
    title: "Certificate of Participation - DevSprint",
    issuer: "Google Developer Groups on Campus (MITS)",
    period: "8 Dec 2025 - 24 Jan 2026",
    credentialUrl,
    image: "/certificates/devsprint.jpg",
    skills: ["AI Prototyping", "Hackathon", "Collaboration"],
    description:
      "Successfully participated and submitted a prototype at DevSprint: Leveraging the Power of AI.",
  },

  // Remaining featured items
  {
    title: "Generative AI Unleashing",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl,
    image: "/certificates/infosys-genai.png",
    skills: ["Generative AI", "AI Concepts"],
    description:
      "Successfully completing the Generative AI Unleashing course on April 27, 2026.",
  },
  {
    title: "Deep Learning for Developers",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl,
    image: "/certificates/infosys-dl.png",
    skills: ["Deep Learning", "Neural Networks"],
    description:
      "Successfully completing the Deep Learning for Developers course on April 27, 2026.",
  },
  {
    title: "Computer Vision 101",
    issuer: "Infosys Springboard",
    period: "25 April 2026",
    credentialUrl,
    image: "/certificates/infosys-cv.png",
    skills: ["Computer Vision", "AI Applications"],
    description:
      "Successfully completing the Computer Vision 101 course on April 25, 2026.",
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    period: "23 April 2026",
    credentialUrl,
    image: "/certificates/infosys-ai.jpg",
    skills: ["Artificial Intelligence", "AI Concepts"],
    description:
      "Successfully completed the Introduction to Artificial Intelligence course on April 23, 2026.",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    period: "13 April 2026",
    credentialUrl,
    image: "/certificates/infosys-data-science.jpg",
    skills: ["Data Science", "Analytics"],
    description:
      "Successfully completed the Introduction to Data Science course on April 13, 2026.",
  },
];

export const featuredCertifications = featuredCertificates;

// Non-featured certificates (gallery-only). We'll combine these with featured items
// below while placing the requested three certificates first.
const otherCertificates: Certificate[] = [
  {
    title: "Agile Scrum in Practice",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl,
    image:
      "/certificates/Agile%20Scrum%20in%20Practice%20by%20Infosys_page-0001.jpg",
    skills: ["Agile", "Scrum", "Project Management"],
    description:
      "Successfully completed the Agile Scrum in Practice course on April 27, 2026.",
  },
  {
    title: "Artificial Intelligence",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl,
    image:
      "/certificates/Artificial%20Intelligence%20by%20Infosys_page-0001.jpg",
    skills: ["Artificial Intelligence", "AI Fundamentals"],
    description:
      "Successfully completed the Artificial Intelligence course on April 27, 2026.",
  },
  {
    title: "Artificial Intelligence Primer Certification",
    issuer: "Infosys Springboard",
    period: "26 April 2026",
    credentialUrl,
    image:
      "/certificates/Artificial%20Intelligence%20Primer%20Certification%20by%20Infosys_page-0001.jpg",
    skills: ["Artificial Intelligence", "AI Foundations"],
    description:
      "Successfully completed the Artificial Intelligence Primer Certification on April 26, 2026.",
  },
  {
    title:
      "Certificate of Participation - ET AI Hackathon 2026 (Semi-Finalist)",
    issuer: "The Economic Times",
    period: "7 May 2026",
    credentialUrl,
    image:
      "/certificates/ET-AI_Hackathon_2026_Certificate_Vivek_Chaurasiya_page-0001.jpg",
    skills: ["Hackathon", "Artificial Intelligence", "Collaboration"],
    description:
      "Certificate of participation recognizing semi-finalist achievement in ET-AI Hackathon 2026.",
  },
  {
    title: "Generative Models for Developers",
    issuer: "Infosys Springboard",
    period: "27 April 2026",
    credentialUrl,
    image:
      "/certificates/Generative%20models%20for%20developers%20by%20Infosys_page-0001.jpg",
    skills: ["Generative AI", "Developer Tools"],
    description:
      "Successfully completed the Generative Models for Developers course on April 27, 2026.",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "IBM SkillsBuild",
    period: "12 Sep 2025",
    credentialUrl,
    image: "/certificates/IBM%20generative%20AI%20certificate_page-0001.jpg",
    skills: ["Generative AI", "AI Fundamentals"],
    description:
      "Completion certificate for Introduction to Generative AI (MDL-388) from IBM SkillsBuild.",
  },
  {
    title: "Introduction to Deep Learning",
    issuer: "Infosys Springboard",
    period: "24 April 2026",
    credentialUrl,
    image:
      "/certificates/Introduction%20to%20Deep%20Learning%20by%20Infosys_page-0001.jpg",
    skills: ["Deep Learning", "Neural Networks"],
    description:
      "Successfully completed the Introduction to Deep Learning course on April 24, 2026.",
  },
  {
    title: "Introduction to Natural Language Processing",
    issuer: "Infosys Springboard",
    period: "14 April 2026",
    credentialUrl,
    image:
      "/certificates/Introduction%20to%20NLP%20Infosys%20Springboard_page-0001.jpg",
    skills: ["NLP", "Language Models"],
    description:
      "Successfully completed the Introduction to Natural Language Processing course on April 14, 2026.",
  },
  {
    title: "Introduction to OpenAI GPT Models",
    issuer: "Infosys Springboard",
    period: "26 April 2026",
    credentialUrl,
    image:
      "/certificates/Introduction%20to%20OpenAI%20GPT%20Models%20by%20Infosys_page-0001.jpg",
    skills: ["OpenAI GPT", "LLMs"],
    description:
      "Successfully completed the Introduction to OpenAI GPT Models course on April 26, 2026.",
  },
  {
    title: "Hacksagon Ideation Certificate",
    issuer: "HACKSAGON",
    period: "2026",
    credentialUrl,
    image: "/certificates/Hacksagon%20Ideation%20certificate_page-0001.jpg",
    skills: ["Ideation", "Hackathon", "Innovation"],
    description:
      "Certificate acknowledging ideation-stage participation in the Hacksagon hackathon journey.",
  },
];

const priorityTitles = [
  "GFG CodeRush Certificate",
  "ByteEdu Internship Completion Certificate",
  "Google Agentic Premier League Hackathon Certificate",
  "Certificate of Appreciation - Finalist",
  "Certificate of Participation - From Idea to App in 60 Minutes",
  "Certificate of Participation - DevSprint",
];

const featuredPriority = featuredCertificates.filter((c) =>
  priorityTitles.includes(c.title),
);

const featuredRest = featuredCertificates.filter(
  (c) => !priorityTitles.includes(c.title),
);

export const allCertifications: Certificate[] = [
  ...featuredPriority,
  ...otherCertificates,
  ...featuredRest,
];
