import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Image
        src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747809777/Group_8004_yq824y.png"
        alt="Logo" 
        width={500}
        height={500}
      />
      <h1 className="text-3xl font-bold mb-6 text-[#263868]">Welcome to the NxtAccess</h1>
      <div className="flex gap-4">
        <Link href="/signin">
          <button className="px-6 py-2 bg-[#263868] text-white rounded hover:bg-[#1e2a78] transition">Sign In</button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-2 bg-[#496387] text-white rounded hover:bg-[#3b4b6b] transition">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}