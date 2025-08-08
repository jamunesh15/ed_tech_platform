import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Rendersteps from './Rendersteps'
import { AiFillThunderbolt } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { setStep } from '../../../redux/courseSlice';

const Addcourse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Reset to step 1 when component mounts to ensure we start with Course Information
  useEffect(() => {
    dispatch(setStep(1))
  }, [dispatch])

  return (
    <div className='w-full bg-richblack-900 min-h-screen'>
      {/* Header Section */}
      <div className='text-richblack-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-2xl sm:text-3xl lg:text-4xl font-semibold p-4 sm:p-5 lg:p-6'>
        <span className='flex-shrink-0'>Add Course</span> 
        
        <div className="relative group inline-block">
          <button
            className="bg-yellow-50 text-richblack-900 px-4 py-2 sm:px-6 sm:py-2 text-base sm:text-lg lg:text-xl font-bold rounded-lg hover:scale-95 hover:bg-yellow-100 transition-all duration-200 flex items-center shadow-sm w-full sm:w-auto justify-center"  
            onClick={() => navigate("/dashboard/my-courses")}
          > 
            My courses 
          </button>
          {/* Tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 opacity-0 group-hover:opacity-100 bg-yellow-300 text-richblack-900 text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 rounded-lg border-[1px] border-yellow-100 whitespace-nowrap transition-all duration-200 shadow-xl z-50">
            <p className="font-semibold">See all courses created by you</p>
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-300 border-l border-t border-yellow-100 transform -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col xl:flex-row gap-6 lg:gap-8'>
            
            {/* Rendersteps Section */}
            <div className='w-full xl:w-3/5 2xl:w-2/3'>   
              <Rendersteps  />
            </div>  

            {/* Course Upload Tips Section */}
            <div className='w-full xl:w-2/5 2xl:w-1/3'>
              <div className='text-richblack-5 border-richblack-600 border-[1px] bg-richblack-800 rounded-lg lg:rounded-[20px] p-4 sm:p-5 lg:p-6 shadow-lg sticky top-4'>
                
                <h1 className='mb-4 lg:mb-6 text-xl sm:text-2xl lg:text-3xl font-semibold text-center lg:text-left'>
                  ⚡Course Upload Tips
                </h1>
                
                <div className='space-y-3 sm:space-y-4 text-sm sm:text-base text-richblack-50'>
                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Set the Course Price option or make it free.</span> 
                  </div>
                  
                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Standard size for the course thumbnail is 1024x576.</span> 
                  </div>

                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Video section controls the course overview video.</span> 
                  </div>

                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Course Builder is where you create & organize a course.</span> 
                  </div>

                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</span> 
                  </div>

                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Information from the Additional Data section shows up on the course single page.</span> 
                  </div>

                  <div className='flex gap-2 sm:gap-3'>
                    <span className='text-pink-200 flex-shrink-0 mt-0.5'>*</span>
                    <span>Make Announcements to notify any important notes to all enrolled students at once.</span> 
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Addcourse