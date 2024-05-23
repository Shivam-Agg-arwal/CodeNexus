import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { profileEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { GET_ENROLLED_COURSES_API } = profileEndpoints;

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await apiConnector(
                    "POST",
                    GET_ENROLLED_COURSES_API,
                    { token }
                );
                setEnrolledCourses(response.data);
                console.log("data",response.data);
            } catch (error) {
                console.error("Problem occurred while fetching the courses:", error);
            }
        };

        fetchEnrolledCourses();
    }, [token, GET_ENROLLED_COURSES_API]);

    const handleCourseClick = (courseId, sectionId, subSectionId) => {
        navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${subSectionId}`);
    };

    if (!enrolledCourses) {
        return <div>Loading...</div>;
    }

    if (enrolledCourses.length === 0) {
        return <div>You have not enrolled in any course</div>;
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between">
                <div>Course Name</div>
                <div>Duration</div>
                <div>Progress</div>
            </div>
            <div className="flex flex-col gap-4">
                {enrolledCourses.map((course) => (
                    <div
                        key={course._id}
                        className="cursor-pointer"
                        onClick={() =>
                            handleCourseClick(
                                course._id,
                                course.courseContent[0]._id,
                                course.courseContent[0].subSections[0]._id
                            )
                        }
                    >
                        <div className="flex flex-row justify-between">
                            <div>
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseTitle}
                                    className="rounded-md"
                                    width={200}
                                />
                                <div>
                                    <div>{course.courseTitle}</div>
                                    <div>{course.courseDescription}</div>
                                </div>
                            </div>
                            <div>{course.duration}</div>
                            <div>
                                <div>
                                    Progress: {course.progressPercentage || 0}%
                                </div>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-black my-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;
