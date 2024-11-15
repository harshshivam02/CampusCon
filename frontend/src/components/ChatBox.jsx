import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatBox = () => {
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setChatHistory([...chatHistory, { question, advice: '...' }]);
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:3000/api/advice', { question });
            const newAdvice = response.data.advice;

            setChatHistory((prevChat) =>
                prevChat.map((chat, index) =>
                    index === prevChat.length - 1 ? { ...chat, advice: newAdvice } : chat
                )
            );
            setIsTyping(false);
            setQuestion('');
        } catch (error) {
            console.error("Error fetching career advice:", error);
            setChatHistory((prevChat) =>
                prevChat.map((chat, index) =>
                    index === prevChat.length - 1 ? { ...chat, advice: "Sorry, there was an error getting advice." } : chat
                )
            );
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory]);

    const parseFormattedText = (text) => {
        const lines = text.split('\n').map((line, index) => {
            if (line.startsWith('##')) {
                return (
                    <h3 key={index} className="text-lg font-semibold text-purple-600 mb-2">
                        {line.slice(3)}
                    </h3>
                );
            } else if (line.includes("**")) {
                return (
                    <p key={index} className="mb-2">
                        {line.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                                <strong key={i}>{part.slice(2, -2)}</strong>
                            ) : (
                                part
                            )
                        )}
                    </p>
                );
            }
            return <p key={index} className="mb-2">{line}</p>;
        });
        return lines;
    };

    return (
        <div className="h-screen flex flex-col items-center p-6 ml-20">
            <div className="w-2/3 max-w-3xl h-[90vh] flex flex-col  items-center p-6 bg-[#DAB1DA] rounded-xl shadow-lg border border-purple-700">
                <h2 className="text-2xl font-semibold text-purple-900 mb-6">Career Advice Chatbot</h2>
                
                <div className="w-full max-h-[70vh] min-h-[50vh] overflow-y-auto p-4 bg-white rounded-md shadow-inner mb-4 space-y-4">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-end">
                                <div className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md max-w-xl w-fit text-sm break-words">
                                    {chat.question}
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl shadow-md max-w-xl w-fit text-sm leading-relaxed whitespace-pre-wrap">
                                    {parseFormattedText(chat.advice)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start ml-2 animate-pulse">
                            <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl shadow-md max-w-xs w-fit text-sm italic">
                                typing...
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
                    <textarea
                        placeholder="Ask for career advice..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows="1"
                        className="flex-grow p-3 rounded-lg border border-purple-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-500 outline-none resize-none transition-all ease-in-out duration-300"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 transition-transform transform hover:scale-105 duration-200"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
