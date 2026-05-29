'use client';
import { useResumeStore } from '@/lib/store';
import { parseRichText } from '@/lib/parser';
import { useRef, useLayoutEffect, useState } from 'react';

export default function Canvas() {
  const data = useResumeStore((state) => state.data);
  const { basics, experience, metadata } = data;
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [scaleProps, setScaleProps] = useState({
    fontSize: metadata.typography.baseFontSize,
    spacing: metadata.layout.spacing
  });

  useLayoutEffect(() => {
    setScaleProps({
      fontSize: metadata.typography.baseFontSize,
      spacing: metadata.layout.spacing
    });
  }, [data, metadata]);

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
        transition: 'all 0.3s ease'
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
      </div>
    </div>
  );
}
