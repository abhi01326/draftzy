import { cn } from "@/lib/utils";
import { TextLayer } from "@/types/convas";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const kalam = Kalam({ subsets: ['latin'], weight: '400' });
const calculateFontSize = (height: number,width: number) => {
    const maxFontSize = 96;
    const scaleFactor= 1.2;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor / 4;
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
}

interface TextProps{
    id: string;
    layer: TextLayer;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Text = ({
    id,
    layer,
    onLayerPointerDown,
    selectionColor,
}: TextProps) => {
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
        style={{outline: selectionColor ? `1px solid ${selectionColor}` : "none"}}
        >
            <ContentEditable
            html={value || "Text"} 
            className={cn("w-full h-full flex items-center justify-center text-center drop-shadow-md outline-none", kalam.className)}
            onChange={handleContentChange}
            style={{
                fontSize: calculateFontSize(height, width), 
                color: fill ? `rgb(${fill.r}, ${fill.g}, ${fill.b})` : "#000"}}
            />
        </foreignObject>
    )
}