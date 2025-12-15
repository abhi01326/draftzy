"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Hint } from "@/components/hint";
import Link from "next/link";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string;
}
const font = Poppins({ weight: "600", subsets: ["latin"] });

const TabSeperator = ()=>{
    return (
        <div className="text-neutral-300 px-1.5" >
            |
        </div>
    )
}

export const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });
  const {onOpen} = useRenameModal();

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to Dratz" align="start" side="top">
        <Button asChild className="px-2 " variant="board">
        <Link href='/'>
        <Image src="/logo.svg" alt="logo" width={40} height={40} className="bg-transparent" />
        <span className={cn("font-semibold text-xl text-black", font.className)}>Draftzy</span>
        </Link>
      </Button>
      </Hint>
      
      <TabSeperator />
      <Hint label="Edit Board Name" side="bottom" sideOffset={10} align="start">
        <Button variant="board" className="text-base font-normal px-2" onClick={()=>onOpen(data?._id,data?.title)}>
        {data.title}
      </Button>
      </Hint>
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
            <Hint label="Main Menu" side="bottom" sideOffset={10} align="end">
            <Button size="icon" variant="board">
                <Menu />
            </Button>
        </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
