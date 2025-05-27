"use client";
import Navbar from "../components/Navbar";

// import { useEffect } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    signIn(); // Redirects to sign in page
    return null;
  }

  


  

  const handleStartAssessment = () => {
    router.push("/exampage");
  };

  return (
    <>
      <Navbar />
      <div className="p-4 flex justify-center items-center min-h-[80vh] bg-white">
        <div className="flex flex-col md:flex-row md:gap-15 gap-8 items-center w-full max-w-5xl">
          <Image
            src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747810411/Group_uu3k2r.png"
            alt="Assessment Illustration"
            width={500}
            height={300}
            className="w-75 max-w-xs md:max-w-md md:w-96"
          />
          <div className="border-2 border-blue-800 rounded-md p-4 md:p-8 bg-white shadow-md w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-[#263868]">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm md:text-base">
              <li><span className="font-semibold text-[#496387]">Total Questions:</span> 10</li>
              <li><span className="font-semibold text-[#496387]">Types of Questions:</span> MCQs</li>
              <li><span className="font-semibold text-[#496387]">Duration:</span> 10 Mins</li>
              <li><span className="font-semibold text-[#496387]">Marking Scheme:</span> Every Correct response, get 1 mark</li>
              <li className="text-[#496387]">All the progress will be lost, if you reload during the assessment</li>
            </ol>
            <button className="mt-6 w-full px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition text-sm md:text-base" onClick={handleStartAssessment}>Start Assessment</button>
          </div>
        </div>
      </div>
    </>
  );
}