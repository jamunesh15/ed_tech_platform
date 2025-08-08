


// import React from "react";
// import copy from "copy-to-clipboard";
// import { toast } from "react-hot-toast";
// import { BsFillCaretRightFill } from "react-icons/bs";
// import { FaShareSquare } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { addToCart } from "../../redux/cartSlice";
// import { ACCOUNT_TYPE } from "../../utils/constants";

// function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { thumbnail: ThumbnailImage, price: CurrentPrice, _id: courseId } = course;

//   const handleShare = () => {
//     copy(window.location.href);
//     toast.success("Link copied to clipboard");
//   };

//   const handleAddToCart = () => {
//     if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
//       toast.error("You are an Instructor. You can't buy a course.");
//       return;
//     }
//     if (token) {
//       dispatch(addToCart(course));
//       return;
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to add To Cart",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     });
//   };

//   return (
//     <div className="flex flex-col gap-4 rounded-xl bg-richblack-700 p-6 text-richblack-50 shadow-md">
//       {/* Course Image */}
//       <img
//         src={ThumbnailImage}
//         alt={course?.courseName}
//         className="w-full rounded-lg aspect-video object-cover"
//       />

//       <div className="px-4">
//         <div className="pb-4 text-3xl font-bold text-richblack-5">Rs. {CurrentPrice}</div>
//         <div className="flex flex-col gap-4">
//           <button
//             className="w-full bg-yellow-100 text-richblack-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
//             onClick={
//               user && course?.totalStudent.includes(user?._id)
//                 ? () => navigate("/dashboard/enrolled-courses")
//                 : handleBuyCourse
//             }
//           >
//             {user && course?.totalStudent.includes(user?._id) ? "Go To Course" : "Buy Now"}
//           </button>
//           {(!user || !course?.totalStudent.includes(user?._id)) && (
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-richblack-800 text-richblack-50 font-semibold py-3 px-6 rounded-lg border border-richblack-600 hover:bg-richblack-700 transition-colors duration-300"
//             >
//               Add to Cart
//             </button>
//           )}
//         </div>
//         <div>
//           <p className="pt-6 text-center text-sm text-richblack-400">30-Day Money-Back Guarantee</p>
//         </div>

//         <div>
//           <p className="my-4 text-xl font-semibold text-richblack-5">This Course Includes :</p>
//           <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
//             {course?.instructions?.map((item, i) => (
//               <p className="flex gap-2" key={i}>
//                 <BsFillCaretRightFill />
//                 <span>{item}</span>
//               </p>
//             ))}
//           </div>
//         </div>
//         <div className="text-center">
//           <button
//             className="flex items-center gap-2 py-4 text-yellow-100 hover:text-yellow-200 transition-colors bb- duration-300"
//             onClick={handleShare}
//           >
//             <FaShareSquare  size={16} /> Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseDetailsCard;


import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../redux/cartSlice";
import { ACCOUNT_TYPE } from "../../utils/constants";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: ThumbnailImage, price: CurrentPrice, _id: courseId } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 rounded-lg sm:rounded-xl bg-richblack-700 p-4 sm:p-6 text-richblack-50 shadow-md w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="w-full rounded-md sm:rounded-lg aspect-video object-cover"
      />

      <div className="px-2 sm:px-4">
        {/* Price Section */}
        <div className="pb-3 sm:pb-4 text-2xl sm:text-3xl font-bold text-richblack-5">
          Rs. {CurrentPrice}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            className="w-full bg-yellow-100 text-richblack-900 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md sm:rounded-lg hover:bg-yellow-200 focus:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 text-sm sm:text-base"
            onClick={
              user && course?.totalStudent?.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.totalStudent?.includes(user?._id) ? "Go To Course" : "Buy Now"}
          </button>
          
          {(!user || !course?.totalStudent?.includes(user?._id)) && (
            <button
              onClick={handleAddToCart}
              className="w-full bg-richblack-800 text-richblack-50 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md sm:rounded-lg border border-richblack-600 hover:bg-richblack-700 focus:bg-richblack-700 focus:outline-none focus:ring-2 focus:ring-richblack-500 transition-all duration-300 text-sm sm:text-base"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Money-back Guarantee */}
        <div className="pt-4 sm:pt-6">
          <p className="text-center text-xs sm:text-sm text-richblack-400">
            30-Day Money-Back Guarantee
          </p>
        </div>

        {/* Course Includes Section */}
        <div className="mt-4 sm:mt-6">
          <p className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-richblack-5">
            This Course Includes:
          </p>
          <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, i) => (
              <p className="flex items-start gap-2" key={i}>
                <BsFillCaretRightFill className="mt-0.5 flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
                <span className="leading-relaxed">{item}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            className="inline-flex items-center justify-center gap-2 py-3 sm:py-4 px-4 text-yellow-100 hover:text-yellow-200 focus:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-md transition-all duration-300 text-sm sm:text-base"
            onClick={handleShare}
          >
            <FaShareSquare size={14} className="sm:w-4 sm:h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;