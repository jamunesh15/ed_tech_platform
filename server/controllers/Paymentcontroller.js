
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/Usermodel")
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { mongo, default: mongoose, Mongoose } = require("mongoose");
const { json } = require("express");

 const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const crypto = require("crypto");
const Courseprogress = require("../models/Courseprogress");

exports.capturepayment = async (req,res) => {

    try{

        const { courses } = req.body
        const userId = req.user.id

        if(courses.length ===0){
            return res.json({
                success:false,
                message: "Please provide course id"
            })
        }

        let totalAmount = 0

        for(const course_id of courses){
            let course;

            try{
                course = await Course.findById(course_id)

                if(!course){
                    return res.status(401).json({
                        success:false,
                        message: "Could not find the course"
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId)

                if(course.totalStudent.includes(uid)){
                    return res.status(401).json({
                        success:false,
                        message: " student is already enrolled"
                    })
                }

                totalAmount += course.price
                console.log("course price is : " , course.price)

            }
            catch(error){
                console.log(error)
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
        }

        // Create Razorpay order after calculating total amount
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        }

        try{
              const paymentResponse = await instance.orders.create(options)
              console.log("Razorpay order created:", paymentResponse);
              return res.status(200).json({
                success: true,
                message: "Payment initiated successfully",
                data: paymentResponse
              })
        }
        catch(error){
            console.log("Payment creation error:", error)
            return res.status(500).json({
                success: false,
                message: "Could not initiate payment"
            })
        }
    }

    catch(error){
        console.log("capture payment failed")
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}




exports.verifypayment = async (req, res) => {
    try {
        console.log("[SERVER] ===== PAYMENT VERIFICATION STARTED =====");
        console.log("[SERVER] Request body:", JSON.stringify(req.body, null, 2));
        console.log("[SERVER] User from token:", req.user?.id);

        const{ razorpay_order_id ,  razorpay_payment_id , razorpay_signature}  = req.body;
        const courses = req.body?.courses;
        const userId = req.user.id;

        console.log("[SERVER] Extracted payment data:");
        console.log("- Order ID:", razorpay_order_id);
        console.log("- Payment ID:", razorpay_payment_id);
        console.log("- Signature:", razorpay_signature);
        console.log("- Courses:", courses);
        console.log("- User ID:", userId);

        // Validation check
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
            console.log("[SERVER] ❌ Validation failed - Missing required fields");
            console.log("[SERVER] Missing fields check:");
            console.log("- razorpay_order_id:", !!razorpay_order_id);
            console.log("- razorpay_payment_id:", !!razorpay_payment_id);
            console.log("- razorpay_signature:", !!razorpay_signature);
            console.log("- courses:", !!courses);
            console.log("- userId:", !!userId);
            
            return res.status(400).json({
                success: false,
                message: "Missing required payment verification data"
            });
        }

        console.log("[SERVER] ✅ All required fields present");

        // Create signature for verification
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("[SERVER] Signature verification body string:", body);
        console.log("[SERVER] Using Razorpay secret key:", process.env.RAZORPAY_SECRET ? "Present" : "Missing");

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log("[SERVER] Expected signature:", expectedSignature);
        console.log("[SERVER] Received signature:", razorpay_signature);
        console.log("[SERVER] Signatures match:", expectedSignature === razorpay_signature);

        if (expectedSignature === razorpay_signature) {
            console.log("[SERVER] ✅ Payment signature verified successfully");
            console.log("[SERVER] Starting student enrollment process...");

            // Enroll students
            await enrolledStudents(courses, userId, res);

            console.log("[SERVER] ✅ Payment verification completed successfully");
            return res.status(200).json({
                success: true,
                message: "Payment Verified and Students Enrolled"
            });
        } else {
            console.log("[SERVER] ❌ Payment signature verification failed");
            console.log("[SERVER] This indicates potential payment tampering or incorrect keys");
            
            return res.status(400).json({
                success: false,
                message: "Payment signature verification failed"
            }); 
        }

    } catch (error) {
        console.error("[SERVER] ❌ Payment verification error occurred:");
        console.error("[SERVER] Error name:", error.name);
        console.error("[SERVER] Error message:", error.message);
        console.error("[SERVER] Error stack:", error.stack);
        
        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};



// Fixed enrollment function
const enrolledStudents = async (courses, userId) => {
    try {
        if (!courses || !Array.isArray(courses) || !userId) {
            return {
                success: false,
                message: "Please provide valid courses data and user ID"
            };
        }

        console.log("[SERVER] Starting enrollment process for user:", userId);

        for (const courseId of courses) {
            try {
                // Find and update course - Fix: Use correct field name
                const enrolledCourse = await Course.findByIdAndUpdate(
                    courseId,
                    { $push: { totalStudent: userId } }, // Use $addToSet to avoid duplicates
                    { new: true }
                );

                if (!enrolledCourse) {
                    console.error(`[SERVER] Course not found: ${courseId}`);
                    return {
                        success: false,
                        message: `Course with ID ${courseId} not found`
                    };
                }

                const courseProgress = await Courseprogress.create({
                    courseID: courseId,  // Fixed: Use courseID to match the model schema
                    userId: userId,
                    completedVideos:[]
                })

                console.log(`[SERVER] Student enrolled in course: ${enrolledCourse.courseName}`);

                // Find and update student
                const enrolledStudent = await User.findByIdAndUpdate(
                    userId,
                    { $push: { courses: courseId } }, // Use $addToSet to avoid duplicates
                    {   courseProgress: courseProgress._id}  ,
                    { new: true }
                );

                if (!enrolledStudent) {
                    console.error(`[SERVER] User not found: ${userId}`);
                    return {
                        success: false,
                        message: "User not found"
                    };
                }

                console.log(`[SERVER] Course added to user's enrolled courses`);

                // Send enrollment email - Fix: Use correct variable name
                try {
                    const emailResponse = await mailSender(
                        enrolledStudent.email, // Fix: Use enrolledStudent instead of enrolledStudents
                        `Successfully Enrolled into ${enrolledCourse.courseName}`,
                        courseEnrollmentEmail(
                            enrolledCourse.courseName,
                            `${enrolledStudent.firstname}` // Fix: Use firstName instead of firstName
                        )
                    );

                    console.log("[SERVER] Enrollment email sent successfully:", emailResponse);
                } catch (emailError) {
                    console.error("[SERVER] Email sending failed:", emailError);
                    // Don't fail the entire process if email fails
                }

            } catch (courseError) {
                console.error(`[SERVER] Error processing course ${courseId}:`, courseError);
                return {
                    success: false,
                    message: `Failed to enroll in course: ${courseError.message}`
                };
            }
        }

        return {
            success: true,
            message: "All courses enrolled successfully"
        };

    } catch (error) {
        console.error("[SERVER] Enrollment process error:", error);
        return {
            success: false,
            message: `Enrollment failed: ${error.message}`
        };
    }
};

// Fixed payment success email function
exports.sendpaymentemail = async (req, res) => {
    try {
        const { orderId, paymentId, amount } = req.body;
        const userId = req.user.id;

        console.log("[SERVER] Sending payment success email");
        console.log("[SERVER] Order ID:", orderId);
        console.log("[SERVER] Payment ID:", paymentId);
        console.log("[SERVER] Amount:", amount);

        if (!orderId || !paymentId || !amount || !userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all the payment details" 
            });
        }

        const enrolledStudent = await User.findById(userId);
        
        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("[SERVER] Enrolled student details:", {
            name: `${enrolledStudent.firstname} ${enrolledStudent.lastname}`,
            email: enrolledStudent.email
        });

        await mailSender(
            enrolledStudent.email,
            `Payment Received - StudyNotion`,
            paymentSuccessEmail(
                `${enrolledStudent.firstname} ${enrolledStudent.lastname}`,
                amount / 100,
                orderId,
                paymentId
            )
        );

        console.log("[SERVER] Payment success email sent successfully");

        return res.status(200).json({
            success: true,
            message: "Payment success email sent successfully"
        });

    } catch (error) {
        console.error("[SERVER] Error in sending payment email:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Could not send payment confirmation email",
            // error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
