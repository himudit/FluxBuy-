import React from 'react'
import { Spotlight } from '../UI/Spotlight'
import Navbar from './Navbar'
import TodaySales from './TodaySales'
import BrowseCategory from './BrowseCategory'
import ImageCorousel from './ImageCorousel'

const Home = () => {
    return (
        <>
            <section className="relative flex items-center justify-center h-[80vh] bg-black overflow-hidden">
                {/* <Navbar /> */}
                <Spotlight fill="#ffffff" />
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Welcome to FluxBuy</h1>
                    <p className="text-xl">Your futuristic eCommerce experience</p>
                </div>

            </section>
            <TodaySales />
            <div className='mt-10'>
                <BrowseCategory />
            </div>
            <div className='mt-20'>
                <ImageCorousel />
            </div>

        </>
    )
}

export default Home