// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { changePassword } from "../../Services/operations/SettingsAPI";

// export default function UpdatePassword() {
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { token } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors }
//   } = useForm();

//   const onSubmit = async (data) => {
//     if (isLoading) return;
    
//     setIsLoading(true);
    
//     try {
//       const result = await changePassword(token, {
//         currentPassword: data.currentPassword,
//         newPassword: data.newPassword
//       });

//       if (result) {
//         currentPassword='',
//         newPassword='' // Clear form on success
//       }
//     } catch (error) {
//       console.error("Password change error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="rounded-md bg-richblack-800 p-6 px-8">
//         <h2 className="text-lg font-semibold text-richblack-5 mb-6">
//           Password
//         </h2>
        
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           {/* Current Password */}
//           <div className="relative">
//             <label htmlFor="currentPassword" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
//               Current Password <span className="text-pink-200">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showCurrent ? "text" : "password"}
//                 id="currentPassword"
//                 placeholder="Enter current password"
//                 className={`form-style w-full bg-richblack-700 text-richblack-25 p-3 rounded-[10px] border-[1px] border-richblack-500 mt-[5px] pr-12 ${
//                   errors.currentPassword ? "border-red-500" : ""
//                 }`}
//                 {...register("currentPassword", {
//                   required: "Current password is required"
//                 })}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-400 hover:text-richblack-100"
//                 onClick={() => setShowCurrent(!showCurrent)}
//                 tabIndex={-1}
//               >
//                 {showCurrent ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
//               </button>
//             </div>
//             {errors.currentPassword && (
//               <span className="mt-1 text-[12px] text-yellow-100">
//                 {errors.currentPassword.message}
//               </span>
//             )}
//           </div>

//           {/* New Password */}
//           <div className="relative">
//             <label htmlFor="newPassword" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
//               New Password <span className="text-pink-200">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showNew ? "text" : "password"}
//                 id="newPassword"
//                 placeholder="Enter new password"
//                 className={`form-style w-full bg-richblack-700  text-richblack-25 p-3 rounded-[10px] border-[1px] border-richblack-500 mt-[5px] pr-12 ${
//                   errors.newPassword ? "border-red-500" : ""
//                 }`}
//                 {...register("newPassword", {
//                   required: "New password is required"
//                 })}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-400 hover:text-richblack-100"
//                 onClick={() => setShowNew(!showNew)}
//                 tabIndex={-1}
//               >
//                 {showNew ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
//               </button>
//             </div>
//             {errors.newPassword && (
//               <span className="mt-1 text-[12px] text-yellow-100">
//                 {errors.newPassword.message}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-end gap-3 mt-6">
//           <button
//             type="button"
//             className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:bg-richblack-600 transition-all duration-200"
//             onClick={() => reset()}
//             disabled={isLoading}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={`cursor-pointer rounded-md py-2 px-5 font-semibold transition-all duration-200 ${
//               isLoading
//                 ? "bg-richblack-600 text-richblack-300 cursor-not-allowed"
//                 : "bg-yellow-50 hover:bg-yellow-25 text-richblack-900"
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Updating..." : "Update Password"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }



import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { changePassword } from "../../Services/operations/SettingsAPI";

export default function UpdatePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await changePassword(token, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (result) {
        reset({
          currentPassword: "",
          newPassword: "",
        }); // Clear form on success
      }
    } catch (error) {
      console.error("Password change error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl bg-richblack-800 p-4 sm:p-6 md:p-8 border border-richblack-700 shadow-lg">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-richblack-5 mb-4 sm:mb-6">
          Password
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Current Password */}
          <div className="relative">
            <label
              htmlFor="currentPassword"
              className="mb-1 text-sm sm:text-base text-richblack-50"
            >
              Current Password <span className="text-pink-200">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                id="currentPassword"
                placeholder="Enter current password"
                className={`w-full bg-richblack-700 text-richblack-25 p-2 sm:p-3 rounded-lg border border-richblack-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 pr-10 ${
                  errors.currentPassword ? "border-pink-200" : ""
                }`}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                disabled={isLoading}
                aria-invalid={errors.currentPassword ? "true" : "false"}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-400 hover:text-richblack-100"
                onClick={() => setShowCurrent(!showCurrent)}
                aria-label={showCurrent ? "Hide current password" : "Show current password"}
                disabled={isLoading}
              >
                {showCurrent ? (
                  <AiOutlineEyeInvisible size={20} className="sm:w-6 sm:h-6" />
                ) : (
                  <AiOutlineEye size={20} className="sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="mt-1 text-xs sm:text-sm text-pink-200" role="alert">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="mb-1 text-sm sm:text-base text-richblack-50"
            >
              New Password <span className="text-pink-200">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                id="newPassword"
                placeholder="Enter new password"
                className={`w-full bg-richblack-700 text-richblack-25 p-2 sm:p-3 rounded-lg border border-richblack-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 pr-10 ${
                  errors.newPassword ? "border-pink-200" : ""
                }`}
                {...register("newPassword", {
                  required: "New password is required",
                })}
                disabled={isLoading}
                aria-invalid={errors.newPassword ? "true" : "false"}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-400 hover:text-richblack-100"
                onClick={() => setShowNew(!showNew)}
                aria-label={showNew ? "Hide new password" : "Show new password"}
                disabled={isLoading}
              >
                {showNew ? (
                  <AiOutlineEyeInvisible size={20} className="sm:w-6 sm:h-6" />
                ) : (
                  <AiOutlineEye size={20} className="sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="mt-1 text-xs sm:text-sm text-pink-200" role="alert">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            className="px-4 sm:px-6 py-2 bg-richblack-700 text-richblack-50 rounded-lg text-sm sm:text-base font-medium hover:bg-richblack-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => reset()}
            disabled={isLoading}
            aria-label="Cancel password changes"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
              isLoading
                ? "bg-richblack-600 text-richblack-300 cursor-not-allowed"
                : "bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
            }`}
            disabled={isLoading}
            aria-label="Update password"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </form>
  );
}