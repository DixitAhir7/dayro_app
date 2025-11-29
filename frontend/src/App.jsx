import React, { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createBrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Getartistcontext, useArtist } from 'Customhooks/useArtist/Getartistscontext.jsx';
import Signin from 'components/authcomponents/Signin';
import Login from 'components/authcomponents/Login.jsx';
import Editauth from 'components/accountupdatecomponents/Editauth.jsx';
import Forgotpassword from 'components/authcomponents/Forgotpassword';
import Enterotp from 'components/authcomponents/Enterotp.jsx';
import Resetpassword from 'components/authcomponents/Resetpassword.jsx';
import Editbeartistform from 'components/beartistcomponents/Editbeartistform.jsx';
import Testjsx from '../tests/Testjsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Showpagetoauth from 'checkrolesauth/Showpagetoauth.jsx';
import Displayifnotauthorized from 'checkrolesauth/Displayifnotauthorized.jsx';
import { BarLoader } from 'react-spinners';
import Unauthorized from 'checkrolesauth/Unauthorized.jsx';
import Whyregister from 'components/appcom/appguidelines/Whyregister.jsx';
import Notifications from 'components/Account/notificationcom/Notifications';
import BookedArtists from 'components/Account/bookedartistcom/BookedArtists';
import Paymentsbyuser from 'components/Account/paymentbyusercom/Paymentsbyuser';
import Askai from 'pages/Askai';
import Applayout from 'components/appcom/Applayout';
import Transparentstyle from 'components/appcom/Transparentstyle';
import Takesuggestionofres from 'components/askaicom/Takesuggestionofres';
import Artists from 'components/artistcomponents/searchedartists/Artists';
import CreateLinkedAccount from 'components/linkedaccounts/CreateLinkedAccount.jsx';
import PaymentModel from 'components/paymentcomponents/PaymentModel';
import Asklocation from 'components/appcom/Asklocation';
import Visibletoartist from 'components/artistcomponents/artistprofile/Visibletoartist.jsx';
import Addartists from 'components/BookingFormComponents/updatebookedform/Addartists';
import Loadline from 'components/appcom/Loadline';
import Canceloccasion from 'components/BookingFormComponents/updatebookedform/Canceloccasion';
import useInfo from 'customhooks/bookartistforminfo';
import Contact from 'components/appcom/Contact';
import { useIsMobile } from 'utilits/reusableCode/usefulcode';
import { Bookedcontext } from 'customhooks/useBooked';
import Readfile from 'components/appcom/appguidelines/Readfile';
import OnlyLogedinuser from 'checkrolesauth/OnlyLogedinuser.jsx';
import Createstakeholder from 'components/linkedaccounts/Createstakeholder';
import Updateproductconfig from 'components/linkedaccounts/Updateproductconfig';
import Bookedshow from 'components/bookartistpagecomponents/Bookedinss';
import { Accountcontextp } from 'customhooks/useAccount';
import Bookedformdatatoshow from 'components/Account/notificationcom/Bookedformdatatoshow';
import Firsttimeotp from 'components/authcomponents/Firsttimeotp';


// for notification
// if ('serviceWorker' in navigator){
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register()
//   })
// }

function App() {

    window.addEventListener('load', () => {
        if (navigator.onLine) {
            console.log("you are online")
        } else {
            console.log("you are offline")
        }
    });

    const startdetect = new AbortController();
    const isMobile = useIsMobile(768);

    const { bookingInfoobj } = useInfo();

    const BookingForm = lazy(() => import('components/BookingFormComponents/BookartistsForm'));
    const Home = lazy(() => import('pages/Bookartist'));
    const Beartist = lazy(() => import('pages/Beartist'));
    const Kalakar = lazy(() => import("pages/Kalakar"));
    const Editbooked = lazy(() => import('components/BookingFormComponents/updatebookedform/Editbooked'));
    const Account = lazy(() => import('pages/Account'));
    const Profileupdate = lazy(() => import("components/accountupdatecomponents/Profileupdate.jsx"));

    const useArtisthook = useArtist();

    // const bookformid = JSON.parse(localStorage.getItem('bookformid'));
    // console.log(bookformid);


    // as long as user stay loggedin to show data from get requests
    // const querryclient = new QueryClient({
    //     defaultOptions: {
    //         queries: {
    //             gcTime: Infinity
    //         }
    //     }
    // });


    // const persister = createAsyncStoragePersister({
    //     storage: window.localStorage
    // });

    // useEffect(() => {
    //     const checkwindow = typeof window.document !== "undefined";

    //     if (checkwindow === undefined) {
    //         return <BarLoader />
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log("app is rendering")
    // })

    return (
        <Fragment>
            {/* <Asklocation /> */}
            <Routes>
                <Route path='/' element={<Applayout />}>
                    <Route path='test' element={<Testjsx />} />
                    <Route path='redirecttoauth' element={<Showpagetoauth />} />
                    <Route path='unauthorized' element={<Unauthorized />} />
                    <Route path='signin' element={<Signin />} />
                    <Route path='login' element={<Login />} />
                    <Route path='forgotpassword' element={<Forgotpassword />} />


                    <Route path='readfile' element={
                        <Getartistcontext>
                            <Readfile />
                        </Getartistcontext>
                    } />

                    {
                        <Route path='enterotp'
                            element={sessionStorage.getItem('email') ? <Enterotp /> :
                                <Navigate to="/redirecttoauth" />}
                        />
                    };


                    <Route path='verifyotp' element={<Firsttimeotp />} />

                    <Route path='resetpassword' element={<Resetpassword />} />

                    <Route path="/" element={
                        <Suspense fallback={
                            <Loadline />
                        }>
                            <Getartistcontext>
                                {/* <PersistQueryClientProvider client={querryclient}> */}
                                <Home />
                                {/* </PersistQueryClientProvider> */}
                            </Getartistcontext>
                        </Suspense>
                    } />

                    <Route path='/registerinfo' element={<Whyregister />} />


                    <Route path="kalakar" element={
                        <Suspense fallback={<Loadline />}>
                            <Getartistcontext>
                                <Kalakar />
                            </Getartistcontext>
                        </Suspense>
                    } >
                        <Route path=":name" element={
                            <Artists />
                        } />
                    </Route>

                    <Route path="beartist" element={
                        // <OnlyLogedinuser>
                        <Suspense fallback={<Loadline />}>
                            <Beartist />
                        </Suspense>
                        // </OnlyLogedinuser>
                    } />

                    <Route path='editbeartistform' element={<Editbeartistform />} />

                    {/* redirect with artistid  for account inforamtion*/}
                    <Route path='linkedaccount/:id' element={<CreateLinkedAccount />} />
                    <Route path='stakeholder/:id' element={<Createstakeholder />} />
                    <Route path='updateconfig/:id' element={<Updateproductconfig />} />

                    {/* if booked any then display */}

                    <Route path="bookartistsform" element={
                        <Suspense fallback={<Loadline />}>
                            <Getartistcontext>
                                {/* <OnlyLogedinuser> */}
                                <BookingForm />
                                {/* </OnlyLogedinuser> */}
                            </Getartistcontext>
                        </Suspense>
                    } />

                    {
                        isMobile && <Route path='/bookedkalakar' element={<Bookedshow />} />
                    }

                    <Route path='canceloccasion/:id' element={
                        <main>
                            <Canceloccasion />
                        </main>
                    } />

                    <Route path='addartists/:booformid' element={<Addartists />} />

                    {/*🧞‍♀️ when artist accepts request of user then redirect to payment for that artist */}
                    <Route path='payment/:bookformid' element={
                        Object.keys(bookingInfoobj).length ?
                            <PaymentModel />
                            : <Navigate to="/" />
                    } />


                    <Route path="editbooked/:bookformid" element={
                        <Getartistcontext>
                            <Bookedcontext>
                                <Suspense fallback={<BarLoader color='rgba(255, 165, 0, 1)' />}>
                                    <Editbooked />
                                </Suspense>
                            </Bookedcontext>
                        </Getartistcontext>
                    } />

                    <Route path='askai' element={<Askai />} />
                    <Route path='suggestion/:id' element={<Takesuggestionofres />} />

                    {/* if user is logedin than and then only display this */}
                    {/* when choosing preference don't display account */}

                    <Route path=':username' element={
                        <Suspense fallback={<BarLoader color='rgba(255, 165, 0, 1)' />}>
                            {/* <OnlyLogedinuser> */}
                            <Accountcontextp>
                                <Account />
                            </Accountcontextp>
                            {/* </OnlyLogedinuser> */}
                        </Suspense>
                    }>
                        <Route path="visibletoartist" element={
                            <Displayifnotauthorized>
                                <Visibletoartist />
                            </Displayifnotauthorized>
                        } />

                        <Route path="bookedartists" element={<BookedArtists />} />
                        {/* <Route path='payments' element={<Paymentsbyuser />} /> */}
                        <Route path='notifications' element={<Notifications />} />
                    </Route>
                    <Route path='/bookedform/:id' element={<Bookedformdatatoshow />} />
                    {/* {
                        isMobile &&
                        <Route path="/bookedartistsdata/:id" element={<Bookedartists />} />
                    } */}

                    <Route path="account" element={
                        <Suspense fallback={<BarLoader color='rgba(255, 165, 0, 1)' />}>
                            {/* <OnlyLogedinuser> */}
                            <Profileupdate />
                            {/* </OnlyLogedinuser> */}
                        </Suspense>
                    }>
                        <Route path='edit' element={<Editauth />} />
                    </Route>
                    <Route path='contactme' element={<Contact />} />
                </Route>
            </Routes>
        </Fragment>
    )
};

export default App;


// import Querries from 'Account/Querries';
// import ArtistBlogs from 'Artistscomponents/blogscomponents/ArtistBlogs.jsx';
// import Readinfo from 'components/generalcomponents/Readinfo.jsx';
// import Notifications from 'Account/Notifications.jsx';
{/* <Route path="blogs" element={<ArtistBlogs />} />
<Route path="querries" element={<Querries />} /> */}