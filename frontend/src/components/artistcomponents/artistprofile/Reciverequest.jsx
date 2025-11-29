import React, { useState } from 'react';
import Switch from "react-switch";


export default function Reciverequest({ isChecked, setChecked }) {

    return (
        <>
            <label className='flex'>
                <span>recive dayro request?</span>
                <Switch
                    className='rounded-none'
                    onChange={setChecked}
                    checked={isChecked}
                    checkedIcon={false}
                    onColor='#FFA500'
                    offHandleColor='#FFA500'
                    uncheckedIcon={false}
                />
            </label>
        </>
    )
}
