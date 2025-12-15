"use client"

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"

import { Dialog,DialogContent,DialogTitle,DialogTrigger } from "@/components/ui/dialog"
import { Hint } from "@/components/hint"

export const NewButton = ()=>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                    <div className="aspect-square">
                        <Hint label="Create Organization" side="right" align="start" sideOffset={18} >
                        <button type="button" className="bg-white/25  h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                        </Hint>
                    </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none w-[420px] md:max-w-[480px]">
                <DialogTitle className="sr-only">New Organization</DialogTitle>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    )
}