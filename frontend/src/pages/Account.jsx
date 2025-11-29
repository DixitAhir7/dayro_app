import { use, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useUser } from 'Customhooks/Userprovider';
import Navlinks_Account from 'components/Account/Navlinks_Account';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import { useArtist } from 'customhooks/useArtist/Getartistscontext';
import Userfunctionality from 'components/appcom/Userfunctionality';
import { useAccount } from 'customhooks/useAccount';
import Defaultimg from "/icons/user-default image.jpg";

function Account() {

    const { username } = useParams();
    const { userData, setUserData } = useUser();
    const useArtists = useArtist();

    const usetoken = useinterceptors();
    const { getuserinfo } = useAccount();

    async function getUserapi() {
        const getUser = await getuserinfo(username);
        setUserData(getUser.data)
    }

    useEffect(() => {
        getUserapi();
    }, []);


    const UserFunctionalityRef = useRef(null);
    const ForOutsideclose = useRef(null);

    const handleClickOutside = (event) => {
        if (
            UserFunctionalityRef.current &&
            !UserFunctionalityRef.current.contains(event.target) &&
            !ForOutsideclose.current.contains(event.target)
        ) {
            UserFunctionalityRef.current.classList.remove('scale-100', 'opacity-100');
            UserFunctionalityRef.current.classList.add('scale-0', 'opacity-0');
        }
    };

    const handleToggle = () => {
        const el = UserFunctionalityRef.current;
        if (el.classList.contains('scale-0')) {
            el.classList.remove('scale-0', 'opacity-0');
            el.classList.add('scale-100', 'opacity-100');
        } else {
            el.classList.remove('scale-100', 'opacity-100');
            el.classList.add('scale-0', 'opacity-0');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [UserFunctionalityRef, ForOutsideclose]);


    return (
        <main className='max-sm:m-1.5'>
            <div className="md:flex">
                <div className="flex">
                    <img
                        className='rounded-full h-20 w-22.5 object-cover'
                        src={userData.data?.user ? userData.data.user.userimg : Defaultimg}
                    />
                    <p className='mt-5 text-2xl ml-5 md:hidden'>username</p>

                    <div className='md:hidden max-sm:mt-6 max-sm:ml-auto max-sm:mr-4'>
                        <Userfunctionality
                            openSetting={handleToggle}
                            closesetting={ForOutsideclose}
                            referenceDiv={UserFunctionalityRef}
                        />
                    </div>
                </div>

                <div className="border md:place-self-center flex md:ml-5 max-sm:overflow-auto w-fit mt-2">
                    <Navlinks_Account />
                </div>
            </div>

            <Outlet />

            {/* modal for bigger image */}
        </main>
    )
};

export default Account;