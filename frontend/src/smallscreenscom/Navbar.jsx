import React from "react";
import { NavLink } from "react-router-dom";
import Defaultimg from "/icons/user-default image.jpg";
import { useAuth } from "customhooks/Authprovider";


export default function Navbar({ username }) {

    const style = {
        navstyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
        },
        textcss: {
            fontSize: 18,
            lineHeight: 1
        }
    };

    const { authdata } = useAuth();
    // const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full h-12 overflow-auto bg-white border-t z-999">
            <nav className="flex justify-around items-center h-full">
                <NavLink to="/" className={`${style.navstyle} text-orange-400/100`}>
                    <span style={style.textcss}>ડાયરો</span>
                </NavLink>

                <NavLink
                    to="kalakar"
                    className={({ isActive }) =>
                        `${style.navstyle} ${isActive ? "text-orange-400" : "text-gray-600"
                        }`
                    }
                >
                    <span style={style.textcss}>kalakaro</span>
                </NavLink>



                <NavLink
                    to="beartist"
                    className={({ isActive }) =>
                        `${style.navstyle} ${isActive ? "text-orange-400" : "text-gray-600"
                        }`
                    }
                >
                    <span style={style.textcss}>be artist</span>
                </NavLink>
                <NavLink
                    to={authdata.role === "artist" ?
                        `/${username}/visibletoartist` :
                        `/${username}/bookedartists`}
                    className={({ isActive }) =>
                        `${style.navstyle} ${isActive ? "text-orange-400" : "text-gray-600"
                        }`
                    }
                >
                    <img src={Defaultimg} alt="userimg" className="size-9 rounded-full" />
                </NavLink>

                {/* <NavLink
                    to="askai"
                    className={({ isActive }) =>
                        `${style.navstyle} ${isActive ? "text-orange-400" : "text-gray-600"
                        }`
                    }
                >
                    <span style={style.textcss}>ask dayro</span>
                </NavLink> */}
            </nav>
        </div>
    );
}