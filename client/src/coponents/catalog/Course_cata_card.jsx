

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../common/RatingStars';
import GetAvgRating from '../../utils/avgRating';

const Course_cata_card = ({ course }) => {
  const [avgRatingCount, setAvgRatingCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgRatingCount(count);
  }, [course]);

  return (
    <Link to={`/course/${course?._id || '#'}`} className="block group">
      <div className="flex flex-col h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:-translate-y-2 transition-all duration-300">
        <div className="relative aspect-[16/9]">
          <img
            src={course?.thumbnail || 'https://via.placeholder.com/300x200'}
            alt={course?.courseName || 'Course'}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow space-y-3">
          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
            {course?.courseName || 'Untitled Course'}
          </h3>
          <p className="text-sm text-gray-400">
            By {course?.instructor?.firstname || 'Unknown'} {course?.instructor?.lastname || ''}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 font-semibold">{avgRatingCount || 0}</span>
            <RatingStars Review_Count={avgRatingCount} />
            <span className="text-sm text-gray-400">
              ({course?.ratingAndReviews?.length || 0} Ratings)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course_cata_card;