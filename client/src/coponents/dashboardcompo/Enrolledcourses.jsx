import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../Services/operations/ProfileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';


const Enrolledcourses = () => {

  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth)

  const [enrolledcourse , setenrolledcourse] = useState(null)


  const coursedetails = async()=>{
 try {
    const response = await getUserEnrolledCourses(token)
    console.log("Enrolled courses response:", response)
    console.log("First course data:", response?.[0])
    setenrolledcourse(response)
 } catch (error) {
     console.log("ERROR WHILE FETCHING ENROLLED COURSE DETAILS:" , error);
 }
  }





  useEffect(()=>{
   
coursedetails();
  } , [] )

  return (
    <div className='bg-richblack-900 w-full text-white'>
      <div className='mb-8'>
        <h1 className='font-semibold text-3xl text-richblack-5 mb-2'>Enrolled Courses</h1>
        <div className='flex gap-4 mt-6'>
          <button className='px-4 py-2 bg-yellow-50 text-richblack-900 rounded-md text-sm font-medium'>
            All
          </button>
          <button className='px-4 py-2 bg-richblack-800 text-richblack-300 rounded-md text-sm font-medium hover:bg-richblack-700'>
              Pending
            </button>
            <button className='px-4 py-2 bg-richblack-800 text-richblack-300 rounded-md text-sm font-medium hover:bg-richblack-700'>
              Completed
            </button>
          </div>
        </div>

        {!enrolledcourse ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-lg text-richblack-300'>Loading...</div>
          </div>
        ) : !enrolledcourse.length ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-center'>
              <div className='text-lg text-richblack-300 mb-2'>You have not enrolled in any course</div>
              <div className='text-sm text-richblack-400'>Start exploring our courses to begin your learning journey</div>
            </div>
          </div>
        ) : (
          <div>
            {/* Table Header */}
            <div className='grid grid-cols-12 gap-4 p-4 bg-richblack-800 rounded-t-lg border-b border-richblack-700'>
              <div className='col-span-6 text-sm font-medium text-richblack-100'>Course Name</div>
              <div className='col-span-3 text-sm font-medium text-richblack-100 text-center'>Duration</div>
              <div className='col-span-3 text-sm font-medium text-richblack-100 text-center'>Progress</div>
            </div>

            {/* Course List */}
            <div className='bg-richblack-900 rounded-b-lg'>
              {enrolledcourse.map((course, index) => (
                <div 
                  key={index} 
                  className='grid grid-cols-12 gap-4 p-4 border-b border-richblack-700 last:border-b-0 hover:bg-richblack-700 transition-colors'
                >
                  {/* Course Info */}
                  <div className='col-span-6 flex gap-4 items-center cursor-pointer'
                      onClick={() => {
                        // Check if we have the required data
                        if (!course?.courseContent?.[0]?._id || !course?.courseContent?.[0]?.Subsection?.[0]?._id) {
                          navigate(`/view-lecture/${course?._id}`);
                        } else {
                          const sectionId = course.courseContent[0]._id;
                          const subsectionId = course.courseContent[0].Subsection[0]._id;
                          navigate(`/view-lecture/${course._id}/section/${sectionId}/sub-section/${subsectionId}`);
                        }
                      }}
                  >
                  
                    <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
                      <img 
                        src={course.thumbnail} 
                        alt={course.courseName}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <h3 className='text-richblack-5 font-medium text-sm'>
                        {course.courseName}
                      </h3>
                      <p className='text-richblack-300 text-xs line-clamp-2'>
                        {course.coursedescription}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className='col-span-3 flex items-center justify-center'>
                    <span className='text-richblack-200 text-sm'>
                      {course.courseDuration || 'N/A'}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className='col-span-3 flex items-center justify-center'>
                    <div className='w-full max-w-[120px]'>
                      <div className='flex items-center justify-between mb-1'>
                        <span className='text-xs text-richblack-300'>
                          {course.completedLectures || 0}/{course.totalLectures || 0}
                        </span>
                        <span className='text-xs text-richblack-300'>
                          {course.progressPercentage || 0}%
                        </span>
                      </div>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height='6px'
                        isLabelVisible={false}
                        bgColor={course.progressPercentage === 100 ? '#22c55e' : '#fbbf24'}
                        baseBgColor='#374151'
                        borderRadius='3px'
                      />
                      {course.progressPercentage === 100 && (
                        <div className='text-xs text-green-400 mt-1 text-center'>✓ Completed</div>
                      )}
                      {course.progressPercentage > 0 && course.progressPercentage < 100 && (
                        <div className='text-xs text-yellow-400 mt-1 text-center'>In Progress</div>
                      )}
                      {course.progressPercentage === 0 && (
                        <div className='text-xs text-richblack-400 mt-1 text-center'>Not Started</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  )
}

export default Enrolledcourses
