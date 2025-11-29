import { portinstance } from "axiosinstance/portinstance";
import Loader from "components/appcom/Loader";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "utilits/reusableCode/Modal";
import AsyncSelect from 'react-select/async';
import Select from 'react-select'

/**
 * based on the state entered assign pincode itself from data
 * */

// payment info from artists to send payments
export default function CreateLinkedAccount() {

    const { id } = useParams();

    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: {
            errors,
            isSubmitSuccessful,
            isSubmitted,
            isSubmitting
        }
    } = useForm({
        defaultValues: {
            legal_business_name: "dayro",
            state: "Gujarat"
        }
    });

    useEffect(() => {
        const loadInputs = document.querySelectorAll('input');
        loadInputs.forEach(s => s.style.width = "100%");
        loadInputs.forEach(s => s.style.marginTop = "6px");
    }, []);
    const mappedInput = [
        { name: "name", value: { ...register('name') } }
    ];


    const [openModal, setModal] = useState(false);

    const [bigimg, setBig] = useState(false);


    const createlinkedacc = async (data) => {
        if (data.state) {
            data.state.toUpperCase()
        }
        const createlinkedaccRes = await portinstance.post('/artist/accounts', data);
        console.log(createlinkedaccRes.data);
    };

    const navigate = useNavigate();

    // use this to navigate to ai page when suggestions are needed to show in ai page
    const navigatetoAskai = () => {
        navigate("/askai", { state: "createlinkedaccount" });
    }

    const stateOptions = [
        { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
        { value: "Assam", label: "Assam" },
        { value: "Chhattisgarh", label: "Chhattisgarh" },
        { value: "Goa", label: "Goa" },
        { value: "Gujarat", label: "Gujarat" },
        { value: "Haryana", label: "Haryana" },
        { value: "Himachal Pradesh", label: "Himachal Pradesh" },
        { value: "Jharkhand", label: "Jharkhand" },
        { value: "Karnataka", label: "Karnataka" },
        { value: "Kerala", label: "Kerala" },
        { value: "Madhya Pradesh", label: "Madhya Pradesh" },
        { value: "Maharashtra", label: "Maharashtra" },
        { value: "Manipur", label: "Manipur" },
        { value: "Meghalaya", label: "Meghalaya" },
        { value: "Punjab", label: "Punjab" },
        { value: "Rajasthan", label: "Rajasthan" },
        { value: "Tripura", label: "Tripura" },
        { value: "Uttar Pradesh", label: "Uttar Pradesh" },
        { value: "Uttarakhand", label: "Uttarakhand" },
        { value: "West Bengal", label: "West Bengal" },

        // Union Territories
        { value: "Chandigarh", label: "Chandigarh" },
        { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
        { value: "Delhi (NCT)", label: "Delhi (NCT)" }
    ];


    return (
        <main>
            <div className="flex">
                <form
                    onSubmit={handleSubmit(createlinkedacc)}
                    className="w-full max-w-sm p-3"
                >
                    {/* <Controller
                        render={({ field }) => <input placeholder="nothing" {...field} />}
                        name={i.name}
                        control={control}
                    /> */}

                    <label htmlFor="email">
                        enter email
                        <input
                            {...register('email', { required: "email is required" })}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                        {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                    </label>

                    <label htmlFor="name">
                        <input
                            {...register('name', { required: "name is required" })}
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            autoComplete="name"
                        />

                        {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
                    </label>

                    <label htmlFor="phoneNo">
                        <input
                            {...register('phoneNo', { required: "phoneNo is required" })}
                            type="number"
                            name="phoneNo"
                            placeholder="Enter your phoneNo"
                        />

                        {errors.phoneNo && <p className='text-red-400'>{errors.phoneNo.message}</p>}
                    </label>

                    <label htmlFor="businessName">enter business name
                        <input
                            {...register('legal_business_name')}
                            type="text"
                            placeholder="Enter legal business name"
                            id="businessName"
                        />
                    </label>

                    {errors.legal_business_name && <p className='text-red-400'>{errors.legal_business_name.message}</p>}

                    {/* <label className="block" htmlFor="business_type">business type</label> */}

                    {/* <select className="block" id="business_type" {...register('business_type', { required: "business type is required" })}>
                    <option value="individual">individual</option>
                    <option value="business_type">not_yet_registered</option>
                </select>   */}


                    {/* {errors.business_type && <p className='text-red-400'>{errors.business_type.message}</p>}
                    <input
                        {...register('contact_name', { required: "contact_name is required" })}
                        type="text"
                        placeholder="Enter contact name"
                    />

                    {errors.contact_name && <p className='text-red-400'>{errors.contact_name.message}</p>} */}

                    {/* select state*/}
                    <Select options={stateOptions} />

                    <div className="mt-5">
                        <label htmlFor="">
                        <input
                            {...register('postal_code', { required: "pincode is required" })}
                            type="text"
                            placeholder="Enter pin code"
                        />

                        {errors.postal_code && <p className='text-red-400'>{errors.postal_code.message}</p>}
                        </label>

                        <input
                            {...register('street1', { required: "street1 is required" })}
                            type="text"
                            placeholder="Enter street1"
                        />

                        {errors.street1 && <p className='text-red-400'>{errors.street1.message}</p>}

                        <input
                            {...register('street2', { required: "street2 is required" })}
                            type="text"
                            placeholder="Enter street2"
                        />

                        {errors.street2 && <p className='text-red-400'>{errors.street2.message}</p>}
                        <input
                            {...register('category', { required: "category is required" })}
                            type="text"
                            placeholder="Enter category"
                        />

                        {errors.category && <p className='text-red-400'>{errors.category.message}</p>}
                        <input
                            {...register('subcategory', { required: "subcategory is required" })}
                            type="text"
                            placeholder="Enter subcategory"
                        />

                        {errors.subcategory && <p className='text-red-400'>{errors.subcategory.message}</p>}
                    </div>

                    {/* <input
                        {...register('gstin')}
                        type="text"
                        id="gstin"
                        placeholder="Enter gstin"
                    /> */}

                    {
                        isSubmitting ? <Loader /> :
                            <button type="submit" className="block">create account</button>
                    }


                    <label
                        htmlFor="tnc"
                        className="ml-2">
                        accept razorpay terms and conditions
                        <input
                            className="w-fit"
                            type="checkbox"
                            id="tnc"
                        />
                    </label>

                    <a className="text-xl" href="tel:+91 8866555078">call or whatsapp or email me</a>

                    <a className="underline text-xl" href="mailto:dayroapp96@gmail.com">dayroapp96@gmail.com</a>

                    {/* <strong
                        onClick={navigatetoAskai}
                        className="text-xl">
                        ask to ai
                    </strong> */}

                    <span onClick={() => setModal(true)}>see example</span>
                </form>

                <p className="max-sm:hidden">you can provide dummy adress too if you don't have any registered adress like below
                    <a href="https://razorpay.com/docs/api/payments/route/create-linked-account">go to razorpay for more information please</a>
                    <img onClick={() => setBig(true)} src="/razorpayentity/image.png" alt="razorpay" />
                </p>

                {bigimg && (
                    <div
                        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                        onClick={() => setBig(false)}
                    >
                        <div
                            className="p-2 rounded-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src="/razorpayentity/image.png"
                                alt="bigImage"
                                className="max-w-[90vw] max-h-[90vh] object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>


            {/* in small screens only*/}
            {
                openModal &&
                <Modal>
                    <div className="flex">
                        <p>razorpay adresss entity</p>
                        <span className="text-red-400 max-sm:ml-auto max-sm:mr-2 max-sm:text-xl" onClick={() => setModal(false)}>x</span>
                    </div>
                    <img src="/razorpayentity/image.png" alt="adressetity" />
                </Modal>
            }
        </main>
    );
};