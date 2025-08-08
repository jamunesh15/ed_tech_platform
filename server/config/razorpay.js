
// require("dotenv").config()

// const Razorpay = require("razorpay")

// console.log("Setting up Razorpay...");

// // Hard-coded test credentials for development
// const TEST_KEY_ID = "rzp_test_CRdvhhLZ3mVTYk";
// const TEST_KEY_SECRET = "zBPIU5vkf1lxQYNwLf5amkcO";

// // Create a mock Razorpay instance for testing
// const mockRazorpay = {
//     orders: {
//         create: async (options) => {
//             console.log("Using mock Razorpay instance");
//             return {
//                 id: "order_mock_" + Date.now(),
//                 entity: "order",
//                 amount: options.amount,
//                 amount_paid: 0,
//                 amount_due: options.amount,
//                 currency: options.currency || "INR",
//                 receipt: options.receipt,
//                 status: "created",
//                 notes: options.notes,
//                 created_at: Date.now()
//             };
//         }
//     }
// };

// // Try to create a real Razorpay instance, fall back to mock if it fails
// let razorpayInstance;

// try {
//     razorpayInstance = new Razorpay({
//         key_id: TEST_KEY_ID,
//         key_secret: TEST_KEY_SECRET
//     });
//     console.log("✅ Real Razorpay instance created successfully");
// } catch (error) {
//     console.error("❌ Error creating Razorpay instance:", error);
//     console.log("⚠️ Using mock Razorpay instance instead");
//     razorpayInstance = mockRazorpay;
// }

// // Export the instance (either real or mock)
// exports.instance = razorpayInstance;

const Razorpay = require("razorpay");
require("dotenv").config();

exports.instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET,
});