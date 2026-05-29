'use client';
import { useResumeStore } from '@/lib/store';
import { parseRichText } from '@/lib/parser';
import { useRef, useLayoutEffect, useState } from 'react';

export default function Canvas() {
  const data = useResumeStore((state) => state.data);
  const { basics, experience, metadata } = data;
  
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const [scaleProps, setScaleProps] = useState({
    fontSize: metadata.typography.baseFontSize,
    spacing: metadata.layout.spacing
  });
  const [zoom, setZoom] = useState(1);

  useLayoutEffect(() => {
    setScaleProps({
      fontSize: metadata.typography.baseFontSize,
      spacing: metadata.layout.spacing
    });
  }, [data, metadata]);

  // Viewport Fit Engine (Zoom)
  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // A4 physical pixels: ~793.7 x ~1122.5
        // We add 60px of padding to ensure it doesn't touch the edges
        const scaleH = (height - 60) / 1122.5;
        const scaleW = (width - 60) / 793.7;
        setZoom(Math.min(scaleH, scaleW, 1));
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Phase 5: Anti-Gravity Engine
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    
    const A4_HEIGHT_PX = 1122.5; 
    const marginPx = metadata.layout.margin * 3.7795; 
    const safeHeight = A4_HEIGHT_PX - (marginPx * 2);

    const checkFit = () => {
      if (!contentRef.current) return;
      const scrollHeight = contentRef.current.scrollHeight;
      
      if (scrollHeight > safeHeight) {
        const overflow = scrollHeight - safeHeight;
        if (overflow < 45 && scaleProps.fontSize > 8) {
          setScaleProps(prev => ({
            fontSize: prev.fontSize - 0.25,
            spacing: prev.spacing - 0.05
          }));
        }
      }
    };

    const observer = new ResizeObserver(() => checkFit());
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [data, scaleProps, metadata.layout.margin]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div 
        className="a4-document"
        style={{
          width: '210mm',
          height: '297mm',
          backgroundColor: 'var(--panel-bg)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          padding: `${metadata.layout.margin}mm`,
          fontFamily: metadata.typography.fontFamily,
          fontSize: `${scaleProps.fontSize}pt`,
          lineHeight: scaleProps.spacing * 1.5,
          color: 'var(--text-main)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: `scale(${zoom})`,
          transformOrigin: 'center'
        }}
      >
      <div ref={contentRef}>
        <header style={{ borderBottom: `2px solid var(--brand-accent)`, paddingBottom: '1rem', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale * 2}pt`, fontWeight: 700, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {basics.name}
          </h1>
          <p style={{ fontSize: `${scaleProps.fontSize * 1.2}pt`, color: 'var(--brand-accent)', fontWeight: 500, marginTop: '0.25rem' }}>
            {basics.title}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', color: 'var(--text-muted)' }}>
            {basics.contact.map(c => (
              <span key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {c.value}
              </span>
            ))}
          </div>
        </header>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale}pt`, fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Summary
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>{basics.summary}</p>
        </section>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale}pt`, fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: `${scaleProps.fontSize * 1.1}pt`, fontWeight: 600, margin: 0, color: 'var(--text-main)' }}>{exp.role}</h3>
                <span style={{ fontSize: '0.9em', color: 'var(--text-muted)', fontWeight: 500 }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ color: 'var(--brand-accent)', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company} | {exp.location}</div>
              <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-muted)' }}>
                {exp.bullets.map((bullet, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem', paddingLeft: '0.25rem' }}>{parseRichText(bullet)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {data.projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale}pt`, fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Projects
            </h2>
            {data.projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: `${scaleProps.fontSize * 1.05}pt`, fontWeight: 600, margin: 0, color: 'var(--text-main)' }}>
                    {proj.link ? <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                  </h3>
                </div>
                <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)' }}>{proj.description}</p>
                {proj.techStack.length > 0 && proj.techStack[0] !== '' && (
                  <div style={{ fontSize: '0.9em', color: 'var(--brand-accent)', fontWeight: 500 }}>
                    Stack: {proj.techStack.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale}pt`, fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Skills
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
              {data.skills.map(group => (
                <div key={group.id} style={{ display: 'flex', gap: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-main)', minWidth: '150px' }}>{group.category}:</strong>
                  <span style={{ color: 'var(--text-muted)' }}>{group.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale}pt`, fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Education
            </h2>
            {data.education.map(ed => (
              <div key={ed.id} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: `${scaleProps.fontSize * 1.05}pt`, fontWeight: 600, margin: 0, color: 'var(--text-main)' }}>{ed.degree}</h3>
                  <span style={{ fontSize: '0.9em', color: 'var(--text-muted)', fontWeight: 500 }}>{ed.startDate} - {ed.endDate}</span>
                </div>
                <div style={{ color: 'var(--brand-accent)', fontWeight: 600, marginBottom: '0.5rem' }}>{ed.institution} | {ed.location}</div>
                {ed.bullets.length > 0 && ed.bullets[0] !== '' && (
                  <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-muted)' }}>
                    {ed.bullets.map((bullet, i) => bullet.trim() !== '' && (
                      <li key={i} style={{ marginBottom: '0.25rem', paddingLeft: '0.25rem' }}>{parseRichText(bullet)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {data.certificates.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: `${scaleProps.fontSize * metadata.typography.headingScale}pt`, fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Certificates & Awards
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.certificates.map(cert => (
                <div key={cert.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: `${scaleProps.fontSize * 1.05}pt`, fontWeight: 600, margin: 0, color: 'var(--text-main)' }}>
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {cert.name}
                      </a>
                    </h3>
                    <span style={{ fontSize: '0.9em', color: 'var(--text-muted)' }}>{cert.date}</span>
                  </div>
                  <div style={{ color: 'var(--brand-accent)', fontWeight: 500, fontSize: '0.95em' }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
  );
}
