import React, { useState } from 'react'
import Nicknamemodal from '../setnicknamesartist/Nicknamemodal';
import Modal from 'utilits/reusableCode/Modal';
import Showimages from './Showimages';

export default function Displaysearched({
    name,
    proffesion,
    price,
    book,
    img
}) {

    const [openmodal, setModal] = useState(false);

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    return (
        <>
            <div className='flex'>
                <img src={img} className='object-cover w-fit' />
                <div className='ml-auto mr-auto'>
                    <strong>{proffesion}</strong>
                    <h1>{name}</h1>
                    <strong>charge:{price}</strong>
                    <div className="mt-2">
                        <button onClick={book}>Book</button>
                        {/* <button className='ml-2' onClick={() => setOpen(true)}>Details</button> */}
                    </div>
                </div>
            </div>


            {/* <div className='w-full'>
               <img className='flex-1/2 w-40' src="/public/icons/ChatGPT Image Oct 12, 2025, 11_30_39 AM.png" alt="" />
            </div> */}


            {/* will release soon users will be overwhelmed */}
            {/* <div id="nickname">
                <span className='w-fit' onClick={openModal}>give nickname to {name}</span>
            </div>

            {openmodal &&
                <Modal>
                    <Nicknamemodal close={closeModal} />
                </Modal>
            } */}

            {/* {
                    open &&
                    <div className='bg-black'>
                        <Modal>
                    
                        <div className='w-100'><h1>{artistdata.name}</h1>
                            <div className="mt-3 w-auto p-2 rounded-xl h-auto text-black">
                                <p>born in :<strong>{artistdata.details.bornplace}</strong></p>
                                <p>district :<strong>{artistdata.details.bornDistrict}</strong></p>
                            </div>
                        </div>
                        </Modal>
                           
                    </div>
                } */}
        </>
    )
};