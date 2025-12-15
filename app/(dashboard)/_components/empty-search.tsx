import Image from "next/image";

export const EmpotySearch = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
        src="/cat_search.svg"
        alt="No results found"
        width={360}
        height={360}
        />
        <h2 className="text-2xl font-semibold mt-6">
            No results found
        </h2>
        <p className="text-gray-500 mt-2">
            Try searching something else.
        </p>
        </div>
        
    )
}