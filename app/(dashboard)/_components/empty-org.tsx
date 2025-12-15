import Image from "next/image"

import {
    Dialog, DialogContent,  DialogTrigger, DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CreateOrganization } from "@clerk/nextjs"

export const EmptyOrg = ()=>{
    return(
        <div className="flex flex-col items-center justify-center h-full">
            <Image src="/logo.svg" alt="logo" width={200} height={200} className=""  />
            <h2 className="text-2xl font-semibold mt-6"> Welcome to Draftzy</h2>
            <p className="text-center text-muted-foreground mt-2 text-sm">
                To get started, please select an existing organization from the organization switcher in the navbar. If you donot have an organization yet, you can create one to begin managing your projects and teams.
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[420px]  md:max-w-[430px]">
                        <DialogTitle className="sr-only">Create Organization</DialogTitle>
                        {/* You can integrate your organization creation component here */}
                        <CreateOrganization routing="hash" />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}