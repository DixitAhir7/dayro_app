import React from 'react';

export default function IsCatogory({ isData, getData,isFilled }) {

    return (
        <div className="flex mt-4">
            <span>can't see artists here?</span>
            <button
                aria-disabled={isFilled}
                className='ml-3 bg-white text-black p-0'
                onClick={getData}>
                refetch
            </button>
        </div>
    )
};

{/* <Activity mode="hidden">
                <IsCatogory
                    getData={() => useArtisthook.getall()}
                    isData={useArtisthook.ifnoData}
                />
</Activity> */}