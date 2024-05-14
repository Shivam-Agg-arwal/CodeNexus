const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { mailSender } = require("../utils/MailSender");

exports.createOrder = async (req, res) => {
    try {
        const { courses } = req.body;
        const userID = req.user.id;

        if (!courses || courses.length <= 0) {
            return res.status(500).json({
                success: false,
                message: error.message,
                errorMessage: "the course length is empty or courses not found",
            });
        }
        let totalAmt = 0;
        for (let courseID of courses) {
            const courseDetail = await Course.findById(courseID);
            if (!courseDetail) {
                return res.status(404).json({
                    success: false,
                    message: "The course detail not found ",
                    error: message.error,
                });
            }

            //checking if the user is not already enrolled in the course

            const present = courseDetail.studentsEnrolled.includes(
                mongoose.Types.ObjectId(userID)
            );
            if (present) {
                return res.status(500).json({
                    success: false,
                    message: "User already enrolled in the course",
                });
            }

            totalAmt += courseDetail.price;
        }

        const options = {
            amount: totalAmt * 100,
            currency: "INR",
            receipt: Math.random(Date.now().toString()),
        };

        try {
            const paymentResponse = await instance.orders.create(options);
            return res.status(200).json({
                success: true,
                message: "Payment order intiated successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Payment intiation failed",
            });
        }
    } catch (error) {
        console.log("Error occured in capturing the payment");
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.verifyOrder = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const { courses } = req.body;
        const userID = req.user.id;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userID) {
            return res.status(404).json({
                success: false,
                message: "The fields were empty"
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = cyrpto.createHmac("sha256", process.env.KEY_SECRET).update(body.toString()).digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Enroll the student in the course
            await enrollTheStudent(userID, courses, res);

            return res.status(200).json({
                success: true,
                message: "Student enrolled successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const enrollTheStudent = async (userID, courses, res) => {
    try {
        if (!userID || !courses) {
            return res.status(500).json({
                success: false,
                message: "Some data not found while enrolling"
            });
        }

        for (let course of courses) {
            // Add the course id to the user
            const updatedUser = await User.findByIdAndUpdate(userID, {
                $push: { courses: course }
            }, { new: true });

            // Add the user to the course
            const updatedCourse = await Course.findByIdAndUpdate(course, {
                $push: { studentsEnrolled: userID }
            }, { new: true })

            // Send the mail
            await mailSender(updatedUser.emailID, "Message regarding the course enrollment", "You have been successfully enrolled in the course");
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occurred while enrolling the student in the course"
        });
    }
}
