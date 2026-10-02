import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { RoleProvider } from '@/components/ui/RoleContext';

export const metadata: Metadata = {
  title: 'SkillGuard AI — Real-Time Monitoring of Training Centres (SIH26245)',
  description: 'AI-Based Real-Time Monitoring of Training Centres for Attendance and Infrastructure Compliance (MSDE)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex flex-col antialiased">
        <RoleProvider>
          <Navbar />
          <main className="flex-1 pb-12">{children}</main>
          <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-xs">
            <p>© 2026 SkillGuard AI • Smart India Hackathon (SIH26245) • Ministry of Skill Development and Entrepreneurship (MSDE)</p>
            <p className="mt-1 text-slate-500">Privacy-First Architecture: Aggregate Optical Headcounts Only • DPDP Act 2023 Compliant • No Biometric Storage</p>
          </footer>
        </RoleProvider>
      </body>
    </html>
  );
}
