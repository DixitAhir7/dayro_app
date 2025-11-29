import axios from "axios";

const portinstance = axios.create({
    baseURL: import.meta.env.VITE_SERVERPORT,
    // headers: {
    //     "Content-Type": "application/json"
    // },
    withCredentials: true
});

// const formdatainstance = axios.create({
//     baseURL: import.meta.env.VITE_SERVERPORT,
//     headers: {
//         "Content-Type": "multipart/form-data"
//     },
//     withCredentials: true
// });


// const errorcodes = [401, 404];

// portinstance.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         console.log("err", err);
//         if (errorcodes.includes(err.response.status)) {
//             console.log('it includes in array')
//         };
//     }
// );


export { portinstance };