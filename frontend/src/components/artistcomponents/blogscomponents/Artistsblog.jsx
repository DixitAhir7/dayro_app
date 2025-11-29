import React from 'react'
import dayjs from 'dayjs';

// all artists's blog could display to kalakar individual
export default function Artistsblog({ name }) {
    const blogAddTime = dayjs().format();

    return (
        <>
            <div className="blogs ml-5">
                <h1>{name}'s blogs</h1>
                <div className="blogscontent">
                    <p>hello i am joining dayro app let's see how it goes {blogAddTime}</p>
                </div>
            </div>
        </>
    )
};