import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiconnector } from '../../../Services/apiconnector'
import { ratingsEndpoints } from '../../../Services/apis'
import ReactStars from 'react-stars'
import { GiNinjaStar } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiTrash2, FiClock, FiBarChart } from "react-icons/fi"
import { removeFromCart } from '../../../redux/cartSlice'

const Totalcourses = () => {
   
    const { cart } = useSelector((state) => state.cart)
    const [avgrating, setavgrating] = useState(0)
    const dispatch = useDispatch();

    const getavgratiing = async () => {
        try {
            const response = await apiconnector("GET", ratingsEndpoints.AVG_RATING_API)
            setavgrating(response.data.data.avgrating)
        } catch (error) {
            console.error("Error fetching average rating:", error)
            setavgrating(4.5) // Default rating
        }
    }

    useEffect(() => {
        getavgratiing();
    }, [])

    const handleRemoveFromCart = (courseId) => {
        dispatch(removeFromCart(courseId))
    }

    return (
        <div className="space-y-6">
            {cart.map((course, index) => (
                <div 
                    key={index} 
                    className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-richblack-600 transition-all duration-300"
                >
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Course Image */}
                        <div className="flex-shrink-0">
                            <img 
                                src={course.thumbnail} 
                                alt={course.title}
                                className="w-full lg:w-48 h-32 lg:h-32 object-cover rounded-lg border border-richblack-700"
                            />
                        </div>

                        {/* Course Details */}
                        <div className="flex-1 space-y-4">
                            {/* Title and Description */}
                            <div>
                                <h2 className="text-richblack-5 font-semibold text-xl lg:text-2xl mb-2 line-clamp-2">
                                    {course.title}
                                </h2>
                                <p className="text-richblack-300 text-sm lg:text-base line-clamp-3">
                                    {course.description}
                                </p>
                            </div>

                            {/* Category and Level */}
                            <div className="flex flex-wrap gap-3">
                                {course.category && (
                                    <span className="bg-richblack-700 text-richblack-100 px-3 py-1 rounded-full text-sm">
                                        {course.category.name}
                                    </span>
                                )}
                                {course.instructions && course.instructions.length > 0 && (
                                    <span className="bg-yellow-900 text-yellow-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                        <FiBarChart className="text-xs" />
                                        {course.instructions.length} Requirements
                                    </span>
                                )}
                            </div>

                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-100 font-semibold text-sm">
                                        {avgrating.toFixed(1)}
                                    </span>
                                    <ReactStars  
                                        count={5}
                                        value={avgrating}
                                        size={20}
                                        edit={false}
                                        color2={"#ffd700"}
                                        color1={"#374151"}
                                        emtpyIcon={<GiNinjaStar />}
                                        fullIcon={<GiNinjaStar />}
                                    />
                                </div>
                                <p className="text-richblack-400 text-sm">
                                    ({course?.ratingAndReviews?.length || 0} reviews)
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="flex items-center gap-4 text-sm text-richblack-300">
                                {course.createdAt && (
                                    <div className="flex items-center gap-1">
                                        <FiClock className="text-xs" />
                                        <span>Added {new Date(course.createdAt).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-end gap-4 lg:w-32">
                            {/* Price */}
                            <div className="text-right">
                                <p className="text-yellow-100 font-bold text-xl lg:text-2xl">
                                    ₹{course.price}
                                </p>
                                {course.price > 0 && (
                                    <p className="text-richblack-400 text-sm line-through">
                                        ₹{Math.round(course.price * 1.5)}
                                    </p>
                                )}
                            </div>

                            {/* Remove Button */}
                            <button 
                                className="flex items-center gap-2 bg-pink-900 hover:bg-pink-800 text-pink-200 px-4 py-2 rounded-lg border border-pink-700 hover:border-pink-600 transition-all duration-300 group"
                                onClick={() => handleRemoveFromCart(course._id)}
                            >
                                <FiTrash2 className="text-sm group-hover:scale-110 transition-transform" />
                                <span className="font-medium text-sm">Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Totalcourses