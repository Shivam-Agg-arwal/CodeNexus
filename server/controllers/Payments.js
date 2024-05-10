const { default: mongoose } = require('mongoose');
const {instance}=require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const { mailSender } = require('../utils/MailSender');

exports.createOrder=async(req,res)=>{
    try{
        //fetching course id from the body
        const courseID=req.body;

        //fetching user id from request
        const userID=req.user.id;

        if(!courseID){
            return res.staus(500).json({
                success:false,
                message:"Course id not found",
            })
        }
        if(!userID){
            return res.staus(500).json({
                success:false,
                message:"Usr id not found",
            })
        }

        const course=Course.findById(courseID);
        if(!course){
            return res.staus(500).json({
                success:false,
                message:"Course id is incorrect",
            })
        }

        const user=new mongoose.Types.ObjectId(userID);
        if(course.studentsEnrolled.includes(user)){
            return res.staus(500).json({
                success:false,
                message:"User already enrolled in the course",
            })
        }


        const amount=course.price*100;
        const currency="INR";

        const options={
            amount,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseID,
                userID
            }
        }

        const paymentResponse=await instance.orders.create(options);

        return res.status(200).json({
            success:true,
            message:"Order created succesful",
            courseName:course.courseTitle,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderID:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    }catch(error){
        console.log("Ordeer creation failed ",error);
        return res.staus(500).json({
            success:false,
            message:"Order creation error",
        })
    }

}


exports.verifyOrder=async(req,res)=>{

    try{

        const webtoken="12345678";
        const signature=req.header("x-razorpay-signature");
        const result=crypto.createHmac("sha256",webtoken);
        result.update(JSON.stringify(req.body));
        
        const digest=result.digest(hex);
        if(digest===webtoken){
            console.log("Order Authorised");
            //user k course m course dal do 
            
            const {userID,courseID}=req.body.payload.payment.entity.notes;
            
            const updatedUser=await User.findByIdAndUpdate(userID,
                {
                    $push:{
                        courses:courseID
                    }
            }
            ,{new:true});
            
            if(!updatedUser){
                return res.status(500).json({
                    success:false,
                message:"USER CANT BE UPDATED",
            })
        }

        const updatedCourse=await Course.findByIdAndUpdate(courseID,
            {
                $push:{
                    studentsEnrolled:userID
                }
            }
                ,{new:true});
                
                if(!updatedCourse){
                    return res.status(500).json({
                        success:false,
                        message:"COURSE CANT BE UPDATED",
                    })
                }
                
                await mailSender(userID.emailID,"Course Buy ","Thanks for buying the course");

                return res.status(200).json({
                    success:true,
                    message:"Order verfied successfully",
                })
                
            }
            else{
                return res.status(500).json({
                    success:false,
                    message:"UNAUTHORISED",
                })
            }
        }catch(error){
            console.log("PROBLEM OCCURED DURING VERIFCCATION OF ORDER",order);
            return res.status(500).json({
                success:false,
                message:"VERIFICATION FAILED",
            })
        }
            
}