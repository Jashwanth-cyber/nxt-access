import Navbar from "./components/Navbar";
import Image from "next/image";
export default function NotFound(){
    return(
        <>
        <nav className="bg-[#263868] text-white px-6 py-3 flex justify-between items-center w-full h-16">
      <div className="p-4">
        <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747809777/Group_8004_yq824y.png" alt="Logo" width={100} height={100} />
      </div>  
    </nav>
        <div className=" bg-white px-10 py-8 flex flex-col gap-3 items-center">
            <Image src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747821091/Group_7504_cwobzs.png" alt="Not Found Image" width={500} height={300} />
            <h1 className="text-[#496387] font-bold text-2xl">Page Not Found.</h1> 
        </div>
        </>
    )
}
