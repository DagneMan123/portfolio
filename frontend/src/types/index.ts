export interface CaseStudy {
  problem: string
  solution: string
  result: string
}

export interface Testimonial {
  quote: string
  author: string
  title: string
  company: string
  logo?: string
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link: string
  github: string
  image?: string
  featured: boolean
  caseStudy?: CaseStudy
  testimonial?: Testimonial
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface Experience {
  id: number
  company: string
  position: string
  duration: string
  description: string
  technologies: string[]
}
