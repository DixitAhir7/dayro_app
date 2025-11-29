import { portinstance } from "axiosinstance/portinstance";

const displayartists = async (proffesion, min, max) => {

    // const filteredparams = _.pickBy(allParams, value => !value);
    // console.log(filteredparams);

    try {
        const getartistRes = await portinstance.get(`/artist/bookartist`, {
            params: {
                proffesion: proffesion,
                min: min,
                max: max
            }
        });
        return getartistRes;
    } catch (error) {
        console.log(error)
    }
};


export { displayartists };