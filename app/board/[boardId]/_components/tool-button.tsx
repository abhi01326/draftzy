"use client"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface ToolButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon
    onClick?: () => void
    isDisabled?: boolean
    label?: string
    isActive?: boolean
}

export const ToolButton = ({
    icon: Icon,
    label,
    onClick,
    isActive,
    isDisabled,
}: ToolButtonProps) => {
    return(
        <Hint label={label || "Tool"} side="right" align="start" sideOffset={14}> 
            <Button disabled={isDisabled} onClick={onClick} size="icon" variant={isActive ? "boardActive" : "board"} >
                <Icon />
            </Button>
        </Hint>
    )
}