import React from 'react'
import Modal from 'utilits/reusableCode/Modal'

export default function Editimgmodal({ imgSrc, close, openFiles, update }) {
    return (
        <Modal>
            <div className="flex gap-16">
                <div className="flex flex-col items-center">
                    <img
                        src={imgSrc}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <span
                        onClick={close}
                        className="mt-2"
                    >
                        X
                    </span>
                </div>

                <div className="flex flex-col justify-center items-start gap-3">
                    <span onClick={openFiles}>
                        Update
                    </span>
                    <span>Delete</span>
                    <span onClick={update}>Update Profile</span>
                </div>
            </div>
        </Modal>)
};