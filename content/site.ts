import type { SiteConfig } from './types'

export const siteConfig: SiteConfig = {
  name: 'Mohamad Hassan',
  title: 'Software Engineer',
  heroHeadline: 'Building secure software across web, AI and data.',
  heroDescription:
    'Software engineer with experience in full-stack web development, enterprise software, AI and RAG, data engineering and Android.',
  heroTags: ['Full-stack', 'AI / RAG', 'Data engineering', 'Android'],
  aboutSummary:
    'I build software across web, mobile, data and AI, from early full-stack projects to a secure retrieval-augmented generation system for an enterprise application.',
  contactHeadline: 'Get in touch',
  contactDescription:
    'Interested in working together or want to know more about my work? Reach out.',
  // Add when available: email, location, github, linkedin, profileImage.
  cv: '/cv/Mohamad-Hassan-CV.pdf',
  navigation: [
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/#contact' },
  ],
  seo: {
    title: 'Mohamad Hassan | Software Engineer',
    description:
      'Portfolio of Mohamad Hassan, a software engineer working across full-stack web, AI and RAG, data engineering and Android.',
  },
}
