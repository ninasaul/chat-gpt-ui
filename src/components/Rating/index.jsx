import React, { useState } from "react";
import "./style.less"

export const Rating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (ratingValue) => {
    const newRating =
      ratingValue === hoverRating ? ratingValue - 0.5 : ratingValue;
    onRatingChange && onRatingChange(newRating);
  };

  const starColor = (ratingValue) => {
    if (hoverRating >= ratingValue) {
      return "#ffc107";
    } else if (!hoverRating && rating >= ratingValue) {
      return "#ffc107";
    } else {
      return "#e4e5e9";
    }
  };

  const stars = [1, 2, 3, 4, 5].map((star) => {
    const isHalf = hoverRating === star - 0.5;
    return (
      <span
        key={star}
        style={{
          color: starColor(star),
          cursor: "pointer",
          fontSize: "25px"
        }}
        onMouseEnter={() => handleMouseEnter(star)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(star)}
      >
        {isHalf ? "★" : "☆"}
      </span>
    );
  });

  return <div>{stars}</div>;
};

Rating.defautProps = {
  rating: 2,
}