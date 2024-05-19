import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { profileEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";


const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const {token}=useSelector((state)=>state.auth);

    const {GET_ENROLLED_COURSES_API}=profileEndpoints;

    const fetchEnrolledCourses = async () => {
        try {
            const response = await apiConnector("POST",GET_ENROLLED_COURSES_API,{token});
            // console.log(response);
            setEnrolledCourses(response.data);
        } catch (error) {
            console.log("Problem occured while fetchign the courses");
        }
    };
    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    return (
        <div>
            {!enrolledCourses ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {enrolledCourses.length === 0 ? (
                        <div>You have not enrolled in any course</div>
                    ) : (
                        <div>
                            <div>
                                <div>Course Name</div>
                                <div>Duration</div>
                                <div>Progress</div>
                            </div>
                            <div>
                                {enrolledCourses.map((course, index) => (
                                    <div key={index}>
                                        <div>
                                            <div>
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.courseTitle}
                                                />
                                            </div>
                                            <div>
                                                <div>{course.courseTitle}</div>
                                                <div>
                                                    {course.courseDescription}
                                                </div>
                                            </div>
                                        </div>
                                        <div>{course.totalDuration}</div>
                                        <div>
                                            <div>
                                                Progress:{" "}
                                                {course.progressPercentage || 0}
                                                %
                                            </div>
                                            <ProgressBar
                                                completed={
                                                    course.progressPercentage ||
                                                    0
                                                }
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
