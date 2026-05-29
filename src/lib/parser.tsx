import React from 'react';

// Regex matches [label](url) and **bold**
const PARSE_REGEX = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
const LINK_REGEX = /\[(.*?)\]\((.*?)\)/;
const BOLD_REGEX = /\*\*(.*?)\*\*/;

export function parseRichText(text: string) {
  if (!text) return null;
  const parts = text.split(PARSE_REGEX);

  return parts.map((part, i) => {
    if (LINK_REGEX.test(part)) {
      const match = part.match(LINK_REGEX);
      return (
        <a 
          key={i} 
          href={match![2]} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'var(--brand-accent)', textDecoration: 'none', fontWeight: 500 }}
        >
          {match![1]}
        </a>
      );
    }
    
    if (BOLD_REGEX.test(part)) {
      const match = part.match(BOLD_REGEX);
      return <strong key={i} style={{ fontWeight: 600 }}>{match![1]}</strong>;
    }
    
    return <span key={i}>{part}</span>;
  });
}
