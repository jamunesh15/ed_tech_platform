// import { FiTrash2 } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { deleteProfile } from "../../Services/operations/SettingsAPI"
// import { useState } from "react"

// export default function DeleteAccount() {
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [confirmDelete, setConfirmDelete] = useState(false)



//   async function handleDeleteAccount() {
//     try {
//       dispatch(deleteProfile(token, navigate))
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   return (
//     <>
    
   
     
//       <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
//         <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
//           <FiTrash2 className="text-3xl text-pink-200" />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <h2 className="text-lg font-semibold text-richblack-5">
//             Delete Account
//           </h2>
//           <div className="w-3/5 text-pink-25">
//             <p>Would you like to delete account?</p>
//             <p>
//               This account may contain Paid Courses. Deleting your account is
//               permanent and will remove all the contain associated with it.
//             </p>
//           </div>
//           <button
//             type="button"
//             className="w-fit cursor-pointer italic text-pink-300"
//             onClick={() => setConfirmDelete(true)}
//           >
//             I want to delete my account.
//           </button>
//         </div>
   
//     {confirmDelete && (
//       <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//         <div className="bg-richblack-800 rounded-lg border border-richblack-600 w-[90%] max-w-md p-6 shadow-2xl">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-pink-700">
//                 <FiTrash2 className="text-lg text-pink-200" />
//               </div>
//               <h2 className="text-xl font-semibold text-richblack-5">
//                 Confirm Delete Account
//               </h2>  
//             </div>
//             <button
//               onClick={() => setConfirmDelete(false)}
//               className="text-richblack-400 hover:text-white text-xl"
//             >
//               ×
//             </button>
//           </div>

//           {/* Content */}
//           <div className="mb-6 space-y-3">
//             <p className="text-richblack-100 font-medium">
//               Are you sure you want to delete your account?
//             </p>
//             <p className="text-richblack-300 text-sm">
//               This action cannot be undone. All your data, courses, and progress will be permanently removed.
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 justify-end">
//             <button 
//               onClick={() => setConfirmDelete(false)}
//               className="px-6 py-2 bg-richblack-700 text-richblack-5 rounded-lg font-medium hover:bg-richblack-600 transition-all duration-200 border border-richblack-600"
//             >
//               Cancel
//             </button>
            
//             <button 
//               onClick={handleDeleteAccount}
//               className="px-6 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-all duration-200 shadow-lg hover:shadow-pink-600/25"
//             >
//               Delete Account
//             </button>
//           </div>
//         </div>
//       </div>
//     )}

//       </div>
//     </>
//   )
// }



import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../Services/operations/SettingsAPI";
import { useState } from "react";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleDeleteAccount() {
    try {
      await dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl border border-pink-700 bg-pink-900 p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="flex aspect-square h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-pink-700 flex-shrink-0">
          <FiTrash2 className="text-2xl sm:text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="text-sm sm:text-base text-pink-25 max-w-full sm:max-w-md">
            <p>Would you like to delete your account?</p>
            <p>
              This account may contain paid courses. Deleting your account is permanent and will remove all content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit text-pink-300 text-sm sm:text-base italic hover:text-pink-200 transition-colors duration-200"
            onClick={() => setConfirmDelete(true)}
            aria-label="Initiate account deletion"
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <div className="bg-richblack-800 rounded-2xl border border-richblack-600 w-full max-w-md p-4 sm:p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex aspect-square h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-pink-700">
                  <FiTrash2 className="text-lg sm:text-xl text-pink-200" />
                </div>
                <h2
                  id="confirm-delete-title"
                  className="text-lg sm:text-xl font-semibold text-richblack-5"
                >
                  Confirm Delete Account
                </h2>
              </div>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-richblack-400 hover:text-richblack-100 text-lg sm:text-xl"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
              <p className="text-richblack-100 text-sm sm:text-base font-medium">
                Are you sure you want to delete your account?
              </p>
              <p className="text-richblack-300 text-xs sm:text-sm">
                This action cannot be undone. All your data, courses, and progress will be permanently removed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 sm:px-6 py-2 bg-richblack-700 text-richblack-5 rounded-lg text-sm sm:text-base font-medium hover:bg-richblack-600 transition-all duration-200 border border-richblack-600 w-full sm:w-auto"
                aria-label="Cancel account deletion"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 sm:px-6 py-2 bg-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-pink-700 transition-all duration-200 shadow-lg hover:shadow-pink-600/25 w-full sm:w-auto"
                aria-label="Confirm account deletion"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}