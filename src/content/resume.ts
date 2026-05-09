import { Locales } from '../constants/translate.config'

export type ResumeSocialLink = {
  id: number | string
  name: string
  link: string
}

export type ResumeTechnicalSkill = {
  name: string
  level: string
  score: number
}

export type ResumeExperience = {
  institution: string
  period: string
  position: string
  responsibilities: string[]
}

export type ResumeEducation = {
  institution: string
  period: string
  details: string
}

export type ResumeLearningItem = {
  title: string
  description: string
}

export type ResumeCertificateItem = {
  id: string
  title: string
  completionDate?: string | null
}

export type ResumeLocalizedContent = {
  pageTitle: string
  eyebrow: string
  printAction: string
  printHint: string
  professionalSummaryLabel: string
  currentPositionLabel: string
  contactLabel: string
  educationTitle: string
  technicalSkillsTitle: string
  softSkillsTitle: string
  experienceTitle: string
  certificatesTitle: string
  additionalTitle: string
  currentPosition: string
  name: string
  summary: string
  contactNote: string
  education: ResumeEducation[]
  technicalSkills: Array<{
    group: string
    items: ResumeTechnicalSkill[]
  }>
  softSkills: string[]
  experience: ResumeExperience[]
  additional: ResumeLearningItem[]
}

const localizedResumeContent: Record<Locales, ResumeLocalizedContent> = {
  es: {
    pageTitle: 'Resumen',
    eyebrow: 'Currículum',
    printAction: 'Abrir documento imprimible',
    printHint:
      'Versión preparada con htmldocs para compartir o imprimir en formato de documento.',
    professionalSummaryLabel: 'Perfil profesional',
    currentPositionLabel: 'Posición actual',
    contactLabel: 'Contacto',
    educationTitle: 'Formación académica',
    technicalSkillsTitle: 'Habilidades técnicas',
    softSkillsTitle: 'Habilidades blandas',
    experienceTitle: 'Experiencia laboral',
    certificatesTitle: 'Certificados',
    additionalTitle: 'Aprendizaje continuo',
    currentPosition: 'Ingeniero de software',
    name: 'Dalvin Molina',
    summary:
      'Soy ingeniero de software apasionado por el desarrollo web, especializado en construir interfaces limpias y funcionales, integraciones sólidas con APIs y experiencias digitales cuidadas utilizando React y TypeScript. Mi enfoque no se limita a la usabilidad: también busco diseñar arquitecturas escalables y sostenibles que permitan el crecimiento de los proyectos y faciliten la colaboración entre equipos. Me motiva crear soluciones claras, mantenibles y consistentes, siempre con la mirada puesta en la evolución tecnológica y la mejora continua.',
    contactNote:
      'Canales profesionales y portafolio listos para compartir en procesos de selección y colaboración.',
    education: [
      {
        institution: 'ITLA',
        period: 'sept. 2018 - abr. 2021',
        details: 'Tecnólogo en desarrollo de software.',
      },
      {
        institution: 'Universidad APEC',
        period: 'sept. 2022 - Actualidad',
        details: 'Ingeniería de software.',
      },
    ],
    technicalSkills: [
      {
        group: 'Desarrollo Fullstack',
        items: [
          { name: 'C# / .NET Web API', level: 'Avanzado', score: 95 },
          { name: 'JavaScript / TypeScript', level: 'Avanzado', score: 90 },
          { name: 'React / Next.js', level: 'Avanzado', score: 88 },
          { name: 'Angular', level: 'Intermedio - Avanzado', score: 82 },
          { name: 'Node.js (MERN)', level: 'Intermedio - Avanzado', score: 80 },
          { name: 'HTML5 / CSS3 / Tailwind', level: 'Avanzado', score: 90 },
          { name: 'Python', level: 'Avanzado', score: 50 },
        ],
      },
      {
        group: 'Arquitectura, Datos y DevOps',
        items: [
          { name: 'Diseño de APIs REST', level: 'Avanzado', score: 85 },
          {
            name: 'Autenticación (JWT/JWE) & Seguridad',
            level: 'Avanzado',
            score: 83,
          },
          { name: 'Integración de APIs', level: 'Avanzado', score: 82 },
          {
            name: 'SQL Server & Modelado de Datos',
            level: 'Intermedio - Avanzado',
            score: 84,
          },
          {
            name: 'Microservicios & API Gateway',
            level: 'Intermedio',
            score: 78,
          },
          {
            name: 'Git / GitHub & Workflow',
            level: 'Intermedio - Avanzado',
            score: 78,
          },
          { name: 'Deploy (Vercel, entornos)', level: 'Intermedio', score: 75 },
          {
            name: 'Testing & herramientas (Postman)',
            level: 'Avanzado',
            score: 82,
          },
          { name: 'Streamlit (Data)', level: 'Intermedio', score: 30 },
        ],
      },
    ],
    softSkills: [
      'Comunicación clara y profesional en entornos técnicos.',
      'Escucha activa para entender contexto, objetivos y retroalimentación.',
      'Liderazgo de equipo y coordinación técnica.',
      'Organización del trabajo y enfoque en mejora continua.',
      'Colaboración con criterio y atención al detalle.',
    ],
    experience: [
      {
        institution: 'Ministerio Público | República Dominicana | Presencial',
        period: 'oct. 2021 - feb. 2025 | 3 años 5 meses',
        position: 'Programador',
        responsibilities: [
          'Líder de equipo.',
          'Diseño y creación de aplicaciones web utilizando tecnologías como .NET, ReactJS, Redux y TypeScript.',
          'Diseño y desarrollo de servicios web en .NET.',
          'Migración de servicios web a las versiones más recientes de .NET.',
        ],
      },
      {
        institution:
          'Entidad gubernamental | República Dominicana | Presencial',
        period: 'feb. 2025 - actualidad | 1 año+',
        position: 'Desarrollador de software',
        responsibilities: [
          'Lider de equipo',
          'Digitalización de procesos manuales para optimizar la gestión institucional.',
          'Diseño y desarrollo de herramientas de análisis de datos.',
          'Implementación de soluciones para el manejo y visualización de información.',
          'Innovación tecnológica aplicada a proyectos de investigación y gestión pública.',
        ],
      },
    ],
    additional: [
      {
        title: 'Principales aptitudes',
        description: '.NET Core, React.js, ASP.NET Web API, SQL y AngularJS.',
      },
      {
        title: 'Enfoque profesional',
        description:
          'Experiencia en aplicaciones web, integracion con APIs, web services y administracion de bases de datos.',
      },
    ],
  },
  en: {
    pageTitle: 'Resume',
    eyebrow: 'Curriculum',
    printAction: 'Open printable document',
    printHint:
      'Document-ready version built with htmldocs for sharing or printing.',
    professionalSummaryLabel: 'Professional summary',
    currentPositionLabel: 'Current position',
    contactLabel: 'Contact',
    educationTitle: 'Academic background',
    technicalSkillsTitle: 'Technical skills',
    softSkillsTitle: 'Soft skills',
    experienceTitle: 'Work experience',
    certificatesTitle: 'Certificates',
    additionalTitle: 'Continuous learning',
    currentPosition: 'Software Engineer',
    name: 'Dalvin Molina',
    summary:
      'I am a software engineer passionate about web development, with experience building clean and functional interfaces, solid API integrations, and polished digital experiences using React and TypeScript. My work goes beyond usability—I strive to design scalable and sustainable architectures that support project growth and foster effective team collaboration. I aim to deliver solutions that combine visual clarity, code maintainability, and a consistent user experience, always with a focus on technological evolution and continuous improvement.',
    contactNote:
      'Professional channels and portfolio links prepared for hiring processes and collaboration.',
    education: [
      {
        institution: 'ITLA',
        period: 'Sept. 2018 - Apr. 2021',
        details: 'Technologist in software development.',
      },
      {
        institution: 'Universidad APEC',
        period: 'Sept. 2022 - Present',
        details: 'Computer Software Engineering.',
      },
    ],
    technicalSkills: [
      {
        group: 'Fullstack Development',
        items: [
          { name: 'C# / .NET Web API', level: 'Avanzado', score: 95 },
          { name: 'JavaScript / TypeScript', level: 'Avanzado', score: 90 },
          { name: 'React / Next.js', level: 'Avanzado', score: 88 },
          { name: 'Angular', level: 'Intermedio - Avanzado', score: 82 },
          { name: 'Node.js (MERN)', level: 'Intermedio - Avanzado', score: 80 },
          { name: 'HTML5 / CSS3 / Tailwind', level: 'Avanzado', score: 90 },
          { name: 'Python', level: 'Avanzado', score: 50 },
        ],
      },
      {
        group: 'Architecture, Data & DevOps',
        items: [
          { name: 'REST API Design', level: 'Advanced', score: 85 },
          {
            name: 'Authentication (JWT) & Security',
            level: 'Advanced',
            score: 83,
          },
          { name: 'API Integration', level: 'Advanced', score: 82 },
          {
            name: 'SQL Server & Data Modeling',
            level: 'Intermediate - Advanced',
            score: 84,
          },
          {
            name: 'Microservices & API Gateway',
            level: 'Intermediate',
            score: 78,
          },
          {
            name: 'Git / GitHub & Workflow',
            level: 'Intermediate - Advanced',
            score: 78,
          },
          {
            name: 'Deployment (Vercel, environments)',
            level: 'Intermediate',
            score: 75,
          },
          { name: 'Testing & Tools (Postman)', level: 'Advanced', score: 82 },
          { name: 'Streamlit (Data)', level: 'Beginner', score: 30 },
        ],
      },
    ],
    softSkills: [
      'Clear and professional communication in technical environments.',
      'Active listening to understand context, goals and feedback.',
      'Team leadership and technical coordination.',
      'Organized work habits with a continuous improvement mindset.',
      'Collaborative approach with attention to detail.',
    ],
    experience: [
      {
        institution: 'Ministerio Publico | Dominican Republic | On-site',
        period: 'Oct. 2021 - Feb. 2025 | 3 years 5 months',
        position: 'Programmer',
        responsibilities: [
          'Team leader.',
          'Design and creation of web applications using technologies such as .NET, ReactJS, Redux and TypeScript.',
          'Design and development of web services in .NET.',
          'Migration of web services to the latest versions of .NET.',
        ],
      },
      {
        institution:
          'Government entity | Dominican Republic | On-site',
        period: 'Feb. 2025 - Present | 1 year+',
        position: 'Software Developer',
        responsibilities: [
          'Team Lead',
          'Digitization of manual processes to optimize institutional management.',
          'Design and development of data analysis tools.',
          'Implementation of solutions for information management and visualization.',
          'Technological innovation applied to research and public management projects.',
        ],
      },
    ],
    additional: [
      {
        title: 'Top skills',
        description: '.NET Core, React.js, ASP.NET Web API, SQL and AngularJS.',
      },
      {
        title: 'Professional focus',
        description:
          'Experience in web applications, API integration, web services and database administration.',
      },
    ],
  },
}

export const getResumeContent = (
  lang: Locales,
  socialLinks: ResumeSocialLink[]
) => {
  const content = localizedResumeContent[lang]

  return {
    ...content,
    socialLinks,
  }
}
