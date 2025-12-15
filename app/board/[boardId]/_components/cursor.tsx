"use client";
import { memo } from "react";
import { connectionIdToColor } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@liveblocks/react";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence.cursor);
  const name = info?.name || "Teamate";
  if (!cursor) return null;
  const { x, y } = cursor;
  return (
    <foreignObject style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
    }}
    height={50}
    width={name.length * 10+24}
    className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          color: connectionIdToColor(connectionId),
          fill: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold px-1.5 py-0.5 rounded-md text-white"
        style={{
          backgroundColor: connectionIdToColor(connectionId),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
