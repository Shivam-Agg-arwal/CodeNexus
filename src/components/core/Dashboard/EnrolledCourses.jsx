import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";


const EnrolledCourses = () => {
	const [enrolledCourses,setEnrolledCourses]=useState(null);
	
	const fetchEnrolledCourses=async()=>{
		try{
		const response=[];
		setEnrolledCourses(response);
		}
		catch(error){
		console.log("Problem occured while fetchign the courses")
		}
	}
	useEffect(()=>{

	},[]);

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
                                                <img src={course.thumbnail} alt={course.courseTitle} />
                                            </div>
                                            <div>
                                                <div>{course.courseTitle}</div>
                                                <div>{course.courseDescription}</div>
                                            </div>
                                        </div>
                                        <div>{course.totalDuration}</div>
                                        <div>
                                            <div>Progress: {course.progressPercentage || 0}%</div>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height='8px'
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
}

export default EnrolledCourses;