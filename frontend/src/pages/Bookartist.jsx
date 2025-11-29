import React, { useEffect, useState } from "react";
import { useArtist } from "Customhooks/useArtist/Getartistscontext";
import InfiniteScroll from "react-infinite-scroll-component";
import SelectedBookartists from "components/bookartistpagecomponents/SelectedBookartists";
import Sortproffesion from "../components/bookartistpagecomponents/Sortproffesion";
import Sortprice from "../components/bookartistpagecomponents/Sortprice";
import Displaysortedartists from "../components/bookartistpagecomponents/Displaysortedartists";
import { LogIn, TableOfContents } from "lucide-react";
import Whychoosedayro from "components/appcom/appguidelines/Whychoosedayro";
import { useAuth } from "customhooks/Authprovider";
import { Link } from "react-router-dom";
import { useIsMobile } from "utilits/reusableCode/usefulcode";
import useinterceptors from "components/authcomponents/managetokens/useinterceptors";

/**
 * @parent
 * @description
 * backend flow: when user clicks on particular artist it'll call post req and in selectedbookartist comp,
 will call get request to display bookedartist then> bookartistform create formdata and 
 conform payment, display it to displybooked and user's porfile
 */


function Bookartist() {
  const useArtisthook = useArtist();
  const isMobile = useIsMobile(768);
  const [sortedmore, setMoresort] = useState(15);
  const { authdata } = useAuth();
  const usetoken = useinterceptors();

  const displayMoresorted = () => {
    setTimeout(() => {
      setMoresort(prev => prev + useArtisthook.SortedArtists.length / 2)
    }, 400);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const set = new Set();

  // get all artists
  useEffect(() => {
    useArtisthook.getall();
  }, []);


  return (
    <main className="flex flex-col lg:flex-row gap-4 relative px-2">
      <div className='md:hidden flex mt-1'>
        {
          !authdata.accesstoken ? <>
            <LogIn className="mt-1" />
            <Link to='signin' className='text-xl'>signin</Link>
          </> : null
        }
      </div>
      {
        useArtisthook.SortedArtists.length > 0 ?
          <div className={`${useArtisthook.isBooked && !isMobile ? "lg:w-3/4 w-full" : "w-full"}`}>
            <div className="flex max-md:justify-around max-sm:overflow-auto">
              <Sortproffesion />
              {/* <Sortprice /> */}

              {/*icon of right sidebar will replace to page route in small screens*/}

              {
                isMobile ? <Link to="/bookedkalakar">booked kalakar</Link>
                  : !useArtisthook.isBooked && (
                    <TableOfContents
                      className="text-2xl ml-auto"
                      onClick={useArtisthook.handleBooked}
                    />
                  )
              }
            </div>

            {/* when booked then make it flex-1/3 for better ui for desktop*/}
            <Displaysortedartists
              // sortedmore={sortedmore}
              isRightSidebarOpen={useArtisthook.isBooked && !isMobile}
            />
          </div> :
          <div>
            <Whychoosedayro />
          </div>
      }

      {/*check this before whole app rendered */}

      {
        useArtisthook.isBooked && (
          <div
            className={`bg-white z-50 fixed ${isMobile
              ? "inset-0 overflow-auto"
              : "right-0 top-0 h-full w-3/4 md:relative md:h-auto md:w-1/4"
              }`}
          >
            <SelectedBookartists />
            {/* {
              isMobile ?
                <Bookedinss /> :
            } */}
          </div>
        )
      }
    </main >
  )
};

export default Bookartist;

{/* {
          useArtisthook.SortedArtists.length > 15 &&
<>
            <InfiniteScroll
              dataLength={sortedmore}
              next={displayMoresorted}
              hasMore={sortedmore < useArtisthook.SortedArtists.length}
              loader={<p className="text-center">...</p>} />

            <span className="text-center font-extrabold">next</span>
            <FaAngleUp className="text-2xl w-fit" onClick={scrollToTop} />
</>
} */}