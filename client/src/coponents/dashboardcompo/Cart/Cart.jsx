import React from 'react'
import { useSelector } from 'react-redux'
import Totalcourses from './Totalcourses'
import Totalamount from './Totalamount'
import { FiShoppingCart } from 'react-icons/fi'
import { BsCart3 } from 'react-icons/bs'

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="flex-1 bg-richblack-900 text-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BsCart3 className="text-yellow-100 text-3xl" />
          <h1 className="text-richblack-5 font-bold text-3xl lg:text-4xl">
            My Wishlist
          </h1>
        </div>
        
        <div className="flex items-center gap-2 text-richblack-300">
            <span className="text-yellow-100 font-semibold">{totalItems}</span>
            <span>course{totalItems !== 1 ? 's' : ''} in your wishlist</span>
          </div>
          
          {/* Divider */}
          <div className="w-full h-[1px] bg-richblack-700 mt-4"></div>
        </div>

        {/* Content */}
        {total > 0 ? (
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Courses List */}
            <div className="flex-1">
              <Totalcourses />
            </div>
            
            {/* Order Summary */}
            <div className="xl:w-96">
              <Totalamount />
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="bg-richblack-800 p-8 rounded-full mb-6">
              <FiShoppingCart className="text-richblack-400 text-6xl" />
            </div>
            
            <h2 className="text-richblack-5 text-2xl font-semibold mb-3">
              Your Cart is Empty
            </h2>
            
            <p className="text-richblack-400 text-lg mb-6 max-w-md">
              Looks like you haven't added any courses to your cart yet. 
              Start exploring our courses and add them to your wishlist!
            </p>
            
            <button 
              className="bg-yellow-100 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-200 transition-colors duration-300"
              onClick={() => window.location.href = '/catalog/web-dev'}
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
  )
}

export default Cart