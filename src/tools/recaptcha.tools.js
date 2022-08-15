import { tokenName, api, recaptchaSiteKey } from '../assets/config';

export const recaptchaCheck = async (recaptcha) => {
    try {
    const res = await fetch(api, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, same-origin
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        recaptcha,
        path: 'login',
        })
    });

    const data = await res.json();

    console.log(res.status);
    if(res.status === 200) {
        return true;
    } else {
        return false;
    }
    } catch (err) {
    console.log('There was an error with reCAPTCHA check: ', err);
    }  
}