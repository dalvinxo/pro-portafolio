import React from 'react'
import { Document, Head, Page } from '@htmldocs/react'

import {
  getResumeContent,
  ResumeCertificateItem,
  ResumeSocialLink,
} from '../content/resume'
import { Locales } from '../constants/translate.config'

type ResumeDocumentProps = {
  lang: Locales
  socialLinks: ResumeSocialLink[]
  certificates: ResumeCertificateItem[]
}

const styles = {
  page: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontFamily:
      '"Inter", "Segoe UI", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '30px 34px 24px',
    minHeight: '100%',
  } as React.CSSProperties,
  eyebrow: {
    color: '#64748b',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.24em',
    marginBottom: '12px',
    textTransform: 'uppercase',
  } as React.CSSProperties,
  header: {
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '16px',
  } as React.CSSProperties,
  titleRow: {
    display: 'block',
  } as React.CSSProperties,
  title: {
    fontSize: '27px',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: 1.06,
    margin: 0,
  } as React.CSSProperties,
  position: {
    color: '#475569',
    fontSize: '12px',
    fontWeight: 600,
    margin: '8px 0 0',
  } as React.CSSProperties,
  summary: {
    color: '#334155',
    fontSize: '13px',
    lineHeight: 1.7,
    margin: '12px 0 0',
  } as React.CSSProperties,
  contactsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '14px',
  } as React.CSSProperties,
  contactChip: {
    border: '1px solid #e2e8f0',
    borderRadius: '999px',
    color: '#475569',
    fontSize: '11px',
    fontWeight: 600,
    padding: '6px 10px',
    textDecoration: 'none',
  } as React.CSSProperties,
  section: {
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    marginTop: '14px',
    padding: '16px',
  } as React.CSSProperties,
  sectionTitle: {
    color: '#0f172a',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    margin: 0,
  } as React.CSSProperties,
  itemMeta: {
    color: '#64748b',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    margin: 0,
    textTransform: 'uppercase',
  } as React.CSSProperties,
  itemTitle: {
    color: '#0f172a',
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: 1.5,
    margin: '8px 0 0',
  } as React.CSSProperties,
  itemSubtitle: {
    color: '#64748b',
    fontSize: '12px',
    lineHeight: 1.6,
    margin: '4px 0 0',
  } as React.CSSProperties,
  itemText: {
    color: '#334155',
    fontSize: '12px',
    lineHeight: 1.7,
    margin: '8px 0 0',
  } as React.CSSProperties,
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    marginTop: '12px',
    padding: '14px',
  } as React.CSSProperties,
  skillGroupTitle: {
    color: '#475569',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.16em',
    margin: 0,
    textTransform: 'uppercase',
  } as React.CSSProperties,
  skillList: {
    display: 'grid',
    gap: '8px',
    marginTop: '12px',
  } as React.CSSProperties,
  skillRow: {
    alignItems: 'baseline',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  skillName: {
    color: '#0f172a',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.5,
    margin: 0,
    display: 'inline-block',
  } as React.CSSProperties,
  skillLevel: {
    color: '#64748b',
    fontSize: '11px',
    lineHeight: 1.5,
    margin: 0,
    textAlign: 'right',
    display: 'inline-block',
  } as React.CSSProperties,
  list: {
    color: '#334155',
    display: 'grid',
    gap: '6px',
    margin: '10px 0 0',
    paddingLeft: '18px',
  } as React.CSSProperties,
  certificateList: {
    display: 'grid',
    gap: '12px',
    margin: 0,
    marginTop: '12px',
  } as React.CSSProperties,
  certificateItem: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    listStyle: 'none',
    margin: 0,
    padding: '14px',
  } as React.CSSProperties,
  certificateDate: {
    color: '#64748b',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    margin: 0,
    textTransform: 'uppercase',
  } as React.CSSProperties,
  certificateTitle: {
    color: '#0f172a',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.7,
    margin: '8px 0 0',
  } as React.CSSProperties,
} as const

export const resumeDocumentCss = `
  html, body {
    background: #f8fafc;
    margin: 0;
    padding: 0;
  }

  body {
    padding: 18px 0;
  }

  #document {
    margin: 0 auto;
    max-width: 8.27in;
  }

  a {
    color: inherit;
  }
`

const getContactLabel = (link: ResumeSocialLink) => {
  const normalizedName = link.name.trim()

  if (normalizedName.length > 0) {
    return normalizedName
  }

  return 'Contact'
}

const formatCertificateDate = (
  value: string | null | undefined,
  lang: Locales
) => {
  if (!value) {
    return lang === 'es' ? 'Fecha no especificada' : 'Date not specified'
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(lang === 'es' ? 'es-DO' : 'en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const ResumeDocument = ({
  lang,
  socialLinks,
  certificates,
}: ResumeDocumentProps) => {
  const content = getResumeContent(lang, socialLinks)

  return (
    <Document size="A4" orientation="portrait" margin="0.4in">
      <Head>
        <meta charSet="utf-8" />
        <title>{content.pageTitle}</title>
      </Head>

      {/* <Footer
        style={{
          color: '#64748b',
          fontSize: '11px',
        }}>
        {({ currentPage, totalPages }) => (
          <span>
            {content.name} | {currentPage} / {totalPages}
          </span>
        )}
      </Footer> */}

      <Page style={styles.page}>
        <header style={styles.header}>
          <div style={styles.eyebrow}>{content.eyebrow}</div>

          <div style={styles.titleRow}>
            <h1 style={styles.title}>{content.name}</h1>
            <p style={styles.position}>{content.currentPosition}</p>
          </div>

          <p style={styles.summary}>{content.summary}</p>

          <div style={styles.contactsRow}>
            {socialLinks.map((link) => (
              <a key={link.id} href={link.link} style={styles.contactChip}>
                {getContactLabel(link)}
              </a>
            ))}
          </div>
        </header>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>{content.educationTitle}</h3>

          {content.education.map((item) => (
            <article
              key={`${item.institution}-${item.period}`}
              style={styles.card}>
              <p style={styles.itemMeta}>{item.period}</p>
              <p style={styles.itemTitle}>{item.institution}</p>
              <p style={styles.itemText}>{item.details}</p>
            </article>
          ))}
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>{content.technicalSkillsTitle}</h3>

          {content.technicalSkills.map((group) => (
            <article
              key={group.group}
              style={{
                ...styles.card,
                pageBreakInside: 'avoid',
                breakInside: 'avoid',
              }}>
              <h3 style={styles.skillGroupTitle}>{group.group}</h3>
              <div style={styles.skillList}>
                {group.items.map((item) => (
                  <div key={item.name} style={styles.skillRow}>
                    <span style={styles.skillName}>{item.name}</span>
                    <span style={styles.skillLevel}>{item.level}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{content.experienceTitle}</h2>

          {content.experience.map((item) => (
            <article
              key={`${item.institution}-${item.period}`}
              style={styles.card}>
              <p style={styles.itemMeta}>{item.period}</p>
              <p style={styles.itemTitle}>{item.position}</p>
              <p style={styles.itemSubtitle}>{item.institution}</p>
              <ul style={styles.list}>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section style={styles.section}>
          <h3
            style={{
              ...styles.sectionTitle,
              pageBreakAfter: 'avoid',
            }}>
            {content.certificatesTitle}
          </h3>
          <ul style={styles.certificateList}>
            {certificates.map((certificate) => (
              <li key={certificate.id} style={styles.certificateItem}>
                <p style={styles.certificateDate}>
                  {formatCertificateDate(certificate.completionDate, lang)}
                </p>
                <p style={styles.certificateTitle}>{certificate.title}</p>
              </li>
            ))}
          </ul>
        </section>
      </Page>
    </Document>
  )
}

export default ResumeDocument
