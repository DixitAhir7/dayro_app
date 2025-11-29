import Switch from "react-switch";
import React from 'react'

export default function Setavalibility({ isavaliable, handleavaliablity }) {
    return (
        <label className="flex w-fit">
            <span className="max-sm:text-xl max-sm:ml-1">avalible?</span>
            <Switch
                className='md:ml-3 w-fit'
                onChange={handleavaliablity}
                checked={isavaliable}
                checkedIcon={false}
                onColor='#FFA500'
                offHandleColor='#FFA500'
                uncheckedIcon={false}
            />
        </label>
    )
};