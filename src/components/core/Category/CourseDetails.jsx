import React from "react";
import { buyCourse } from "../../../services/operations/PaymentHandlingAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
	const { token } = useSelector((state) => state.auth);
	const course = useParams().courseId;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);
	let courses = [];
	courses.push(course);
	const handleBuy = () => {
		if (token) {
			// console.log(courses);
			// console.log(token);
			buyCourse(courses, token, user, navigate, dispatch);
		}
	};
	return (
		<div
			className="text-black bg-yellow-50 w-[50px] rounded-md p-2 "
			onClick={() => handleBuy()}
		>
			BUY
		</div>
	);
};

export default CourseDetails;
