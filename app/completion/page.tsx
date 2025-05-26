"use client";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Completion() {
    const [score, setScore] = useState<number | null>(null);
    const [timeTaken, setTimeTaken] = useState<number | null>(null);

    useEffect(() => {
        const s = localStorage.getItem("exam_score");
        const t = localStorage.getItem("exam_time_taken");
        if (s) setScore(Number(s));
        if (t) setTimeTaken(Number(t));
    }, []);

   
    const formatTime = (s: number | null) => {
        if (s === null) return "--:--";
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };
    const router = useRouter();
    return (
        <>
            <Navbar/>
            <div className="flex flex-col justify-center items-center min-h-[80vh] bg-white">
                <div className="mt-8 bg-white shadow-lg rounded-lg px-10 py-8 flex flex-col gap-3 items-center">
                    <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747817123/Asset_2_1_v2lc1n.png" alt="Completion Image" className="p-5 w-100"/>
                    <h1 className="text-[#263868] font-bold text-2xl">Congrats! You completed the assignment</h1>
                    <h3 className="text-[#263868] font-semibold">
                        Time Taken: <span>{formatTime(timeTaken)}</span>
                    </h3>
                    <h2 className="text-[#263868] font-bold">
                        Your Score: <span>{score !== null ? score : "--"}</span>
                    </h2>
                    <button
                        className="p-2 bg-[#263868] text-white rounded-lg"
                        onClick={() => router.push("/exampage")}
                    >
                        Reattempt
                    </button>
                </div>
            </div>
        </>
    );
}