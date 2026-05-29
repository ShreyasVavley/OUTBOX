'use client';
import { useResumeStore } from '@/lib/store';
import { useEffect } from 'react';

export default function ThemeSwitcher() {
  const theme = useResumeStore((state) => state.data.metadata.theme);
  const updateMetadata = useResumeStore((state) => state.updateMetadata);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <select 
      className="theme-switcher"
      value={theme} 
      onChange={(e) => updateMetadata('theme', e.target.value as any)}
      style={{
        background: 'var(--input-bg)',
        color: 'var(--text-main)',
        border: '1px solid var(--input-border)',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      <option value="classic-light">Classic Light</option>
      <option value="dark-minimal">Dark Minimal</option>
      <option value="midnight-obsidian">Midnight Obsidian</option>
    </select>
  );
}
