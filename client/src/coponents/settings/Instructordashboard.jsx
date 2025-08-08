import React, { useEffect, useState } from 'react'
import { getinstructorDashboard } from '../../Services/operations/ProfileAPI';
import { fetchInstructorCourses } from '../../Services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Analysischart from './Analysischart';

const Instructordashboard = () => {
    
  const [loading,setloading] = useState(false);
  const [courses,setCourses] = useState([]);
  const [instructorData , setinstructorData] = useState(null);

  const {token}  = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    
    const fetchinstructordashboardData = async()=>{
  
      setloading(true);
      
      const instrucotAPIdata  = await getinstructorDashboard(token);
      const result  = await fetchInstructorCourses(token);

      console.log("INSTRUCTOR DASHBOARD DATA:", instrucotAPIdata);
      console.log("INSTRUCTOR COURSES DATA:", result);

      if(instrucotAPIdata && Array.isArray(instrucotAPIdata)) {
        setinstructorData(instrucotAPIdata);
      }

      if(result?.success) {
        setCourses(result.data);
      }

      setloading(false);
    }
    fetchinstructordashboardData();
  } , [] )

  // Calculate stats from the instructor dashboard API data structure
  const totalAmount = instructorData?.reduce((acc, curr) => {
    return acc + (curr.totalAmountgenerated || 0);
  }, 0);

  const totalStudent = instructorData?.reduce((acc, curr) => {
    return acc + (curr.totalstudentsEnrolled || 0);
  }, 0);

  console.log("Total Amount Generated:", totalAmount);
  console.log("Total Students Enrolled:", totalStudent);

  const totalCourses = instructorData?.length || courses.length;
  console.log("Total courses:", totalCourses);
  

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
                 👋  <span className='text-caribbeangreen-200'>Hi</span> {user?.firstname} {user?.lastname} 
                </h1>
                <p className='text-richblack-300 text-lg'>Let's start something new today!</p>
              </div>
              <div className='hidden md:flex items-center space-x-4'>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-yellow-50'>{totalCourses}</p>
                  <p className='text-richblack-300 text-sm'>Total Courses</p>
                </div>
                <div className='w-px h-12 bg-richblack-600'></div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-blue-25'>{totalStudent || 0}</p>
                  <p className='text-richblack-300 text-sm'>Students</p>
                </div>
                <div className='w-px h-12 bg-richblack-600'></div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-caribbeangreen-200'>₹{totalAmount || 0}</p>
                  <p className='text-richblack-300 text-sm'>Revenue</p>
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
                <p className='text-xl font-bold text-blue-200'>{totalStudent || 0}</p>
                <p className='text-richblack-300 text-xs'>Students</p>
              </div>
              <div className='text-center'>
                <p className='text-xl font-bold text-green-400'>₹{totalAmount || 0}</p>
                <p className='text-richblack-300 text-xs'>Revenue</p>
              </div>
            </div>
          </div>

          {/* New Instructor Welcome Section */}
          {(!instructorData || instructorData.length === 0) && (!courses || courses.length === 0) && (
            <div className='bg-gradient-to-r from-blue-800 to-purple-800 p-8 rounded-2xl border border-blue-600 shadow-xl'>
              <div className='text-center'>
                <div className='w-24 h-24 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-5xl'>🚀</span>
                </div>
                <h2 className='text-3xl font-bold text-white mb-4'>Welcome to Your Instructor Journey!</h2>
                <p className='text-blue-100 text-lg mb-6 max-w-2xl mx-auto'>
                  You're just getting started as an instructor. Create your first course and begin sharing your knowledge with students around the world!
                </p>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                  <div className='bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20'>
                    <div className='text-3xl mb-3'>📝</div>
                    <h3 className='text-xl font-semibold text-white mb-2'>Create Course</h3>
                    <p className='text-blue-100 text-sm'>Design and structure your first course with our easy-to-use course builder</p>
                  </div>
                  
                  <div className='bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20'>
                    <div className='text-3xl mb-3'>👥</div>
                    <h3 className='text-xl font-semibold text-white mb-2'>Teach Students</h3>
                    <p className='text-blue-100 text-sm'>Share your expertise and help students achieve their learning goals</p>
                  </div>
                  
                  <div className='bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20'>
                    <div className='text-3xl mb-3'>💰</div>
                    <h3 className='text-xl font-semibold text-white mb-2'>Earn Revenue</h3>
                    <p className='text-blue-100 text-sm'>Generate income from your courses and build a sustainable teaching business</p>
                  </div>
                </div>
                
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <button 
                    onClick={() => navigate("/dashboard/addcourse")}
                    className='px-8 py-4 bg-yellow-50 text-richblack-900 font-bold rounded-xl hover:bg-yellow-100 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <span className='text-xl'>➕</span>
                    Create Your First Course
                  </button>
                  
                  <button 
                    onClick={() => navigate("/dashboard/my-courses")}
                    className='px-8 py-4 bg-white bg-opacity-20 text-white font-semibold rounded-xl hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30'
                  >
                    View All Courses
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics and Stats Section - Only show if instructor has courses */}
          {((instructorData && instructorData.length > 0) || (courses && courses.length > 0)) && (
            <>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Chart Section */}
              <div className='lg:col-span-2'>
                <Analysischart courses={instructorData} />
              </div>
            
            {/* Statistics Cards */}
            <div className='space-y-6'>
              <div className='bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-lg'>
                <h2 className='text-xl font-semibold text-richblack-5 mb-6 flex items-center'>
                  <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
                  Quick Stats
                </h2>
                
                <div className='space-y-6'>
                  <div className='flex items-center justify-between p-4 bg-richblack-700 rounded-xl border border-richblack-600'>
                    <div>
                      <p className='text-richblack-300 text-sm font-medium'>Total Courses</p>
                      <p className='text-3xl font-bold text-richblack-5 mt-1'>{totalCourses}</p>
                    </div>
                    <div className='w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                      <span className='text-yellow-500 text-2xl'>📚</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between p-4 bg-richblack-700 rounded-xl border border-richblack-600'>
                    <div>
                      <p className='text-richblack-300 text-sm font-medium'>Total Students</p>
                      <p className='text-3xl font-bold text-richblack-5 mt-1'>{totalStudent || 0}</p>
                    </div>
                    <div className='w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                      <span className='text-blue-400 text-2xl'>👥</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between p-4 bg-richblack-700 rounded-xl border border-richblack-600'>
                    <div>
                      <p className='text-richblack-300 text-sm font-medium'>Total Revenue</p>
                      <p className='text-3xl font-bold text-richblack-5 mt-1'>₹{totalAmount || 0}</p>
                    </div>
                    <div className='w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                      <span className='text-green-400 text-2xl'>💰</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course List Section */}
          <div className='bg-richblack-800 rounded-2xl border border-richblack-700 shadow-lg overflow-hidden'>
            <div className='p-6 bg-gradient-to-r from-richblack-700 to-richblack-800 border-b border-richblack-600'>
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className='text-2xl font-bold text-richblack-5 flex items-center'>
                    <span className='w-3 h-3 bg-yellow-50 rounded-full mr-3'></span>
                    Your Courses
                  </h2>
                  <p className='text-richblack-300 mt-2'>Manage and view all your created courses</p>
                </div>
                <button
                  onClick={() => navigate("/dashboard/my-courses")}
                  className='px-4 py-2 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all duration-300'
                >
                  View All
                </button>
              </div>
            </div>

            <div className='p-6'>
              {courses && courses.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {courses.slice(0, 3).map((course) => (
                    <div key={course._id} className='bg-richblack-700 rounded-xl border border-richblack-600 overflow-hidden hover:shadow-lg hover:border-richblack-500 transition-all duration-300 group'>
                      <div className='relative'>
                        <img
                          src={course.thumbnail}
                          alt={course.courseName}
                          className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-richblack-900/60 to-transparent'></div>
                      </div>
                      
                      <div className='p-4'>
                        <h3 className='text-richblack-5 font-semibold text-lg mb-2 line-clamp-2'>{course.courseName}</h3>
                        
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center space-x-2'>
                            <span className='text-blue-400 text-sm font-medium flex items-center'>
                              👥 {course.totalStudent?.length || 0}
                            </span>
                            <span className='text-richblack-400'>|</span>
                            <span className='text-green-400 text-sm font-medium'>
                              ₹{course.price}
                            </span>
                          </div>
                        </div>
                        
                        <div className='flex items-center justify-between pt-3 border-t border-richblack-600'>
                          <span className='text-richblack-300 text-sm'>Total Revenue</span>
                          <span className='text-richblack-5 font-bold'>₹{course.totalAmountgenerated || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-12'>
                  <div className='w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-3xl'>📚</span>
                  </div>
                  <p className='text-richblack-5 text-xl font-semibold mb-2'>No courses created yet</p>
                  <p className='text-richblack-300 mb-6'>Start creating your first course to begin your teaching journey!</p>
                  <button 
                    onClick={() => navigate("/dashboard/addcourse")}
                    className='px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-xl hover:bg-yellow-100 transition-all duration-300'
                  >
                    Create Your First Course
                  </button>
                </div>
              )}
            </div>
          </div>
          </>
        )}
      </div>
    )}
  </div>
  )
}

export default Instructordashboard;