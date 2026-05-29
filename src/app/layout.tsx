import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Outbox - Schema-Driven Resume Builder',
  description: 'High-fidelity resume builder with anti-gravity auto-fit layout engine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="midnight-obsidian">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
