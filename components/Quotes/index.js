import React from 'react'
import { Container } from '..'

import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
import userInfo from "../../data/usersInfo.json"


function Quote() {
    return (
        <div className="w-full h-auto bg-blue-10 py-20 px-4 md:px-[10%]">
            <Container>
                <div className="head mx-auto flex flex-col items-center justify-center text-center mb-10 md:items-center md:justify-start md:flex-row md:px-0">
                    <h1 data-aos="fade-right" className="text-3xl md:text-4xl font-extrabold mb-2.5 md:mb-0 md:mr-[50px]">Favorite Quote</h1>
                    <p data-aos="fade-left" className="text-sm md:text-base text-white-200 ">My favorite motivational quote.</p>
                </div>
                <div id="quote-cont" className='w-full h-auto relative'>
                    <QuoteCard />
                </div>
            </Container>
        </div>
    )
}

export default Quote

function QuoteCard() {

    return (
        <div id="t-box" className='relative w-full h-auto space-2 bg-white p-6 md:px-12 md:py-10 rounded-lg overflow-hidden'>
            <FaQuoteRight data-aos="fade-left" className='absolute top-[20px] right-[25px] text-2xl md:text-[35px] text-slate-300 opacity-[.3]' />
            <div id="ratings" className="w-full flex flex-row items-center justify-start">
                <StarRatings count={10} size={10} />
                <small className='ml-2 text-slate-500 font-bold'>{userInfo.github_username.charAt(0).toUpperCase() + userInfo.github_username.slice(1)}</small>
            </div>
            <div id="body" className="w-full flex flex-row items-start justify-start mt-4 md:mt-8">
                <p data-aos="zoom-in-up" className="text-sm md:text-base">
                    {userInfo.favorites_quote}
                </p>
            </div>
        </div>
    )
}

function StarRatings({ count = 1, size = 3 }) {

    return (
        <>
            {
                Array(count).fill(count).map((i) => {
                    return (
                        <FaStar key={i} className={`text-blue-100 text-[${size}px] `} />
                    )
                })

            }
            <small className="ml-2 text-white-200">{count}.0</small>
        </>
    )
}