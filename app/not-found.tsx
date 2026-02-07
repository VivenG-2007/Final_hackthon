import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-black/20 text-center">
            <div className="p-6 bg-white/5 rounded-full mb-6 animate-bounce">
                <FileQuestion className="w-16 h-16 text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                404
            </h1>
            <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
            <p className="mb-8 opacity-70 max-w-md">
                The page you are looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <Link
                href="/"
                aria-label="Return to home page"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
                Return Home
            </Link>
        </div>
    );
}
