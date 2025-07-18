import { AiFillStar, AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center text-yellow-400 text-sm">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
                <AiFillStar key={`full-${i}`} />
            ))}

            {/* Half Star */}
            {hasHalfStar && <AiTwotoneStar key="half" />}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <AiOutlineStar key={`empty-${i}`} />
            ))}

            <span className="text-gray-500 text-xs ml-1">({rating.toFixed(2)})</span>
        </div>
    );
};

export default StarRating;
