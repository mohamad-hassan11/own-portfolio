/**
 * Inserts starter content. Safe to re-run: existing documents are never overwritten.
 * Run: npm run seed
 *
 * Contains only facts from the project brief. Dates, metrics, URLs, roles and
 * employer details are intentionally left empty for the owner to add in Studio.
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

interface SeedProject {
  id: string
  title: string
  slug: string
  shortDescription: string
  featured: boolean
  displayOrder: number
  technologies: string[]
  organisation?: string
  projectType?: string
  confidential?: boolean
}

const projects: SeedProject[] = [
  {
    id: 'project-secure-llm-rag',
    title: 'Secure LLM / RAG Integration',
    slug: 'secure-llm-rag-integration',
    shortDescription:
      'Natural-language search for an enterprise application, combining dense-vector and BM25 retrieval with role-based access control.',
    organisation: 'DEVENTit',
    projectType: 'Graduation project',
    confidential: true,
    featured: true,
    displayOrder: 10,
    technologies: [
      'Python',
      'FastAPI',
      'RAG',
      'Hybrid retrieval',
      'Dense vector embeddings',
      'BM25',
      'Vector databases',
      'LLM APIs',
      'Role-based access control',
    ],
  },
  {
    id: 'project-arkive-big-data',
    title: 'Arkive Big Data Project',
    slug: 'arkive-big-data',
    shortDescription:
      'API data ingestion, transformation and KPI dashboards, delivered with automated tests and a containerised CI/CD pipeline.',
    featured: true,
    displayOrder: 20,
    technologies: [
      'Python',
      'Flask',
      'Dash / Plotly',
      'SQLAlchemy',
      'MySQL',
      'Pytest',
      'Docker',
      'Terraform',
      'CI/CD',
    ],
  },
  {
    id: 'project-android-mobile',
    title: 'Android Mobile Development',
    slug: 'android-mobile-development',
    shortDescription:
      'A native Android application built with Kotlin and Jetpack Compose, covering state management, navigation and testing.',
    featured: true,
    displayOrder: 30,
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Android Studio',
      'Gradle',
      'Material Design',
      'State management',
      'Navigation',
      'Testing',
    ],
  },
  {
    id: 'project-amsterdam-events-ewa',
    title: 'Amsterdam Events (EWA)',
    slug: 'amsterdam-events-ewa',
    shortDescription:
      'A full-stack web application with an Angular front end and a Spring Boot REST API secured with JWT authentication.',
    featured: true,
    displayOrder: 40,
    technologies: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Router',
      'Spring Boot',
      'Java',
      'REST APIs',
      'Spring Data JPA',
      'JWT authentication',
    ],
  },
  {
    id: 'project-pad',
    title: 'PAD',
    slug: 'pad',
    shortDescription:
      'An earlier full-stack web project using Node.js and Express with an MVC-style architecture and end-to-end tests.',
    featured: false,
    displayOrder: 50,
    technologies: [
      'Node.js',
      'Express',
      'MySQL',
      'JavaScript',
      'Bootstrap',
      'MVC',
      'Cypress',
    ],
  },
  {
    id: 'project-flyfriends',
    title: 'FlyFriends',
    slug: 'flyfriends',
    shortDescription:
      'An earlier web project with profile management and matching logic backed by a SQL database.',
    featured: false,
    displayOrder: 60,
    technologies: ['HTML', 'CSS', 'JavaScript', 'SQL', 'Matching logic'],
  },
]

const skillCategories = [
  {
    id: 'skills-frontend',
    title: 'Frontend',
    displayOrder: 10,
    skills: [
      'Angular',
      'TypeScript',
      'RxJS',
      'JavaScript',
      'HTML',
      'CSS',
      'Bootstrap',
      'Jetpack Compose',
    ],
  },
  {
    id: 'skills-backend',
    title: 'Backend',
    displayOrder: 20,
    skills: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'Python',
      'FastAPI',
      'Flask',
      'Node.js',
      'Express',
      'REST APIs',
      'JWT authentication',
      'SQLAlchemy',
      'MySQL',
    ],
  },
  {
    id: 'skills-ai-data',
    title: 'AI & Data',
    displayOrder: 30,
    skills: [
      'RAG',
      'Hybrid retrieval',
      'Dense vector embeddings',
      'BM25',
      'Vector databases',
      'LLM APIs',
      'Data ingestion',
      'KPI dashboards',
      'Dash / Plotly',
    ],
  },
  {
    id: 'skills-mobile',
    title: 'Mobile',
    displayOrder: 40,
    skills: [
      'Kotlin',
      'Jetpack Compose',
      'Android Studio',
      'Gradle',
      'Material Design',
    ],
  },
  {
    id: 'skills-devops',
    title: 'Infrastructure / DevOps',
    displayOrder: 50,
    skills: ['Docker', 'Terraform', 'CI/CD'],
  },
  {
    id: 'skills-engineering',
    title: 'Software Engineering',
    displayOrder: 60,
    skills: [
      'Software architecture',
      'Role-based access control',
      'MVC',
      'Pytest',
      'Cypress',
    ],
  },
]

async function main() {
  const tx = client.transaction()

  tx.createIfNotExists({
    _id: 'siteSettings',
    _type: 'siteSettings',
    fullName: 'Mohamad Hassan',
    professionalTitle: 'Software Engineer',
    heroHeadline: 'Building secure software across web, AI and data.',
    heroDescription:
      'Software engineer with experience in full-stack web development, enterprise software, AI and RAG, data engineering and Android.',
    heroTags: ['Full-stack', 'AI / RAG', 'Data engineering', 'Android'],
    aboutSummary:
      'I build software across web, mobile, data and AI, from early full-stack projects to a secure retrieval-augmented generation system for an enterprise application.',
    aboutHeadline: 'About',
    contactHeadline: 'Get in touch',
    contactDescription:
      'Interested in working together or want to know more about my work? Reach out.',
    siteTitle: 'Mohamad Hassan | Software Engineer',
    defaultMetaDescription:
      'Portfolio of Mohamad Hassan, a software engineer working across full-stack web, AI and RAG, data engineering and Android.',
  })

  for (const p of projects) {
    tx.createIfNotExists({
      _id: p.id,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      shortDescription: p.shortDescription,
      organisation: p.organisation,
      projectType: p.projectType,
      confidential: p.confidential ?? false,
      featured: p.featured,
      displayOrder: p.displayOrder,
      technologies: p.technologies,
    })
  }

  for (const c of skillCategories) {
    tx.createIfNotExists({
      _id: c.id,
      _type: 'skillCategory',
      title: c.title,
      displayOrder: c.displayOrder,
      skills: c.skills,
    })
  }

  await tx.commit()
  console.log(
    `Seed complete: siteSettings, ${projects.length} projects, ${skillCategories.length} skill categories.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
