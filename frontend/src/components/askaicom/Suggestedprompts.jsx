/*
suggest prompts based on user frequent querries to ai,
if not any qyerry from user then show frequent asked questions on app
*/

import { useLocation } from "react-router";

export default function Suggestedprompts({ onfocus }) {

    const suggestions = [
        "Create an image of a magazine cover of cute animals with headlines and text",
        "Create an image for a garden-themed birthday party invitation",
        "Create an image of an astronaut with an inflatable duck on Mars",
        "Create an image of a tutorial for cooking pasta",
    ];


    return (
        <>
            <div
                className={`w-full max-w-3xl mx-auto shadow-md overflow-hidden font-sans transform transition-all duration-100 ease-in-out 
                ${onfocus ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}>
                <div
                    className={`divide-y  transition-all duration-100 ease-in-out transform 
                    ${onfocus ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
                        }`}
                >
                    {suggestions.map((text, i) => (
                        <div
                            key={i}
                            className="px-2 py-2  hover:bg-gray-500/75 hover:text-white transition-colors duration-150 ease-in-out"
                        >
                            <span className='w-fit'>{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};