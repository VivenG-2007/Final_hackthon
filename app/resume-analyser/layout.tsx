import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume AI Analyser | The Resume Hub',
    description: 'Optimize your resume with advanced AI analysis. Get instant feedback on format, keywords, and ATS compatibility to land more interviews.',
    keywords: ['resume analyser', 'ats checker', 'cv improver', 'ai resume builder', 'resume scoring'],
    openGraph: {
        title: 'Resume AI Analyser | The Resume Hub',
        description: 'Optimize your resume with advanced AI analysis.',
        type: 'website',
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
