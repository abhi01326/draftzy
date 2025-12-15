"use client"

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/convas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
    return(
        <div 
        className="flex  flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton onClick={onChange} color={{r: 243, g: 80, b: 35}} />
            <ColorButton onClick={onChange} color={{r: 249, g: 115, b: 22}} />
            <ColorButton onClick={onChange} color={{r: 234, g: 179, b: 8}} />
            <ColorButton onClick={onChange} color={{r: 34, g: 197, b: 94}} />
            <ColorButton onClick={onChange} color={{r: 22, g: 163, b: 74}} />
            <ColorButton onClick={onChange} color={{r: 3, g: 155, b: 229}} />
            <ColorButton onClick={onChange} color={{r: 33, g: 150, b: 243}} />
            <ColorButton onClick={onChange} color={{r: 59, g: 130, b: 246}} />
            <ColorButton onClick={onChange} color={{r: 147, g: 197, b: 253}} />
            <ColorButton onClick={onChange} color={{r: 224, g: 242, b: 254}} />
            <ColorButton onClick={onChange} color={{r: 255, g: 255, b: 255}} />
            
        </div>
    )
}

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
    return(
        
        <button 
        className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
        onClick={()=>onClick(color)}
        >
            <div 
            className="h-8 w-8 rounded-md border border-neutral-300"
            style={{background: colorToCss(color)}}
            />
        </button>
    )
}