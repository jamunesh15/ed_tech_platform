


import React, { useEffect, useState } from 'react'
import { apiconnector } from '../../Services/apiconnector';
import { ratingsEndpoints } from '../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Reviewandratingslider = () => {

const [review, setreview] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const {user} = useSelector((state)=>state.auth)
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=>{
   
   const getreviews = async()=>{
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching reviews from:", ratingsEndpoints.REVIEWS_DETAILS_API);
      
      const response = await apiconnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
      
      console.log("Reviews API Response:", response);
      
      if (response?.data?.success) {
        const reviewsData = response?.data?.data;
        console.log("Reviews data:", reviewsData);
        
        if (reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0) {
          setreview(reviewsData);
        } else {
          console.log("No reviews found in response");
          setreview([]);
        }
      } else {
        console.error("API response not successful:", response?.data?.message);
        setError("Failed to fetch reviews");
        setreview([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Error loading reviews");
      setreview([]);
    } finally {
      setLoading(false);
    }
   }
   
   getreviews();

}, [])
   
  return (
    <div className='flex flex-col w-full
      mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-32'>

      {/* Heading */}
      <div className='text-richblack-100 font-bold 
        text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
        text-center 
        mb-6 sm:mb-8 md:mb-10 lg:mb-12
        px-4'>
        Reviews From Other Learners
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center 
          h-32 sm:h-36 md:h-40">
          <div className="animate-spin rounded-full 
            h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12
            border-b-2 border-yellow-100"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 
          text-sm sm:text-base md:text-lg
          mb-6 px-4">
          {error}
        </div>
      )}

      {/* No Reviews State */}
      {!loading && !error && review.length === 0 && (
        <div className="text-center text-richblack-300 
          text-sm sm:text-base md:text-lg
          mb-6 px-4">
          No reviews available yet. Be the first to leave a review!
        </div>
      )}

      {/* Reviews Slider */}
      {!loading && !error && review.length > 0 && (
        <div className='w-full overflow-hidden'>

          <Swiper 
            slidesPerView={1.2}
            spaceBetween={12}
            centeredSlides={false}
            loop={review.length > 2}
            freeMode={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              // Small phones
              320: {
                slidesPerView: 1.1,
                spaceBetween: 12,
              },
              // Large phones
              375: {
                slidesPerView: 1.2,
                spaceBetween: 14,
              },
              // Small tablets
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              // Tablets
              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              // Large tablets
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              // Small laptops
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              // Large laptops
              1200: {
                slidesPerView: 3.5,
                spaceBetween: 28,
              },
              // Desktops
              1400: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="reviewSwiper !overflow-visible"
            style={{ 
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          >

            {review.map((data, index) => {
              return (
                <SwiperSlide key={data?._id || index}>
                  <div className='bg-richblack-800 rounded-xl 
                    w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]
                    p-4 sm:p-5 md:p-6
                    flex flex-col gap-3 sm:gap-4
                    min-h-[220px] sm:min-h-[240px] md:min-h-[260px]
                    shadow-lg hover:shadow-xl transition-all duration-300
                    border border-richblack-700
                    hover:scale-[1.02] hover:border-richblack-600'>
                    
                    {/* User Info Section */}
                    <div className='flex gap-3 items-start'>
                      
                      {/* Profile Image */}
                      <div className='w-10 h-10 sm:w-12 sm:h-12 
                        rounded-full overflow-hidden bg-richblack-700 
                        flex-shrink-0 ring-2 ring-richblack-600'>
                        <img 
                          src={data?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${data?.user?.firstname} ${data?.user?.lastname}`} 
                          alt={`${data?.user?.firstname} ${data?.user?.lastname}`}
                          className='w-full h-full object-cover'
                          loading="lazy"
                        />
                      </div>

                      {/* User Details */}
                      <div className='min-w-0 flex-1'>
                        <p className='text-richblack-5 font-semibold 
                          text-sm sm:text-base
                          line-clamp-1'> 
                          {data?.user?.firstname} {data?.user?.lastname} 
                        </p>
                        <p className='text-richblack-300 
                          text-xs sm:text-sm
                          line-clamp-1 mt-1'> 
                          {data?.course?.courseName || 'Course Student'} 
                        </p>
                      </div>
                    </div>
                    
                    {/* Review Content */}
                    <div className='flex-1 flex flex-col justify-between'>
                      <p className='text-richblack-200 leading-relaxed 
                        text-sm sm:text-base
                        line-clamp-4 sm:line-clamp-5
                        mb-3'> 
                        "{data?.review}" 
                      </p>
                      
                      {/* Rating */}
                      <div className='flex items-center justify-between mt-auto'>
                        <div className='flex text-yellow-100'>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} 
                              className={`text-lg sm:text-xl
                                ${i < data?.rating ? 'text-yellow-400' : 'text-richblack-500'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className='text-yellow-100 
                          text-sm font-medium bg-richblack-700 px-2 py-1 rounded'> 
                          {data?.rating}/5 
                        </span>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              )
            })}

          </Swiper>

        </div>
      )}

    </div>
  )
}

export default Reviewandratingslider