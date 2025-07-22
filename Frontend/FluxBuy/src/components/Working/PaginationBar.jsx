import React, { useState } from 'react';

const Pagination = ({ totalPages = 6 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrev = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white rounded-full px-4 py-2 flex justify-center items-center space-x-2 shadow-md w-[25rem] mx-auto mt-4 mb-3">
            <button
                onClick={handlePrev}
                className="text-gray-600 font-bold text-sm cursor-pointer disabled:opacity-30"
                disabled={currentPage === 1}
            >
                &lt; Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`w-8 h-8 rounded-full text-sm font-medium ${isActive
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={handleNext}
                className="text-gray-600 font-bold cursor-pointer text-sm disabled:opacity-30"
                disabled={currentPage === totalPages}
            >
                Next &gt;
            </button>
        </div>
    );
};

export default Pagination;
