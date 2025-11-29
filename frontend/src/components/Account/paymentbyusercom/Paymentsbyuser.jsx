import React, { useEffect, useEffectEvent, useState } from 'react';
import { portinstance } from 'axiosinstance/portinstance';
import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import Paymentcard from './Paymentcard';


// payments information
function Paymentsbyuser() {

    const [ispayment, setPayments] = useState([]);
    const usetoken = useinterceptors();

    const getpayments = async () => {
        const paymentRes = await usetoken.get(`/payment/orders`);
        setPayments(paymentRes.data.data.items);
    };

    useEffect(() => {
        getpayments();
    }, []);


    /**
     * count total amount and show to user
    */

    return (
        <>
            {
                ispayment.map(p => (
                    <div className='mt-2 w-fit bg-white shadow-md md:p-2 md:flex'>
                        <Paymentcard
                            amount={p.amount}
                        />
                    </div>
                ))
            }
            {/* <h1>you don't have any booked occasion go try book one </h1> */}
        </>
    )
};

export default React.memo(Paymentsbyuser);