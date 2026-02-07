import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "../components/navbar";
import ChatWrapper from "../components/ChatWrapper";
import PageTransition from "../components/PageTransition";
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Resume Hub | Innovibe',
  description: 'Your personalized career journey starts here',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem('theme');
                    const isLight = theme === 'light';
                    if (isLight) {
                      document.documentElement.setAttribute('data-theme', 'light');
                      document.documentElement.classList.remove('dark');
                    } else {
                      document.documentElement.removeAttribute('data-theme');
                      document.documentElement.classList.add('dark');
                    }
                  } catch (e) {}
                })()
              `,
            }}
          />
        </head>
        <body className={inter.className}>
          <NavBar />
          <main className="pt-20 min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <ChatWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}