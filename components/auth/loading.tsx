import Image from "next/image";

export const Loading = ()=>{
    return(
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Image src="/logo.svg" alt="logo" width={140} height={140} className="animate-pulse duration-700"  />
        </div>
    )
}