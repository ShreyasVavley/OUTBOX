'use client';
import Editor from '@/components/Editor';
import Canvas from '@/components/Canvas';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div className="editor-panel" style={{ width: '450px', borderRight: '1px solid var(--border-subtle)', background: 'var(--panel-bg)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="site-header">
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Outbox</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>High-Fidelity Resume Engine</p>
          </div>
          <ThemeSwitcher />
        </header>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <Editor />
        </div>
      </div>
      <div className="canvas-wrapper" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
        <Canvas />
      </div>
      
      {/* Print Button floating */}
      <button 
        className="no-print btn-primary"
        onClick={() => window.print()}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Export PDF
      </button>
    </div>
  );
}
