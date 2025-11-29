import React from 'react'
import { useForm } from 'react-hook-form';
import { Pencil, SendHorizontal, Trash } from 'lucide-react';


export default function Writeblogs() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const addblog = (data) => {
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(addblog)} name='artistblogform'>
            <textarea
                {...register("artistblog", { required: true })}
                className="block"
                placeholder="write blogs and connect with your audience"
                rows={5}
            />

            <div className="mt-3 flex">
                <button type='submit'>
                    <SendHorizontal title='connect' className='text-2xl' />
                </button>
                <Pencil title='update' className='ml-3 text-2xl' />
                <Trash className='ml-3 text-2xl' title='delete' />
            </div>
        </form>
    )
};