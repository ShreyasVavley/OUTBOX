'use client';
import { useState } from 'react';
import { useResumeStore } from '@/lib/store';
import { Award, Loader2, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/types';

export default function Editor() {
  const data = useResumeStore((state) => state.data);
  const { basics, experience, education, skills, projects, certificates, metadata } = data;
  
  const store = useResumeStore();

  const [certUrl, setCertUrl] = useState('');
  const [isFetchingCert, setIsFetchingCert] = useState(false);

  const handleFetchCertificate = async () => {
    if (!certUrl) return;
    setIsFetchingCert(true);
    try {
      const res = await fetch(`/api/fetch-certificate?url=${encodeURIComponent(certUrl)}`);
      if (res.ok) {
        const certData = await res.json();
        store.addCertificate({
          id: generateId(),
          ...certData
        });
        setCertUrl('');
      } else {
        alert('Failed to fetch certificate metadata.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching certificate.');
    } finally {
      setIsFetchingCert(false);
    }
  };

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

  const btnSecondary = {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px dashed var(--border-subtle)',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  const btnIcon = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '0.25rem'
  };

  return (
    <div>
      {/* BASICS */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Basics</h2>
        
        <label style={labelStyle}>Full Name</label>
        <input style={inputStyle} value={basics.name} onChange={(e) => store.updateBasics('name', e.target.value)} />
        
        <label style={labelStyle}>Professional Title</label>
        <input style={inputStyle} value={basics.title} onChange={(e) => store.updateBasics('title', e.target.value)} />

        <label style={labelStyle}>Summary</label>
        <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} value={basics.summary} onChange={(e) => store.updateBasics('summary', e.target.value)} />

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Contact Info</h3>
          {basics.contact.map(c => (
            <div key={c.id}>
              <label style={{ ...labelStyle, textTransform: 'capitalize' }}>{c.type}</label>
              <input style={inputStyle} value={c.value} onChange={(e) => store.updateContact(c.id, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px', position: 'relative' }}>
            <button style={{ ...btnIcon, position: 'absolute', top: '0.5rem', right: '0.5rem' }} onClick={() => store.removeExperience(exp.id)}><Trash2 size={16} /></button>
            <input style={inputStyle} placeholder="Company" value={exp.company} onChange={(e) => store.updateExperience(exp.id, { company: e.target.value })} />
            <input style={inputStyle} placeholder="Role" value={exp.role} onChange={(e) => store.updateExperience(exp.id, { role: e.target.value })} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input style={inputStyle} placeholder="Start Date" value={exp.startDate} onChange={(e) => store.updateExperience(exp.id, { startDate: e.target.value })} />
              <input style={inputStyle} placeholder="End Date" value={exp.endDate} onChange={(e) => store.updateExperience(exp.id, { endDate: e.target.value })} />
            </div>
            <input style={inputStyle} placeholder="Location" value={exp.location} onChange={(e) => store.updateExperience(exp.id, { location: e.target.value })} />
            
            <label style={labelStyle}>Bullets</label>
            {exp.bullets.map((bullet, i) => (
              <textarea key={i} style={{ ...inputStyle, height: '60px' }} value={bullet} onChange={(e) => store.updateExperienceBullet(exp.id, i, e.target.value)} />
            ))}
            <button style={btnSecondary} onClick={() => store.addExperienceBullet(exp.id)}><Plus size={16} /> Add Bullet</button>
          </div>
        ))}
        <button style={btnSecondary} onClick={() => store.addExperience({ id: generateId(), company: '', role: '', startDate: '', endDate: '', location: '', bullets: [''] })}><Plus size={16} /> Add Experience</button>
      </section>

      {/* EDUCATION */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Education</h2>
        {education.map(ed => (
          <div key={ed.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px', position: 'relative' }}>
            <button style={{ ...btnIcon, position: 'absolute', top: '0.5rem', right: '0.5rem' }} onClick={() => store.removeEducation(ed.id)}><Trash2 size={16} /></button>
            <input style={inputStyle} placeholder="Institution" value={ed.institution} onChange={(e) => store.updateEducation(ed.id, { institution: e.target.value })} />
            <input style={inputStyle} placeholder="Degree" value={ed.degree} onChange={(e) => store.updateEducation(ed.id, { degree: e.target.value })} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input style={inputStyle} placeholder="Start Date" value={ed.startDate} onChange={(e) => store.updateEducation(ed.id, { startDate: e.target.value })} />
              <input style={inputStyle} placeholder="End Date" value={ed.endDate} onChange={(e) => store.updateEducation(ed.id, { endDate: e.target.value })} />
            </div>
            <label style={labelStyle}>Bullets</label>
            {ed.bullets.map((bullet, i) => (
              <textarea key={i} style={{ ...inputStyle, height: '60px' }} value={bullet} onChange={(e) => store.updateEducationBullet(ed.id, i, e.target.value)} />
            ))}
            <button style={btnSecondary} onClick={() => store.addEducationBullet(ed.id)}><Plus size={16} /> Add Bullet</button>
          </div>
        ))}
        <button style={btnSecondary} onClick={() => store.addEducation({ id: generateId(), institution: '', degree: '', startDate: '', endDate: '', location: '', bullets: [''] })}><Plus size={16} /> Add Education</button>
      </section>

      {/* PROJECTS */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Projects</h2>
        {projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px', position: 'relative' }}>
            <button style={{ ...btnIcon, position: 'absolute', top: '0.5rem', right: '0.5rem' }} onClick={() => store.removeProject(proj.id)}><Trash2 size={16} /></button>
            <input style={inputStyle} placeholder="Project Name" value={proj.name} onChange={(e) => store.updateProject(proj.id, { name: e.target.value })} />
            <input style={inputStyle} placeholder="Link/URL" value={proj.link} onChange={(e) => store.updateProject(proj.id, { link: e.target.value })} />
            <textarea style={{ ...inputStyle, height: '80px' }} placeholder="Description" value={proj.description} onChange={(e) => store.updateProject(proj.id, { description: e.target.value })} />
            <input style={inputStyle} placeholder="Tech Stack (comma separated)" value={proj.techStack.join(', ')} onChange={(e) => store.updateProject(proj.id, { techStack: e.target.value.split(',').map(s => s.trim()) })} />
          </div>
        ))}
        <button style={btnSecondary} onClick={() => store.addProject({ id: generateId(), name: '', description: '', techStack: [], link: '' })}><Plus size={16} /> Add Project</button>
      </section>

      {/* SKILLS */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Skills</h2>
        {skills.map(group => (
          <div key={group.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px', position: 'relative' }}>
            <button style={{ ...btnIcon, position: 'absolute', top: '0.5rem', right: '0.5rem' }} onClick={() => store.removeSkillGroup(group.id)}><Trash2 size={16} /></button>
            <input style={inputStyle} placeholder="Category (e.g. Languages)" value={group.category} onChange={(e) => store.updateSkillGroup(group.id, { category: e.target.value })} />
            <textarea style={{ ...inputStyle, height: '80px' }} placeholder="Skills (comma separated)" value={group.skills.join(', ')} onChange={(e) => store.updateSkillGroup(group.id, { skills: e.target.value.split(',').map(s => s.trim()) })} />
          </div>
        ))}
        <button style={btnSecondary} onClick={() => store.addSkillGroup({ id: generateId(), category: '', skills: [] })}><Plus size={16} /> Add Skill Group</button>
      </section>

      {/* CERTIFICATES */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Certificates</h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input 
            style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
            placeholder="Paste Credly or Coursera URL..."
            value={certUrl} 
            onChange={(e) => setCertUrl(e.target.value)} 
          />
          <button 
            onClick={handleFetchCertificate}
            disabled={isFetchingCert}
            style={{
              background: 'var(--brand-accent)',
              color: 'white',
              border: 'none',
              padding: '0 1rem',
              borderRadius: '4px',
              cursor: isFetchingCert ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isFetchingCert ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Award size={18} />}
          </button>
        </div>

        {certificates.map((cert) => (
          <div key={cert.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px', position: 'relative' }}>
            <button 
              onClick={() => store.removeCertificate(cert.id)}
              style={{ ...btnIcon, position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            >
              <Trash2 size={16} />
            </button>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{cert.name}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{cert.issuer} &bull; {cert.date}</div>
            <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--brand-accent)', textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem' }}>Verify Link</a>
          </div>
        ))}
      </section>

      {/* DESIGN SETTINGS */}
      <section style={{ marginBottom: '2rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '2px dashed var(--border-subtle)' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>Design Settings</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Base Font Size (pt)</label>
            <input 
              type="number" 
              style={inputStyle} 
              value={metadata.typography.baseFontSize} 
              onChange={(e) => store.updateMetadata('typography', { ...metadata.typography, baseFontSize: parseFloat(e.target.value) || 10 })} 
              step="0.5"
            />
          </div>
          <div>
            <label style={labelStyle}>Line Spacing</label>
            <input 
              type="number" 
              style={inputStyle} 
              value={metadata.layout.spacing} 
              onChange={(e) => store.updateMetadata('layout', { ...metadata.layout, spacing: parseFloat(e.target.value) || 1 })} 
              step="0.1"
            />
          </div>
          <div>
            <label style={labelStyle}>Margin Size (mm)</label>
            <input 
              type="number" 
              style={inputStyle} 
              value={metadata.layout.margin} 
              onChange={(e) => store.updateMetadata('layout', { ...metadata.layout, margin: parseFloat(e.target.value) || 15 })} 
              step="1"
            />
          </div>
          <div>
            <label style={labelStyle}>Heading Scale</label>
            <input 
              type="number" 
              style={inputStyle} 
              value={metadata.typography.headingScale} 
              onChange={(e) => store.updateMetadata('typography', { ...metadata.typography, headingScale: parseFloat(e.target.value) || 1.2 })} 
              step="0.1"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
