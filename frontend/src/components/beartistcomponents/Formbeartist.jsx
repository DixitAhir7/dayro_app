import React, { useRef } from 'react';
import useSmartTranslate from 'utilits/translatefunction/Translatefunction';
import Switch from "react-switch";

// form to become artist
function Formbeartist({
    showPrice,
    setShowprice,
    naviagetto,
    imageChange,
    register,
    errors,
    imgSrc,
    onVideoc
}) {
    const useTranslate = useSmartTranslate();
    const artistimgref = useRef(null);

    const openUploadimg = () => {
        artistimgref.current.click()
    };


    return (
        <>
            <h1 className='max-[500px]:text-lg text-center bg-gradient-to-bl'>making web a better place for gujrat</h1>
            <label className="block w-full">
                <span className="sr-only">Name</span>
                <input
                    type="text"
                    {...register('Name', { required: "name is required" })}
                    placeholder={useTranslate("entername", "Enter name")}
                    autoComplete="on"
                    autoFocus
                    className="md:border w-full md:px-3 md:py-2"
                    aria-required="true"
                />
                {errors.Name && <p className='text-red-500'>{errors.Name.message}</p>}
            </label>


            <label className="block w-full">
                <span className="sr-only">email</span>
                <input
                    {...register('email', { required: "email is required" })}
                    type="email"
                    className='w-full md:border md:px-3 md:py-2'
                    placeholder="Enter your email"
                    autoComplete='email'
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </label>


            <div className="flex">
                <label className="block w-full">
                    <span className="sr-only">charge</span>
                    <input
                        {...register('price', { required: "charge is required" })}
                        type="number"
                        className='w-full md:border md:px-3 md:py-2'
                        placeholder="Enter charge"
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </label>

                <Switch
                    checkedIcon={false}
                    onColor='#FFA500'
                    offHandleColor='#FFA500'
                    uncheckedIcon={false}
                    onChange={setShowprice}
                    checked={showPrice}
                />

            </div>
            {showPrice &&
                <p className="text-lg mt-1 block">
                    Users won't be able to see your charge
                </p>
            }

            <label className="block w-full">
                <span className="sr-only">phone number</span>
                <input
                    {...register('phoneNo', { required: "phone number is required" })}
                    type="number"
                    placeholder="Enter phone no"
                    className="w-full md:px-3 md:py-2 md:border"
                />
                {errors.phoneNo && <p className="text-red-500">{errors.phoneNo.message}</p>}
            </label>

            {/* <label className="block w-full">
                <span className="sr-only">aadhar number</span>
                <input
                    {...register('addharno', { required: "phone number is required" })}
                    type="number"
                    placeholder="Enter addhar number"
                    className="w-full md:px-3 md:py-2 md:border"
                />
                {errors.phoneNo && <p className="text-red-500">{errors.phoneNo.message}</p>}
            </label> */}


            <select
                {...register('proffesion')}
                className="selectStyle w-full mt-4"
            >
                <option disabled>Select proffesion</option>
                <option value="Comedy">Comedy</option>
                <option value="Singers">Singers</option>
                <option value="folksingers">folksingers</option>
                <option value="Santvani">Santvani</option>
            </select>

            {errors.proffesion && <p className="text-red-500">{errors.proffesion.message}</p>}

            <input
                name='artistimg'
                accept="image/*"
                ref={artistimgref}
                type="file"
                onChange={imageChange}
                style={{ display: "none" }}
            />

            <label htmlFor="artvideo">add 2 of your videos showing your art</label>
            <input
                onChange={onVideoc}
                type="file"
                id="artvideo"
                accept='video/*'
                multiple
            />

            <div className="max-sm:flex">
                <img
                    src={imgSrc}
                    onClick={openUploadimg}
                    className='max-sm:size-65 md:size-60 object-cover'
                />

                {/* <div className="preview">
                    <h1>your image might look like this</h1>

                    add uploaded image in this
                    {
                        previewimg &&
                        <img src={previewimg} alt="preview" onChange={handlepreview} />
                    }
                </div> */}
            </div>

            <div className="flex">
                <button className="w-full" type="submit">Submit</button>
                <button className="w-full ml-2" type="reset">clear</button>
            </div>
        </>
    )
};

export default React.memo(Formbeartist);