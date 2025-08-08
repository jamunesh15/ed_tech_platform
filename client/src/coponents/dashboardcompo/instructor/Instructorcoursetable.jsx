

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteCourse, fetchInstructorCourses } from '../../../Services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const InstructorCourseTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  
  // State management
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handle delete button click
  const handleDeleteClick = (courseId) => {
    console.log("Preparing to delete course:", courseId);
    setCourseToDelete(courseId);
    setDeleteModal(true);
  };

  // Handle actual course deletion
  const handleDeleteCourse = async () => {
    if (!courseToDelete) {
      toast.error("No course selected for deletion");
      return;
    }

    setLoading(true);
    try {
      console.log("Deleting course with ID:", courseToDelete);
      await deleteCourse(courseToDelete, token);
      
      // Refresh course list
      const result = await fetchInstructorCourses(token);
      if (result?.data) {
        setCourses(result.data);
        toast.success("Course deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      // Error is already shown by deleteCourse function
    } finally {
      setLoading(false);
      setDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  // Loading state
  if (!Array.isArray(courses)) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
      </div>
    );
  }

  // Empty state
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
        <p className="text-richblack-100 text-lg">No courses found</p>
        <p className="text-richblack-400 text-sm">Create your first course now!</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1260px] px-4 sm:px-6 pb-6 sm:pb-8">
      {/* Desktop Table Header - Hidden on mobile */}
      <div className="hidden lg:grid grid-cols-12 gap-2 border-b border-richblack-600 pb-3 mb-4">
        <div className="col-span-6">
          <p className="text-sm text-richblack-50 font-medium uppercase tracking-wider">COURSES</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-richblack-50 font-medium uppercase tracking-wider">DURATION</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-richblack-50 font-medium uppercase tracking-wider">PRICE</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-richblack-50 font-medium uppercase tracking-wider">ACTIONS</p>
        </div>
      </div>

      {/* Course Rows */}
      <div className="space-y-4 sm:space-y-6">
        {courses.map((course, index) => (
          <div 
            key={course._id} 
            className="bg-richblack-800 hover:bg-richblack-700/80 transition-all duration-300 rounded-xl border border-richblack-600/50 hover:border-richblack-500 shadow-lg hover:shadow-xl overflow-hidden"
          >
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Course Image and Header */}
              <div className="relative">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400x200'}
                  alt={course.courseName}
                  className="w-full h-48 sm:h-56 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
                {/* Status Badge Overlay */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                    course.status === "Published" 
                      ? 'bg-green-500/90 text-white border border-green-400' 
                      : 'bg-yellow-500/90 text-richblack-900 border border-yellow-400'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
              
              {/* Course Content */}
              <div className="p-4 sm:p-6">
                {/* Course Title and Description */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-richblack-5 mb-2 leading-tight">
                    {course.courseName}
                  </h3>
                  <p className="text-richblack-200 text-sm sm:text-base line-clamp-2 leading-relaxed">
                    {course.courseDescription}
                  </p>
                </div>
                
                {/* Course Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-richblack-700/50 p-3 sm:p-4 rounded-lg border border-richblack-600/50">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-richblack-400 text-xs uppercase font-medium tracking-wider">Duration</p>
                    </div>
                    <p className="text-richblack-100 font-bold text-lg">{formatDuration(course.duration)}</p>
                  </div>
                  
                  <div className="bg-richblack-700/50 p-3 sm:p-4 rounded-lg border border-richblack-600/50">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <p className="text-richblack-400 text-xs uppercase font-medium tracking-wider">Price</p>
                    </div>
                    <p className="text-richblack-100 font-bold text-lg">₹{course.price || '0'}</p>
                  </div>
                </div>
                
                {/* Creation Date */}
                <div className="mb-6 p-3 bg-richblack-900/50 rounded-lg border border-richblack-600/30">
                  <div className="flex items-center gap-2 text-richblack-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">
                      Created on {new Date(course.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-50 hover:bg-yellow-50 text-richblack-900 rounded-lg transition-all duration-200 font-semibold text-sm hover:shadow-lg hover:scale-105"
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit Course
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-pink-600 hover:bg-red-500 text-white rounded-lg transition-all duration-200 font-semibold text-sm hover:shadow-lg hover:scale-105"
                    onClick={() => handleDeleteClick(course._id)}
                  >
                    <FaTrash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-12 gap-6 items-center p-6">
              {/* Course Info with Image */}
              <div className="col-span-6 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={course.thumbnail || 'https://via.placeholder.com/160x120'}
                    alt={course.courseName}
                    className="h-[120px] w-[180px] rounded-lg object-cover flex-shrink-0 border border-richblack-600"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/180x120?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      course.status === "Published" 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-richblack-900'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-richblack-5 truncate">
                    {course.courseName}
                  </h3>
                  <p className="text-richblack-200 text-sm line-clamp-2 leading-relaxed">
                    {course.courseDescription}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-richblack-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {new Date(course.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })} at {new Date(course.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-richblack-100 font-semibold">{formatDuration(course.duration)}</span>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-richblack-100 font-bold text-lg">₹{course.price || '0'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center gap-2">
                <button
                  className="p-3 text-richblack-300 hover:text-yellow-100 hover:bg-yellow-600/20 rounded-lg transition-all duration-200 border border-richblack-600 hover:border-yellow-500 group"
                  onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  title="Edit Course"
                >
                  <FaEdit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  className="p-3 text-richblack-300 hover:text-red-100 hover:bg-red-600/20 rounded-lg transition-all duration-200 border border-richblack-600 hover:border-red-500 group"
                  title="Delete Course"
                  onClick={() => handleDeleteClick(course._id)}
                >
                  <FaTrash className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000] backdrop-blur-sm p-4"
          onClick={() => setDeleteModal(false)}
        >
          <div 
            className="bg-richblack-800 p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full border border-richblack-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Modal Header */}
              <div className="flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl text-richblack-5 font-semibold">Delete Course</h2>
                <div className="w-12 h-1 bg-yellow-50 rounded-full"></div>
              </div>

              {/* Modal Body */}
              <div className="my-2 sm:my-4">
                <p className="text-richblack-100 mb-2 text-sm sm:text-base">
                  Are you sure you want to delete this course? This action cannot be undone.
                </p>
                <p className="text-pink-200 text-xs sm:text-sm">
                  All the details related to this course will be permanently deleted.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
                <button
                  className="w-full sm:w-auto px-4 py-2 bg-richblack-600 text-richblack-50 rounded-lg hover:bg-richblack-700 transition-all duration-200 font-medium text-sm sm:text-base"
                  onClick={() => setDeleteModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="w-full sm:w-auto px-4 py-2 bg-pink-600 text-richblack-5 rounded-lg hover:bg-pink-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
                  onClick={handleDeleteCourse}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorCourseTable;