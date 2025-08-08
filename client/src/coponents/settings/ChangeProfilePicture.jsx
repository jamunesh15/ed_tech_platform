// import { useRef, useState } from "react";
// import { FiUpload } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { updateDisplayPicture } from "../../Services/operations/SettingsAPI";
// import { toast } from "react-hot-toast";

// export default function ChangeProfilePicture() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();
    
//   const [imageFile, setImageFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(user?.image || "");
//   const fileInputRef = useRef(null);
//   const [loading, setLoading] = useState(false);

  
//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         toast.error("Please select an image file");
//         return;
//       }

//       // Validate file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("File size too large (max 5MB)");
//         return;
//       }

//       setImageFile(file);
//       // Create preview
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setPreviewSource(reader.result);
//       };
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (!imageFile) {
//         toast.error("Please select an image first");
//         return;
//       }

//       if (!token) {
//         toast.error("Please login first");
//         return;
//       }

//       setLoading(true);
      
//       const formData = new FormData();
//       formData.append("displayPicture", imageFile);

//        dispatch(updateDisplayPicture(token, formData));
      
//       // Reset form on success
//       setImageFile(null);
      
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error(error.message || "Failed to upload image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full bg-richblack-800 p-6 rounded-lg border border-richblack-700 mb-6">
//       <h2 className="text-xl font-medium text-richblack-5 mb-4">
//         Change Profile Picture
//       </h2>
//       <div className="flex items-center gap-4">
//         <img
//           src={
//             previewSource ||
//             `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
//           }
//           alt="Profile"
//           className="w-16 h-16 rounded-full object-cover"
//         />
//         <div className="flex gap-3">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*"
//           />
//           <button
//             onClick={handleClick}
//             disabled={loading}
//             className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg hover:bg-richblack-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Select
//           </button>
//           <button
//             onClick={handleUpload}
//             disabled={!imageFile || loading}
//             className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               "Uploading..."
//             ) : (
//               <>
//                 <FiUpload /> Upload
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//       <div className="mt-4 text-xs text-richblack-200">
//         <p>Max file size: 5MB</p>
//         <p>Supported formats: JPG, PNG, JPEG</p>
//       </div>
//     </div>
//   );
// }



import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../Services/operations/SettingsAPI";
import { toast } from "react-hot-toast";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(user?.image || "");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file (JPG, PNG, JPEG)");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large (max 5MB)");
        return;
      }

      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  };

  const handleUpload = async () => {
    try {
      if (!imageFile) {
        toast.error("Please select an image first");
        return;
      }

      if (!token) {
        toast.error("Please login first");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      await dispatch(updateDisplayPicture(token, formData));

      // Reset form on success
      setImageFile(null);
      setPreviewSource(user?.image || "");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-richblack-800 p-4 sm:p-6 md:p-8 rounded-2xl border border-richblack-700 mb-6 sm:mb-8 shadow-lg">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-richblack-5 mb-4 sm:mb-6">
        Change Profile Picture
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <img
          src={
            previewSource ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || 'User'} ${
              user?.lastName || ''
            }`
          }
          alt={`${user?.firstName || 'User'} ${user?.lastName || ''} profile`}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-richblack-600"
          loading="lazy"
        />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg,image/png,image/jpg"
            id="profilePicture"
            aria-label="Select profile picture"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-richblack-700 text-richblack-50 px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-richblack-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            aria-label="Select image file"
          >
            Select
          </button>
          <button
            onClick={handleUpload}
            disabled={!imageFile || loading}
            className="bg-yellow-50 text-richblack-900 px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-yellow-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            aria-label="Upload profile picture"
          >
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <FiUpload className="text-lg" />
                Upload
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-4 text-xs sm:text-sm text-richblack-200">
        <p>Max file size: 5MB</p>
        <p>Supported formats: JPG, PNG, JPEG</p>
      </div>
    </div>
  );
}