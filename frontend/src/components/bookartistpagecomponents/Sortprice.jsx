import { useState, memo } from "react";
import { useArtist } from "Customhooks/useArtist/Getartistscontext"
import { ChevronDown } from "lucide-react";


//component for sort artists based on price
function Sortprice() {

    const useArtisthook = useArtist();
    const [isOpen, setIsOpen] = useState(false);

    const ranges = [
        { id: 1, label: "10,000 - 50,000" },
        { id: 2, label: "50,000 - 100,000" },
        { id: 3, label: "100,000 - 300,000" },
        { id: 4, label: "400000+" },
    ];

    return (
        <>
            <div className="relative ml-6">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center selectStyle justify-between"
                >
                    <span>Price Range</span>
                    <ChevronDown size={15} />
                </div>

                {isOpen && (
                    <div className="absolute left-0 z-10 bg-white border space-y-1">
                        {ranges.map((range) => (
                            <label
                                key={range.id}
                                className="flex items-center justify-between px-2 py-1 cursor-pointer"
                            >
                                <span>{range.label}</span>
                                <input
                                    value={useArtisthook.price}
                                    onChange={useArtisthook.onpricechange}
                                    type="radio"
                                    name="pricerange"
                                    className="w-4 h-4"
                                />
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
};

export default memo(Sortprice);