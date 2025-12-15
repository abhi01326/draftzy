import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
    title: string;
    authorlabel: string;
    createdAtLabel: string;
    isFavorite: boolean;
    onClick: ()=>void;
    disabled: boolean;
}

export const Footer = ({
    title,
    authorlabel,
    createdAtLabel,
    isFavorite,
    onClick,
    disabled,}: FooterProps)=>{
        const handleClick = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
            e.stopPropagation();
            e.preventDefault();
            onClick();
        }
        return(
            <div className="relative p-3 bg-white">
                <p className="text-[13px] truncate max-w-[calc(100%-20px)] ">
                    {title}
                </p>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                    {authorlabel} · {createdAtLabel}
                </p>
                <button disabled={disabled} className={cn("opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:tex-blue-600",
                    disabled && "cursor-not-allowed opacity-75")} onClick={handleClick}>
                    <Star
                    
                    
                    className={cn("h-4 w-4",
                    isFavorite ? "fill-yellow-400 text-yellow-400":"hover:fill-yellow-400 hover:text-yellow-400"
                    )}
                    />
                </button>
            </div>
        )
    }