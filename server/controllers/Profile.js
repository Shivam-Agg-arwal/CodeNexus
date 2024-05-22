const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//updateprofile
exports.updateProfile = async (req, res) => {
    try {
        //get data from body
        const { firstName, lastName, gender, dateOfBirth, phoneNumber, about } =
            req.body.data;
        console.log(req.body);
        const userID = req.user.id;
        console.log("fist");

        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "User id field could not be fetched",
            });
        }

        console.log("fist");
        //get profile id

        const userDetails = await User.findById(userID);
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User not found",
            });
        }
        console.log("first");
        const profileDetails = await Profile.findById(
            userDetails.additionalDetails
        );
        console.log("first");

        if (gender) {
            profileDetails.gender = gender;
        }
        if (dateOfBirth) {
            profileDetails.dateOfBirth = dateOfBirth;
        }
        if (phoneNumber) {
            profileDetails.phoneNumber = phoneNumber;
        }
        if (about) {
            profileDetails.about = about;
        }
        await profileDetails.save();

        if (firstName) {
            userDetails.firstName = firstName;
        }
        if (lastName) {
            userDetails.lastName = lastName;
        }

        await userDetails.save();

        const updatedUserDetails = await User.findById(userID).populate(
            "additionalDetails"
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        console.log("profile updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Profile updated failed",
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const userID = req.user.id;
        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "UserID could not be fetched",
            });
        }

        const userDetails = await User.findById(userID)
            .populate("additionalDetails")
            .exec();
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User coudl not be found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User info fetched succcessfully",
            userDetails,
        });
    } catch (error) {
        console.log("Data fetchign failed", error);
        return res.status(500).json({
            success: false,
            message: "User info fetching failed",
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("lg");
        const displayPicture = req.files.displayPicture;
        // console.log(req);
        console.log("hello");
        const userId = req.user.id;
        console.log(displayPicture);
        console.log("hello here");
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getProfileImg = async (req, res) => {
    try {
        const userid = req.user.id;
        if (!userid) {
            return res.status(400).json({
                success: false,
                message: `Please provide me with a user id`,
            });
        }
        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }

        const imageurl = user.image;
        return res.status(200).json({
            success: true,
            message: "Profile image was fetched successfully",
            imageurl,
        });
    } catch (error) {
        console.log("Error occured while fetching the profile image ", error);
        return res.status(500).json({
            success: false,
            message: "Profile img not fetched ",
            error,
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate:{
                        path:"subSections"
                    }
                },
            })
            .exec();
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });

        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User Cannot be deleted successfully",
        });
    }
};
