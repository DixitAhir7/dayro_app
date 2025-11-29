import useinterceptors from 'components/authcomponents/managetokens/useinterceptors';
// import domtoimage from "dom-to-image-more";
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Modal from 'utilits/reusableCode/Modal';

export default function PaymentModel() {

    // bookformid based on this get data of bookformid
    const { bookformid } = useParams();

    const usetoken = useinterceptors();

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(true);
            document.body.appendChild(script);
        });
    };


    // user preference color in razorpay
    const displayRazorpay = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        };


        // const price = JSON.parse(localStorage.getItem('selectedartistsprice'));

        // 1. Create order from backend, info will come from api
        // call stored value from bookartistform for combined price


        const data = await usetoken.get(`/payment/pay/${bookformid}`, {

        });
        console.log(data.data);

        // if payment fails then automatically take ss
        const options = {
            key: import.meta.env.VITE_RAZORPAYKEY,
            name: "dayro",
            // one_click_checkout: true,
            amount: data.data.amount,
            currency: data.data.currency,
            order_id: data.data.id,
            // linkedaccount: data.data.account,
            // show_coupons: true,
            handler: async function (response, err) {
                console.log(response);
                if (response) {
                    // await usetoken.post(`payment/verify`, response);
                    alert("Payment successful!");
                } else {
                    console.log(err)
                };
            },
            theme: {
                color: "black",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    /**
     * @description
     * when user selects pay in person option display modal
     * take 500 from user when all artists selected or declined the user request for occasion
     * after occasion gets completed return to user excluding fees
    */

    const razorpayCheckout = async () => {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("i sucked up")
        }

        const data = await usetoken.get(`/payment/pay/pip`);

        const options = {
            key: import.meta.env.VITE_RAZORPAYKEY,
            amount: data.data.data.amount,
            currency: data.data.data.currency,
            description: "dayro checkout",
            order_id: data.data.data.id,
            handler: async function (res) {
                console.log(res)
                if (res) {
                    await usetoken.post('payment/pay/pip/capture', res)
                    await usetoken.patch("artist/scheduledrefund", {
                        bookformid: bookformid,
                        payment_id: res.razorpay_payment_id
                    })
                    window.alert('payment done');
                };
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open();
    };

    const getOccasionTicket = async () => {
        const getTicket = await usetoken.get('/payment/occasionrecipt');
        const aTag = document.createElement('a');
        aTag.download = getTicket;
        console.log(getTicket);
    };

    const downloadPdf = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVERPORT}/occasionrecipt`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "occasionTicket.pdf"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error)
        }
    };


    const [isPayinperson, setPaymentmethod] = useState();

    const openPayid = () => {
        setPaymentmethod(true)
    };


    //set and delay job for process refund,delete from model 


    // const takeScreenshot = async () => {
    //     domtoimage.toPng(document.getElementById("capture"))
    //         .then((dataUrl) => {
    //             const link = document.createElement("a");
    //             link.download = "screenshot.png";
    //             link.href = dataUrl;
    //             link.click();
    //         });
    // };

    return (
        <main id='capture'>
            <button className='ml-4' onClick={razorpayCheckout} type='button'>pay virtually</button>
            {/* <button onClick={razorpayCheckout} className='ml-4' type='button'>pay in person</button> */}
            {/* <button onClick={downloadPdf}>take ss</button> */}

            {/* {
                isPayinperson &&
                <Modal>
                    <p>pay to this upi don't worry after occasion is completed you'll get your money back</p>
                    <img className='w-fit h-screen' src="/public/icons/qr_codeme.jpg" alt="qrcode" />
                </Modal>
            } */}
        </main>
    )
};