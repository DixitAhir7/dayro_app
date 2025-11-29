import React, { useRef, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useSmartTranslate from 'utilits/translatefunction/Translatefunction';
import Defaultimg from '/icons/user-default image.jpg'
import Userfunctionality from './Userfunctionality';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import Navbar from 'smallscreenscom/Navbar';
import { useAuth } from 'customhooks/Authprovider';
import { LogIn, LogInIcon, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useIsMobile } from 'utilits/reusableCode/usefulcode';


function Sidebar() {

    const sidebarStyle = {
        allcss: {
            fontSize: '18px',
            fontWeight: 'font-medium',
            width: 140,
            padding: 3,
        },
        forDiv: {
            width: 150,
            marginTop: 8,
        },
        sidebarCss: {
            fontSize: 24,
            lineHeight: 1.33
        }
    };

    // const countStorage = navigator.storage.estimate();

    // window.addEventListener('load', () => {
    //     navigator.vibrate(2000)
    // })
    // console.log(navigator.languages)

    useEffect(() => {
        // console.log(navigator.userAgent);
    }, []);


    const { authdata } = useAuth();
    const isMobile = useIsMobile(768);
    // console.log(authdata);

    const useTranslate = useSmartTranslate();

    const [issidebar, setSidebar] = useState(true);

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

    const handlesidebar = () => {
        setSidebar(prev => !prev)
    };


    // api for username
    const [user, setUser] = useState('username');

    const usetoken = useinterceptors();

    const getuser = async () => {
        try {
            const getuserRes = await usetoken.get('/auth/getuser');
            // console.log(getuserRes.data);
            setUser(getuserRes.data.data);
        } catch (error) {
            console.log(`error while gettig user`, error);
        }
    };

    useEffect(() => {
        getuser();
    }, []);

    return (
        <>

            {
                issidebar ?
                    <>
                        <aside
                            className='border-r-2 overflow-auto p-3 fixed z-50 h-screen sm:w-[210px] hidden md:block'>
                            <PanelRightClose className='fixed left-45 md:block hidden' onClick={handlesidebar} style={sidebarStyle.sidebarCss} />
                            <div className="logo-div">
                                <NavLink className='text-2xl' to='/'>ડાયરો </NavLink>
                            </div>

                            <div className='kalakar' style={sidebarStyle.forDiv}>
                                <NavLink
                                    className={({ isActive }) => isActive ? 'bg-gray-400' : ''}
                                    style={sidebarStyle.allcss}
                                    to='kalakar'>
                                    {useTranslate('kalakar', 'KALAKARO')}
                                </NavLink>
                            </div>

                            <div className="beartist mt-2" style={sidebarStyle.forDiv}>
                                <NavLink className={({ isActive }) =>
                                    isActive ? 'bg-gray-400' : ''}
                                    style={sidebarStyle.allcss}
                                    to='beartist'
                                >
                                    {useTranslate('beartist', 'BECOME ARTIST')}
                                </NavLink>
                            </div>

                            {/* <div className="mt-2" style={sidebarStyle.forDiv}>
                        <NavLink className={({ isActive }) =>
                            isActive ? 'bg-gray-400' : ''}
                            style={sidebarStyle.allcss}
                            to='askai'
                            >
                            {useTranslate('askai', 'ASK dayro')}
                        </NavLink>
                    </div> */}

                            <div id='userInfo' className="mt-17">

                                {!authdata.accesstoken ?
                                    <div className='flex'>
                                        <LogInIcon className='md:mt-1' />
                                        <Link to='/signin' className='ml-1 text-xl'>signin</Link>
                                    </div>
                                    : null
                                }

                                <NavLink
                                    to={authdata.role === "user" ?
                                        `${user ? user.username : ""}/bookedartists` :
                                        `${user ? user.username : "username"}/visibletoartist`}
                                    className='flex mt-8'
                                >
                                    <img
                                        src={user?.userimg ? user.userimg : Defaultimg}
                                        className='rounded-full h-8 w-8 object-cover'
                                        alt='userimage'
                                    />
                                    <span className='mt-1 ml-1 text-lg'>{user ? user.username : "username"}</span>
                                </NavLink>

                                <div className="flex mt-8">
                                    <Userfunctionality
                                        openSetting={handleToggle}
                                        closesetting={ForOutsideclose}
                                        referenceDiv={UserFunctionalityRef}
                                    />
                                </div>
                            </div>
                        </aside>
                    </> :
                    <div className="fixed left-45 md:block hidden">
                        <PanelRightOpen onClick={handlesidebar} style={sidebarStyle.sidebarCss} />
                    </div>
            }

            {
                isMobile &&
                <Navbar
                    username={user.username}
                />
            }
        </>
    )
};


export default React.memo(Sidebar);