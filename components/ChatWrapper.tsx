"use client"

import dynamic from 'next/dynamic';

const FloatingChatbot = dynamic(() => import("./FloatingChatbot"), {
    ssr: false,
    loading: () => null
});

export default function ChatWrapper() {
    return <FloatingChatbot />;
}
