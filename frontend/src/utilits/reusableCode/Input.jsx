import React from 'react'

// reusable Input
function Input({ placeholder, type, obj = {}, ref, className = "", name, autoComplete }) {
    return (
        <div className="relative w-full">
            <input
                className={`peer border-b-2 outline-none ${className}`}
                placeholder={placeholder}
                type={type}
                ref={ref}
                name={name}
                {...obj}
                autoComplete={autoComplete}
            />
            <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-orange-400 transition-all duration-150 ease-in-out peer-focus:w-full"></span>
        </div>
    )
};

export default React.memo(Input);