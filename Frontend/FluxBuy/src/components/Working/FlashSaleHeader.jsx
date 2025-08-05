import React, { useEffect, useState } from 'react';

const FlashSaleHeader = () => {
    // Set your fixed sale end time here (e.g., 3 days from now)
    const saleEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = saleEndTime - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000); // update every second

        return () => clearInterval(interval);
    }, []);

    const formatTime = (value) => String(value).padStart(2, '0');

    return (
        <div className="flex justify-between items-center mb-4 flex-wrap">
            <h2 className="text-3xl font-bold">Flash Sales</h2>

            <div className="flex ml-6 items-center gap-4 text-center text-xs font-medium bg-gray-100 px-4 py-2 rounded-lg mt-2 sm:mt-0">
                <p className="text-gray-600">Ends In</p>

                <div>
                    <p className="text-black text-lg font-bold">{formatTime(timeLeft.days)}</p>
                    <p className="text-gray-500">Days</p>
                </div>

                <span>:</span>

                <div>
                    <p className="text-black text-lg font-bold">{formatTime(timeLeft.hours)}</p>
                    <p className="text-gray-500">Hours</p>
                </div>

                <span>:</span>

                <div>
                    <p className="text-black text-lg font-bold">{formatTime(timeLeft.minutes)}</p>
                    <p className="text-gray-500">Minutes</p>
                </div>

                <span>:</span>

                <div>
                    <p className="text-black text-lg font-bold">{formatTime(timeLeft.seconds)}</p>
                    <p className="text-gray-500">Seconds</p>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleHeader;
