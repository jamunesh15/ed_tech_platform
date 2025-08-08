import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CgCloseR } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { createRating } from '../../Services/operations/courseDetailsAPI';

// Custom Star Rating Component
const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`text-2xl transition-colors ${
                        star <= (hoverRating || rating)
                            ? 'text-yellow-400'
                            : 'text-richblack-500'
                    }`}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

const Coursereviewmodal = ( { setreviewModal } ) => {
  
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const {courseEntireData} = useSelector((state)=>state.viewcourse);
    
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit, 
        formState: { errors },
        setValue
    }  = useForm();

    const onSubmit = async(data)=>{
        if (rating === 0) {
            return; // Prevent submission if no rating is selected
        }
        
        setLoading(true);
        try {
            await createRating(
                {
                    courseid: courseEntireData._id,
                    rating: rating,
                    review: data.CourseExperience
                },
                token
            );
            setreviewModal(false);
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setLoading(false);
        }
    }
  
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setValue("CourseRating", newRating);
    }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        
        {/* main modal */}
      <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
            
            {/* top bar */}
           <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'> 
            <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
            <button 
                onClick={() => setreviewModal(false)}
                className="text-richblack-300 hover:text-richblack-100 transition-colors"
            >
                 <CgCloseR className='text-2xl' />
            </button>
           </div>

           {/* body */}
           <div className='flex flex-col gap-6 p-5 bg-richblack-800 rounded-b-lg'>
                    <div className='flex items-center gap-3'>
                        <img 
                            src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstname} ${user?.lastname}`} 
                            alt={`${user?.firstname || 'User'}`}
                            className='aspect-square w-[50px] h-[50px] rounded-full object-cover' 
                        />
                        <div className='flex flex-col'>
                            <p className="font-semibold text-richblack-5">{user?.firstname} {user?.lastname}</p>
                            <p className="text-sm text-richblack-300">Posting Publicly</p>
                        </div>
                    </div>
 
                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                   
                        {/* stars */}
                        <div className="space-y-2">
                            <label className="text-sm text-richblack-5">Rating <sup className="text-pink-200">*</sup></label>
                            <StarRating 
                                rating={rating}
                                onRatingChange={handleRatingChange}
                            />
                            <input 
                                type="hidden" 
                                {...register("CourseRating", {
                                    required: "Please provide a rating",
                                    validate: () => rating > 0 || "Please provide a rating"
                                })}
                            />
                            {errors.CourseRating && (
                                <span className="inline-block text-xs text-pink-200">
                                    {errors.CourseRating.message}
                                </span>
                            )}
                            {rating === 0 && (
                                <span className="inline-block text-xs text-pink-200">
                                    Please provide a rating
                                </span>
                            )}
                        </div>

                        {/* text area */}
                        <div className="space-y-2">
                            <label htmlFor="courseExperience" className="text-sm text-richblack-5">
                                Add Your Experience <sup className="text-pink-200">*</sup>
                            </label>
                            <textarea 
                                id="courseExperience"
                                placeholder='Share details of your own experience for this course'
                                {...register("CourseExperience", {
                                    required: "Please add your experience"
                                })}
                                className='form-style resize-x-none min-h-[130px] w-full p-3 rounded-lg bg-richblack-700 border border-richblack-600 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50'
                            />
                            {errors.CourseExperience && (
                                <span className="inline-block text-xs text-pink-200">
                                    {errors.CourseExperience.message}
                                </span>
                            )}
                        </div>

                        {/* buttons */}
                        <div className='flex gap-3 justify-end'>
                            <button 
                                className='px-6 py-3 text-richblack-5 font-medium bg-richblack-600 hover:bg-richblack-700 border border-richblack-500 rounded-lg transition-all duration-200 hover:scale-95'
                                type='button'
                                onClick={() => setreviewModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button 
                                className='px-6 py-3 text-richblack-900 font-medium bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-all duration-200 hover:scale-95 flex items-center gap-2'
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-richblack-900 border-t-transparent"></div>
                                        Saving...
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>

                    </form>
           </div>

      </div>

    </div>
  )
}

export default Coursereviewmodal