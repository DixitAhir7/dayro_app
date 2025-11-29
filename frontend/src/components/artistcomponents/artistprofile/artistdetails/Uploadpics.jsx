import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { Clapperboard } from 'lucide-react';
import React, { useState } from 'react';

/**
 * @parent
 * let artist upload their photos and display it in /pages/kalakar
*/

export default function Uploadpics() {

    const usetoken = useinterceptors();

    const [isImages, setImages] = useState()

    const handlechangeimg = (e) => {
        // console.log(e.target.files)
        setImages(e.target.files)
    };

    const sendImages = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let file of isImages) {
            formData.append("artistimages", file);
        };

        const values = Object.fromEntries(formData);
        console.log(values);

        const imagesPostRes = await usetoken.patch('artist/uploadmultiple', formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
    }

    return (
        <form onSubmit={sendImages} name='artistimagesform'>
            <label htmlFor="artistimages">you can choose 5 photos</label>
            <input
                type="file"
                multiple
                id='artistimages'
                onChange={handlechangeimg}
                accept='image/*'
            />
            <Clapperboard className='block mt-2' />
        </form>
    )
};