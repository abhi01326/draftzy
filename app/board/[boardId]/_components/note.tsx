import { cn, getContrastingColor } from "@/lib/utils";
import { NoteLayer } from "@/types/convas";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const kalam = Kalam({ subsets: ['latin'], weight: '400' });
const calculateFontSize = (height: number,width: number) => {
    const maxFontSize = 96;
    const scaleFactor= 1.55;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor / 10;
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
}

interface NoteProps{
    id: string;
    layer: NoteLayer;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Note = ({
    id,
    layer,
    onLayerPointerDown,
    selectionColor,
}: NoteProps) => {
    const  {x, y, width, height, value, fill} = layer;
    const updateValue = useMutation((
        {storage},
        newValue: string
    )=>{
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    },[])
    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }
    return(
        <foreignObject x={x} y={y} width={width} height={height} onPointerDown={(e) => onLayerPointerDown(e, id)} 
        style={{outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            backgroundColor: fill ? `rgb(${fill.r}, ${fill.g}, ${fill.b})` : "#ffff88"}}
        className="shadow-md drop-shadow-md"
        >
            <ContentEditable
            html={value || "Text"} 
            className={cn("w-full h-full flex items-center justify-center text-center  outline-none", kalam.className)}
            onChange={handleContentChange}
            style={{
                fontSize: calculateFontSize(height, width), 
                color: fill ? getContrastingColor(fill) : "#000"}}
            />
        </foreignObject>
    )
}