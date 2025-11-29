import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import Cancelartistreason from './Cancelartistreason';

// display to user and ask reason with iamge of canceled artist
export default function Canceledartist({ reciveremovedartist }) {

    // call api of removed artist
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={1}
                loop={false}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {/* recivecanceled artist images here */}
                <img className='size-50' src='/icons/user-default image.jpg' />
            </Swiper>
        </>
    )
};