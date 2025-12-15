import { colorToCss } from "@/lib/utils";
import { RecatangleLayer } from "@/types/convas";

interface RectangleProps {
  id: string;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  layer: RecatangleLayer;
  selectionColor: string;
}

export const Rectangle = ({
  id,
  onPointerDown,
  layer,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height,fill } = layer;
  
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      
    />
  );
};
