import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiTag, FiCreditCard } from 'react-icons/fi'
import { BsLightning } from 'react-icons/bs'
import { buycourse } from '../../../Services/operations/StudentsfeturesAPI'
import { useDispatch } from 'react-redux'

const Totalamount = () => {

    const { cart, total, totalItems } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    const handlebuycourse = () => {
        // Check if user is logged in
        if (!token) {
            navigate("/login")
            return
        }

        // Extract course IDs from cart
        const courses = cart.map((course) => course._id)
        console.log("Courses to buy:", courses);
        
        // Call the buycourse function with cart courses
        buycourse(token, courses, user, navigate, dispatch, () => {
            // Success callback - navigate to enrolled courses after payment
            setTimeout(() => {
                navigate("/dashboard/enrolled-courses");
            }, 1500);
        })
    }

    const originalTotal = cart.reduce((acc, course) => acc + (course.price * 1.5), 0)
    const savings = originalTotal - total

    return (
        <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 sticky top-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <FiShoppingBag className="text-yellow-100 text-xl" />
                <h2 className="text-richblack-5 font-semibold text-xl">Order Summary</h2>
            </div>

            {/* Course Count */}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-richblack-700">
                    <span className="text-richblack-100">
                        {totalItems} Course{totalItems !== 1 ? 's' : ''}
                    </span>
                    <span className="text-richblack-5 font-medium">
                        ₹{total.toLocaleString()}
                    </span>
                </div>

                {/* Savings Display */}
                {savings > 0 && (
                    <div className="flex justify-between items-center py-2">
                        <span className="text-caribbeangreen-100 flex items-center gap-1">
                            <FiTag className=" text-caribbeangreen-100 " />
                            You Save
                        </span>
                        <span className="text-caribbeangreen-100 font-medium">
                            ₹{Math.round(savings).toLocaleString()}
                        </span>
                    </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center py-3 border-t border-richblack-700">
                    <span className="text-richblack-5 font-semibold text-lg">Total</span>
                    <span className="text-yellow-100 font-bold text-2xl">
                        ₹{total.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Benefits */}
            <div className="bg-richblack-900 rounded-lg p-4 mb-6">
                <h3 className="text-richblack-5 font-medium mb-3">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-richblack-300">
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-100 rounded-full"></div>
                        Lifetime access to all courses
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-100 rounded-full"></div>
                        Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-100 rounded-full"></div>
                        24/7 instructor support
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-100 rounded-full"></div>
                        Mobile and desktop access
                    </li>
                </ul>
            </div>

            {/* Buy Button */}
            <button   
                className="w-full bg-yellow-100 hover:bg-yellow-200 text-richblack-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[0.98] shadow-lg hover:shadow-xl group"
                onClick={handlebuycourse}   
            >
                <FiCreditCard className="text-lg group-hover:scale-110 transition-transform" />
                <span>Buy Now</span>
                <BsLightning className="text-lg text-yellow-600 group-hover:scale-110 transition-transform" />
            </button>

            {/* Security Badge */}
            <div className="mt-4 text-center">
                <p className="text-richblack-100 text-xs flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-caribbeangreen-100  rounded-full"></span>
                    Secure payment with 256-bit SSL encryption
                </p>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-3 text-center bg-blue-100 bg-opacity-20 border border-caribbeangreen-700 rounded-lg py-2 px-3">
                <p className="text-caribbeangreen-200 text-xs font-medium">
                    30-day money-back guarantee
                </p>
            </div>
        </div>
    )
}

export default Totalamount