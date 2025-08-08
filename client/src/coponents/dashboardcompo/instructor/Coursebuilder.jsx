import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaPlus } from "react-icons/fa";
import { setCourse, setEditCourse, setStep } from "../../../redux/courseSlice";
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from "react-icons/fi";
import Nestedview from './Nestedview';
import toast from 'react-hot-toast';
import { updateSection, createSection } from '../../../Services/operations/courseDetailsAPI';

const Coursebuilder = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editsection, setEditsection] = useState(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const handleCancelEdit = () => {
    setEditsection(null);
    setValue("sectionName", "");
  };

  const handleNext = () => {
    if (!course?.courseContent?.length) {
      toast.error("Please add at least one section");
      return;
    }
    if (course.courseContent.some(section => !section.Subsection?.length)) {
      toast.error("Please add at least one lecture to each section");
      return;
    }
    dispatch(setStep(3));
  };

  const handleBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = editsection 
        ? await updateSection({
            sectionName: data.sectionName,
            sectionId: editsection,
            courseId: course._id
          }, token)
        : await createSection({
            sectionName: data.sectionName,
            courseId: course._id
          }, token);

      if (result) {
        dispatch(setCourse(result));
        handleCancelEdit();
      } else {
        toast.error("Failed to process section");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editsection === sectionId) {
      handleCancelEdit();
      return;
    }
    setEditsection(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="text-richblack-5">
      <div className='bg-richblack-800 rounded-[10px] border border-richblack-400 p-5'>
        <h1 className="text-2xl font-semibold mb-4">Course Builder</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mb-6'>
            <label className='text-richblack-25 text-[20px]'>
              Section name<sup className='text-pink-200'>*</sup>
            </label>
            <input
              className='bg-richblack-700 rounded-[5px] p-2 text-richblack-5 outline-none'
              type="text"
              placeholder='Enter section name'
              {...register("sectionName", { required: true })}
            />
            {errors.sectionName && (
              <span className='text-pink-200'>Section name is required</span>
            )}
          </div>

          <div className='mb-6 flex gap-2'>
            <button
              className='bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-100 hover:scale-95 transition-all flex items-center justify-center min-w-[120px]'
              type='submit'
              disabled={loading}
            >
              {loading ? "Loading..." : (
                <>
                  <FiPlusCircle className='mr-1 font-bold' size={20} />
                  {editsection ? "Update Section" : "Create Section"}
                </>
              )}
            </button>
            {editsection && (
              <button
                className='bg-richblack-700 text-richblack-5 px-6 py-2 rounded-lg font-bold hover:bg-richblack-600 hover:scale-95 transition-all flex items-center justify-center min-w-[120px]'
                onClick={handleCancelEdit}
                type='button'
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {course?.courseContent?.length > 0 && (
          <Nestedview handleChangeEditSectionName={  handleChangeEditSectionName} />
        )}

        <div className='flex justify-end gap-3 mt-6'>
          <button
            className='bg-richblack-500 rounded-[10px] hover:underline hover:bg-richblack-600 transition-all duration-200 hover:scale-95 w-[100px] py-2'
            type='button'
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className='bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-100 hover:scale-95 transition-all flex items-center justify-center min-w-[100px] hover:underline'
            type='button'
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coursebuilder;



