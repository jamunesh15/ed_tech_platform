import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDropdownList, RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { PiLineVerticalLight } from "react-icons/pi";
import { IoIosArrowDropdown, IoIosArrowDropleft } from "react-icons/io";
import { deleteSection, deleteSubSection } from '../../../Services/operations/courseDetailsAPI';
import { RxDropdownMenu } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import Subsectionmodal from './Subsectionmodal';
import { setCourse } from '../../../redux/courseSlice';
import { toast } from 'react-hot-toast';

const Nestedview = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [visibleSections, setVisibleSections] = useState({});
    const [sectionToDelete, setSectionToDelete] = useState(null);
    const [subsectionToDelete, setSubsectionToDelete] = useState({ subId: null, sectionId: null });
    const [activeModal, setActiveModal] = useState(null);
    const [loading, setLoading] = useState({
        section: false,
        subsection: false
    });

    useEffect(() => {
        if (course?.courseContent) {
            const initialVisibility = {};
            course.courseContent.forEach(section => {
                initialVisibility[section._id] = true;
            });
            setVisibleSections(initialVisibility);
        }
    }, [course]);

    const toggleVisibility = (sectionId) => {
        setVisibleSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleDeleteSection = async () => {
        if (!sectionToDelete || !course?._id) return;

        setLoading(prev => ({ ...prev, section: true }));
        try {
            const response = await deleteSection(
                {
                    sectionId: sectionToDelete,
                    courseId: course._id
                },
                token
            );
            console.log("Section delete response:", response);

            let courseData = null;
            
            // Try to extract course data from different response formats
            if (response?.data?.success && response.data.data) {
                courseData = response.data.data;
            } else if (response?.success && response.data) {
                courseData = response.data;
            } else if (response?._id) {
                courseData = response;
            }

            if (courseData) {
                dispatch(setCourse(courseData));
                toast.success("Section deleted successfully");
                setSectionToDelete(null);
            } else {
                throw new Error("Invalid response format from server");
            }
        } catch (error) {
            console.error("Error deleting section:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to delete section");
        } finally {
            setLoading(prev => ({ ...prev, section: false }));
        }
    };

    const handleDeleteSubsection = async () => {
        if (!subsectionToDelete?.subId || !subsectionToDelete?.sectionId) return;

        setLoading(prev => ({ ...prev, subsection: true }));
        try {
            const response = await deleteSubSection(
                {
                    sectionId: subsectionToDelete.sectionId,
                    subSectionId: subsectionToDelete.subId,
                },
                token
            );
            console.log("Subsection delete response:", response);

            let courseData = null;
            
            // Try to extract course data from different response formats
            if (response?.data?.success && response.data.data) {
                courseData = response.data.data;
            } else if (response?.success && response.data) {
                courseData = response.data;
            } else if (response?._id) {
                courseData = response;
            }

            if (courseData) {
                dispatch(setCourse(courseData));
                toast.success("Lecture deleted successfully");
                setSubsectionToDelete({ subId: null, sectionId: null });
            } else {
                throw new Error("Invalid response format from server");
            }
        } catch (error) {
            console.error("Error deleting lecture:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to delete lecture");
        } finally {
            setLoading(prev => ({ ...prev, subsection: false }));
        }
    };

    const handleModalAction = (type, data = null, sectionId = null) => {
        setActiveModal({ type, data, sectionId });
        if (sectionId) {
            setVisibleSections(prev => ({
                ...prev,
                [sectionId]: true
            }));
        }
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <div className="text-richblack-5">
            <div className='bg-richblack-700 rounded-lg border border-richblack-400 overflow-hidden'>
                {course?.courseContent?.map((section) => {
                    // Debug logging for section data
                    console.log("Rendering section:", {
                        id: section._id,
                        name: section.sectionName,
                        subsections: section.Subsection?.length || 0
                    });
                    
                    return (
                        <details
                            className='group'
                            key={section._id}
                            open={visibleSections[section._id] ?? false}
                        >
                            <summary className='flex justify-between items-center p-4 hover:bg-richblack-600 transition-all cursor-pointer'>
                                <div className='flex items-center gap-3'>
                                    <RiDropdownList className="text-lg" />
                                    <span className="font-medium">{section.sectionName || "Unnamed Section"}</span>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleChangeEditSectionName(section._id, section.sectionName);
                                        }}
                                        className="hover:text-yellow-50 transition-all"
                                        disabled={loading.section || loading.subsection}
                                    >
                                        <MdEdit className="text-xl" />
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSectionToDelete(section._id);
                                        }}
                                        className={`hover:text-pink-500 transition-all ${
                                            loading.section || loading.subsection ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={loading.section || loading.subsection}
                                    >
                                        <RiDeleteBin5Line className="text-xl" />
                                    </button>

                                    <PiLineVerticalLight className="text-xl text-richblack-300" />

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleVisibility(section._id);
                                        }}
                                        className="hover:text-richblack-100 transition-all"
                                    >
                                        {visibleSections[section._id] ? (
                                            <IoIosArrowDropdown className="text-xl" />
                                        ) : (
                                            <IoIosArrowDropleft className="text-xl" />
                                        )}
                                    </button>
                                </div>
                            </summary>

                            <div className='ml-10 p-2 space-y-2 border-l-2 border-richblack-400'>
                                {section.Subsection?.map((sub) => (
                                    <div
                                        key={sub._id}
                                        className="flex justify-between items-center p-2 hover:bg-richblack-600 rounded transition-all"
                                    >
                                        <div
                                            className="flex items-center gap-2 cursor-pointer"
                                            onClick={() => handleModalAction('view', sub, section._id)}
                                        >
                                            <RxDropdownMenu />
                                            <span>{sub.title}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleModalAction('edit', { ...sub, sectionId: section._id }, section._id)}
                                                className="hover:text-yellow-50 transition-all"
                                                disabled={loading.section || loading.subsection}
                                            >
                                                <MdEdit className="text-lg" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSubsectionToDelete({ subId: sub._id, sectionId: section._id });
                                                }}
                                                className={`hover:text-pink-500 transition-all ${
                                                    loading.section || loading.subsection ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                disabled={loading.section || loading.subsection}
                                            >
                                                <RiDeleteBin5Line className="text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    className='bg-yellow-50 text-richblack-900 px-6 p-2 gap-1 hover:underline rounded-lg font-bold hover:bg-yellow-100 hover:scale-95 transition-all flex items-center justify-center min-w-[120px]'
                                    onClick={() => handleModalAction('add', section._id, section._id)}
                                    disabled={loading.section || loading.subsection}
                                >
                                    <FiPlusCircle className='font-bold' />
                                    <p>Add lecture</p>
                                </button>
                            </div>
                        </details>
                    );
                })}
            </div>

            {/* Subsection Modal */}
            {activeModal && (
                <Subsectionmodal
                    modaldata={activeModal.data}
                    setmodaldata={closeModal}
                    view={activeModal.type === 'view'}
                    edit={activeModal.type === 'edit'}
                    add={activeModal.type === 'add'}
                />
            )}

            {/* Section Delete Confirmation Modal */}
            {sectionToDelete && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-richblack-800 p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Delete Section</h3>
                        <p className="text-richblack-100 mb-6">
                            Are you sure you want to delete this section? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-lg bg-richblack-600 hover:bg-richblack-700 transition-all"
                                onClick={() => setSectionToDelete(null)}
                                disabled={loading.section}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all text-white"
                                onClick={handleDeleteSection}
                                disabled={loading.section}
                            >
                                {loading.section ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subsection Delete Confirmation Modal */}
            {subsectionToDelete.subId && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-richblack-800 p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Delete Lecture</h3>
                        <p className="text-richblack-100 mb-6">
                            Are you sure you want to delete this lecture? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-lg bg-richblack-600 hover:bg-richblack-700 transition-all"
                                onClick={() => setSubsectionToDelete({ subId: null, sectionId: null })}
                                disabled={loading.subsection}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all text-white"
                                onClick={handleDeleteSubsection}
                                disabled={loading.subsection}
                            >
                                {loading.subsection ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nestedview;
