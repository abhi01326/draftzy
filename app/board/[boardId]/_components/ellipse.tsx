import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/convas";

interface EllipseProps{
    id: string;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
    layer: EllipseLayer;
    selectionColor: string;
}

export const Ellipse = ({
    id,
    onPointerDown,
    layer,
    selectionColor,
}: EllipseProps)=>{
    return (
        <ellipse 
        className="drop-shadow-md"
        onPointerDown = {(e)=>onPointerDown(e,id)}
        cx={layer.width /2}
        cy={layer.height /2}
        rx={layer.width /2}
        ry={layer.height /2}
        style={{transform: `translate(${layer.x}px, ${layer.y}px)`}}
        fill={layer.fill ? colorToCss(layer.fill) : "#000"}
        stroke={selectionColor || "transparent"}
        strokeWidth="1"
        />
    )
}