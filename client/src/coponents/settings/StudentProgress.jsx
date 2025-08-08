import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StudentProgressChart from './StudentProgressChart'
import { getUserEnrolledCourses } from '../../Services/operations/ProfileAPI'

const StudentProgress = () => {
  const [loading, setLoading] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true)
      try {
        const result = await getUserEnrolledCourses(token)
        if (result) {
          setEnrolledCourses(result)
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error)
      }
      setLoading(false)
    }

    if (token) {
      fetchEnrolledCourses()
    }
  }, [token])

  // Calculate overall progress statistics
  const totalCourses = enrolledCourses?.length || 0
  const completedCourses = enrolledCourses?.filter(course => 
    course.progressPercentage === 100
  ).length || 0
  
  // Debug: Log the course data to see structure
  console.log("Enrolled Courses Data:", enrolledCourses)
  
  const totalVideos = enrolledCourses?.reduce((total, course) => {
    console.log("Course:", course.courseName, "Total Lectures:", course.totalLectures)
    return total + (course.totalLectures || 0)
  }, 0) || 0
  
  const completedVideos = enrolledCourses?.reduce((total, course) => {
    // Use actual completed lectures from API, but cap it at progress percentage calculation
    const totalLectures = course.totalLectures || 0
    const progress = course.progressPercentage || 0
    const calculatedCompleted = Math.round((progress / 100) * totalLectures)
    console.log("Course:", course.courseName, "Calculated Completed:", calculatedCompleted, "Progress:", progress)
    return total + calculatedCompleted
  }, 0) || 0

  const overallProgress = enrolledCourses?.length > 0 
    ? Math.round(enrolledCourses.reduce((total, course) => total + (course.progressPercentage || 0), 0) / enrolledCourses.length)
    : 0

  return (
    <div className='text-white'>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-50"></div>
        </div>
      )}
      
      {!loading && (
        <div className='space-y-8'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-richblack-800 to-richblack-700 p-8 rounded-2xl border border-richblack-600 shadow-xl'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-yellow-25 mb-2'>
                  📚 <span className='text-caribbeangreen-200'>Welcome back,</span> {user?.firstname}!
                </h1>
                <p className='text-richblack-300 text-lg'>Track your learning journey and progress</p>
              </div>
              <div className='hidden md:flex items-center space-x-4'>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-yellow-50'>{totalCourses}</p>
                  <p className='text-richblack-300 text-sm'>Enrolled Courses</p>
                </div>
                <div className='w-px h-12 bg-richblack-600'></div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-caribbeangreen-200'>{completedCourses}</p>
                  <p className='text-richblack-300 text-sm'>Completed</p>
                </div>
                <div className='w-px h-12 bg-richblack-600'></div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-blue-200'>{overallProgress}%</p>
                  <p className='text-richblack-300 text-sm'>Overall Progress</p>
                </div>
              </div>
            </div>
            
            {/* Mobile Stats */}
            <div className='md:hidden grid grid-cols-3 gap-4 mt-6'>
              <div className='text-center'>
                <p className='text-xl font-bold text-yellow-50'>{totalCourses}</p>
                <p className='text-richblack-300 text-xs'>Courses</p>
              </div>
              <div className='text-center'>
                <p className='text-xl font-bold text-caribbeangreen-200'>{completedCourses}</p>
                <p className='text-richblack-300 text-xs'>Completed</p>
              </div>
              <div className='text-center'>
                <p className='text-xl font-bold text-blue-200'>{overallProgress}%</p>
                <p className='text-richblack-300 text-xs'>Progress</p>
              </div>
            </div>
          </div>

          {/* Progress Overview Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-richblack-300 text-sm font-medium'>Total Videos</p>
                  <p className='text-3xl font-bold text-richblack-5 mt-1'>{totalVideos}</p>
                </div>
                <div className='w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                  <span className='text-purple-400 text-2xl'>🎥</span>
                </div>
              </div>
            </div>

            <div className='bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-richblack-300 text-sm font-medium'>Videos Watched</p>
                  <p className='text-3xl font-bold text-richblack-5 mt-1'>{completedVideos}</p>
                </div>
                <div className='w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                  <span className='text-green-400 text-2xl'>✅</span>
                </div>
              </div>
            </div>

            <div className='bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-richblack-300 text-sm font-medium'>Remaining</p>
                  <p className='text-3xl font-bold text-richblack-5 mt-1'>{totalVideos - completedVideos}</p>
                </div>
                <div className='w-12 h-12 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                  <span className='text-orange-400 text-2xl'>⏳</span>
                </div>
              </div>
            </div>

            <div className='bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-richblack-300 text-sm font-medium'>Avg Progress</p>
                  <p className='text-3xl font-bold text-richblack-5 mt-1'>{overallProgress}%</p>
                </div>
                <div className='w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                  <span className='text-blue-400 text-2xl'>📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Course Progress */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Chart Section */}
            <div className='lg:col-span-2'>
              <StudentProgressChart courses={enrolledCourses} />
            </div>
            
            {/* Quick Course List */}
            <div className='space-y-6'>
              <div className='bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-lg'>
                <h2 className='text-xl font-semibold text-richblack-5 mb-6 flex items-center'>
                  <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
                  Recent Courses
                </h2>
                
                <div className='space-y-4'>
                  {enrolledCourses?.slice(0, 3).map((course) => {
                    const progress = course.progressPercentage || 0
                    const totalSections = course.totalLectures || 0
                    const completedSections = Math.round((progress / 100) * totalSections)
                    
                    return (
                      <div key={course._id} className='p-4 bg-richblack-700 rounded-xl border border-richblack-600'>
                        <div className='flex items-center mb-3'>
                          <img
                            src={course.thumbnail}
                            alt={course.courseName}
                            className='w-12 h-12 rounded-lg object-cover mr-3'
                          />
                          <div className='flex-1'>
                            <h3 className='text-richblack-5 font-semibold text-sm line-clamp-1'>{course.courseName}</h3>
                            <p className='text-richblack-300 text-xs'>{completedSections}/{totalSections} lessons</p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className='mb-2'>
                          <div className='flex justify-between items-center mb-1'>
                            <span className='text-richblack-300 text-xs'>Progress</span>
                            <span className='text-richblack-5 text-xs font-semibold'>{progress}%</span>
                          </div>
                          <div className='w-full bg-richblack-600 rounded-full h-2 border border-richblack-500'>
                            <div 
                              className='bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300 shadow-sm'
                              style={{ 
                                width: `${Math.max(progress, 2)}%`,
                                minWidth: progress > 0 ? '6px' : '0px'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Course Progress */}
          {enrolledCourses && enrolledCourses.length > 0 && (
            <div className='bg-richblack-800 rounded-2xl border border-richblack-700 shadow-lg overflow-hidden'>
              <div className='p-6 bg-gradient-to-r from-richblack-700 to-richblack-800 border-b border-richblack-600'>
                <h2 className='text-2xl font-bold text-richblack-5 flex items-center'>
                  <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
                  All Enrolled Courses
                </h2>
                <p className='text-richblack-300 mt-2'>Detailed progress for all your courses</p>
              </div>

              <div className='p-6'>
                <div className='space-y-4'>
                  {enrolledCourses.map((course) => {
                    const progress = course.progressPercentage || 0
                    const totalSections = course.totalLectures || 0
                    const completedSections = Math.round((progress / 100) * totalSections)
                    
                    // Debug log for progress bars
                    console.log("Course progress bar debug:", {
                      courseName: course.courseName,
                      progressPercentage: course.progressPercentage,
                      calculatedProgress: progress,
                      totalLectures: course.totalLectures,
                      completedSections
                    });
                    
                    return (
                      <div key={course._id} className='p-6 bg-richblack-700 rounded-xl border border-richblack-600 hover:border-richblack-500 transition-all duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex items-center'>
                            <img
                              src={course.thumbnail}
                              alt={course.courseName}
                              className='w-16 h-16 rounded-lg object-cover mr-4'
                            />
                            <div>
                              <h3 className='text-richblack-5 font-semibold text-lg'>{course.courseName}</h3>
                              <p className='text-richblack-300 text-sm'>{course.courseDescription?.slice(0, 100)}...</p>
                              <p className='text-richblack-400 text-xs mt-1'>
                                {completedSections} of {totalSections} lessons completed
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div className='text-2xl font-bold text-richblack-5'>{progress}%</div>
                            <div className='text-sm text-richblack-300'>Complete</div>
                          </div>
                        </div>
                        
                        {/* Detailed Progress Bar */}
                        <div className='mb-4'>
                          <div className='flex justify-between items-center mb-2'>
                            <span className='text-richblack-300 text-sm'>Progress</span>
                            <span className='text-richblack-5 text-sm font-semibold'>{progress}%</span>
                          </div>
                          <div className='w-full bg-richblack-600 rounded-full h-3 border border-richblack-500'>
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 shadow-sm ${
                                progress === 100 
                                  ? 'bg-yellow-100' 
                                  : progress >= 75 
                                  ? 'bg-yellow-50'
                                  : progress >= 50 
                                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                                  : progress > 0
                                  ? 'bg-yellow-50'
                                  : 'bg-yellow-50'
                              }`}
                              style={{ 
                                width: `${Math.max(progress, 2)}%`,
                                minWidth: progress > 0 ? '8px' : '0px'
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className='flex items-center justify-between text-sm'>
                          <div className='flex items-center space-x-4'>
                            <span className='text-green-400'>✅ {completedSections} Completed</span>
                            <span className='text-orange-400'>⏳ {totalSections - completedSections} Remaining</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* No Courses State */}
          {enrolledCourses && enrolledCourses.length === 0 && (
            <div className='bg-richblack-800 rounded-2xl border border-richblack-700 shadow-lg p-12 text-center'>
              <div className='w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-4xl'>📚</span>
              </div>
              <p className='text-richblack-5 text-xl font-semibold mb-2'>No courses enrolled yet</p>
              <p className='text-richblack-300 mb-6'>Start your learning journey by enrolling in courses!</p>
              <button 
                onClick={() => navigate("/catalog")}
                className='px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-xl hover:bg-yellow-100 transition-all duration-300'
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StudentProgress