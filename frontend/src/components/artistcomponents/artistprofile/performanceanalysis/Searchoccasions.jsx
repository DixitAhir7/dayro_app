import React from 'react';
import "react-day-picker/style.css";

export default function Searchoccasions({
    searchvalue,
    setSearchvalue
}) {
    return (
        <>
            <form
                name='eventsearchform'
                className='flex'
            >
                <input
                    type="search"
                    name="searchevent"
                    placeholder="search occasions by name"
                    className='max-sm:w-full max-sm:ml-2'
                    onChange={setSearchvalue}
                    value={searchvalue}
                />
                {/* <span
                    onClick={() => setOpen(prev => !prev)}
                    className="rounded"
                >
                    Pick Date
                </span>

                {isOpen && (
                    <div className="mt-2 z-50 bg-white shadow-lg rounded p-2">
                        <DayPicker
                            animate
                            mode="range"
                            selected={selected}
                            onSelect={setSelected}
                        />
                    </div>
                )} */}
            </form>
        </>
    )
};