import type { SkillCategory } from './types'

export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    order: 1,
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
    name: 'Backend',
    order: 2,
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
    name: 'AI & Data',
    order: 3,
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
    name: 'Mobile',
    order: 4,
    skills: [
      'Kotlin',
      'Jetpack Compose',
      'Android Studio',
      'Gradle',
      'Material Design',
    ],
  },
  {
    name: 'Infrastructure / DevOps',
    order: 5,
    skills: ['Docker', 'Terraform', 'CI/CD'],
  },
  {
    name: 'Software Engineering',
    order: 6,
    skills: [
      'Software architecture',
      'Role-based access control',
      'MVC',
      'Pytest',
      'Cypress',
    ],
  },
]
