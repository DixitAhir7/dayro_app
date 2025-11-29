import React from 'react'
import { useForm } from 'react-hook-form'

export default function Createstakeholder() {

    const statesAndUTs = [
        "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        // Union Territories
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi (NCT)", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ].sort();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    return (
        <>
            <form name='stakeholderform'>
                <input
                    {...register('email', { required: "email is required" })}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                />
                {errors.email && <p className='text-red-400'>{errors.email.message}</p>}

                <input
                    {...register('name', { required: "name is required" })}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                />

                {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
                <input
                    {...register('phoneNo', { required: "phoneNo is required" })}
                    type="number"
                    name="phoneNo"
                    placeholder="Enter your phoneNo"
                />

                {errors.phoneNo && <p className='text-red-400'>{errors.phoneNo.message}</p>}

                <input
                    {...register('postal_code', { required: "pincode is required" })}
                    type="text"
                    placeholder="Enter pin code"
                />

                {errors.postal_code && <p className='text-red-400'>{errors.postal_code.message}</p>}

                <input
                    {...register('street1', { required: "street1 is required" })}
                    type="text"
                    placeholder="Enter street1"
                />

                {errors.street1 && <p className='text-red-400'>{errors.street1.message}</p>}

                <select>
                    <option disabled>
                        Choose a State
                    </option>

                    {statesAndUTs.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
                <input
                    {...register('panno')}
                    type="text"
                    id="panno"
                    placeholder="Enter panno"
                />

            </form>
        </>
    )
};