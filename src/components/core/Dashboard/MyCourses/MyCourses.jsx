import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseAPI";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
const MyCourses = () => {
    const [mycourses, setMycourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const [confirmationModal,setConfirmationModal]=useState(null);
    useEffect(() => {
        const getInstructorCourses = async () => {
            setLoading(true);
            const response = await fetchInstructorCourses(token);
            if (response) {
                setMycourses(response);
                console.log(response);
            }
            setLoading(false);
            console.log("token",token);
        };
        getInstructorCourses();
    }, []);

    const deleteThisCourse=async(courseID)=>{
        const formData=new FormData();
        formData.append("courseID",courseID);
        await deleteCourse(formData,token);
        setMycourses(prevCourses => prevCourses.filter(course => course._id !== courseID));

    }
    return (
        <div className="bg-richblack-900 text-richblack-5 w-full px-10 py-5">
            <div className="flex flex-row justify-between">
                <div className="text-4xl font-bold">My Courses</div>
                <div className="flex flex-row gap-4 items-center cursor-pointer" onClick={()=>{navigate("/dashboard/add-course")}}>
                    <div>Add Course</div>
                    <div><FaPlus/></div>
                </div>
            </div>
            {loading ? (
                "Loading..."
            ) : (
                <div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Course</Th>
                                <Th>Duration</Th>
                                <Th>Price</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                mycourses.length === 0 ? "No course has been created " : (
                                    mycourses.map((course)=>{
                                        return (<Tr className="">
                                            <Td className="flex flex-row">
                                                <div>
                                                    <img src={course.thumbnail} width={200} className="aspect-video"/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {course.courseTitle}
                                                    </div>
                                                    <div>
                                                        {course.courseDescription}
                                                    </div>
                                                    <div>
                                                        {"Created At : "}{course.createdAt}
                                                    </div>
                                                    <div>
                                                        {course.status}
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td>2hr 30min</Td>
                                            <Td>{course.price}</Td>
                                            <Td className="">
                                                <MdEdit onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}/>
                                                <MdDelete className="cursor-pointer" onClick={() => {
												setConfirmationModal({
													text1: "Are you sure?",
													text2: "The course will be deleted permanently!",
													btnText1: "Delete the course ",
													btnHandler1: () => {
														deleteThisCourse(course._id);
														setConfirmationModal(null);
													},
													btnText2: "Close",
													btnHandler2: () => {
														setConfirmationModal(null);
													},
												})}}/>
                                            </Td>
                                            
                                        </Tr>
                                        )
                                    })
                                )
                            }
                        </Tbody>
                    </Table>
                </div>
            )}
            {confirmationModal ? (
				<ConfirmationModal confirmationModal={confirmationModal} />
			) : null}
        </div>
    );
};

export default MyCourses;
