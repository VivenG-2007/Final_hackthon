import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Skill Assessment | The Resume Hub',
    description: 'Validate your technical expertise with AI-generated quizzes tailored to your skill level. Earn badges and track your mastery.',
    keywords: ['skill assessment', 'programming quiz', 'react quiz', 'python test', 'ai interview prep'],
    openGraph: {
        title: 'Skill Assessment | The Resume Hub',
        description: 'Validate your technical expertise with AI-generated quizzes.',
        type: 'website',
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
