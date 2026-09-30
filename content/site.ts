import type { SiteConfig } from './types'

export const siteConfig: SiteConfig = {
  name: 'Mohamad Hassan',
  title: 'Software Engineer',
  heroHeadline: 'Building secure software across web, AI and data.',
  heroDescription:
    'Software engineer with a full-stack background and a track record of building secure, enterprise-grade web applications, specialising across web, mobile, big data and AI.',
  highlights: [
    { label: 'Full-stack, enterprise software, AI / RAG', href: '/projects' },
    { label: 'Data engineering, Android, CI/CD', href: '/#skills' },
  ],
  aboutSummary:
    'I build software across web, mobile, data and AI, from early full-stack projects to a secure retrieval-augmented generation system for an enterprise application at DEVENTit, where I now work full-time as a software engineer.',
  contactHeadline: 'Get in touch',
  contactDescription:
    'Interested in working together or want to know more about my work? Reach out.',
  email: 'm.ah.hassan@outlook.com',
  location: 'Netherlands',
  linkedin: 'https://www.linkedin.com/in/m--hassan',
  cv: '/cv/Mohamad-Hassan-CV.pdf',
  navigation: [
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/#contact' },
  ],
  seo: {
    title: 'Mohamad Hassan | Software Engineer',
    description:
      'Portfolio of Mohamad Hassan, a software engineer working across full-stack web, AI and RAG, data engineering and Android.',
  },
}
