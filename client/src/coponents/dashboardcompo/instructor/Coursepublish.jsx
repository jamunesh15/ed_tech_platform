// import React, { useEffect, useState } from 'react'

// import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector  } from 'react-redux'
// import { useNavigate  } from 'react-router-dom'
// import { IoArrowBack } from "react-icons/io5";
// import { setStep } from '../../../redux/courseSlice';
// import { editCourseDetails } from '../../../Services/operations/courseDetailsAPI';
// import { COURSE_STATUS } from "../../../utils/constants"
// const Coursepublish = () => {

//   const {
//     register,
//     formState: { errors },    
//     getValues,
//     setValue,
//     handleSubmit
//   }    = useForm()

//   const {course} = useSelector((state)=>state.course)
//   const {token} = useSelector((state)=>state.auth)
//   const [loading , setloading] = useState(false)

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   useEffect(()=>{
     
//     if(course?.status === COURSE_STATUS.PUBLISHED) {
//       setValue("public", true);
//     }

//   })

//  const handlepublishCourse = async () => {
//   try {
//     if (
//       (course?.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true) ||
//       (course?.status === COURSE_STATUS.DRAFT && getValues("publish") === false)
//     ) {
//       // No changes in course status
//       dispatch(setStep(3));
//       navigate("/dashboard/my-courses");
//       return;
//     }

//     // Update course status
//     const formData = new FormData();
//     formData.append("courseId", course?._id);
//     const courseStatus = getValues("publish") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
//     formData.append("status", courseStatus);

//     setloading(true);
//     const result = await editCourseDetails(formData, token);

//     if (result) {
//       dispatch(setStep(1));
//       navigate("/dashboard/my-courses");
//     }
//   } catch (error) {
//     console.error("Error publishing course:", error);
//   } finally {
//     setloading(false);
//   }
// }

// const onsubmit = async () => {
//   await handlepublishCourse();
// }

//   return (

//     <div className="flex min-h-[calc(100vh-3.5rem)] items-start justify-center bg-richblack-900">

//       <div className=" flex w-full max-w-[500px] flex-col gap-y-4">

//         <div className="bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 shadow-md">
    
//           <h2 className="text-2xl font-bold text-richblack-5 mb-6">
//             Publish Settings
//           </h2>

//           <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
//             {/* Checkbox Container */}
//             <div className="flex items-start gap-2 bg-richblack-700 p-4 rounded-lg border-[1px] border-richblack-600">
//               <input
//                 type="checkbox"
//                 id="publishCourse"
//                 className="h-4 w-4 mt-1 rounded border-richblack-500 bg-richblack-600 text-yellow-50 focus:ring-2 focus:ring-yellow-50"
//                 {...register("publish", { required: "You must agree to publish the course" })}
//               />
//               <div className="flex-1">
//                 <label htmlFor="publishCourse" className="text-richblack-5 font-medium block">
//                   Make this course public
//                 </label>
//                 <p className="text-richblack-300 text-sm mt-1">
//                   This will make your course visible to all students on the platform.
//                 </p>
//                 {errors.publish && (
//                   <span className="text-pink-500 text-xs mt-1 block">
//                     {errors.publish.message}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Buttons */}

//             <div className="flex items-center gap-4 mt-8">
//               <button
//                 type="button"
//                 onClick={() =>  dispatch(setStep(2)) }
//                 className="flex items-center  hover:underline gap-1 rounded-lg bg-richblack-100 py-3 px-6  text-black font-bold transition-all duration-200 hover:bg-richblack-200 hover:scale-95"
//               >
//                 <IoArrowBack className=" font-bold " />
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="flex md:w-[160px] rounded-lg bg-yellow-50 py-3 px-6 text-richblack-900 font-bold hover:underline transition-all duration-200 hover:bg-yellow-100 hover:scale-95"
//               >
//                 {  loading ? "Loading..." : "Publish Course" }
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Coursepublish



import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector  } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { setStep } from '../../../redux/courseSlice';
import { editCourseDetails } from '../../../Services/operations/courseDetailsAPI';
import { COURSE_STATUS } from "../../../utils/constants"

const Coursepublish = () => {

  const {
    register,
    formState: { errors },    
    getValues,
    setValue,
    handleSubmit
  } = useForm()

  const {course} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth)
  const [loading , setloading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
     
    if(course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }

  })

 const handlepublishCourse = async () => {
  try {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("publish") === false)
    ) {
      // No changes in course status
      dispatch(setStep(3));
      navigate("/dashboard/my-courses");
      return;
    }

    // Update course status
    const formData = new FormData();
    formData.append("courseId", course?._id);
    const courseStatus = getValues("publish") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setloading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      dispatch(setStep(1));
      navigate("/dashboard/my-courses");
    }
  } catch (error) {
    console.error("Error publishing course:", error);
  } finally {
    setloading(false);
  }
}

const onsubmit = async () => {
  await handlepublishCourse();
}

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-start justify-center bg-richblack-900 px-4 sm:px-6 lg:px-8">
      
      <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl flex-col gap-y-4 py-4 sm:py-6 md:py-8">

        <div className="bg-richblack-800 p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border-[1px] border-richblack-700 shadow-md">
    
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-richblack-5 mb-4 sm:mb-6 text-center sm:text-left">
            Publish Settings
          </h2>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4 sm:space-y-6">
            {/* Checkbox Container */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4 bg-richblack-700 p-3 sm:p-4 md:p-5 rounded-lg border-[1px] border-richblack-600">
              <input
                type="checkbox"
                id="publishCourse"
                className="h-4 w-4 sm:h-5 sm:w-5 mt-1 rounded border-richblack-500 bg-richblack-600 text-yellow-50 focus:ring-2 focus:ring-yellow-50 flex-shrink-0"
                {...register("publish", { required: "You must agree to publish the course" })}
              />
              <div className="flex-1 min-w-0">
                <label htmlFor="publishCourse" className="text-richblack-5 font-medium block text-sm sm:text-base cursor-pointer">
                  Make this course public
                </label>
                <p className="text-richblack-300 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed">
                  This will make your course visible to all students on the platform.
                </p>
                {errors.publish && (
                  <span className="text-pink-500 text-xs mt-1 sm:mt-2 block">
                    {errors.publish.message}
                  </span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => dispatch(setStep(2))}
                className="w-full sm:w-auto flex items-center justify-center hover:underline gap-1 sm:gap-2 rounded-lg bg-richblack-100 py-3 px-4 sm:px-6 text-black font-bold transition-all duration-200 hover:bg-richblack-200 hover:scale-95 text-sm sm:text-base order-2 sm:order-1"
              >
                <IoArrowBack className="font-bold text-lg sm:text-xl" />
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto sm:min-w-[140px] md:min-w-[160px] flex items-center justify-center rounded-lg bg-yellow-50 py-3 px-4 sm:px-6 text-richblack-900 font-bold hover:underline transition-all duration-200 hover:bg-yellow-100 hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base order-1 sm:order-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-richblack-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline">Publishing...</span>
                    <span className="sm:hidden">Loading...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Publish Course</span>
                    <span className="sm:hidden">Publish</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Coursepublish
