import React from 'react';

// who's booking in bookartistform
function Selectwho({ onchange = {}, register }) {

    const maptowhoopt = [
        { whosbooking: "select" },
        { whosbooking: "show oraganizer" },
        { whosbooking: "owner" },
        { whosbooking: "none of these" },
    ];

    return (
        <select
            {...register('whosbooking', { required: "whosbooking is required" })}
            name="whosbooking" className="selectStyle border-black  p-0 ml-2"
        >
            {maptowhoopt.map(opt =>
                <option value={opt.whosbooking}>{opt.whosbooking}</option>
            )}
        </select>
    )
};

export default React.memo(Selectwho);