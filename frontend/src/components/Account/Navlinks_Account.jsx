import { NavLink } from 'react-router-dom';
import { memo } from 'react';

// routes in account
function Navlinks_Account() {

    const navlinks = [
        { navigateto: "visibletoartist" },
        // { navigateto: "dayrolist" },
        // { navigateto: "blogs" },
        { navigateto: "bookedartists" },
        // { navigateto: "querries" },
        // { navigateto: "payments" },
        { navigateto: "notifications" }
    ];

    return (
        <>
            {
                navlinks.map((nav, i) => {
                    return (
                        <NavLink key={i} className={({ isActive }) =>
                            isActive ?
                                'md:border-b-2 max-sm:border-t-1 ml-4 text-2xl max-sm:text-xl' :
                                'ml-4 text-2xl max-sm:text-xl'
                        }
                            to={nav.navigateto}
                        >
                            {nav.navigateto}
                        </NavLink>
                    )
                })
            }
        </>
    )
};

export default memo(Navlinks_Account);