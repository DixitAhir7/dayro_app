import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// modal for reusability
function Modal({ children }) {

    // override where you use this component
    const [childrenState, setChildrenstate] = useState(null);


    /**
     * @global
     * use this to detect esc key to close modal in desktop
     */

    const detectEsc = (e) => {
        // console.log('key',e.key)
        if (e.key.toLowerCase() === "Escape") {
            setChildrenstate(false);
        }
    }

    // useEffect(() => {
    //     window.addEventListener('keydown', detectEsc);

    //     return () => {
    //         window.removeEventListener('keypress', detectEsc);
    //     }
    // }, [childrenState]);

    // identify classsName that can let write classes
    const useClassName = () => {
        const classAtribute = className;
        if (classAtribute) {
            // 
        }
    };

    return (
        <div>
            {
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xl flex items-center justify-center z-50">
                    <div className="p-6 w-fit">
                        <div className='content'>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default React.memo(Modal);