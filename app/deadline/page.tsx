"use client";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Deadline() {
    const [score, setScore] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const s = localStorage.getItem("exam_score");
        if (s) setScore(Number(s));
    }, []);

    return (
        <>
            <Navbar/>
            <div className="flex flex-col justify-center items-center min-h-[80vh] bg-white">
                <div className="bg-white shadow-lg rounded-lg px-10 py-8 flex flex-col gap-3 items-center">
                    <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747817129/calender_1_1_qrbca1.png" alt="Deadline Image" className="p-5 w-100"/>
                    <h1 className="text-[#263868] font-bold text-2xl">Time is Up</h1>
                    <h5 className="text-[#263868] font-semibold">You didn&apos;t complete the assessment within the time.</h5>
                    <h2 className="text-[#263868] font-bold text-2xl">
                        Your Score:<span> {score !== null ? score : "...."}</span>
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