"use client"

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useUser } from "@clerk/nextjs";
import { Send, Bot, User, Trash2, Loader2, X, MessageCircle } from 'lucide-react';

const Message = memo(({ message }: { message: { role: string; content: string } }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                </div>
            )}
            <div
                className={`max-w-[80%] p-3 rounded-2xl ${isUser
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-700/50 border border-gray-600/50 text-gray-100'
                    }`}
            >
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
});

Message.displayName = 'Message';

function FloatingChatbot() {
    const { user, isLoaded } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);


    const sendMessage = useCallback(async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        // We use the internal /api/chat which acts as a proxy to Groq
        // This is more secure and handles API keys server-side
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        ...messages.slice(-10),
                        { role: 'user', content: userMessage }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', response.status, errorData);
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

            setMessages(prev => [...prev, { role: 'assistant', content: aiMessage }]);
        } catch (error: any) {
            console.error('Chat error:', error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
            ]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, messages]);

    const clearChat = useCallback(() => {
        setMessages([{ role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }]);
    }, []);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }, [sendMessage]);

    if (!isLoaded) return null;

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[600px] glass card-shadow-xl z-50 flex flex-col rounded-2xl animate-in slide-in-from-bottom-4 backdrop-blur-xl">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/10 rounded-t-2xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold">AI Assistant</h3>
                                    <p className="text-xs opacity-60">Powered by Groq</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={clearChat}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    title="Clear chat"
                                >
                                    <Trash2 className="w-4 h-4 opacity-70" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4 opacity-70" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <Message key={index} message={message} />
                        ))}
                        {loading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="p-3 rounded-2xl glass rounded-tl-none">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-current opacity-50 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-current opacity-50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-current opacity-50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-white/10 p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                disabled={loading}
                                className="flex-1 p-3 rounded-xl input-glass outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50 group"
                title="Chat with AI"
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
            </button>
        </>
    );
}

export default FloatingChatbot;
