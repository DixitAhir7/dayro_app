import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
import React from 'react';
import { useParams } from 'react-router-dom';

// 🧞‍♀️
export default function Paymentfetch() {

    const usetoken = useinterceptors();
    const { order_id } = useParams();

    const fetchPayment = async () => {
        await usetoken.get(`/payment/${order_id}`)
    };

    return (
        <div>Paymentfetch</div>
    )
};