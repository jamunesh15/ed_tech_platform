import React from 'react'
import { useSelector } from 'react-redux'
import { TbEdit } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-full text-richblack-5'>
      <h1 className='text-2xl md:text-3xl font-medium mb-10 md:mb-8'>My Profile</h1>

      {/* Profile Card */}
      <div className='flex flex-col w-full max-w-4xl rounded-xl border border-richblack-600 mx-auto bg-richblack-800 p-4 md:p-6 mb-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Left Section - Profile Info */}
          <div className='flex items-center gap-4 w-full md:w-auto'>
            {/* Profile Image */}
            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-richblack-600'>
              <img 
                src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstname} ${user?.lastname}`} 
                  alt="Profile" 
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstname || 'User'} ${user?.lastname || ''}`;
                  }}
                />
              </div>
              
              {/* User Details */}
              <div className='flex flex-col gap-1'>
                <h2 className='text-xl md:text-2xl font-semibold'>
                  {user?.firstname || 'User'} {user?.lastname || ''}
                </h2>
                <p className='text-richblack-300 text-sm md:text-base'>{user?.email}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button 
              className='bg-yellow-50 flex text-center items-center justify-between w-[80px] hover:scale-95 hover:underline text-richblack-900 px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 text-sm md:text-base'
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            >
              Edit
              <span><TbEdit/></span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className='flex flex-col w-full max-w-4xl rounded-xl border border-richblack-600 mx-auto bg-richblack-800 p-4 md:p-6 mb-6'>
          {/* Section Header */}
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl md:text-2xl font-medium'>About</h2>
            <button 
              className='bg-yellow-50 flex text-center items-center justify-between w-[80px] hover:scale-95 hover:underline text-richblack-900 px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 text-sm md:text-base'
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            >
              Edit
              <span><TbEdit/></span>
            </button>
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-richblack-600 mb-4'></div>

          {/* About Content */}
          <div className='w-full'>
            <p className='text-richblack-100 text-left break-words'>
              {user?.additionalDetails?.about || "Write something about yourself..."}
            </p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className='flex flex-col w-full max-w-4xl rounded-xl border border-richblack-600 mx-auto bg-richblack-800 p-4 md:p-6'>
          {/* Section Header */}
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl md:text-2xl font-medium'>Personal Details</h2>
            <button 
              className='bg-yellow-50 flex text-center items-center justify-between w-[80px] hover:scale-95 hover:underline text-richblack-900 px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200 text-sm md:text-base'
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            >
              Edit
              <span><TbEdit/></span>
            </button>
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-richblack-600 mb-4'></div>

          {/* Details Container */}
          <div className='w-full md:w-10/12 lg:w-8/12'>
            {/* Name Row */}
            <div className='flex flex-col md:flex-row justify-between gap-6 mb-6'>
              <div className='flex-1'>
                <p className='text-sm text-richblack-200 mb-1'>First Name</p>
                <p className='font-medium text-richblack-5 text-lg'>
                  {user?.firstname || "Not specified"}
                </p>
              </div>
              
              <div className='flex-1'>
                <p className='text-sm text-richblack-200 mb-1'>Last Name</p>
                <p className='font-medium text-richblack-5 text-lg'>
                  {user?.lastname || "Not specified"}
                </p>
              </div>
            </div>

            {/* Contact Row */}
            <div className='flex flex-col md:flex-row justify-between gap-6 mb-6'>
              <div className='flex-1'>
                <p className='text-sm text-richblack-200 mb-1'>Email</p>
                <p className='font-medium text-richblack-5 text-lg break-all'>
                  {user?.email || "Not specified"}
                </p>
              </div>
              
              <div className='flex-1'>
                <p className='text-sm text-richblack-200 mb-1'>Phone Number</p>
                <p className='font-medium text-richblack-5 text-lg'>
                  {user?.additionalDetails?.contactNumber || "Not specified"}
                </p>
              </div>
            </div>

            {/* Personal Info Row */}
            <div className='flex flex-col md:flex-row justify-between gap-6'>
              <div className='flex-1'>
                <p className='text-sm text-richblack-200 mb-1'>Gender</p>
                <p className='font-medium text-richblack-5 text-lg'>
                  {user?.additionalDetails?.gender || "Not specified"}
                </p>
              </div>
              
              <div className='flex-1'>
                <p className='text-sm text-richblack-200 mb-1'>Date of Birth</p>
                <p className='font-medium text-richblack-5 text-lg'>
                  {user?.additionalDetails?.dateOfBirth || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MyProfile


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { TbEdit } from 'react-icons/tb';
// import { useNavigate } from 'react-router-dom';

// const MyProfile = () => {
//   const { user } = useSelector((state) => state.profile);
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col w-full min-h-screen bg-richblack-900 text-richblack-5">
//       <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8">
//           My Profile
//         </h1>

//         {/* Profile Card */}
//         <div className="flex flex-col w-full rounded-2xl border border-richblack-600 bg-richblack-800 p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
//             {/* Left Section - Profile Info */}
//             <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
//               {/* Profile Image */}
//               <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-richblack-600">
//                 <img
//                   src={
//                     user?.image ||
//                     `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstname || 'User'} ${
//                       user?.lastname || ''
//                     }`
//                   }
//                   alt={`${user?.firstname || 'User'} ${user?.lastname || ''} profile`}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${
//                       user?.firstname || 'User'
//                     } ${user?.lastname || ''}`;
//                   }}
//                   loading="lazy"
//                 />
//               </div>

//               {/* User Details */}
//               <div className="flex flex-col gap-1">
//                 <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
//                   {user?.firstname || 'User'} {user?.lastname || ''}
//                 </h2>
//                 <p className="text-richblack-300 text-sm sm:text-base break-all">
//                   {user?.email || 'Not specified'}
//                 </p>
//               </div>
//             </div>

//             {/* Edit Button */}
//             <button
//               className="flex items-center justify-center gap-1 w-full sm:w-24 bg-yellow-50 text-richblack-900 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:bg-yellow-100 hover:scale-95 transition-all duration-200"
//               onClick={() => navigate('/dashboard/settings')}
//               aria-label="Edit profile"
//             >
//               Edit
//               <TbEdit className="text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="flex flex-col w-full rounded-2xl border border-richblack-600 bg-richblack-800 p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
//           {/* Section Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">About</h2>
//             <button
//               className="flex items-center justify-center gap-1 w-full sm:w-24 bg-yellow-50 text-richblack-900 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:bg-yellow-100 hover:scale-95 transition-all duration-200"
//               onClick={() => navigate('/dashboard/settings')}
//               aria-label="Edit about section"
//             >
//               Edit
//               <TbEdit className="text-lg" />
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="h-px w-full bg-richblack-600 mb-4"></div>

//           {/* About Content */}
//           <div className="w-full">
//             <p className="text-richblack-100 text-sm sm:text-base leading-relaxed">
//               {user?.additionalDetails?.about || 'Write something about yourself...'}
//             </p>
//           </div>
//         </div>

//         {/* Personal Details Section */}
//         <div className="flex flex-col w-full rounded-2xl border border-richblack-600 bg-richblack-800 p-4 sm:p-6 shadow-lg">
//           {/* Section Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Personal Details</h2>
//             <button
//               className="flex items-center justify-center gap-1 w-full sm:w-24 bg-yellow-50 text-richblack-900 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:bg-yellow-100 hover:scale-95 transition-all duration-200"
//               onClick={() => navigate('/dashboard/settings')}
//               aria-label="Edit personal details"
//             >
//               Edit
//               <TbEdit className="text-lg" />
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="h-px w-full bg-richblack-600 mb-4"></div>

//           {/* Details Container */}
//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//             {/* Name Row */}
//             <div>
//               <p className="text-sm text-richblack-200 mb-1">First Name</p>
//               <p className="font-medium text-richblack-5 text-base sm:text-lg">
//                 {user?.firstname || 'Not specified'}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-richblack-200 mb-1">Last Name</p>
//               <p className="font-medium text-richblack-5 text-base sm:text-lg">
//                 {user?.lastname || 'Not specified'}
//               </p>
//             </div>

//             {/* Contact Row */}
//             <div>
//               <p className="text-sm text-richblack-200 mb-1">Email</p>
//               <p className="font-medium text-richblack-5 text-base sm:text-lg break-all">
//                 {user?.email || 'Not specified'}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-richblack-200 mb-1">Phone Number</p>
//               <p className="font-medium text-richblack-5 text-base sm:text-lg">
//                 {user?.additionalDetails?.contactNumber || 'Not specified'}
//               </p>
//             </div>

//             {/* Personal Info Row */}
//             <div>
//               <p className="text-sm text-richblack-200 mb-1">Gender</p>
//               <p className="font-medium text-richblack-5 text-base sm:text-lg">
//                 {user?.additionalDetails?.gender || 'Not specified'}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-richblack-200 mb-1">Date of Birth</p>
//               <p className="font-medium text-richblack-5 text-base sm:text-lg">
//                 {user?.additionalDetails?.dateOfBirth || 'Not specified'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;