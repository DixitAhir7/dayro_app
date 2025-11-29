import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from 'utilits/reusableCode/Input';


// display this in kalakar all artist's blog in kalakar page
export default function Allartistsblogs() {

    const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
    const [iscomment, setComment] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(dayjs().format("HH:mm:ss "));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        // birthday grettings and animation on artist's birthday
        <div className='mt-3 w-full max-w-2xl mx-auto px-3' id='allblogs'>
            <div id="artistimg" className='flex items-center p-2'>
                <img
                    className='h-12 w-12 rounded-full object-cover flex-shrink-0'
                    src="../../public/allArtistimg/devaytkhavad.jpeg"
                    alt="artistimg" />
                <Link className='ml-3 text-xl sm:text-lg md:text-xl'>devayt khavad</Link>
                <span className='ml-3 text-sm sm:text-base'>{time}</span>
            </div>

            <div id="artistblogs" className='ml-3'>
                <p className='text-sm sm:text-base break-words'>hello i am devayt khavad joining this amazing app dayro let' see how it goes</p>
                <MessageCircle  className='inline-block' onClick={() => setComment(true)} /> {/* let users comment only */}


                {iscomment &&
                    <div className='flex flex-col sm:flex-row mt-2 sm:items-center'>
                        <Input className='flex-1 min-w-[200px] max-w-full' name='userreply' placeholder='comment'></Input>
                        <div className="flex mt-2 sm:mt-0 sm:ml-4 space-x-3">
                            <button className='px-3 py-1 bg-blue-500 text-white text-sm '>send</button>
                            <button className='px-3 py-1' onClick={() => setComment(false)} type='button'>cancel</button>
                        </div>
                    </div>
                }

                <div id="usercomment" className='mt-3 ml-2 sm:ml-6'>
                    <div className="userimg flex items-center">
                        <img className='w-8 h-8 rounded-full object-cover flex-shrink-0' src="../../public/assets/icons/user-default image.jpg" alt="userimg" />
                        <Link className='ml-3 text-sm sm:text-base font-medium' to='user'>username</Link>
                    </div>
                    <div className="userreplies text-sm sm:text-base break-words">
                        <p>this comment is from user</p>
                    </div>
                </div>
            </div>
        </div>
    )
};