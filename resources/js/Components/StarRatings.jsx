const StarRating = ({ rating }) => {
    const maxStars = 5;

    // Ensure the rating is within the valid range (0 to maxStars)
    const clampedRating = Math.max(0, Math.min(rating, maxStars));

    // Create an array with the length of clampedRating
    // Map through it and render filled stars
    const stars = Array.from({ length: clampedRating }, (_, index) => (
        <span key={index} className="filled">
      ★
    </span>
    ));

    return <div>{stars}</div>;
};

export default StarRating;
