// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FaCirclePlus } from "react-icons/fa6"
// import { fetchInstructorCourses } from '../../../Services/operations/courseDetailsAPI'
// import InstructorCourseTable from './Instructorcoursetable'

// const Mycourse = () => {
//   const { token } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   const fetchCourses = async () => {
//     try {
//       const result = await fetchInstructorCourses(token);
//       console.log("Courses fetch result:", result);
      
//       if (result.success) {
//         setCourses(result.data);
//       } else {
//         setCourses([]);
//       }
//     } catch (error) {
//       console.error("Error in fetchCourses:", error);
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Debug effect
//   useEffect(() => {
//     console.log("Current courses state:", courses);
//   }, [courses]);

//   return (
//     <div className="w-full bg-richblack-900">
//       {/* Header Section */}
//       <div className="flex items-center justify-between p-6 mx-auto max-w-[1260px]">
//         <div>
//           <h1 className="text-3xl md:text-[35px] text-richblack-5 font-medium mb-2">My Courses</h1>
//           <p className="text-richblack-200 text-sm">Manage and organize your courses</p>
//         </div>

//         <div className="relative group">
//             <button 
//               className="flex items-center gap-2 bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all duration-200 hover:scale-95 shadow-sm"
//               onClick={() => navigate("/dashboard/addcourse")}
//             >
//               <span className="text-lg">New Course</span>
//               <FaCirclePlus className="text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Courses List Section */}
//         {loading ? (
//           <div className="flex justify-center items-center h-[50vh]">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
//           </div>
//         ) : (
//       <div className=' pr-6 pl-6 mt-6 bg-richblack-900 ' >  <InstructorCourseTable courses={courses} setCourses={setCourses} /></div> 
//         )}
//       </div>
//   );
// };

// export default Mycourse;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from 'react-icons/fa6';
import { fetchInstructorCourses } from '../../../Services/operations/courseDetailsAPI';
import InstructorCourseTable from './Instructorcoursetable';

const Mycourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const result = await fetchInstructorCourses(token);
      console.log('Courses fetch result:', result);

      if (result.success) {
        setCourses(result.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error('Error in fetchCourses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Debug effect
  useEffect(() => {
    console.log('Current courses state:', courses);
  }, [courses]);

  return (
    <div className="w-full bg-richblack-900 min-h-[calc(100vh-3.5rem)]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 mx-auto max-w-[1260px]">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-[35px] text-richblack-5 font-medium mb-1 sm:mb-2">
            My Courses
          </h1>
          <p className="text-richblack-200 text-xs sm:text-sm">Manage and organize your courses</p>
        </div>

        <div className="relative group">
          <button
            className="flex items-center gap-2 bg-yellow-50 text-richblack-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all duration-200 hover:scale-95 shadow-sm"
            onClick={() => navigate('/dashboard/addcourse')}
            aria-label="Create a new course"
          >
            <span className="text-base sm:text-lg">New Course</span>
            <FaCirclePlus className="text-base sm:text-lg" />
          </button>
        </div>
      </div>

      {/* Courses List Section */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh] sm:h-[60vh]">
          <div className="animate-spin rounded-full h-8 sm:h-10 w-8 sm:w-10 border-t-2 border-b-2 border-yellow-50"></div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 mt-4 sm:mt-6 bg-richblack-900">
          <InstructorCourseTable courses={courses} setCourses={setCourses} />
        </div>
      )}
    </div>
  );
};

export default Mycourse;