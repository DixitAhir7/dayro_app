import React, { Activity, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Writeblogs from 'components/artistcomponents/blogscomponents/Writeblogs';
import Setavalibility from './Setavalibility';
import Ifnotavaliabereason from './artistdetails/Ifnotavaliabereason';
import { useForm } from 'react-hook-form';
import Uploadpics from './artistdetails/Uploadpics';
import Reciverequest from './Reciverequest';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import Searchoccasions from './performanceanalysis/Searchoccasions';
import Modal from 'utilits/reusableCode/Modal';
import Displaybookedformdata from '../sendbookedformtoartistcom/Displaybookedformdata';
import Defaultimg from '/icons/user-default image.jpg';
import { useQuery } from '@tanstack/react-query';
import { DayPicker } from 'react-day-picker';
import { useAuth } from 'customhooks/Authprovider';

/***
 * @description
 * @parent
 * route that is only visible to artist
*/


function Visibletoartist() {

  const [isAvaliable, setAvaliability] = useState(true);
  const [reciveReq, setRecive] = useState(true);
  const [isSearched, setSearch] = useState();
  const [isSelected, setSelected] = useState(null);
  const [BookedModal, setBookedmodal] = useState(false);
  const { authdata } = useAuth();

  const [isArtist, setArtist] = useState();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    defaultValues: {
      isAvaliable: ""
    }
  });

  const usetoken = useinterceptors();

  // isAvaliable or not
  const handleavaliablity = () => {
    setAvaliability(prev => !prev);
  };


  // recive request or not
  const handleRequest = () => {
    setRecive(prev => !prev);
  };

  const watchvalue = watch("reason");
  // console.log(watchvalue);


  // get artist's information
  const getArtist = async () => {
    try {
      const getArtist = await usetoken.get('artist/getartist');
      setArtist(getArtist.data.data);
      setAvaliability(getArtist.data.data.isAvaliable)
    } catch (error) {
      console.log("error while getting artist", error)
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  async function startjob() {
    await usetoken.patch("artist/sscheduledwork");
  };
  async function endjob() {
    await usetoken.patch("artist/escheduledwork");
  };


  // update artist
  const updateArtist = async (data) => {
    const sendUpdated = await usetoken.patch('/artist/updateartist', { isAvaliable: isAvaliable });
    startjob();
    return sendUpdated;
  };


  // 🧞‍♀️
  const handleagain = async (data) => {
    const sendUpdateddata = await usetoken.patch('artist/updateartist', {
      isAvaliable: isAvaliable,
      reason: data.reason,
      reciveReq: reciveReq,
      from: isSelected.from,
      to: isSelected.to
    });

    return sendUpdateddata;
  };

  useEffect(() => {
    endjob()
  }, [])

  // date range
  const onselectDate = (selected) => {
    console.log(selected)
    if (selected.to) {
      setAvaliability(false);
    };
    setSelected(selected);
  };

  // count time that artist is active in this page
  // const { data } = useQuery({
  //   queryKey: ['artistdata'],
  //   queryFn: getArtist,
  //   staleTime:
  // });

  // console.log(data);


  return (
    <>
      <Link className='border-b-1 text-xl w-fit max-sm:ml-1' to='/editbeartistform'>edit info</Link>
      <div className='max-sm:mt-5 md:flex'>
        {/* for reciving avalibility of artist*/}
        <div>
          <form onSubmit={handleSubmit(updateArtist)}>
            <div className="md:mt-4 max-sm:mt-2">
              <Setavalibility
                isavaliable={isAvaliable}
                handleavaliablity={handleavaliablity}
              />
              <button type='submit'>update</button>
            </div>
          </form>

          <form onSubmit={handleSubmit(handleagain)}>
            <DayPicker
              selected={isSelected}
              onSelect={onselectDate}
              mode='range'
              disabled={{
                before: new Date()
              }}
              timeZone='Asia/Kolkata'
              animate
            />

            {/*reason if not avaliabile and if date is selected*/}

            {!isAvaliable &&
              <div className='max-sm:ml-1'>
                <Ifnotavaliabereason
                  register={register}
                  errors={errors}
                />
              </div>
            }

            {/* after artist send the reason for not avalible
       then ask to recive message or not? */}
            {
              !isAvaliable &&
              <div className='max-sm:ml-1 max-sm:mt-3 w-fit'>
                <Reciverequest
                  setChecked={handleRequest}
                  isChecked={reciveReq}
                />
              </div>
            }
            <button type='submit'>update</button>
          </form>
        </div>

        {/* let artist update for occasions or any updates show it in kalakar page*/}

        <div className='mt-3 w-fit md:ml-auto md:mr-auto'>
          <Searchoccasions />
        </div>

        {
          isArtist?.bookedby.map(a => (
            <>
              <div className="mt-5 bg-white shadow-lg w-fit p-2">
                <Displaybookedformdata
                  imgsrc={Defaultimg}
                />
                {/* after occasion completes show data to artist*/}
                <div key={a._id}>
                  <cite
                    className='text-xl'
                    onClick={() => setBookedmodal(true)}
                  >
                    Occasion: {a.Name}
                  </cite>
                  {
                    BookedModal &&
                    <Modal>
                      <span onClick={() => setBookedmodal(false)}>X</span>
                      <Displaybookedformdata
                      />
                    </Modal>
                  }
                </div>
              </div>
            </>
          ))
        }


        {/* <div className='max-sm:ml-1 max-sm:mt-5 ml-auto mr-auto'>
          <Uploadpics />
        </div> */}

        {/* after occasion completes then show it into artist's profile */}

      </div>
    </>
  )
};

export default React.memo(Visibletoartist);


// const Msgwhennotavaliable = () => {
//   if (!toast.isActive(msgRef.current)) {
//     msgRef.current = toast("this can be effective if you are not avaliable more than 5 days");
//   }
// };
{/* <Writeblogs /> */ }
{/* <ToastContainer
  position='top-center'
  pauseOnHover={true}
  hideProgressBar={true}
  autoClose={2000}
  closeButton={true}
/> */}