import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { RoleProvider } from '@/components/ui/RoleContext';
import { LanguageProvider } from '@/components/ui/LanguageContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07172A',
};

export const metadata: Metadata = {
  title: 'SkillGuard AI — Real-Time Monitoring of Training Centres (SIH26245)',
  description: 'AI-Based Real-Time Monitoring of Training Centres for Attendance and Infrastructure Compliance (MSDE)',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-slate-50 flex flex-col antialiased">
        <LanguageProvider>
          <RoleProvider>
            <Navbar />
            <main className="flex-1 pb-24 lg:pb-12">{children}</main>
            <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-xs pb-28 lg:pb-6">
              <p>© 2026 SkillGuard AI • Smart India Hackathon (SIH26245) • Ministry of Skill Development and Entrepreneurship (MSDE)</p>
              <p className="mt-1 text-slate-500">Privacy-First Architecture: Aggregate Optical Headcounts Only • DPDP Act 2023 Compliant • No Biometric Storage</p>
            </footer>
            <MobileBottomNav />
          </RoleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

