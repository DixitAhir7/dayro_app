import React from 'react';
import AppleSignInButton from 'react-apple-signin-auth';
import { useTranslation } from 'react-i18next';

function Loginbtns() {
    const { i18n } = useTranslation();
    console.log(i18n.languages);

    return (
        <div className="flex flex-col gap-3 mt-5">
            <a
                href="http://localhost:9626/auth/google"
                className="flex items-center gap-3 px-5 py-2 shadow-md border border-gray-300 bg-white hover:bg-gray-100 transition-all duration-200"
            >
                <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">Sign in with Google</span>
            </a>

            <button type='button' className="flex items-center gap-5 w-70 bg-blue-500 px-6 py-2 shadow">
                <img
                    src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                    alt="Facebook"
                    className="w-5 h-5 bg-white"
                />
                <a href={`http://localhost:9626/auth/facebook`} className="text-white">Sign in with Facebook</a>
            </button>

            {/* they are asking for 99$ */}
            <AppleSignInButton />
        </div>
    )
};

export default React.memo(Loginbtns);