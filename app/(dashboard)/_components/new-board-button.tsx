"use client"

import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}


export const NewBoardButton = ({orgId , disabled}: NewBoardButtonProps)=>{
    const router = useRouter();
    const {mutate, pending} = useApiMutation(api.board.create);

    const onClick = ()=>{
        mutate({
            orgId,
            title: "Untitled",
        })
        .then((id)=>{
            console.log(id)
            toast.success("Board created successfully");
            router.push(`/board/${id}`);
        })
        .catch(()=>{
            toast.error(`Failed to create board`);
        });
    }

    return (
        <button
        disabled={ pending|| disabled}
        onClick = {onClick}
        className={cn("col-span-1 aspect-[100/127] bg-yellow-400 rounded-lg hover:bg-yellow-500 flex flex-col justify-center items-center py-6", (disabled || pending) && "opacity-75 hover:bg-yellow-400 cursor-not-allowed")
        
        }
        >
            <div />
            <Plus className="h-12 w-12 stroke-1 text-white"/>
            <p className="text-sm text-white font-light">
                New Board
            </p>
        </button>
    )
}