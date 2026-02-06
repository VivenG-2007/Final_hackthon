import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchWithFallback, MOCK_DATA } from '@/app/lib/api-config';
import DashboardClient from './DashboardClient';

export const metadata = {
    title: 'Dashboard | The Resume Hub',
    description: 'Track your career progress and prepare for interviews.',
};

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await currentUser();
    const effectiveUserId = user?.username || userId;

    // Fetch initial stats on the server for faster LCP and better performance
    let statsData = null;
    try {
        const data = await fetchWithFallback(
            `/api/dashboard/stats?user_id=${effectiveUserId}`,
            { cache: 'no-store' }, // Ensure fresh data on server fetch
            MOCK_DATA.dashboard.stats
        );
        // Handle different response structures (wrapper object vs direct)
        statsData = (data as any).stats || data;
    } catch (e) {
        console.error("Failed to load server-side stats", e);
        statsData = MOCK_DATA.dashboard.stats;
    }

    return (
        <DashboardClient
            initialStats={statsData}
            user={{
                firstName: user?.firstName || 'User'
            }}
        />
    );
}
