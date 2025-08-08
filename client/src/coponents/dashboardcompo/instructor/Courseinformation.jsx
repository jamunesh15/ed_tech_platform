import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { toast } from 'react-hot-toast';
import Upload from "./Upload";
import ChipInput from './ChipInput';
import Requirements from './Requirements';
import { setCourse, setStep } from "../../../redux/courseSlice";
import { COURSE_STATUS } from '../../../utils/constants';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../Services/operations/courseDetailsAPI';

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Watch thumbnail for validation
  const thumbnail = watch("thumbnailImage");

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchCourseCategories();
        setCategories(response);
        
        if (editCourse && course) {
          setValue("courseTitle", course.courseName);
          setValue("courseShortDesc", course.courseDescription);
          setValue("coursePrice", course.price);
          setValue("courseTags", course.tag);
          setValue("courseBenefits", course.whatYouWillLearn);
          setValue("courseRequirements", course.instructions);
          setValue("courseCategory", course.category._id);
          setValue("thumbnailImage", course.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [course, editCourse, setValue]);

  const onSubmit = async (data) => {
    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Form data received:", data);
    console.log("Thumbnail image:", data.thumbnailImage);
    console.log("Thumbnail type:", typeof data.thumbnailImage);
    console.log("Is File object:", data.thumbnailImage instanceof File);
    console.log("All form fields:", Object.keys(data));
    console.log("================================");

    try {
      setLoading(true);
      const formData = new FormData();
      
      if (editCourse) {
        formData.append("courseId", course._id);
      }
      
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("tag", JSON.stringify(data.courseTags));
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      
      // Handle thumbnail image
      console.log("Processing thumbnail image...");
      console.log("Thumbnail image type:", typeof data.thumbnailImage);
      console.log("Thumbnail image:", data.thumbnailImage);
      console.log("Is FileList:", data.thumbnailImage instanceof FileList);
      console.log("Is File:", data.thumbnailImage instanceof File);
      
      let thumbnailAdded = false;
      
      if (data.thumbnailImage instanceof File) {
        formData.append("thumbnailImage", data.thumbnailImage);
        console.log("✅ Appended File to formData:", data.thumbnailImage.name);
        thumbnailAdded = true;
      } else if (data.thumbnailImage instanceof FileList && data.thumbnailImage.length > 0) {
        formData.append("thumbnailImage", data.thumbnailImage[0]);
        console.log("✅ Appended FileList[0] to formData:", data.thumbnailImage[0].name);
        thumbnailAdded = true;
      } else if (editCourse && course.thumbnail) {
        // For edit mode, use existing thumbnail URL
        formData.append("existingThumbnail", course.thumbnail);
        console.log("✅ Appended existing thumbnail URL to formData");
        thumbnailAdded = true;
      }
      
      if (!thumbnailAdded) {
        console.error("❌ No valid thumbnail found!");
        toast.error("Please select a valid thumbnail image");
        setLoading(false);
        return;
      }

      console.log("=== FINAL FORMDATA DEBUG ===");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
        if (value instanceof File) {
          console.log(`  - File name: ${value.name}`);
          console.log(`  - File size: ${value.size}`);
          console.log(`  - File type: ${value.type}`);
        }
      }
      console.log("============================");

      const result = editCourse 
        ? await editCourseDetails(formData, token)
        : await addCourseDetails(formData, token);

      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
        toast.success(editCourse ? "Course updated successfully" : "Course created successfully");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-richblack-800 p-3 rounded-lg border border-richblack-700">
      <h2 className="text-2xl font-semibold mb-6">Course Information</h2>

    

      {/* Course Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          className="w-full bg-richblack-700 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: "Course title is required" })}
        />
        {errors.courseTitle && (
          <p className="mt-1 text-xs text-pink-200">{errors.courseTitle.message}</p>
        )}
      </div>

      {/* Course Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Course Description<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          className="w-full bg-richblack-700 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 min-h-[120px]"
          placeholder="Enter Course Description"
          {...register("courseShortDesc", { required: "Description is required" })}
        />
        {errors.courseShortDesc && (
          <p className="mt-1 text-xs text-pink-200">{errors.courseShortDesc.message}</p>
        )}
      </div>


        {/* Course Thumbnail */}
      <div className="mb-6">
        <Upload
          name="thumbnailImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          video={false}
          viewData={editCourse ? course?.thumbnail : null}
          required={true}
        />
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Price<sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-200" />
          <input
            type="number"
            className="w-full bg-richblack-700 p-3 pl-10 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            placeholder="Enter Course Price"
            {...register("coursePrice", { 
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" }
            })}
          />
        </div>
        {errors.coursePrice && (
          <p className="mt-1 text-xs text-pink-200">{errors.coursePrice.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Category<sup className="text-pink-200">*</sup>
        </label>
        <select
          className="w-full bg-richblack-700 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          {...register("courseCategory", { required: "Category is required" })}
          defaultValue={editCourse ? course?.category?._id : ""}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <p className="mt-1 text-xs text-pink-200">{errors.courseCategory.message}</p>
        )}
      </div>

      {/* Tags */}
      <div className="mb-6">
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags"
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Benefits of the Course<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          className="w-full bg-richblack-700 p-3 rounded-lg border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 min-h-[120px]"
          placeholder="What will students learn in this course?"
          {...register("courseBenefits", { required: "Benefits are required" })}
        />
        {errors.courseBenefits && (
          <p className="mt-1 text-xs text-pink-200">{errors.courseBenefits.message}</p>
        )}
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <Requirements
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => dispatch(setStep(1))}
          className="bg-richblack-300 text-richblack-900 px-6 py-2 rounded-lg font-medium hover:bg-richblack-200 transition-all"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all flex items-center justify-center min-w-[120px]"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-richblack-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editCourse ? "Saving..." : "Creating..."}
            </div>
          ) : editCourse ? "Save Changes" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default CourseInformation;


