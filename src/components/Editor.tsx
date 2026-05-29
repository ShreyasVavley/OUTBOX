'use client';
import { useResumeStore } from '@/lib/store';

export default function Editor() {
  const basics = useResumeStore((state) => state.data.basics);
  const updateBasics = useResumeStore((state) => state.updateBasics);
  const experience = useResumeStore((state) => state.data.experience);
  const updateExperienceBullet = useResumeStore((state) => state.updateExperienceBullet);

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    background: 'var(--input-bg)',
    color: 'var(--text-main)',
    border: '1px solid var(--input-border)',
    borderRadius: '4px',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.25rem',
    fontSize: '0.875rem',
    color: 'var(--text-muted)'
  };

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Basics</h2>
        
        <label style={labelStyle}>Full Name</label>
        <input 
          style={inputStyle}
          value={basics.name} 
          onChange={(e) => updateBasics('name', e.target.value)} 
        />
        
        <label style={labelStyle}>Professional Title</label>
        <input 
          style={inputStyle}
          value={basics.title} 
          onChange={(e) => updateBasics('title', e.target.value)} 
        />

        <label style={labelStyle}>Summary</label>
        <textarea 
          style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
          value={basics.summary} 
          onChange={(e) => updateBasics('summary', e.target.value)} 
        />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{exp.company} - {exp.role}</h3>
            {exp.bullets.map((bullet, i) => (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <label style={labelStyle}>Bullet {i + 1}</label>
                <textarea 
                  style={{ ...inputStyle, height: '60px', marginBottom: 0 }}
                  value={bullet} 
                  onChange={(e) => updateExperienceBullet(exp.id, i, e.target.value)}
                />
                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Supports **bold** and [link](url)</small>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
