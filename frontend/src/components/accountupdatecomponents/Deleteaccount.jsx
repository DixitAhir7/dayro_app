import React from 'react'

export default function Deleteaccount({ openModal, closeModal}) {
    return (
        <div className='w-100'>
            <p>deleting your account will delete all data from app and no one will be able to find you</p>
            <div className="mt-3 flex">
                <button onClick={closeModal} className='w-10/22'>cancel</button>
                <button enterKeyHint='next' onClick={openModal} type='button' className='w-10/22 ml-2'>delete</button>
            </div>
        </div>
    )
};