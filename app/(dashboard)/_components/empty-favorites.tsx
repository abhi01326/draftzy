import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/no_fav.svg"
                alt="No results found"
                width={360}
                height={360}
            />
            <h2 className="text-2xl font-semibold mt-6">
                No favorite boards found
            </h2>
            <p className="text-gray-500 mt-2">
                Try favoriting a board.
            </p>
        </div>
    );
};