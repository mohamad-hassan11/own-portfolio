import type { SkillCategory } from './types'

export const skills: SkillCategory[] = [
  {
    name: 'Frontend',
    order: 1,
    skills: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'RxJS',
      'Angular Router',
      'HTML',
      'CSS',
      'Bootstrap',
    ],
  },
  {
    name: 'Backend',
    order: 2,
    skills: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      '.NET',
      'ASP.NET',
      'Node.js',
      'Express',
      'Python',
      'FastAPI',
      'REST APIs',
      'JWT authentication',
    ],
  },
  {
    name: 'AI & Data',
    order: 3,
    skills: [
      'RAG',
      'LangChain',
      'Qdrant',
      'OpenAI API',
      'Anthropic API',
      'Hybrid retrieval',
      'Dense vector embeddings',
      'BM25',
      'Sentence Transformers',
      'Dash / Plotly',
    ],
  },
  {
    name: 'Mobile',
    order: 4,
    skills: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'Material Design'],
  },
  {
    name: 'Infrastructure / DevOps',
    order: 5,
    skills: ['Docker', 'Docker Compose', 'CI/CD', 'Terraform', 'Git'],
  },
  {
    name: 'Software Engineering',
    order: 6,
    skills: [
      'SQL & NoSQL databases',
      'SOLID principles',
      'Design patterns',
      'Algorithms & data structures',
      'JUnit',
      'Pytest',
      'Cypress',
    ],
  },
]
