import { defineQuery } from 'next-sanity'

const imageProjection = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  "hotspot": hotspot{x, y},
  alt,
  caption
}`

// Portable Text: resolve inline image assets so components need no extra fetches.
const richText = (field: string) =>
  `"${field}": ${field}[]{
    ...,
    _type == "image" => ${imageProjection}
  }`

const projectSummaryFields = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  organisation,
  projectType,
  year,
  featured,
  technologies,
  "thumbnail": thumbnail${imageProjection}
`

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  fullName,
  professionalTitle,
  heroHeadline,
  heroDescription,
  heroTags,
  "profileImage": profileImage${imageProjection},
  aboutSummary,
  aboutHeadline,
  ${richText('aboutText')},
  email,
  location,
  githubUrl,
  linkedinUrl,
  "cvUrl": cv.asset->url,
  contactHeadline,
  contactDescription,
  navigation[]{label, href},
  footerText,
  siteTitle,
  defaultMetaDescription,
  "ogImage": ogImage${imageProjection}
}`)

export const FEATURED_PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true && defined(slug.current)]
  | order(displayOrder asc, _createdAt asc){${projectSummaryFields}}`)

export const ALL_PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && defined(slug.current)]
  | order(displayOrder asc, _createdAt asc){${projectSummaryFields}}`)

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)]{"slug": slug.current, _updatedAt}`,
)

export const PROJECT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  ${projectSummaryFields},
  role,
  startDate,
  endDate,
  confidential,
  projectUrl,
  githubUrl,
  repositoryVisibility,
  "coverImage": coverImage${imageProjection},
  "gallery": gallery[]${imageProjection},
  ${richText('context')},
  ${richText('problem')},
  constraints,
  responsibilities,
  ${richText('approach')},
  ${richText('architecture')},
  "architectureImages": architectureImages[]${imageProjection},
  ${richText('implementation')},
  ${richText('challenges')},
  ${richText('solution')},
  ${richText('results')},
  ${richText('lessonsLearned')},
  ${richText('body')}
}`)

export const EXPERIENCE_QUERY =
  defineQuery(`*[_type == "experience"] | order(displayOrder asc, startDate desc){
  _id,
  jobTitle,
  organisation,
  employmentType,
  location,
  startDate,
  endDate,
  currentRole,
  summary,
  responsibilities,
  technologies
}`)

export const EDUCATION_QUERY =
  defineQuery(`*[_type == "education"] | order(displayOrder asc, startDate desc){
  _id,
  degree,
  institution,
  specialization,
  startDate,
  endDate,
  description
}`)

export const SKILL_CATEGORIES_QUERY =
  defineQuery(`*[_type == "skillCategory"] | order(displayOrder asc, title asc){
  _id,
  title,
  skills
}`)
