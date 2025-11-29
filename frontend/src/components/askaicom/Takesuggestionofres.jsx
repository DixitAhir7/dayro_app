import React from 'react'
import { useForm } from 'react-hook-form'

// take suggestion of response from user
export default function Takesuggestionofres() {

    const { register, handleSubmit, formState: {
        errors,
        submitCount,
        isSubmitting,
        isSubmitSuccessful,
        isSubmitted
    } } = useForm();


    const submitSuggestion = (data) => {
        return data;
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitSuggestion)} name='suggestionofres'>
                <textarea
                    name="suggestionofres"
                    placeholder='suggest to give better answer'
                    {...register('suggestion')}
                />
                <button type="submit" role='button'>send</button>
            </form>
        </>
    )
};