
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Courseslider = ({ courses, heading }) => {
  const [filter, setFilter] = useState('popular'); // 'popular' or 'new'
  
  const filteredCourses = courses?.length ? [...courses].sort((a, b) => {
    if (filter === 'popular') {
      // Sort by rating and number of reviews
      const aRating = a.ratingAndReviews?.length 
        ? (a.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0) / a.ratingAndReviews.length)
        : 0;
      const bRating = b.ratingAndReviews?.length 
        ? (b.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0) / b.ratingAndReviews.length)
        : 0;
      return bRating - aRating;
    } else {
      // Sort by date (assuming there's a createdAt field, fallback to sorting by id)
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  }) : [];
  return (
    <div className="text-white px-4">
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: rgb(156 163 175); /* gray-400 */
            opacity: 0.7;
          }
          .swiper-pagination-bullet-active {
            background-color: rgb(250 204 21); /* yellow-400 */
            opacity: 1;
          }
        `}
      </style>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-richblack-5">
            {heading}
          </h2>
        )}
        <div className="flex gap-4">
          <button 
            onClick={() => setFilter('popular')}
            className={`font-medium px-6 py-3 rounded-lg border transition-all duration-200 ${
              filter === 'popular'
                ? 'text-richblack-900 bg-yellow-50 border-yellow-50'
                : 'text-yellow-50 border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900'
            }`}>
            Most Popular
          </button>
          <button 
            onClick={() => setFilter('new')}
            className={`font-medium px-6 py-3 rounded-lg border transition-all duration-200 ${
              filter === 'new'
                ? 'text-richblack-900 bg-yellow-50 border-yellow-50'
                : 'text-richblack-300 border-richblack-700 hover:border-yellow-50 hover:text-yellow-50'
            }`}>
            New
          </button>
        </div>
      </div>

      {courses?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={courses.length > 3}
          navigation={false}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="max-w-7xl mx-auto py-10 relative group"
        >
          {filteredCourses.map((course, index) => (
            <SwiperSlide key={index}>
              <Link to={`/course/${course._id}`} className="block">
                <div className="bg-richblack-800 rounded-xl overflow-hidden group/card hover:bg-richblack-700 transition-all duration-300">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={course.thumbnail || 'https://via.placeholder.com/300x200'}
                      alt={course.courseName || 'Course'}
                      className="h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300  " />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-100 group-hover/card:text-yellow-400 transition-colors duration-200 line-clamp-2">
                      {course.courseName || 'Untitled Course'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      By {course.instructor?.firstname || 'Unknown'} {course.instructor?.lastname || ''}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-semibold">
                        {course.ratingAndReviews?.length
                          ? (course.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                              course.ratingAndReviews.length).toFixed(1)
                          : '0.0'}
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const rating = course.ratingAndReviews?.length
                            ? (course.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                               course.ratingAndReviews.length)
                            : 0;
                          return (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        })}
                      </div>
                      <span className="text-sm text-gray-400">
                        ({course.ratingAndReviews?.length || 0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-lg font-semibold text-gray-100">
                        ₹{course.price || 'N/A'}
                      </p>
                      <button className="text-yellow-400 font-medium text-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 hover:text-yellow-300">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
          <p className="text-2xl font-semibold text-gray-100 mb-4">No Courses Found</p>
          <p className="text-gray-400 text-base">Check back later for new courses</p>
        </div>
      )}
    </div>
  );
};

export default Courseslider;