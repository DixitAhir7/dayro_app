import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import useSmartTranslate from 'utilits/translatefunction/Translatefunction';

const Theme = () => {
    const useSmart = useSmartTranslate();

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.body.style.backgroundColor = isDark ? 'black' : 'white';
        document.body.style.color = isDark ? 'white' : 'black';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <>
            <span onClick={() => setIsDark(prev => !prev)}>
                {isDark ?
                    <Moon className='cursor-pointer text-lg'>
                        <p className='text-black ml-2.5 mt-2'>{useSmart('dark', 'dark')}</p>
                    </Moon> :
                    <Sun>
                        <p className='ml-2.5 inline'>{useSmart('light', 'light')}</p>
                    </Sun>
                }
            </span >
        </>
    );
};

export default React.memo(Theme);