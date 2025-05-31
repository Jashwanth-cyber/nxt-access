
import Image from "next/image";
import {signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-[#263868] text-white px-6 py-3 flex justify-between items-center w-full h-16">
      <div className="p-4">
        <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747809777/Group_8004_yq824y.png" alt="Logo" width={100} height={100} 
         onClick={()=>router.push("/dashboard")}/>
      </div>

        <button onClick={() => signOut({ callbackUrl: "/signin" })} className="border rounded-md p-2 bg-[#263868]">Log Out</button>
    </nav>
  );
}