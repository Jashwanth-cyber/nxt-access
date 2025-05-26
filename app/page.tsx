import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome to the NxtAccess</h1>
      <div className="flex gap-4">
        <Link href="/signin">
          <button className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">Sign In</button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}