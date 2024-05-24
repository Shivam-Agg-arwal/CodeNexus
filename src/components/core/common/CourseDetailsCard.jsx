import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../components/core/slices/cartSlice";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

    const handleAddToCart = () => {
        if (user && user?.accountType === "Instructor") {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if (token) {
            console.log("dispatching add to cart");
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "you are not logged in",
            text2: "Please login to add to cart",
            btnText1: "login",
            btnText2: "cancel",
            btnHandler1: () => navigate("/login"),
            btnHandler2: () => setConfirmationModal(null),
        });
    };

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    };

    return (
        <div className="rounded-xl bg-richblack-700 w-[370px]">
            <img
                src={ThumbnailImage}
                alt="Thumbnail Image"
                className="w-full rounded-xl aspect-video"
            />
            <div className="w-11/12 mx-auto">
                <div className="text-lg text-white p-2 mt-4">Rs. {CurrentPrice}</div>
                <div className="flex flex-col gap-y-2">
                    <button
                        className="bg-yellow-50 text-richblack-900 font-bold w-full rounded-lg py-2 hover:scale-95 mx-auto shadow-[0_1px_0px_0px_rgba(255,255,237,1)]"
                        onClick={
                            user && course?.studentsEnrolled.includes(user?._id)
                                ? () => navigate("/dashboard/enrolled-courses")
                                : handleBuyCourse
                        }
                    >
                        {user && course?.studentsEnrolled.includes(user?._id)
                            ? "Go to Course "
                            : "Buy Now"}
                    </button>

                    {!course?.studentsEnrolled.includes(user?._id) && (
                        <button
                            onClick={handleAddToCart}
                            className="bg-richblack-800 text-richblack-5 font-bold w-full rounded-lg py-2 hover:scale-95 mx-auto shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>

                <div>
                    <p className="mx-auto text-richblack-100 text-center text-sm mt-2">
                        30-Day Money-Back Guarantee
                    </p>
                    <p>This Course Includes:</p>
                    <div className="flex flex-col gap-y-3">
                        {course?.instructions?.map((item, index) => (
                            <p key={index} className="flex gap-2">
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <div>
                    <button
                        className="mx-auto flex items-center gap-2 p-2 font-bold text-yellow-50"
                        onClick={handleShare}
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseDetailsCard;
