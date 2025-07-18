import React from 'react';
import ReviewCard from './ReviewCard';

const reviews = [
    {
        rating: 4,
        comment: "Excellent quality!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Aaliyah Hanson",
        reviewerEmail: "aaliyah.hanson@x.dummyjson.com"
    },
    {
        rating: 4,
        comment: "Excellent quality!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Liam Smith",
        reviewerEmail: "liam.smith@x.dummyjson.com"
    },
    {
        rating: 4,
        comment: "Highly recommended!",
        date: "2025-04-30T09:41:02.053Z",
        reviewerName: "Avery Barnes",
        reviewerEmail: "avery.barnes@x.dummyjson.com"
    }
];

const ReviewSection = () => {
    return (
        <section className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Customer Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
