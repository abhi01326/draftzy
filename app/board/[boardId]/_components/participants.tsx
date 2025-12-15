"use client"

import { useOthers, useSelf } from "@liveblocks/react"
import { UserAvatar } from "./user-avatar"
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USER = 1;
// TODO: add more users

export const Participants = ()=>{
    const others = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = others.length > MAX_SHOWN_USER;

    return (
        <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {others.slice(0, MAX_SHOWN_USER).map(({connectionId,info}) => (
                    <UserAvatar  key={connectionId} 
                    borderColor={connectionIdToColor(connectionId)}
                    src={info.image}
                    name={info.name}
                    fallback={info?.name?.[0] || "T"}/>
                ))}

                
                {currentUser && (
                    <UserAvatar
                    borderColor={connectionIdToColor(currentUser.connectionId)}
                        src={currentUser.info.image}
                        name={`${currentUser.info?.name} (You)`}
                        fallback={currentUser.info?.name?.[0]}
                    />
                )}
                {hasMoreUsers && (
                    <UserAvatar
                    name={`${others.length - MAX_SHOWN_USER} more`}
                    fallback={`+${others.length - MAX_SHOWN_USER}`}
                    />
                )}
            </div>
        </div>
    )
}

export const ParticipantsSkeleton = function ParticipantsSkeleton() {
    return (
        <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md w-[100px]" />
    )
}