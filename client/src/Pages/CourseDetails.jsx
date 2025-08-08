// import React, { useEffect, useState } from "react";
// import { BiInfoCircle } from "react-icons/bi";
// import { HiOutlineGlobeAlt } from "react-icons/hi";
// import { MdLanguage, MdAccessTime, MdOndemandVideo } from "react-icons/md";
// import { FaUsers, FaStar, FaPlay } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// import Footer from "../coponents/Footer";
// import RatingStars from "../coponents/common/RatingStars";
// import CourseAccordionBar from "../coponents/course/CourseAccordionBar";
// import { formattedDate as formatDate } from "../utils/dateFormatter";
// import GetAvgRating from "../utils/avgRating";
// import Error from "./Error";
// import { fetchCourseDetails } from "../Services/operations/courseDetailsAPI";

// import { FaHandPointRight } from "react-icons/fa";
// import { buycourse } from "../Services/operations/StudentsfeturesAPI";
// import { addToCart, removeFromCart } from "../redux/cartSlice";
// import  {ACCOUNT_TYPE}  from "../utils/constants";
// import toast from "react-hot-toast";
// import copy from "copy-to-clipboard";

// function CourseDetails() {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const { course } = useSelector((state) => state.course);
//   const { cart } = useSelector((state) => state.cart);


//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { courseId } = useParams();

//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [confirmationModal, setConfirmationModal] = useState(null);



//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         const res = await fetchCourseDetails(courseId);
//         console.log("Course details response:", res);

//         if (!res?.data?.courseDetails) {
//           setResponse({ success: false, message: "No course details available" });
//           return;
//         }

//         setResponse(res);
//       } catch (error) {
//         console.log("Could not fetch Course Details:", error);
//         setResponse({ success: false, message: error?.message || "Failed to fetch course details" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courseId) {
//       fetchDetails();
//     }
//   }, [courseId]);

//   const [avgReviewCount, setAvgReviewCount] = useState(0);
//   useEffect(() => {
//     const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews || []);
//     setAvgReviewCount(count);
//   }, [response]);

//   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
//   useEffect(() => {
//     let lectures = 0;
//     response?.data?.courseDetails?.courseContent?.forEach((sec) => {
//       lectures += sec.Subsection?.length || 0;
//     });
//     setTotalNoOfLectures(lectures);
//   }, [response]);

//   const [isActive, setIsActive] = useState([]);
//   const handleActive = (id) => {
//     setIsActive(
//       !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id)
//     );
//   };

//   if (loading || !response) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
//         <div className="spinner w-12 h-12 border-4 border-t-4 border-richblack-700 border-t-yellow-50 rounded-full animate-spin"></div>
//       </div>
//     );
//   }




//   if (!response.success || !response.data?.courseDetails) {
//     console.log("No course details found:", response);
//     return <Error />;
//   }

//   const courseDetails = response.data.courseDetails;

//   const {
//     _id: course_id,
//     courseName,
//     courseDescription,
//     thumbnail,
//     price,
//     whatYouWillLearn,
//     courseContent = [],
//     ratingAndReviews = [],
//     instructor = {},
//     totalStudent = [],
//     createdAt,
//   } = courseDetails;

//   console.log("Course Details:", courseDetails);
//   console.log("User ID:", user?._id);
//   console.log("Total Students:", courseDetails?.totalStudent);
//   console.log("Is Enrolled:", courseDetails?.totalStudent?.some(student => student._id === user?._id));
  
//   // Check if course is in cart
//   const isInCart = cart?.some(item => item._id === courseId);
//   console.log("Is in cart:", isInCart);
//   console.log("Cart items:", cart);

//   // Handle Add to Cart functionality
//   const handleAddToCart = () => {
//     if (!token) {
//       setConfirmationModal({
//         text1: "You are not logged in!",
//         text2: "Please login to add items to cart.",
//         btn1Text: "Login",
//         btn2Text: "Cancel",
//         btn1Handler: () => navigate("/login"),
//         btn2Handler: () => setConfirmationModal(null),
//       });
//       return;

   

//     }

//     if( user.accountType ===  ACCOUNT_TYPE.INSTRUCTOR ){
//       setConfirmationModal({
//         text1: "You are an instructor!",
//         text2: "Instructors cannot add courses to cart.",
//         btn1Text: "Go to Dashboard",
//         btn2Text: "Cancel",
//         btn1Handler: () => navigate("/dashboard"),
//         btn2Handler: () => setConfirmationModal(null),
       
//       });
//       toast.error("instructor cannot buy courses");
//       return;
//     }
      

//     // Check if already enrolled
//     const isAlreadyEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
//     if (isAlreadyEnrolled) {
//       setConfirmationModal({
//         text1: "You're already enrolled!",
//         text2: "You have already purchased this course.",
//         btn1Text: "Go to Dashboard",
//         btn2Text: "Cancel",
//         btn1Handler: () => navigate("/dashboard/enrolled-courses"),
//         btn2Handler: () => setConfirmationModal(null),
//       });
//       return;
//     }

//     // Add to cart
//     dispatch(addToCart(courseDetails));
//     setConfirmationModal({
//       text1: "Added to Cart!",
//       text2: "Course has been added to your cart successfully.",
//       btn1Text: "Continue Shopping",
//       btn2Text: "Go to Cart",
//       btn1Handler: () => setConfirmationModal(null),
//       btn2Handler: () => navigate("/dashboard/cart"),
//     });
//   };

//   // Handle Go to Cart functionality
//   const handleGoToCart = () => {
   
//     if( user.accountType ===  ACCOUNT_TYPE.INSTRUCTOR ){
//          toast.error("instructor cannot buy courses");
//     return;
//     }
//     if (!token) {
//       toast.error("You need to be logged in to view your cart.");
//     }
//     navigate("/dashboard/cart");
//   };

//   const handleshare = () => {
//     copy(window.location.href);
//     toast.success("Link copied to clipboard");
//   };

//   function handlebuycourse() {
//     if (!token) {
//       setConfirmationModal({
//         text1: "You are not logged in!",
//         text2: "Please login to purchase this course.",
//         btn1Text: "Login",
//         btn2Text: "Cancel",
//         btn1Handler: () => navigate("/login"),
//         btn2Handler: () => setConfirmationModal(null),
//       });
//       return;
//     }


//     if( user.acciuntType === ACCOUNT_TYPE.INSTRUCTOR ){

//       setConfirmationModal({
//         text1: "You are an instructor!",
//         text2: "Instructors cannot buy courses.",
//         btn1Text: "Go to Dashboard",
//         btn2Text: "Cancel",
//         btn1Handler: () => navigate("/dashboard"),
//         btn2Handler: () => setConfirmationModal(null),
//       });
//       toast.error("instructor cannot buy courses");
//       return;

//     }
    
//     // Check if user is already enrolled - fix the logic to check totalStudent properly
//     const isAlreadyEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
//     if (isAlreadyEnrolled) {
//       setConfirmationModal({
//         text1: "You're already enrolled!",
//         text2: "You have already purchased this course. Go to your dashboard to continue learning.",
//         btn1Text: "Go to Dashboard",
//         btn2Text: "Cancel",
//         btn1Handler: () => navigate("/dashboard/enrolled-courses"),
//         btn2Handler: () => setConfirmationModal(null),
//       });
//       return;
//     }

  
    
//     // Proceed with purchase
//     buycourse(token, [courseId], user, navigate, dispatch, () => {
//       // Custom success callback - navigate to enrolled courses
//       setTimeout(() => {
//         navigate("/dashboard/enrolled-courses");
//       }, 1500);
//     })
//       .catch(error => {
//         // Check for specific error about already enrolled
//         if (error?.response?.data?.message?.includes("already enrolled")) {
//           setConfirmationModal({
//             text1: "You're already enrolled!",
//             text2: "You have already purchased this course. Go to your dashboard to continue learning.",
//             btn1Text: "Go to Dashboard",
//             btn2Text: "Cancel",
//             btn1Handler: () => navigate("/dashboard/enrolled-courses"),
//             btn2Handler: () => setConfirmationModal(null),
//           });
//         } else {
//           // Handle other errors
//           setConfirmationModal({
//             text1: "Error purchasing course",
//             text2: error?.response?.data?.message || "Something went wrong. Please try again later.",
//             btn1Text: "Try Again",
//             btn2Text: "Cancel",
//             btn1Handler: () => setConfirmationModal(null),
//             btn2Handler: () => setConfirmationModal(null),
//           });
//         }
//       });
//   }



//   return (
//     <div className="bg-richblack-900 min-h-screen text-richblack-50">
//       {/* Hero Section */}
//       <div className="bg-richblack-800   shadow-blue-300 shadow-md h-[400px] ">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <div className="lg:flex lg:gap-12">
//             {/* Left Content */}
//             <div className="lg:w-2/3">
//               {/* Breadcrumb */}
//               <div className="flex items-center text-sm text-[20px] text-richblack-100 mb-6">
//                 <span>Home</span>
//                 <span className="mx-2 text-richblack-200 ">/</span>
//                 <span>Catalog</span>  
//                 <span className="mx-2">/</span>
//                 <span className="text-yellow-100">{courseName}</span>
//               </div>

//               {/* Course Title */}
//               <h1 className="text-4xl font-bold text-richblack-5 mb-6">{courseName}</h1>

//               {/* Course Description */}
//               <p className="text-richblack-200 text-lg mb-8 leading-relaxed">{courseDescription}</p>

//               {/* Rating and Stats */}
//               <div className="flex items-center gap-6 mb-8">
//                 <div className="flex items-center">
//                   <span className="text-yellow-100 font-bold text-xl mr-3">{avgReviewCount }</span>
//                   <RatingStars Review_Count={avgReviewCount } Star_Size={18} />
//                 </div>
//                 <span className="text-richblack-400">({ratingAndReviews?.length } ratings)</span>
//                 <span className="text-richblack-400">{totalStudent?.length } students</span>
//               </div>

//               {/* Instructor and Meta Info */}
//               <div className="flex items-center gap-8 text-richblack-400 text-sm mb-8">
//                 <div className="flex items-center gap-2">
//                   <span>Created by</span>
//                   <span className="text-yellow-100 font-medium">
//                     {instructor?.firstName || instructor?.firstname || "Instructor Name"}{" "}
//                     {instructor?.lastName || instructor?.lastname || ""}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <BiInfoCircle />
//                   <span>Created at {formatDate(createdAt) || "02/2020"}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <HiOutlineGlobeAlt />
//                   <span>English</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Sidebar - Course Preview Card */}
//             <div className="lg:w-1/3 mt-8 lg:mt-0">
//               <div className="bg-richblack-700 rounded-xl p-6 sticky top-8 shadow-lg">
//                 {/* Course Thumbnail */}
//                 <div className="relative mb-6">
//                   <img
//                     src={thumbnail}
//                     alt={courseName}
//                     className="w-full rounded-lg aspect-video object-cover"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <button className="bg-yellow-100 text-richblack-900 p-4 rounded-full hover:scale-110 transition-transform duration-300">
//                       <FaPlay className="text-2xl ml-1" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-6">
//                   <p className="text-4xl font-bold text-richblack-5">Rs. {price || "1,200"}</p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-4 mb-6">
//                   <button
//                     onClick={() => {
//                       const isEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
//                       if (isEnrolled) {
//                         // If enrolled, go to enrolled courses dashboard
//                         navigate("/dashboard/enrolled-courses");
//                       } else if (isInCart) {
//                         // If in cart, go to cart
//                         handleGoToCart();
//                       } else {
//                         // If not in cart, add to cart
//                         handleAddToCart();
//                       }
//                     }}
//                     className="w-full bg-yellow-100 text-richblack-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
//                   >
//                     {/* Dynamic button text based on enrollment and cart status */}
//                     {courseDetails?.totalStudent?.some(student => student._id === user?._id) 
//                       ? "Go to Course" 
//                       : isInCart 
//                         ? "Go to Cart" 
//                         : "Add to Cart"
//                     }
//                   </button>
//                   <button className="w-full bg-richblack-800 text-richblack-50 font-semibold py-3 px-6 rounded-lg border border-richblack-600 hover:bg-richblack-700 transition-colors duration-300"
                  
//                    onClick={()=>handlebuycourse()}  

//                    >
//                     Buy Now
//                   </button>
//                 </div>

//                 {/* Money Back Guarantee */}
//                 <div className="text-center mb-6">
//                   <p className="text-richblack-400 text-sm">30-Day Money-Back Guarantee</p>
//                 </div>

//                 {/* Course Includes */}
//                 <div className="mb-6">
//                   <h3 className="text-richblack-5 font-semibold mb-4">This course includes:</h3>
//                   <ul className="space-y-3 text-sm text-richblack-400">
//                     <li className="flex items-center gap-3">
//                       <MdOndemandVideo className="text-caribbeangreen-100 text-lg" />
//                       <span>8 hours on-demand video</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <BiInfoCircle className="text-caribbeangreen-100 text-lg" />
//                       <span>Full Lifetime access</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <MdAccessTime className="text-caribbeangreen-100 text-lg" />
//                       <span>Access on Mobile and TV</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <HiOutlineGlobeAlt className="text-caribbeangreen-100 text-lg" />
//                       <span>Certificate of completion</span>
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Share Button */}
//                 <div className="text-center">
//                   <button onClick={handleshare} className="text-yellow-100 font-medium hover:text-yellow-200 transition-colors duration-300">
//                     Share
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - Side by Side Layout */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="lg:flex lg:gap-12">
//           {/* Left Content */}
//           <div className="lg:w-2/3  ">
//             {/* What You'll Learn */}
//             <div className="mb-12 border-[1px] border-richblack-500 p-4 rounded-[10px]  ">
//               <h2 className="text-2xl font-bold text-richblack-5 mb-6">What you'll learn</h2>
//               <div className=" ">
//                 <div className="text-richblack-5 gap-2 text-center flex leading-relaxed prose prose-invert max-w-none">
//                   <div>
//                     <FaHandPointRight className="text-caribbeangreen-100 text-2xl mb-2" />
//                   </div>
//                   <ReactMarkdown>
//                     {whatYouWillLearn ||
//                       "Introduction to Python and Python 3\nUnderstand the basics: Data types, Loops, Conditional statements, Functions and Methods\nLearn object-oriented programming in Python\nKnow how to Read and Parse CSV and XML files"}
//                   </ReactMarkdown>
//                 </div>
//               </div>
//             </div>

//             {/* Course Content */}
//             <div className="mb-12">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-richblack-5">Course content</h2>
//                 <div className="text-richblack-400 text-sm">
//                   <span>{courseContent?.length || 10} sections</span>
//                   <span className="mx-2">•</span>
//                   <span>{totalNoOfLectures || 41} lectures</span>
//                   <span className="mx-2">•</span>
//                   <span>7h 57m total length</span>
//                 </div>
//               </div>

//               {/* Collapse All Button */}
//               <div className="mb-4">
//                 <button className="text-yellow-100 text-sm font-medium hover:text-yellow-200 transition-colors duration-300">
//                   Collapse all sections
//                 </button>
//               </div>

//               {/* Course Sections */}
//               <div className="space-y-2">
//                 {courseContent?.map((course, index) => (
//                   <CourseAccordionBar
//                     course={course}
//                     key={index}
//                     isActive={isActive}
//                     handleActive={handleActive}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Author Section */}
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold text-richblack-5 mb-6">Author</h2>
//               <div className="flex items-start gap-4">
//                 <img
//                   src={
//                     instructor?.image ||
//                     `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstname || "Love"} ${
//                       instructor?.lastname || "Babbar"
//                     }`
//                   }
//                   alt={instructor?.firstname}
//                   className="w-20 h-20 rounded-full object-cover"
//                 />
//                 <div>
//                   <h3 className="text-xl font-bold text-richblack-5 mb-2">
//                     {instructor?.firstName || instructor?.firstname || "Love"}{" "}
//                     {instructor?.lastName || instructor?.lastname || "Babbar"}
//                   </h3>
//                   <p className="text-richblack-400 leading-relaxed">
//                     I will be your lead trainer in this course. Within no time, I will help you to
//                     understand the subject in an easy manner. I have a huge experience in online
//                     training and recording videos. Let's get started!
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Empty on desktop (card shown in hero) */}
//           <div className="lg:w-1/3 hidden lg:block"></div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {confirmationModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-richblack-900 bg-opacity-70 backdrop-blur-sm">
//           <div className="bg-richblack-800 rounded-lg p-8 max-w-md mx-4 shadow-lg">
//             <h3 className="text-xl font-semibold text-richblack-5 mb-4">{confirmationModal.text1}</h3>
//             <p className="text-richblack-400 mb-6">{confirmationModal.text2}</p>
//             <div className="flex gap-4">
//               <button
//                 onClick={confirmationModal.btn1Handler}
//                 className="bg-yellow-100 text-richblack-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition-colors duration-300"
//               >
//                 {confirmationModal.btn1Text}
//               </button>
//               <button
//                 onClick={confirmationModal.btn2Handler}
//                 className="bg-richblack-600 text-richblack-50 px-6 py-2 rounded-lg font-semibold hover:bg-richblack-700 transition-colors duration-300"
//               >
//                 {confirmationModal.btn2Text}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default CourseDetails;



// // import React, { useEffect, useState } from "react";
// // import { BiInfoCircle } from "react-icons/bi";
// // import { HiOutlineGlobeAlt } from "react-icons/hi";
// // import { MdLanguage, MdAccessTime, MdOndemandVideo } from "react-icons/md";
// // import { FaUsers, FaStar, FaPlay } from "react-icons/fa";
// // import ReactMarkdown from "react-markdown";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate, useParams } from "react-router-dom";

// // import Footer from "../coponents/Footer";
// // import RatingStars from "../components/common/RatingStars";
// // import CourseAccordionBar from "../components/course/CourseAccordionBar";
// // import { formattedDate as formatDate } from "../utils/dateFormatter";
// // import GetAvgRating from "../utils/avgRating";
// // import Error from "./Error";
// // import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
// // import { FaHandPointRight } from "react-icons/fa";
// // import { buycourse } from "../services/operations/studentsFeaturesAPI";

// // function CourseDetails() {
// //   const { user } = useSelector((state) => state.profile);
// //   const { token } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { courseId } = useParams();

// //   const [response, setResponse] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [confirmationModal, setConfirmationModal] = useState(null);
// //   const [avgReviewCount, setAvgReviewCount] = useState(0);
// //   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
// //   const [isActive, setIsActive] = useState([]);

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await fetchCourseDetails(courseId);
// //         console.log("Course details response:", res);

// //         if (!res?.data?.courseDetails) {
// //           setResponse({ success: false, message: "No course details available" });
// //           return;
// //         }

// //         setResponse(res);
// //       } catch (error) {
// //         console.log("Could not fetch Course Details:", error);
// //         setResponse({ 
// //           success: false, 
// //           message: error?.message || "Failed to fetch course details" 
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (courseId) {
// //       fetchDetails();
// //     }
// //   }, [courseId]);

// //   useEffect(() => {
// //     const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews || []);
// //     setAvgReviewCount(count);
// //   }, [response]);

// //   useEffect(() => {
// //     let lectures = 0;
// //     response?.data?.courseDetails?.courseContent?.forEach((sec) => {
// //       lectures += sec.subSection?.length || 0;
// //     });
// //     setTotalNoOfLectures(lectures);
// //   }, [response]);

// //   const handleActive = (id) => {
// //     setIsActive(
// //       !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id)
// //     );
// //   };

// //   const handleBuyCourse = () => {
// //     if (!token) {
// //       setConfirmationModal({
// //         text1: "You are not logged in!",
// //         text2: "Please login to purchase this course.",
// //         btn1Text: "Login",
// //         btn2Text: "Cancel",
// //         btn1Handler: () => navigate("/login"),
// //         btn2Handler: () => setConfirmationModal(null),
// //       });
// //       return;
// //     }
    
// //     if (user?.courses?.includes(courseId)) {
// //       setConfirmationModal({
// //         text1: "Already Enrolled!",
// //         text2: "You have already purchased this course.",
// //         btn1Text: "Go to Dashboard",
// //         btn2Text: "Cancel",
// //         btn1Handler: () => navigate("/dashboard/enrolled-courses"),
// //         btn2Handler: () => setConfirmationModal(null),
// //       });
// //       return;
// //     }
    
// //     // Start payment process
// //     buycourse(token, [courseId], user, navigate, dispatch)
// //       .catch(error => {
// //         console.error("Purchase error:", error);
// //         setConfirmationModal({
// //           text1: "Purchase Failed",
// //           text2: error.message || "Could not complete purchase. Please try again.",
// //           btn1Text: "Try Again",
// //           btn2Text: "Cancel",
// //           btn1Handler: () => handleBuyCourse(),
// //           btn2Handler: () => setConfirmationModal(null),
// //         });
// //       });
// //   };

// //   if (loading || !response) {
// //     return (
// //       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
// //         <div className="spinner w-12 h-12 border-4 border-t-4 border-richblack-700 border-t-yellow-50 rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   if (!response.success || !response.data?.courseDetails) {
// //     console.log("No course details found:", response);
// //     return <Error />;
// //   }

// //   const courseDetails = response.data.courseDetails;

// //   const {
// //     _id: course_id,
// //     courseName,
// //     courseDescription,
// //     thumbnail,
// //     price,
// //     whatYouWillLearn,
// //     courseContent = [],
// //     ratingAndReviews = [],
// //     instructor = {},
// //     studentsEnrolled = [],
// //     createdAt,
// //   } = courseDetails;

// //   return (
// //     <div className="bg-richblack-900 min-h-screen text-richblack-50">
// //       {/* Hero Section */}
// //       <div className="bg-richblack-800 shadow-blue-300 shadow-md h-[400px]">
// //         <div className="max-w-7xl mx-auto px-6 py-10">
// //           <div className="lg:flex lg:gap-12">
// //             {/* Left Content */}
// //             <div className="lg:w-2/3">
// //               {/* Breadcrumb */}
// //               <div className="flex items-center text-sm text-[20px] text-richblack-100 mb-6">
// //                 <span>Home</span>
// //                 <span className="mx-2 text-richblack-200">/</span>
// //                 <span>Catalog</span>  
// //                 <span className="mx-2">/</span>
// //                 <span className="text-yellow-100">{courseName}</span>
// //               </div>

// //               {/* Course Title */}
// //               <h1 className="text-4xl font-bold text-richblack-5 mb-6">{courseName}</h1>

// //               {/* Course Description */}
// //               <p className="text-richblack-200 text-lg mb-8 leading-relaxed">{courseDescription}</p>

// //               {/* Rating and Stats */}
// //               <div className="flex items-center gap-6 mb-8">
// //                 <div className="flex items-center">
// //                   <span className="text-yellow-100 font-bold text-xl mr-3">{avgReviewCount || 4.5}</span>
// //                   <RatingStars Review_Count={avgReviewCount || 4.5} Star_Size={18} />
// //                 </div>
// //                 <span className="text-richblack-400">({ratingAndReviews?.length || 650} ratings)</span>
// //                 <span className="text-richblack-400">{studentsEnrolled?.length || 332} students</span>
// //               </div>

// //               {/* Instructor and Meta Info */}
// //               <div className="flex items-center gap-8 text-richblack-400 text-sm mb-8">
// //                 <div className="flex items-center gap-2">
// //                   <span>Created by</span>
// //                   <span className="text-yellow-100 font-medium">
// //                     {instructor?.firstName || instructor?.firstname || "Instructor Name"}{" "}
// //                     {instructor?.lastName || instructor?.lastname || ""}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <BiInfoCircle />
// //                   <span>Created at {formatDate(createdAt) || "02/2020"}</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <HiOutlineGlobeAlt />
// //                   <span>English</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Sidebar - Course Preview Card */}
// //             <div className="lg:w-1/3 mt-8 lg:mt-0">
// //               <div className="bg-richblack-700 rounded-xl p-6 sticky top-8 shadow-lg">
// //                 {/* Course Thumbnail */}
// //                 <div className="relative mb-6">
// //                   <img
// //                     src={thumbnail}
// //                     alt={courseName}
// //                     className="w-full rounded-lg aspect-video object-cover"
// //                   />
// //                   <div className="absolute inset-0 flex items-center justify-center">
// //                     <button className="bg-yellow-100 text-richblack-900 p-4 rounded-full hover:scale-110 transition-transform duration-300">
// //                       <FaPlay className="text-2xl ml-1" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Price */}
// //                 <div className="mb-6">
// //                   <p className="text-4xl font-bold text-richblack-5">Rs. {price || "1,200"}</p>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="space-y-4 mb-6">
// //                   <button
// //                     className="w-full bg-yellow-100 text-richblack-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
// //                   >
// //                     Add to Cart
// //                   </button>
// //                   <button 
// //                     className="w-full bg-richblack-800 text-richblack-50 font-semibold py-3 px-6 rounded-lg border border-richblack-600 hover:bg-richblack-700 transition-colors duration-300"
// //                     onClick={handleBuyCourse}
// //                   >
// //                     Buy Now
// //                   </button>
// //                 </div>

// //                 {/* Money Back Guarantee */}
// //                 <div className="text-center mb-6">
// //                   <p className="text-richblack-400 text-sm">30-Day Money-Back Guarantee</p>
// //                 </div>

// //                 {/* Course Includes */}
// //                 <div className="mb-6">
// //                   <h3 className="text-richblack-5 font-semibold mb-4">This course includes:</h3>
// //                   <ul className="space-y-3 text-sm text-richblack-400">
// //                     <li className="flex items-center gap-3">
// //                       <MdOndemandVideo className="text-caribbeangreen-100 text-lg" />
// //                       <span>8 hours on-demand video</span>
// //                     </li>
// //                     <li className="flex items-center gap-3">
// //                       <BiInfoCircle className="text-caribbeangreen-100 text-lg" />
// //                       <span>Full Lifetime access</span>
// //                     </li>
// //                     <li className="flex items-center gap-3">
// //                       <MdAccessTime className="text-caribbeangreen-100 text-lg" />
// //                       <span>Access on Mobile and TV</span>
// //                     </li>
// //                     <li className="flex items-center gap-3">
// //                       <HiOutlineGlobeAlt className="text-caribbeangreen-100 text-lg" />
// //                       <span>Certificate of completion</span>
// //                     </li>
// //                   </ul>
// //                 </div>

// //                 {/* Share Button */}
// //                 <div className="text-center">
// //                   <button className="text-yellow-100 font-medium hover:text-yellow-200 transition-colors duration-300">
// //                     Share
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content - Side by Side Layout */}
// //       <div className="max-w-7xl mx-auto px-6 py-12">
// //         <div className="lg:flex lg:gap-12">
// //           {/* Left Content */}
// //           <div className="lg:w-2/3">
// //             {/* What You'll Learn */}
// //             <div className="mb-12 border-[1px] border-richblack-500 p-4 rounded-[10px]">
// //               <h2 className="text-2xl font-bold text-richblack-5 mb-6">What you'll learn</h2>
// //               <div className="">
// //                 <div className="text-richblack-5 gap-2 text-center flex leading-relaxed prose prose-invert max-w-none">
// //                   <div>
// //                     <FaHandPointRight className="text-caribbeangreen-100 text-2xl mb-2" />
// //                   </div>
// //                   <ReactMarkdown>
// //                     {whatYouWillLearn ||
// //                       "Introduction to Python and Python 3\nUnderstand the basics: Data types, Loops, Conditional statements, Functions and Methods\nLearn object-oriented programming in Python\nKnow how to Read and Parse CSV and XML files"}
// //                   </ReactMarkdown>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Course Content */}
// //             <div className="mb-12">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-2xl font-bold text-richblack-5">Course content</h2>
// //                 <div className="text-richblack-400 text-sm">
// //                   <span>{courseContent?.length || 10} sections</span>
// //                   <span className="mx-2">•</span>
// //                   <span>{totalNoOfLectures || 41} lectures</span>
// //                   <span className="mx-2">•</span>
// //                   <span>7h 57m total length</span>
// //                 </div>
// //               </div>

// //               {/* Collapse All Button */}
// //               <div className="mb-4">
// //                 <button className="text-yellow-100 text-sm font-medium hover:text-yellow-200 transition-colors duration-300">
// //                   Collapse all sections
// //                 </button>
// //               </div>

// //               {/* Course Sections */}
// //               <div className="space-y-2">
// //                 {courseContent?.map((course, index) => (
// //                   <CourseAccordionBar
// //                     course={course}
// //                     key={index}
// //                     isActive={isActive}
// //                     handleActive={handleActive}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Author Section */}
// //             <div className="mb-12">
// //               <h2 className="text-2xl font-bold text-richblack-5 mb-6">Author</h2>
// //               <div className="flex items-start gap-4">
// //                 <img
// //                   src={
// //                     instructor?.image ||
// //                     `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstname || "Love"} ${
// //                       instructor?.lastname || "Babbar"
// //                     }`
// //                   }
// //                   alt={instructor?.firstname}
// //                   className="w-20 h-20 rounded-full object-cover"
// //                 />
// //                 <div>
// //                   <h3 className="text-xl font-bold text-richblack-5 mb-2">
// //                     {instructor?.firstName || instructor?.firstname || "Love"}{" "}
// //                     {instructor?.lastName || instructor?.lastname || "Babbar"}
// //                   </h3>
// //                   <p className="text-richblack-400 leading-relaxed">
// //                     I will be your lead trainer in this course. Within no time, I will help you to
// //                     understand the subject in an easy manner. I have a huge experience in online
// //                     training and recording videos. Let's get started!
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Sidebar - Empty on desktop (card shown in hero) */}
// //           <div className="lg:w-1/3 hidden lg:block"></div>
// //         </div>
// //       </div>

// //       {/* Confirmation Modal */}
// //       {confirmationModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-richblack-900 bg-opacity-70 backdrop-blur-sm">
// //           <div className="bg-richblack-800 rounded-lg p-8 max-w-md mx-4 shadow-lg">
// //             <h3 className="text-xl font-semibold text-richblack-5 mb-4">{confirmationModal.text1}</h3>
// //             <p className="text-richblack-400 mb-6">{confirmationModal.text2}</p>
// //             <div className="flex gap-4">
// //               <button
// //                 onClick={confirmationModal.btn1Handler}
// //                 className="bg-yellow-100 text-richblack-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition-colors duration-300"
// //               >
// //                 {confirmationModal.btn1Text}
// //               </button>
// //               <button
// //                 onClick={confirmationModal.btn2Handler}
// //                 className="bg-richblack-600 text-richblack-50 px-6 py-2 rounded-lg font-semibold hover:bg-richblack-700 transition-colors duration-300"
// //               >
// //                 {confirmationModal.btn2Text}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <Footer />
// //     </div>
// //   );
// // }

// // export default CourseDetails;




import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdLanguage, MdAccessTime, MdOndemandVideo } from "react-icons/md";
import { FaUsers, FaStar, FaPlay } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../coponents/Footer";
import RatingStars from "../coponents/common/RatingStars";
import CourseAccordionBar from "../coponents/course/CourseAccordionBar";
import { formattedDate as formatDate } from "../utils/dateFormatter";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import { fetchCourseDetails } from "../Services/operations/courseDetailsAPI";

import { FaHandPointRight } from "react-icons/fa";
import { buycourse } from "../Services/operations/StudentsfeturesAPI";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchCourseDetails(courseId);
        console.log("Course details response:", res);

        if (!res?.data?.courseDetails) {
          setResponse({ success: false, message: "No course details available" });
          return;
        }

        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details:", error);
        setResponse({ success: false, message: error?.message || "Failed to fetch course details" });
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchDetails();
    }
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [response]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.Subsection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id)
    );
  };

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 px-4">
        <div className="text-center">
          <div className="spinner w-8 h-8 sm:w-12 sm:h-12 border-4 border-t-4 border-richblack-700 border-t-yellow-50 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-sm sm:text-base">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!response.success || !response.data?.courseDetails) {
    console.log("No course details found:", response);
    return <Error />;
  }

  const courseDetails = response.data.courseDetails;

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    totalStudent = [],
    createdAt,
  } = courseDetails;

  console.log("Course Details:", courseDetails);
  console.log("User ID:", user?._id);
  console.log("Total Students:", courseDetails?.totalStudent);
  console.log("Is Enrolled:", courseDetails?.totalStudent?.some(student => student._id === user?._id));
  
  // Check if course is in cart
  const isInCart = cart?.some(item => item._id === courseId);
  console.log("Is in cart:", isInCart);
  console.log("Cart items:", cart);

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add items to cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      setConfirmationModal({
        text1: "You are an instructor!",
        text2: "Instructors cannot add courses to cart.",
        btn1Text: "Go to Dashboard",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/dashboard"),
        btn2Handler: () => setConfirmationModal(null),
      });
      toast.error("instructor cannot buy courses");
      return;
    }

    // Check if already enrolled
    const isAlreadyEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
    if (isAlreadyEnrolled) {
      setConfirmationModal({
        text1: "You're already enrolled!",
        text2: "You have already purchased this course.",
        btn1Text: "Go to Dashboard",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/dashboard/enrolled-courses"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    // Add to cart
    dispatch(addToCart(courseDetails));
    setConfirmationModal({
      text1: "Added to Cart!",
      text2: "Course has been added to your cart successfully.",
      btn1Text: "Continue Shopping",
      btn2Text: "Go to Cart",
      btn1Handler: () => setConfirmationModal(null),
      btn2Handler: () => navigate("/dashboard/cart"),
    });
  };

  // Handle Go to Cart functionality
  const handleGoToCart = () => {
    if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("instructor cannot buy courses");
      return;
    }
    if (!token) {
      toast.error("You need to be logged in to view your cart.");
    }
    navigate("/dashboard/cart");
  };

  const handleshare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  function handlebuycourse() {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to purchase this course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      setConfirmationModal({
        text1: "You are an instructor!",
        text2: "Instructors cannot buy courses.",
        btn1Text: "Go to Dashboard",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/dashboard"),
        btn2Handler: () => setConfirmationModal(null),
      });
      toast.error("instructor cannot buy courses");
      return;
    }
    
    // Check if user is already enrolled
    const isAlreadyEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
    if (isAlreadyEnrolled) {
      setConfirmationModal({
        text1: "You're already enrolled!",
        text2: "You have already purchased this course. Go to your dashboard to continue learning.",
        btn1Text: "Go to Dashboard",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/dashboard/enrolled-courses"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    // Proceed with purchase
    buycourse(token, [courseId], user, navigate, dispatch, () => {
      // Custom success callback - navigate to enrolled courses
      setTimeout(() => {
        navigate("/dashboard/enrolled-courses");
      }, 1500);
    })
      .catch(error => {
        // Check for specific error about already enrolled
        if (error?.response?.data?.message?.includes("already enrolled")) {
          setConfirmationModal({
            text1: "You're already enrolled!",
            text2: "You have already purchased this course. Go to your dashboard to continue learning.",
            btn1Text: "Go to Dashboard",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/dashboard/enrolled-courses"),
            btn2Handler: () => setConfirmationModal(null),
          });
        } else {
          // Handle other errors
          setConfirmationModal({
            text1: "Error purchasing course",
            text2: error?.response?.data?.message || "Something went wrong. Please try again later.",
            btn1Text: "Try Again",
            btn2Text: "Cancel",
            btn1Handler: () => setConfirmationModal(null),
            btn2Handler: () => setConfirmationModal(null),
          });
        }
      });
  }

  return (
    <div className="bg-richblack-900 min-h-screen text-richblack-50">
      {/* Hero Section */}
      <div className="bg-richblack-800 shadow-blue-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="lg:flex lg:gap-8 xl:gap-12">
            {/* Left Content */}
            <div className="lg:w-2/3">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center text-xs sm:text-sm lg:text-base text-richblack-100 mb-4 sm:mb-6">
                <span>Home</span>
                <span className="mx-1 sm:mx-2 text-richblack-200">/</span>
                <span>Catalog</span>  
                <span className="mx-1 sm:mx-2">/</span>
                <span className="text-yellow-100 truncate">{courseName}</span>
              </div>

              {/* Course Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-richblack-5 mb-4 sm:mb-6 leading-tight">
                {courseName}
              </h1>

              {/* Course Description */}
              <p className="text-richblack-200 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                {courseDescription}
              </p>

              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center">
                  <span className="text-yellow-100 font-bold text-lg sm:text-xl mr-2 sm:mr-3">
                    {avgReviewCount}
                  </span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
                </div>
                <span className="text-richblack-400 text-sm sm:text-base">
                  ({ratingAndReviews?.length} ratings)
                </span>
                <span className="text-richblack-400 text-sm sm:text-base">
                  {totalStudent?.length} students
                </span>
              </div>

              {/* Instructor and Meta Info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-richblack-400 text-xs sm:text-sm mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <span>Created by</span>
                  <span className="text-yellow-100 font-medium">
                    {instructor?.firstName || instructor?.firstname || "Instructor Name"}{" "}
                    {instructor?.lastName || instructor?.lastname || ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BiInfoCircle className="flex-shrink-0" />
                  <span>Created {formatDate(createdAt) || "02/2020"}</span>
                </div> 
                <div className="flex items-center gap-2">
                  <HiOutlineGlobeAlt className="flex-shrink-0" />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* Mobile Course Card - Shows on mobile/tablet */}
            <div className="lg:hidden mt-6 sm:mt-8">
              <div className="bg-richblack-700 rounded-xl p-4 sm:p-6 shadow-lg">
                {/* Course Thumbnail */}
                <div className="relative mb-4 sm:mb-6">
                  <img
                    src={thumbnail}
                    alt={courseName}
                    className="w-full rounded-lg aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-yellow-100 text-richblack-900 p-3 sm:p-4 rounded-full hover:scale-110 transition-transform duration-300">
                      <FaPlay className="text-lg sm:text-2xl ml-0.5 sm:ml-1" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-richblack-5">
                    Rs. {price || "1,200"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <button
                    onClick={() => {
                      const isEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
                      if (isEnrolled) {
                        navigate("/dashboard/enrolled-courses");
                      } else if (isInCart) {
                        handleGoToCart();
                      } else {
                        handleAddToCart();
                      }
                    }}
                    className="w-full bg-yellow-100 text-richblack-900 font-semibold py-3 px-4 sm:px-6 rounded-lg hover:bg-yellow-200 transition-colors duration-300 text-sm sm:text-base"
                  >
                    {courseDetails?.totalStudent?.some(student => student._id === user?._id) 
                      ? "Go to Course" 
                      : isInCart 
                        ? "Go to Cart" 
                        : "Add to Cart"
                    }
                  </button>
                  <button 
                    className="w-full bg-richblack-800 text-richblack-50 font-semibold py-3 px-4 sm:px-6 rounded-lg border border-richblack-600 hover:bg-richblack-700 transition-colors duration-300 text-sm sm:text-base"
                    onClick={() => handlebuycourse()}
                  >
                    Buy Now
                  </button>
                </div>

                {/* Course Features - Mobile Condensed */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-richblack-5 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                    This course includes:
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-richblack-400">
                    <div className="flex items-center gap-2">
                      <MdOndemandVideo className="text-caribbeangreen-100 flex-shrink-0" />
                      <span>8h video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BiInfoCircle className="text-caribbeangreen-100 flex-shrink-0" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdAccessTime className="text-caribbeangreen-100 flex-shrink-0" />
                      <span>Mobile & TV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineGlobeAlt className="text-caribbeangreen-100 flex-shrink-0" />
                      <span>Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Share and Guarantee */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <p className="text-richblack-400 text-xs sm:text-sm text-center sm:text-left">
                    30-Day Money-Back Guarantee
                  </p>
                  <button 
                    onClick={handleshare} 
                    className="text-yellow-100 font-medium hover:text-yellow-200 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar - Course Preview Card */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="bg-richblack-700 rounded-xl p-6 sticky top-8 shadow-lg">
                {/* Course Thumbnail */}
                <div className="relative mb-6">
                  <img
                    src={thumbnail}
                    alt={courseName}
                    className="w-full rounded-lg aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-yellow-100 text-richblack-900 p-4 rounded-full hover:scale-110 transition-transform duration-300">
                      <FaPlay className="text-2xl ml-1" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-richblack-5">Rs. {price || "1,200"}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => {
                      const isEnrolled = courseDetails?.totalStudent?.some(student => student._id === user?._id);
                      if (isEnrolled) {
                        navigate("/dashboard/enrolled-courses");
                      } else if (isInCart) {
                        handleGoToCart();
                      } else {
                        handleAddToCart();
                      }
                    }}
                    className="w-full bg-yellow-100 text-richblack-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
                  >
                    {courseDetails?.totalStudent?.some(student => student._id === user?._id) 
                      ? "Go to Course" 
                      : isInCart 
                        ? "Go to Cart" 
                        : "Add to Cart"
                    }
                  </button>
                  <button 
                    className="w-full bg-richblack-800 text-richblack-50 font-semibold py-3 px-6 rounded-lg border border-richblack-600 hover:bg-richblack-700 transition-colors duration-300"
                    onClick={() => handlebuycourse()}
                  >
                    Buy Now
                  </button>
                </div>

                {/* Money Back Guarantee */}
                <div className="text-center mb-6">
                  <p className="text-richblack-400 text-sm">30-Day Money-Back Guarantee</p>
                </div>

                {/* Course Includes */}
                <div className="mb-6">
                  <h3 className="text-richblack-5 font-semibold mb-4">This course includes:</h3>
                  <ul className="space-y-3 text-sm text-richblack-400">
                    <li className="flex items-center gap-3">
                      <MdOndemandVideo className="text-caribbeangreen-100 text-lg flex-shrink-0" />
                      <span>8 hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BiInfoCircle className="text-caribbeangreen-100 text-lg flex-shrink-0" />
                      <span>Full Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MdAccessTime className="text-caribbeangreen-100 text-lg flex-shrink-0" />
                      <span>Access on Mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <HiOutlineGlobeAlt className="text-caribbeangreen-100 text-lg flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>

                {/* Share Button */}
                <div className="text-center">
                  <button 
                    onClick={handleshare} 
                    className="text-yellow-100 font-medium hover:text-yellow-200 transition-colors duration-300"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:flex lg:gap-8 xl:gap-12">
          {/* Left Content */}
          <div className="lg:w-2/3">
            {/* What You'll Learn */}
            <div className="mb-8 sm:mb-12 border border-richblack-500 p-4 sm:p-6 rounded-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-richblack-5 mb-4 sm:mb-6">
                What you'll learn
              </h2>
              <div className="text-richblack-5 leading-relaxed prose prose-invert max-w-none">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <FaHandPointRight className="text-caribbeangreen-100 text-lg sm:text-xl" />
                  </div>
                  <div className="text-sm sm:text-base">
                    <ReactMarkdown>
                      {whatYouWillLearn ||
                        "Introduction to Python and Python 3\nUnderstand the basics: Data types, Loops, Conditional statements, Functions and Methods\nLearn object-oriented programming in Python\nKnow how to Read and Parse CSV and XML files"}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-xl sm:text-2xl font-bold text-richblack-5">Course content</h2>
                <div className="text-richblack-400 text-xs sm:text-sm flex flex-wrap items-center gap-1 sm:gap-2">
                  <span>{courseContent?.length || 10} sections</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{totalNoOfLectures || 41} lectures</span>
                  <span className="hidden sm:inline">•</span>
                  <span>7h 57m total length</span>
                </div>
              </div>

              {/* Collapse All Button */}
              <div className="mb-4">
                <button className="text-yellow-100 text-sm font-medium hover:text-yellow-200 transition-colors duration-300">
                  Collapse all sections
                </button>
              </div>

              {/* Course Sections */}
              <div className="space-y-2">
                {courseContent?.map((course, index) => (
                  <CourseAccordionBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>
            </div>

            {/* Author Section */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-richblack-5 mb-4 sm:mb-6">Author</h2>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={
                    instructor?.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstname || "Love"} ${
                      instructor?.lastname || "Babbar"
                    }`
                  }
                  alt={instructor?.firstname}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto sm:mx-0 flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-richblack-5 mb-2">
                    {instructor?.firstName || instructor?.firstname || "Love"}{" "}
                    {instructor?.lastName || instructor?.lastname || "Babbar"}
                  </h3>
                  <p className="text-richblack-400 leading-relaxed text-sm sm:text-base">
                    I will be your lead trainer in this course. Within no time, I will help you to
                    understand the subject in an easy manner. I have a huge experience in online
                    training and recording videos. Let's get started!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile (card shown in hero) */}
          <div className="hidden lg:block lg:w-1/3"></div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-richblack-900 bg-opacity-70 backdrop-blur-sm p-4">
          <div className="bg-richblack-800 rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-richblack-5 mb-4">
              {confirmationModal.text1}
            </h3>
            <p className="text-richblack-400 mb-6 text-sm sm:text-base">
              {confirmationModal.text2}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={confirmationModal.btn1Handler}
                className="bg-yellow-100 text-richblack-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-200 transition-colors duration-300 text-sm sm:text-base"
              >
                {confirmationModal.btn1Text}
              </button>
              <button
                onClick={confirmationModal.btn2Handler}
                className="bg-richblack-600 text-richblack-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-richblack-700 transition-colors duration-300 text-sm sm:text-base"
              >
                {confirmationModal.btn2Text}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CourseDetails;