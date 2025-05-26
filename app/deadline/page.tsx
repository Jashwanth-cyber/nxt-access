import Navbar from "../components/Navbar";

export default function deadline(){
    return (
    <>
       <Navbar/>
       <div className="flex flex-col justify-center items-center min-h-[80vh] bg-white">
           <div className="bg-white shadow-lg rounded-lg px-10 py-8 flex flex-col gap-3 items-center">
              <img src="https://res.cloudinary.com/dxjna0dxi/image/upload/v1747817129/calender_1_1_qrbca1.png" className="p-5 w-100"/>
              <h1 className="text-[#263868] font-bold text-2xl">Time is Up</h1>
              <h5 className="text-[#263868] font-semibold">You didn't complete the assessment within the time.</h5>
              <h2 className="text-[#263868] font-bold text-2xl">Your Score:<span> ....</span></h2>
              <button className="p-2 bg-[#263868] text-white rounded-lg">Reattempt</button>
           </div>
       </div>
    </>
)
}