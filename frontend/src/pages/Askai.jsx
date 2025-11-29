import { portinstance } from 'axiosinstance/portinstance';
import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { debounce } from 'lodash';
import Aiinput from 'components/askaicom/Aiinput';
import Airesponse from 'components/askaicom/Airesponse';
import Suggestedprompts from 'components/askaicom/Suggestedprompts';
import { useLocation } from 'react-router';


// use gpt-oss-20b paramter model in this react app with hostep api in hugging face
// add: guide to prompt enginerring 

export default function Askai() {

    const [querry, setquerry] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const [answer, setAnswer] = useState("");
    const [isFocused, setFocus] = useState(false);

    const fromLocate = useLocation();
    console.log(fromLocate.state)

    const handlequeries = (e) => {
        const userquerry = e.target.value;

        userquerry ? setFocus(false) : setFocus(true)

        if (userquerry.length > 60) {
            alert('please keep your question less than 30 ch')
            const lastWord = querry.charAt(querry.length - 1);
            lastWord.slice(lastWord)
        };
        setquerry(userquerry);
    };

    // const deferedQuery = useDeferredValue(querry);

    const debouncedQuerry = useMemo(
        () =>
            debounce((val) => {
                setDebouncedValue(val);
            }, 100),
        [answer]
    );

    const askaiapi = async () => {
        const res = await portinstance.post("/ai/askai", { querry });
        setAnswer(res.data.aians.content);
    };

    useEffect(() => {
        debouncedQuerry(querry);
        return () => debouncedQuerry.cancel();
    }, [querry, debouncedQuerry]);

    const callttsapi = async (id) => {
        const openaiRes = await portinstance.post('ai/texttospeech');
        return openaiRes;
    };

    const handlefocus = () => {
        setFocus(true);
    };

    const handleblur = () => {
        setFocus(false)
    }


    // use locaiton to know that which page or which lined clickd by user to improve suggestion with ready-pronpt   
    return (
        <main>
            <Aiinput
                querry={querry}
                handlequeries={handlequeries}
                ask={askaiapi}
                whenblur={handleblur}
                whenfocus={handlefocus}
            />

            {
                isFocused &&
                <Suggestedprompts onfocus={isFocused} />
            }

            {/*showing animation like ais*/}
            {
                answer &&
                <Airesponse
                    ans={answer}
                    ttsapi={callttsapi}
                />
            }
        </main>
    );
};