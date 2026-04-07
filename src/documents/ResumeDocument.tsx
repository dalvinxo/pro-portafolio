import React from 'react'
import { Document, Footer, Head, Page } from '@htmldocs/react'

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
    padding: '36px 40px 28px',
    minHeight: '100%',
  } as React.CSSProperties,
  eyebrow: {
    color: '#64748b',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.28em',
    marginBottom: '16px',
    textTransform: 'uppercase',
  } as React.CSSProperties,
  title: {
    fontSize: '30px',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: 1.08,
    margin: 0,
  } as React.CSSProperties,
  summary: {
    color: '#475569',
    fontSize: '14px',
    lineHeight: 1.8,
    margin: '14px 0 0',
    maxWidth: '620px',
  } as React.CSSProperties,
  divider: {
    borderTop: '1px solid #e2e8f0',
    marginTop: '22px',
    paddingTop: '22px',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1.1fr 0.9fr',
  } as React.CSSProperties,
  twoColumns: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr 1fr',
    marginTop: '16px',
  } as React.CSSProperties,
  threeColumns: {
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '16px',
  } as React.CSSProperties,
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '18px',
  } as React.CSSProperties,
  softCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '18px',
    padding: '14px 16px',
  } as React.CSSProperties,
  sectionTitle: {
    color: '#0f172a',
    fontSize: '17px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    margin: 0,
  } as React.CSSProperties,
  label: {
    color: '#64748b',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.22em',
    marginBottom: '10px',
    textTransform: 'uppercase',
  } as React.CSSProperties,
  text: {
    color: '#334155',
    fontSize: '13px',
    lineHeight: 1.75,
    margin: 0,
  } as React.CSSProperties,
  strongText: {
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.6,
    margin: 0,
  } as React.CSSProperties,
  list: {
    color: '#334155',
    display: 'grid',
    gap: '8px',
    margin: '12px 0 0',
    paddingLeft: '18px',
  } as React.CSSProperties,
  skillGroup: {
    backgroundColor: '#f8fafc',
    borderRadius: '18px',
    padding: '16px',
  } as React.CSSProperties,
  skillRow: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: '135px 1fr 110px',
    alignItems: 'center',
    marginTop: '12px',
  } as React.CSSProperties,
  skillBar: {
    backgroundColor: '#e2e8f0',
    borderRadius: '999px',
    height: '8px',
    overflow: 'hidden',
  } as React.CSSProperties,
  socialList: {
    display: 'grid',
    gap: '8px',
    marginTop: '12px',
  } as React.CSSProperties,
  socialLink: {
    color: '#0f172a',
    fontSize: '13px',
    lineHeight: 1.6,
    textDecoration: 'none',
    wordBreak: 'break-word',
  } as React.CSSProperties,
  entryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '18px',
    padding: '16px',
    marginTop: '14px',
  } as React.CSSProperties,
  meta: {
    color: '#64748b',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    marginBottom: '10px',
    textTransform: 'uppercase',
  } as React.CSSProperties,
} as const

export const resumeDocumentCss = `
  html, body {
    background: #f8fafc;
    margin: 0;
    padding: 0;
  }

  body {
    padding: 20px 0;
  }

  #document {
    margin: 0 auto;
    max-width: 8.27in;
  }

  a {
    color: inherit;
  }
`

const ResumeDocument = ({
  lang,
  socialLinks,
  certificates,
}: ResumeDocumentProps) => {
  const content = getResumeContent(lang, socialLinks)

  return (
    <Document size="A4" orientation="portrait" margin="0.45in">
      <Head>
        <meta charSet="utf-8" />
        <title>{content.pageTitle}</title>
      </Head>

      <Footer
        style={{
          color: '#64748b',
          fontSize: '12px',
        }}
      >
        {({ currentPage, totalPages }) => (
          <span>
            {content.name} | {content.pageTitle} | {currentPage} / {totalPages}
          </span>
        )}
      </Footer>

      <Page style={styles.page}>
        <div style={styles.eyebrow}>{content.eyebrow}</div>
        <h1 style={styles.title}>{content.name}</h1>
        <p style={styles.summary}>{content.summary}</p>

        <div style={styles.divider}>
          <div style={styles.grid}>
            <section style={styles.card}>
              <div style={styles.label}>{content.professionalSummaryLabel}</div>
              <p style={styles.text}>{content.summary}</p>

              <div style={styles.twoColumns}>
                <div style={styles.softCard}>
                  <div style={styles.label}>{content.currentPositionLabel}</div>
                  <p style={styles.strongText}>{content.currentPosition}</p>
                </div>

                <div style={styles.softCard}>
                  <div style={styles.label}>{content.contactLabel}</div>
                  <p style={styles.text}>{content.contactNote}</p>
                </div>
              </div>
            </section>

            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>{content.contactLabel}</h2>
              <div style={styles.socialList}>
                {content.socialLinks.map((link) => (
                  <a key={link.id} href={link.link} style={styles.socialLink}>
                    {link.name}: {link.link}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div style={styles.twoColumns}>
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>{content.educationTitle}</h2>
            {content.education.map((item) => (
              <article
                key={`${item.institution}-${item.period}`}
                style={styles.entryCard}
              >
                <div style={styles.meta}>{item.period}</div>
                <p style={styles.strongText}>{item.institution}</p>
                <p style={{ ...styles.text, marginTop: '10px' }}>{item.details}</p>
              </article>
            ))}
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>{content.softSkillsTitle}</h2>
            <div style={{ display: 'grid', gap: '10px', marginTop: '14px' }}>
              {content.softSkills.map((skill) => (
                <div key={skill} style={styles.softCard}>
                  <p style={styles.text}>{skill}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section style={{ ...styles.card, marginTop: '16px' }}>
          <h2 style={styles.sectionTitle}>{content.technicalSkillsTitle}</h2>
          <div style={styles.threeColumns}>
            {content.technicalSkills.map((group) => (
              <article key={group.group} style={styles.skillGroup}>
                <div style={styles.label}>{group.group}</div>
                {group.items.map((item) => (
                  <div key={item.name} style={styles.skillRow}>
                    <span style={styles.text}>{item.name}</span>
                    <div style={styles.skillBar}>
                      <div
                        style={{
                          backgroundColor: '#0f172a',
                          borderRadius: '999px',
                          height: '100%',
                          width: `${item.score}%`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        ...styles.text,
                        color: '#64748b',
                        textAlign: 'right',
                      }}
                    >
                      {item.level}
                    </span>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...styles.card, marginTop: '16px' }}>
          <h2 style={styles.sectionTitle}>{content.certificatesTitle}</h2>
          <div style={styles.twoColumns}>
            {certificates.map((certificate) => (
              <article key={certificate.id} style={styles.entryCard}>
                <p style={styles.text}>{certificate.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...styles.card, marginTop: '16px' }}>
          <h2 style={styles.sectionTitle}>{content.experienceTitle}</h2>
          {content.experience.map((item) => (
            <article
              key={`${item.institution}-${item.period}`}
              style={styles.entryCard}
            >
              <div style={styles.meta}>{item.period}</div>
              <p style={styles.strongText}>{item.position}</p>
              <p style={{ ...styles.text, color: '#64748b', marginTop: '4px' }}>
                {item.institution}
              </p>
              <ul style={styles.list}>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section style={{ ...styles.card, marginTop: '16px' }}>
          <h2 style={styles.sectionTitle}>{content.additionalTitle}</h2>
          <div style={styles.twoColumns}>
            {content.additional.map((item) => (
              <article key={item.title} style={styles.entryCard}>
                <p style={styles.strongText}>{item.title}</p>
                <p style={{ ...styles.text, marginTop: '10px' }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Page>
    </Document>
  )
}

export default ResumeDocument
