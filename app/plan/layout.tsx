import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Career Roadmap Planner | The Resume Hub',
    description: 'Generate a personalized career learning path. Identify skill gaps and get a tailored roadmap to reach your target job role.',
    keywords: ['career planner', 'learning roadmap', 'skill gap analysis', 'career development', 'tech career path'],
    openGraph: {
        title: 'Career Roadmap Planner | The Resume Hub',
        description: 'Generate a personalized career learning path.',
        type: 'website',
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
