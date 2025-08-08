// import { useForm } from "react-hook-form"
// import { useSelector, useDispatch } from "react-redux"
// import { updateProfile } from "../../Services/operations/SettingsAPI"
// import { useEffect } from "react"
// import { toast } from "react-hot-toast"

// export default function EditProfile() {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
  
//   const { 
//     register, 
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     defaultValues: {
//       firstname: user?.firstname || "",
//       lastname: user?.lastname || "",
//       dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
//       gender: user?.additionalDetails?.gender || "",
//       contactNumber: user?.additionalDetails?.contactNumber || "",
//       about: user?.additionalDetails?.about || ""
//     }
//   })

//   // Reset form when user data changes
//   useEffect(() => {
//     if (user) {
//       reset({
//         firstname: user?.firstname || "",
//         lastname: user?.lastname || "",
//         dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
//         gender: user?.additionalDetails?.gender || "",
//         contactNumber: user?.additionalDetails?.contactNumber || "",
//         about: user?.additionalDetails?.about || ""
//       })
//     }
//   }, [user, reset])

//   const onSubmit = async (data) => {
//     try {
//       // Clean the data - remove empty strings and convert to proper format
//       const cleanedData = {
//         firstname: data.firstname?.trim() || undefined,
//         lastname: data.lastname?.trim() || undefined,
//         dateOfBirth: data.dateOfBirth || undefined,
//         gender: data.gender || undefined,
//         contactNumber: data.contactNumber?.trim() || undefined,
//         about: data.about?.trim() || undefined
//       }

//       // Remove undefined values
//       Object.keys(cleanedData).forEach(key => {
//         if (cleanedData[key] === undefined || cleanedData[key] === '') {
//           delete cleanedData[key]
//         }
//       })

//       console.log("Submitting data:", cleanedData)
//       await dispatch(updateProfile(token, cleanedData))
//     } catch (error) {
//       console.error("Error in form submission:", error)
//       toast.error(error.message || "Failed to update profile")
//     }
//   }

//   return (
//     <div className="w-full bg-richblack-800 p-6 rounded-lg border border-richblack-700 mb-6">
//       <h2 className="text-xl font-medium text-richblack-5 mb-4">Profile Information</h2>
      
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-richblack-200 block mb-1 text-sm">
//               First Name <span className="text-pink-200">*</span>
//             </label>
//             <input
//               type="text"
//               {...register("firstname", { 
//                 required: "First name is required",
//                 minLength: {
//                   value: 2,
//                   message: "First name must be at least 2 characters"
//                 }
//               })}
//               className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:border-yellow-50"
//               placeholder="Enter first name"
//               disabled={isSubmitting}
//             />
//             {errors.firstname && (
//               <span className="text-xs text-pink-200 mt-1 block">{errors.firstname.message}</span>
//             )}
//           </div>

//           <div>
//             <label className="text-richblack-200 block mb-1 text-sm">
//               Last Name <span className="text-pink-200">*</span>
//             </label>
//             <input
//               type="text"
//               {...register("lastname", { 
//                 required: "Last name is required",
//                 minLength: {
//                   value: 2,
//                   message: "Last name must be at least 2 characters"
//                 }
//               })}
//               className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:border-yellow-50"
//               placeholder="Enter last name"
//               disabled={isSubmitting}
//             />
//             {errors.lastname && (
//               <span className="text-xs text-pink-200 mt-1 block">{errors.lastname.message}</span>
//             )}
//           </div>

//           <div>
//             <label className="text-richblack-200 block mb-1 text-sm">Date of Birth</label>
//             <input
//               type="date"
//               {...register("dateOfBirth")}
//               className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:border-yellow-50"
//               disabled={isSubmitting}
//               max={new Date().toISOString().split('T')[0]} // Prevent future dates
//             />
//             {errors.dateOfBirth && (
//               <span className="text-xs text-pink-200 mt-1 block">{errors.dateOfBirth.message}</span>
//             )}
//           </div>

//           <div>
//             <label className="text-richblack-200 block mb-1 text-sm">Gender</label>
//             <select
//               {...register("gender")}
//               className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:border-yellow-50"
//               disabled={isSubmitting}
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//               <option value="Prefer not to say">Prefer not to say</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-richblack-200 block mb-1 text-sm">Contact Number</label>
//             <input
//               type="tel"
//               {...register("contactNumber", {
//                 pattern: {
//                   value: /^[0-9+\-\s()]*$/,
//                   message: "Please enter a valid phone number"
//                 },
//                 minLength: {
//                   value: 10,
//                   message: "Phone number must be at least 10 digits"
//                 }
//               })}
//               className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:border-yellow-50"
//               placeholder="Enter contact number"
//               disabled={isSubmitting}
//             />
//             {errors.contactNumber && (
//               <span className="text-xs text-pink-200 mt-1 block">{errors.contactNumber.message}</span>
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <label className="text-richblack-200 block mb-1 text-sm">About</label>
//             <textarea
//               {...register("about", {
//                 maxLength: {
//                   value: 250,
//                   message: "About cannot exceed 250 characters"
//                 }
//               })}
//               className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-3 text-richblack-5 focus:outline-none focus:border-yellow-50 resize-none"
//               rows={4}
//               placeholder="Write something about yourself..."
//               disabled={isSubmitting}
//             />
//             {errors.about && (
//               <span className="text-xs text-pink-200 mt-1 block">{errors.about.message}</span>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             type="button"
//             onClick={() => reset()}
//             className="bg-richblack-700 text-richblack-5 px-6 py-2 rounded-lg hover:bg-richblack-600 transition-all duration-200"
//             disabled={isSubmitting}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg hover:bg-yellow-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }


import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../Services/operations/SettingsAPI";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      gender: user?.additionalDetails?.gender || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
        gender: user?.additionalDetails?.gender || "",
        contactNumber: user?.additionalDetails?.contactNumber || "",
        about: user?.additionalDetails?.about || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      // Clean the data - remove empty strings and convert to proper format
      const cleanedData = {
        firstname: data.firstname?.trim() || undefined,
        lastname: data.lastname?.trim() || undefined,
        dateOfBirth: data.dateOfBirth || undefined,
        gender: data.gender || undefined,
        contactNumber: data.contactNumber?.trim() || undefined,
        about: data.about?.trim() || undefined,
      };

      // Remove undefined or empty values
      Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key] === undefined || cleanedData[key] === "") {
          delete cleanedData[key];
        }
      });

      console.log("Submitting data:", cleanedData);
      await dispatch(updateProfile(token, cleanedData));
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-richblack-800 p-4 sm:p-6 md:p-8 rounded-2xl border border-richblack-700 mb-6 sm:mb-8 shadow-lg">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-richblack-5 mb-4 sm:mb-6">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="text-richblack-200 block mb-1 text-sm sm:text-base">
              First Name <span className="text-pink-200">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              {...register("firstname", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-2 sm:p-3 text-richblack-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 disabled:opacity-50"
              placeholder="Enter first name"
              disabled={isSubmitting}
              aria-invalid={errors.firstname ? "true" : "false"}
            />
            {errors.firstname && (
              <span className="text-xs sm:text-sm text-pink-200 mt-1 block" role="alert">
                {errors.firstname.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="text-richblack-200 block mb-1 text-sm sm:text-base">
              Last Name <span className="text-pink-200">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              {...register("lastname", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-2 sm:p-3 text-richblack-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 disabled:opacity-50"
              placeholder="Enter last name"
              disabled={isSubmitting}
              aria-invalid={errors.lastname ? "true" : "false"}
            />
            {errors.lastname && (
              <span className="text-xs sm:text-sm text-pink-200 mt-1 block" role="alert">
                {errors.lastname.message}
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="text-richblack-200 block mb-1 text-sm sm:text-base">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth", {
                validate: (value) => {
                  if (value) {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    return selectedDate <= today || "Date of birth cannot be in the future";
                  }
                  return true;
                },
              })}
              className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-2 sm:p-3 text-richblack-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 disabled:opacity-50"
              disabled={isSubmitting}
              max={new Date().toISOString().split("T")[0]}
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
            />
            {errors.dateOfBirth && (
              <span className="text-xs sm:text-sm text-pink-200 mt-1 block" role="alert">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="text-richblack-200 block mb-1 text-sm sm:text-base">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-2 sm:p-3 text-richblack-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 disabled:opacity-50"
              disabled={isSubmitting}
              aria-invalid={errors.gender ? "true" : "false"}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="text-richblack-200 block mb-1 text-sm sm:text-base">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              {...register("contactNumber", {
                pattern: {
                  value: /^[0-9+\-\s()]{10,15}$/,
                  message: "Please enter a valid phone number (10-15 digits)",
                },
              })}
              className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-2 sm:p-3 text-richblack-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 disabled:opacity-50"
              placeholder="Enter contact number"
              disabled={isSubmitting}
              aria-invalid={errors.contactNumber ? "true" : "false"}
            />
            {errors.contactNumber && (
              <span className="text-xs sm:text-sm text-pink-200 mt-1 block" role="alert">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          {/* About */}
          <div className="sm:col-span-2">
            <label htmlFor="about" className="text-richblack-200 block mb-1 text-sm sm:text-base">
              About
            </label>
            <textarea
              id="about"
              {...register("about", {
                maxLength: {
                  value: 250,
                  message: "About cannot exceed 250 characters",
                },
              })}
              className="w-full bg-richblack-700 border border-richblack-600 rounded-lg p-2 sm:p-3 text-richblack-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-50 disabled:opacity-50 resize-none"
              rows={4}
              placeholder="Write something about yourself..."
              disabled={isSubmitting}
              aria-invalid={errors.about ? "true" : "false"}
            />
            {errors.about && (
              <span className="text-xs sm:text-sm text-pink-200 mt-1 block" role="alert">
                {errors.about.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-richblack-700 text-richblack-5 px-4 sm:px-6 py-2 rounded-lg hover:bg-richblack-600 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label="Cancel changes"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-50 text-richblack-900 px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-100 text-sm sm:text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label="Save profile changes"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}