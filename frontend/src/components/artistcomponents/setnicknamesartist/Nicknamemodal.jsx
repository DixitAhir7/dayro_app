import React from 'react'
import Listofsuggestion from './Suggestednicknames'

export default function Nicknamemodal({ close }) {
    return (
        <>
            <div className="flex">
                <h1 className=''>list of names suggestions</h1>
                <span onClick={close} className='text-red-500 text-2xl'>x</span>
            </div>
            <form className='mt-5' name='nicknameform'>
                <input className='border' type="text" placeholder='give nickname' />
                <button className='ml-3 py-0.5' type="submit">send</button>
            </form>
            <Listofsuggestion />
        </>
    )
};