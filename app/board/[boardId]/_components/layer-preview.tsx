"use client"

import { LayerType } from "@/types/convas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";




interface LayerPreviewProps{
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor: string;
}


export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor
}: LayerPreviewProps)=>{
    const layer = useStorage((root) => root.layers.get(id));
    if(!layer){
        return null;
    }
    switch(layer.type){
        case LayerType.Rectangle:
            return (
            <Rectangle  id={id} onPointerDown={onLayerPointerDown} layer={layer} selectionColor={selectionColor}/>
        );
        case LayerType.Ellipse:
            return(
                <Ellipse  id={id} onPointerDown={onLayerPointerDown} layer={layer} selectionColor={selectionColor}/>
            );
        case LayerType.Text:
            return(
                <Text id={id} onLayerPointerDown={onLayerPointerDown} layer={layer} selectionColor={selectionColor}/>
            )
        case LayerType.Note:
            return(
                <Note id={id} onLayerPointerDown={onLayerPointerDown} layer={layer} selectionColor={selectionColor}/>
            )
        case LayerType.Path:
            return <Path key={id} onPointerDown={(e)=>onLayerPointerDown(e,id)} points={layer.points} x={layer.x} y={layer.y}  stroke={selectionColor} fill={layer.fill ? colorToCss(layer.fill) : "#000"}/>
        default:
            console.warn("Unknown layer type"); 
            return null
    }
})

LayerPreview.displayName ="LayerPreview"