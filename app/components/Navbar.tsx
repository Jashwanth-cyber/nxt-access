import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#263868] text-white px-6 py-3 flex justify-between items-center w-full h-16">
      <div className="p-4">
        <img src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747809777/Group_8004_yq824y.png"/>
      </div>
      
       
        <Link href="/" className="border rounded-md p-2 ">Logout</Link>
      
    </nav>
  );
}