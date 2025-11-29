import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ChevronLast, SendHorizontal } from 'lucide-react';

export default function Ifnotfound({
    sendtoprev,
    submitsuggestion,
    register
}) {
    return (
        <>
            <ToastContainer
                position='top-center'
                pauseOnHover={true}
                hideProgressBar={true}
                autoClose={1000}
                closeButton={true}
            />
            <div>
                <h1 className='text-center'>sorry not found what you looking for</h1>
                <form onSubmit={submitsuggestion} className="flex justify-center items-center">
                    <textarea
                        placeholder="send suggestions"
                        {...register('suggestion')}
                    />
                </form>
                <div className='flex'>
                    <button className='bg-white text-black' type='submit'>
                        <SendHorizontal title='send' />
                    </button>
                    <ChevronLast onClick={sendtoprev} className='ml-3' title='skip' />
                </div>
            </div>
        </>
    )
};