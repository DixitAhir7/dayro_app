import React from 'react';
import { Link } from 'react-router-dom';
import { Trash } from 'lucide-react';

// querries asked by user to openaai model
function Querries() {
    // if user haven't asked then ask them to give it a try

    return (
        <div className='mt-2'>
            <h1 className='border-b-2 w-fit'>Querries you asked ai</h1>
            <Link className='text-xl w-fit' to='/askai' enterKeyHint='go'>give it a try</Link>
            <div className='mt-3 border w-full p-1'>
                <div className="flex items-center group">
                    <span className="text-gray-800">what is dayro app</span>
                    <Trash  className="ml-auto text-xl text-red-500 hidden group-hover:inline-block cursor-pointer" />
                </div>
            </div>
        </div>
    )
};

export default React.memo(Querries);