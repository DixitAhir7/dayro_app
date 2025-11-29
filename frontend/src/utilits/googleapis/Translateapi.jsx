import { useEffect } from 'react';

function GoogleTranslate() {
    useEffect(() => {
        // Define the callback globally, and the function name MUST match the one in script URL
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,gu,hi',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        // Optional: cleanup
        return () => {
            document.body.removeChild(script);
            delete window.googleTranslateElementInit;
        };
    }, []);
    
    return (
        <main>
            <div className='w-100' id="google_translate_element">

            </div>
        </main>
    )
}

export default GoogleTranslate;