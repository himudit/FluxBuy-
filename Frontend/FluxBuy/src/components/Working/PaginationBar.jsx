// import React from 'react';

// const Pagination = ({ currentPage, totalPages = 17, onPageChange }) => {
//     const handlePrev = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             onPageChange(currentPage + 1);
//         }
//     };

//     return (
//         <div className="bg-white rounded-full px-4 py-2 flex justify-center items-center space-x-2 shadow-md w-[45rem] mx-auto mt-4 mb-3">
//             <button
//                 onClick={handlePrev}
//                 className="text-gray-600 font-bold text-sm cursor-pointer disabled:opacity-30"
//                 disabled={currentPage === 1}
//             >
//                 &lt; Prev
//             </button>

//             {[...Array(totalPages)].map((_, index) => {
//                 const page = index + 1;
//                 const isActive = page === currentPage;

//                 return (
//                     <button
//                         key={page}
//                         onClick={() => onPageChange(page)}
//                         className={`w-8 h-8 rounded-full cursor-pointer text-sm font-medium ${isActive
//                             ? 'bg-black text-white'
//                             : 'text-gray-700 hover:bg-gray-200'
//                             }`}
//                     >
//                         {page}
//                     </button>
//                 );
//             })}

//             <button
//                 onClick={handleNext}
//                 className="text-gray-600 font-bold cursor-pointer text-sm disabled:opacity-30"
//                 disabled={currentPage === totalPages}
//             >
//                 Next &gt;
//             </button>
//         </div>
//     );
// };

// export default Pagination;

import React from "react";

const Pagination = ({ currentPage, totalPages = 17, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const getVisiblePages = () => {
        const width = window.innerWidth;
        const maxButtons = width < 768 ? 5 : 9; // 🟢 Responsive: 5 pages on mobile, 9 on desktop
        const half = Math.floor(maxButtons / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        // Adjust range if near start or end
        if (end - start + 1 < maxButtons) {
            if (start === 1) {
                end = Math.min(totalPages, start + maxButtons - 1);
            } else if (end === totalPages) {
                start = Math.max(1, end - maxButtons + 1);
            }
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="bg-white rounded-full px-4 py-2 flex justify-center items-center space-x-2 shadow-md w-full mx-auto mt-4 mb-3 overflow-x-auto">
            <button
                onClick={handlePrev}
                className="text-gray-600 font-bold text-sm cursor-pointer disabled:opacity-30"
                disabled={currentPage === 1}
            >
                &lt; Prev
            </button>

            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded-full text-sm font-medium ${page === currentPage
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                className="text-gray-600 font-bold text-sm cursor-pointer disabled:opacity-30"
                disabled={currentPage === totalPages}
            >
                Next &gt;
            </button>
        </div>
    );
};

export default Pagination;
