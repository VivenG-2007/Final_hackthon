import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Interview Simulator | The Resume Hub',
    description: 'Practice real-time technical interviews with our advanced voice-enabled AI. Get instant feedback, improve your speaking skills, and crack your dream job.',
    keywords: ['AI interview', 'mock interview', 'technical interview practice', 'voice AI', 'frontend interview', 'backend interview'],
    openGraph: {
        title: 'AI Interview Simulator | The Resume Hub',
        description: 'Master your interview skills with real-time AI feedback.',
        type: 'website',
    }
};

export default function InterviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
