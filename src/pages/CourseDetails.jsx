import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/PaymentHandlingAPI";
import { fetchCourseDetails } from "../services/operations/courseAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/core/common/ConfirmationModal";
import RatingStars from "../components/core/common/RatingStars";
import { formatDate } from "../services/formatDate";

import CourseDetailsCard from "../components/core/common/CourseDetailsCard";

const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
	console.log("course id ye mili h ",courseId);
    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> ", result);
                setCourseData(result);
            } catch (error) {
                console.log("Could not fetch coursse details");
            }
        };
        getCourseFullDetails();
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(
            courseData?.data?.ratingAndReviews
        );
        setAverageReviewCount(count);
    }, [courseData]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseContent?.forEach((sec) => {
            lectures += sec.subSections.length || 0;
        });
        setTotalNoOfLectures(lectures);
    }, [courseData]);

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e != id)
        );
    };

    const handleBuyCourse = () => {
        if (token) {
            console.log("token ye tha ",token)
            buyCourse( [courseId],token, user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            text2: "Please login to purchase the course",
            btnText1: "Login",
            btnText2: "Cancel",
            btnHandler1: () => navigate("/login"),
            btnHandler2: () => setConfirmationModal(null),
        });
    };

    if (loading || !courseData) {
        return <div>Loading...</div>;
    }

    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        );
    }
    const {
        _id:course_id,
        courseTitle:courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data;

    return (
        <div className="flex flex-col  text-black">
            <div className="relative flex flex-col justify-start p-8">
                <p>{courseName}fdfasd</p>
                <p>{courseDescription}</p>
                <div className="flex gap-x-2">
                    <span>{avgReviewCount}</span>
                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                    <span>{`(${ratingAndReviews.length} reviews) `}</span>
                    <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                </div>

                <div>
                    <p>Created By {`${instructor.firstName}`}</p>
                </div>

                <div className="flex gap-x-3">
                    <p>Created At {formatDate(createdAt)}</p>
                    <p> English</p>
                </div>

                <div>
                    <CourseDetailsCard
                        course={courseData?.data}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />
                </div>
            </div>

            <div>
                <p> What You WIll learn</p>
                <div>{whatYouWillLearn}</div>
            </div>

            <div>
                <div>
                    <p>Course Content:</p>
                </div>

                <div className="flex gap-x-3 justify-between">
                    <div>
                        <span>{courseContent.length} section(s)</span>

                        <span>{totalNoOfLectures} lectures</span>
                        <span>
                            {courseData.data?.totalDuration} total length
                        </span>
                    </div>

                    <div>
                        <button onClick={() => setIsActive([])}>
                            Collapse all Sections
                        </button>
                    </div>
                </div>
            </div>

            {confirmationModal && (
                <ConfirmationModal confirmationModal={confirmationModal} />
            )}
        </div>
    );
};

export default CourseDetails;
