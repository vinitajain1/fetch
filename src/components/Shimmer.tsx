import React from "react";

export default function Shimmer(){
    return (
        <div className="p-4 animate-pulse w-[349.797] box-border rounded-lg bg-gray-300 hover:bg-gray-200">
            <div className="w-80 h-96 overflow-hidden rounded-lg">
               <div></div>
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}