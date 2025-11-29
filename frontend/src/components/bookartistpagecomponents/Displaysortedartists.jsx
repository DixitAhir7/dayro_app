import { use, useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtist } from 'Customhooks/useArtist/Getartistscontext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import { Reasonofartist } from './Reasonofartist';
import { useTanstack } from 'utilits/reusableCode/useTanstack';
import IsCatogory from './IsCatogory';


// images and info of artists on home page
export default function Displaysortedartists({ sortedmore, isRightSidebarOpen }) {

    const useArtisthook = useArtist();

    const [showTooltip, setShowTooltip] = useState(null);

    // const idk = useTanstack('getartists', () => useArtisthook.getall(), 1000 * 5 * 100);

    const gridCols = isRightSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4";

    return (
        <>
            <div className='mt-3 px-2 w-full'>
                <IsCatogory
                    getData={() => useArtisthook.getall()}
                    isData={useArtisthook.ifnoData}
                />
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${gridCols}`}>
                    {
                        useArtisthook.SortedArtists?.map(artists => {
                            return (
                                <div className='overflow-hidden w-full' key={artists._id}>
                                    <Swiper
                                        effect='flip'
                                        grabCursor={true}
                                        modules={[EffectFlip]}
                                    >
                                        <SwiperSlide>
                                            <div className='pb-[75%]'>
                                                <img
                                                    loading='lazy'
                                                    onClick={() => useArtisthook.addBookedartist(artists._id)}
                                                    className="size-full object-cover cursor-pointer absolute inset-0"
                                                    src={`http://localhost:9626/${artists.artistimg}`}
                                                    alt={artists.name}
                                                />
                                            </div>

                                            {/* show msg if not avaliable else empty */}
                                            <Reasonofartist
                                                msg={
                                                    !artists.isAvaliable ?
                                                        <span className='text-black'>not avaliable</span> : null
                                                }
                                                handlereasonshowtooltip={() => setShowTooltip(artists._id)}
                                                handlereasonclosetooltip={() => setShowTooltip(false)}
                                            />

                                            {
                                                showTooltip === artists._id ?
                                                    <div className="absolute top-8 right-0 transform transition-all duration-150 bg-white px-2 py-1 rounded-lg shadow-xl border border-gray-200 opacity-100 scale-100">
                                                        <p className='leading-tight text-sm'>{artists.reasonForNotAvaliable}</p>
                                                        <div className='absolute -top-1 right-3 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45'></div>
                                                    </div> : null
                                            }
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div className="shadow-md p-3">
                                                <Link
                                                    className="text-lg"
                                                    to={`/kalakar/${artists.name}`}
                                                >
                                                    {artists.name}
                                                </Link>
                                                <strong>charge:{artists.price}</strong>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};