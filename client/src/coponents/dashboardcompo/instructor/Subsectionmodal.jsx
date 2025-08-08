import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createSubSection, updateSubSection } from '../../../Services/operations/courseDetailsAPI';
import { setCourse } from '../../../redux/courseSlice';
import { RxCross2 } from "react-icons/rx";
import CompactUpload from './CompactUpload';
import toast from 'react-hot-toast';

const Subsectionmodal = ({ 
  modaldata, 
  setmodaldata, 
  view = false, 
  edit = false, 
  add = false 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setValue, 
    getValues, 
    reset,
    watch 
  } = useForm({
    mode: "onChange"
  });
  
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Watch for debugging
  const formValues = watch();
  console.log('Form Values:', formValues);

  useEffect(() => {
    if (view || edit) {
      // Only reset if we have modaldata and it contains the necessary fields
      if (modaldata?.title || modaldata?.description || modaldata?.videoUrl) {
        reset({
          lectureTitle: modaldata.title || '',
          lectureDescription: modaldata.description || '',
          lectureVideo: modaldata.videoUrl || ''
        });
      }
    } else {
      // Reset form when not in view or edit mode
      reset({
        lectureTitle: '',
        lectureDescription: '',
        lectureVideo: ''
      });
    }
  }, [modaldata, reset, view, edit]);

  const isFormUpdated = () => {
    if (!edit) return true;
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modaldata.title ||
      currentValues.lectureDescription !== modaldata.description ||
      (currentValues.lectureVideo instanceof FileList) ||
      (typeof currentValues.lectureVideo === 'string' && 
       currentValues.lectureVideo !== modaldata.videoUrl)
    );
  };

  const handleEdit = async (data) => {
    const formData = new FormData();
    
    // Log the input data and modaldata for debugging
    console.log('Edit Input Data:', data);
    console.log('Modal Data:', modaldata);
    console.log('Course Data:', course);
    
    // Always include these required fields
    formData.append("sectionId", modaldata.sectionId);
    formData.append("subSectionId", modaldata._id);
    formData.append("courseId", course._id);
    
    // Always send title and description, even if unchanged
    formData.append("title", data.lectureTitle.trim());
    formData.append("description", data.lectureDescription.trim());
    
    // Handle video update with detailed logging
    console.log("Processing video for edit...");
    console.log("Video data:", data.lectureVideo);
    console.log("Video type:", typeof data.lectureVideo);
    console.log("Is File:", data.lectureVideo instanceof File);
    console.log("Is FileList:", data.lectureVideo instanceof FileList);
    
    if (data.lectureVideo instanceof File) {
      console.log('✅ Uploading new video file (File object):', data.lectureVideo.name);
      formData.append("video", data.lectureVideo);
    } else if (data.lectureVideo instanceof FileList && data.lectureVideo.length > 0) {
      console.log('✅ Uploading new video file (FileList[0]):', data.lectureVideo[0].name);
      formData.append("video", data.lectureVideo[0]);
    } else {
      console.log('No new video file provided, keeping existing video');
    }

    setLoading(true);
    try {
      const response = await updateSubSection(formData, token);
      console.log("Update response:", response);

      // The backend returns the full updated course data
      // Handle different response formats but expect the full course
      let courseData = null;
      
      // Case 1: Standard response with data.success
      if (response?.data?.success) {
        courseData = response.data.data;
      }
      // Case 2: Direct response with success flag
      else if (response?.success) {
        courseData = response.data;
      }
      // Case 3: Direct course data response
      else if (response?._id) {
        courseData = response;
      }

      if (courseData) {
        dispatch(setCourse(courseData));
        toast.success("Lecture updated successfully");
        setmodaldata(null);
      } else {
        throw new Error("Invalid response format from server");
      }
      
    } catch (error) {
      console.error("Error updating lecture:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    console.log("=== LECTURE ADD DEBUG ===");
    console.log("Form data received:", data);
    console.log("Lecture video:", data.lectureVideo);
    console.log("Video type:", typeof data.lectureVideo);
    console.log("Is File object:", data.lectureVideo instanceof File);
    console.log("Is FileList:", data.lectureVideo instanceof FileList);
    console.log("=========================");

    // Validate required fields
    if (!data.lectureTitle?.trim()) {
      toast.error("Please enter a lecture title");
      return;
    }

    if (!data.lectureDescription?.trim()) {
      toast.error("Please enter a lecture description");
      return;
    }

    if (!data.lectureVideo) {
      toast.error("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modaldata);
    formData.append("title", data.lectureTitle.trim());
    formData.append("description", data.lectureDescription.trim());
    
    // Handle video file - Fixed validation logic
    console.log("Processing video file...");
    let videoAdded = false;
    
    if (data.lectureVideo instanceof File) {
      formData.append("video", data.lectureVideo);
      console.log("✅ Appended File to formData:", data.lectureVideo.name);
      videoAdded = true;
    } else if (data.lectureVideo instanceof FileList && data.lectureVideo.length > 0) {
      formData.append("video", data.lectureVideo[0]);
      console.log("✅ Appended FileList[0] to formData:", data.lectureVideo[0].name);
      videoAdded = true;
    } else if (typeof data.lectureVideo === 'string' && data.lectureVideo.trim()) {
      formData.append("videoUrl", data.lectureVideo);
      console.log("✅ Appended video URL to formData");
      videoAdded = true;
    }
    
    if (!videoAdded) {
      console.error("❌ No valid video found!");
      toast.error("Please provide a valid video file");
      return;
    }

    console.log("=== VIDEO FORMDATA DEBUG ===");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
      if (value instanceof File) {
        console.log(`  - File name: ${value.name}`);
        console.log(`  - File size: ${value.size}`);
        console.log(`  - File type: ${value.type}`);
      }
    }
    console.log("============================");

    setLoading(true);
    try {
      const result = await createSubSection(formData, token);
      
      if (result) {
        // The backend returns the full updated course data
        // So we can directly dispatch it to update the course state
        dispatch(setCourse(result));
        toast.success("Lecture added successfully");
        setmodaldata(null);
      }
    } catch (error) {
      console.error("Error adding lecture:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      // Error toast is now handled in the API function
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    
    if (view) {
      setmodaldata(null);
      return;
    }

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to update");
        return;
      }
      await handleEdit(data);
      return;
    }

    if (add) {
      await handleAdd(data);
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-richblack-700 rounded-[10px] border-2 border-richblack-400 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-richblack-700 p-4 border-b border-richblack-600">
          <div className="flex justify-between items-center">
            <p className="text-richblack-25 font-semibold text-lg">
              {view ? "Viewing" : edit ? "Editing" : "Adding"} Lecture
            </p>
            <button 
              type="button" 
              onClick={() => !loading && setmodaldata(null)}
              className="text-richblack-400 hover:text-white transition-all"
              disabled={loading}
            >
              <RxCross2 className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CompactUpload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modaldata.videoUrl : undefined}
              editData={edit ? modaldata.videoUrl : undefined}
              disabled={view}
              required={!view}
            />          <div className="flex flex-col gap-2">
            <label className="text-richblack-5">
              Lecture Title<sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              className="outline-none bg-richblack-800 text-richblack-5 p-2 rounded-md border border-richblack-500"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { 
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters"
                }
              })}
              disabled={view}
            />
            {errors.lectureTitle && (
              <span className="text-pink-200 text-sm">
                {errors.lectureTitle.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-richblack-5">
              Lecture Description<sup className="text-pink-200">*</sup>
            </label>
            <textarea
              className="outline-none bg-richblack-800 text-richblack-5 p-2 rounded-md border border-richblack-500 min-h-[100px]"
              placeholder="Enter Lecture Description"
              {...register("lectureDescription", { 
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters"
                }
              })}
              disabled={view}
            />
            {errors.lectureDescription && (
              <span className="text-pink-200 text-sm">
                {errors.lectureDescription.message}
              </span>
            )}
          </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setmodaldata(null)}
                className="bg-richblack-600 text-richblack-5 px-4 py-2 rounded-lg font-medium hover:bg-richblack-500 transition-all"
                disabled={loading || isSubmitting}
              >
                Cancel
              </button>
              {!view && (
                <button
                  type="submit"
                  className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || isSubmitting}
                >
                  {(loading || isSubmitting) ? (
                    <span className="flex items-center gap-2">
                      <svg 
                        className="animate-spin h-4 w-4 text-richblack-900" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : edit ? "Save Changes" : "Add Lecture"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subsectionmodal;


