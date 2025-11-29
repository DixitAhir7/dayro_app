import React from 'react';


//for individual artist canceled reason 
export default function Cancelartistreason({ register, submitreason }) {
    return (
        <>
            <form onSubmit={submitreason}>
                <textarea
                    name="cancelartistreason"
                    placeholder='enter reason for canceling artist'
                    {...register("reason", { required: "reason is required" })}
                />
                <button className='block' type="submit">send reason</button>
            </form>
        </>
    )
};