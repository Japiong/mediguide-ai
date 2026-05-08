'use client';

import './globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0d9488" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] py-6 px-4 text-center text-sm text-[var(--text-muted)]">
          <p className="max-w-2xl mx-auto">
            ⚕️ <strong>Medical Disclaimer:</strong> MediGuide AI provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} MediGuide AI — Educational use only</p>
        </footer>
      </body>
    </html>
  );
}
