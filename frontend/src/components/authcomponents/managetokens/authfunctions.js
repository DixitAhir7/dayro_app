import {portinstance} from 'axiosinstance/portinstance'

async function checkpassword(curpassword) {
    await portinstance.patch('/auth/accresetpassword', { userpassword: curpassword })
};

export { checkpassword };