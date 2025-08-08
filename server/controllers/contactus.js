const User = require("../models/Usermodel")
const mailsender = require("../utils/mailSender")
require("dotenv").config();

exports.contactus = async (req, res) => {
  try {
    // Get details
    const { firstName, lastName, email, contactnumber, message } = req.body

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to contact us"
      })
    }

    // Create email content
    const adminMailContent = `
      New Contact Form Submission:      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Contact Number: ${contactnumber}
      Message: ${message} 
    `;

    const userConfirmationContent = `
      Dear ${firstName},
      
      Thank you for contacting us. We have received your message and will get back to you soon.
      
      Your message:
      "${message}"
      
      Best regards,
      Support Team
    `;

    // Send mail to admin
    const adminMail = await mailsender(
      process.env.MAIL_USER,
      `New Contact Form Submission from ${firstName} ${lastName}`,
      adminMailContent
    );

    if (!adminMail) {
      return res.status(500).json({
        success: false,
        message: "Failed to send notification to admin"
      })
    }

    // Send confirmation mail to user
    const userMail = await mailsender(
      email,
      "We've received your message",
      userConfirmationContent
    );

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      mailData: {
        adminNotification: adminMail,
        userConfirmation: userMail
      }
    });

  } catch (error) {
    console.error("Error while contacting:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your request",
      error: error.message
    })
  }
}