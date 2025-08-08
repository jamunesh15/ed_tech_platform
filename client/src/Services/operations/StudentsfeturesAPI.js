
import React from "react"

import { toast } from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { resetCart } from "../../redux/cartSlice"
import { setPaymentLoading } from "../../redux/courseSlice"
import { studentEndpoints } from "../apis"
import rzplogo from "../../assets/Logo/Logo-Full-Light.png"


const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Buy the Course
export async function buycourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch,
  onSuccess = null
) {
  const toastId = toast.loading("Loading...")
  try {
    // Validate input parameters
    if (!courses || courses.length === 0) {
      toast.error("No courses selected for purchase");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }
    
    // Load Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
      return
    }

    // Create order in backend
    const orderResponse = await apiconnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    )
    
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }

    // Extract payment data (handles both response structures)
    let paymentData;
    if (orderResponse.data.data?.id) {
      paymentData = orderResponse.data.data;
    } else if (orderResponse.data.message?.id) {
      paymentData = orderResponse.data.message;
    } else {
      console.error("Invalid payment data:", orderResponse.data);
      throw new Error("Invalid payment data received from backend");
    }
    
    // Configure Razorpay options
    const options = {
      key: "rzp_test_L8NxPnA2UixsWh",
      currency: paymentData.currency || "INR",
      amount: `${paymentData.amount}`,
      order_id: paymentData.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      image: rzplogo,
      prefill: {
        name: `${user_details?.firstname || ''} ${user_details?.lastname || ''}`,
        email: user_details?.email || '',
      },
      handler: function (response) {
        // Validate payment response
        const finalOrderId = response.razorpay_order_id || options.order_id;
        
        if (!finalOrderId || !response.razorpay_signature) {
          console.error("Missing payment verification data:", response);
          toast.error("Payment verification failed");
          return;
        }

        const verificationData = {
          razorpay_order_id: finalOrderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          courses: courses
        };
        
        // Send email (non-blocking) and verify payment
        sendPaymentSuccessEmail(response, paymentData.amount, token).catch(console.error);
        verifyPayment(verificationData, token, navigate, dispatch, onSuccess);
      },
    }

    // Open Razorpay payment gateway
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      toast.error("Payment Failed. Please try again.");
    });
    
  } catch (error) {
    console.error("Payment error:", error);
    toast.error(error.message || "Could not process payment. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch, onSuccess = null) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  
  try {
    // Validate required fields
    if (!bodyData.razorpay_order_id || !bodyData.razorpay_payment_id || !bodyData.razorpay_signature) {
      const missingFields = [];
      if (!bodyData.razorpay_order_id) missingFields.push('order_id');
      if (!bodyData.razorpay_payment_id) missingFields.push('payment_id');
      if (!bodyData.razorpay_signature) missingFields.push('signature');
      
      console.error("Missing payment verification fields:", missingFields);
      toast.error(`Payment verification failed - Missing: ${missingFields.join(', ')}`);
      return;
    }
    
    // Send verification to backend
    const response = await apiconnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful. You are Added to the course")
    dispatch(resetCart())
    
    // Execute success callback or default navigation
    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess();
    } else {
      setTimeout(() => navigate("/dashboard/enrolled-courses"), 1000);
    }
    
  } catch (error) {
    console.error("Payment verification error:", error)
    toast.error("Could Not Verify Payment.")
  } finally {
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
  }
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    const orderId = response.razorpay_order_id || `payment_${response.razorpay_payment_id}`;
    
    if (!response.razorpay_payment_id) {
      console.error("Missing payment ID for email");
      return;
    }
    
    const emailResponse = await apiconnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: orderId,
        paymentId: response.razorpay_payment_id,
        amount: amount || 0,
      },
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    );
    
    console.log("Payment email sent successfully");
  } catch (error) {
    console.error("Payment email error:", error);
    // Don't let email errors block the payment process
  }
}





