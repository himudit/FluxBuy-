import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 space-y-2 w-full">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex gap-1 text-yellow-400 text-sm">
                    {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>
                <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
            </div>

            {/* Reviewer Name */}
            <h3 className="font-semibold text-md">{review.reviewerName}</h3>
            <p className="text-sm text-gray-500">{review.reviewerEmail}</p>

            {/* Comment */}
            <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>

            {/* Dummy Likes/Dislikes (optional, for now) */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>12</span>
                </div>
                <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    <span>0</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
