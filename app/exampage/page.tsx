"use client";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "../components/Questions";
import { useSession,signIn } from "next-auth/react";


export default function ExamPage() {
    const { data: session, status } = useSession();
    const [timeLeft, setTimeLeft] = useState(600);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
    const router = useRouter();
    
    if (status === "loading") return <div>Loading...</div>;
    if (!session) {
     signIn(); // Redirects to sign in page
     return null;
    }
    
    useEffect(() => {
        if (timeLeft <= 0) {
            router.replace("/deadline");
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, router]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    const handleSelect = (idx: number) => {
        const updated = [...answers];
        updated[current] = QUESTIONS[current].options[idx];
        setAnswers(updated);
    };

    const handleNext = () => {
        if (current < QUESTIONS.length - 1) setCurrent(current + 1);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(current - 1);
    };

   const handleSubmit = () => {
    
    const score = answers.reduce(
        (acc, ans, idx) => acc + (ans === QUESTIONS[idx].answer ? 1 : 0),
        0
    );
    const timeTaken = 600 - timeLeft; 

   
    localStorage.setItem("exam_score", score.toString());
    localStorage.setItem("exam_time_taken", timeTaken.toString());

    router.replace("/completion");
};

    const answeredCount = answers.filter(a => a !== null).length;

    return (
        <div>
            <Navbar />
            <div className="bg-white min-h-screen p-0 m-0">
               
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 max-w-7xl mx-auto py-8">
             
                <div className="order-1 flex-shrink lg:order-2 mb-6 lg:mb-0">
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col ">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-semibold text-gray-700">Time Left</span>
                            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <span className="w-3 h-3 rounded-full bg-purple-700 mr-2"></span>
                                <span className="text-sm">Answered Questions</span>
                                <span className="ml-auto">{answeredCount}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-gray-300 mr-2"></span>
                                <span className="text-sm">Unanswered Questions</span>
                                <span className="ml-auto">{QUESTIONS.length - answeredCount}</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="font-semibold mb-2">Questions ({QUESTIONS.length})</div>
                            <div className="grid grid-cols-5 gap-2">
                                {QUESTIONS.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrent(idx)}
                                        className={`w-8 h-8 rounded border text-sm ${
                                            current === idx
                                                ? "bg-blue-900 text-white border-blue-900"
                                                : answers[idx]
                                                ? "bg-purple-100 border-purple-700 text-purple-700"
                                                : "bg-gray-100 border-gray-300 text-gray-700"
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="mt-auto w-full border border-blue-900 text-blue-900 py-2 rounded hover:bg-blue-50"
                        >
                            Submit Assessment
                        </button>
                    </div>
                </div>
                {/* Exam Content */}
                <div className="order-2 lg:order-1">
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col justify-between min-h-[500px]">
                        <div>
                            <div className="text-lg font-semibold mb-6">
                                {current + 1}. {QUESTIONS[current].question}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {QUESTIONS[current].options.map((opt, idx) => (
                                    <button
                                        key={opt}
                                        className={`w-full py-4 rounded-md border text-left px-4 transition ${
                                            answers[current] === opt
                                                ? "bg-blue-100 border-blue-700"
                                                : "bg-blue-50 border-blue-100 hover:border-blue-400"
                                        }`}
                                        onClick={() => handleSelect(idx)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handlePrev}
                                disabled={current === 0}
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {current < QUESTIONS.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-4 py-2 rounded bg-blue-900 text-white"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 rounded border border-blue-900 text-blue-900"
                                >
                                    Submit Assessment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
