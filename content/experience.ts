// Work experience timeline. Edit the array below, most recent role first;
// `order` controls display position (lower = earlier in the list).
import type { Experience } from './types'

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    organisation: 'DEVENTit',
    employmentType: 'Full-time',
    location: 'Hybrid, Netherlands',
    startDate: '2026-06-01',
    current: true,
    summary:
      'Full-time engineer on the multi-tenant Atlantis platform, building enterprise-grade features across the full development lifecycle.',
    responsibilities: [
      'Develop and maintain secure, enterprise-grade features for the multi-tenant Atlantis platform ecosystem.',
      'Manage and optimise dedicated client environments, contributing to reliable deployments and system stability.',
      'Support scalable architecture initiatives; uphold clean code standards, SOLID principles, and modern tooling across the development lifecycle.',
    ],
    technologies: ['Angular', 'Spring Boot', 'Java', '.NET', 'CI/CD'],
    order: 10,
  },
  {
    role: 'Graduation Intern — AI / RAG Engineering',
    organisation: 'DEVENTit',
    employmentType: 'Graduation internship',
    startDate: '2025-10-01',
    endDate: '2026-05-01',
    summary:
      'Investigated secure LLM integration into Atlantis, a multi-tenant system with strict RBAC, segment restrictions and multi-level security.',
    responsibilities: [
      'Investigated secure LLM integration into Atlantis — a multi-tenant system with strict RBAC, segment restrictions, and multi-level security.',
      'Designed and built an indexing pipeline and a hybrid retrieval pipeline combining dense vector embeddings and BM25 sparse search.',
      'Delivered a working PoC: a RAG service handles LLM reasoning while Atlantis retains full access control authority, with zero data leakage.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LangChain',
      'Qdrant',
      'OpenAI API',
      'Anthropic API',
      'RAG',
    ],
    order: 20,
  },
  {
    role: 'Part-time Software Engineer',
    organisation: 'DEVENTit',
    employmentType: 'Part-time',
    location: 'Hybrid, Netherlands',
    startDate: '2024-07-01',
    endDate: '2025-10-01',
    summary:
      'Contributed to the Atlantis platform alongside studies, building frontend components and backend endpoints in the Angular / .NET stack.',
    responsibilities: [
      'Contributed to the Atlantis platform alongside studies; built frontend components and backend endpoints in the Angular / .NET stack.',
    ],
    technologies: ['Angular', 'TypeScript', '.NET', 'ASP.NET'],
    order: 30,
  },
  {
    role: 'Internship',
    organisation: 'DEVENTit',
    employmentType: 'Internship',
    startDate: '2024-02-01',
    endDate: '2024-07-01',
    summary:
      'Embedded with the engineering team, gaining hands-on exposure to production Java / Spring Boot development and enterprise architecture.',
    responsibilities: [
      'Embedded with the engineering team; gained hands-on exposure to production Java / Spring Boot development and enterprise architecture.',
    ],
    technologies: ['Java', 'Spring Boot', '.NET'],
    order: 40,
  },
  {
    role: 'Intern — Android Mobile Development',
    organisation: 'FacilityApps',
    employmentType: 'Internship',
    startDate: '2023-11-01',
    endDate: '2024-01-01',
    summary:
      'Built Android mobile features using Kotlin and Jetpack Compose, progressing from UI fundamentals to a complete solo application.',
    responsibilities: [
      'Built Android mobile features using Kotlin and Jetpack Compose, progressing from UI fundamentals to delivering a complete solo application.',
      'Worked with state management, navigation, Material Design components, and Android testing workflows.',
    ],
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Android Studio',
      'Material Design',
    ],
    order: 50,
  },
]
