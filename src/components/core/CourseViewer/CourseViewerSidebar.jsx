import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

const CourseViewerSidebar = ({setReviewModalData}) => {
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures,
    } = useSelector((state) => state.viewCourse);
    const location = useLocation();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState(null);
    const [activeSubSection, setActiveSubSection] = useState(null);

    const { sectionId, subSectionId } = useParams();

    useEffect(() => {
        const updateActives = () => {
            if (!courseSectionData.length) return;
            setActiveSection(sectionId);
            setActiveSubSection(subSectionId);
        };
        updateActives();
    }, [
        location.pathname,
        sectionId,
        subSectionId,
        courseSectionData,
        courseEntireData,
    ]);

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center ">
                    <div
                        onClick={() => {
                            navigate("/dashboard/enrolled-courses");
                        }}
                    >
                        {" "}
                        <FaChevronLeft />{" "}
                    </div>
                    <div onClick={()=>setReviewModalData(true)}>Add Review</div>
                </div>
                <div className="capitalize">{courseEntireData.courseTitle}</div>
                <div>
                    {completedLectures.length}/{totalNoOfLectures}
                </div>
            </div>
            <hr />

            {/* for course content */}
            <div>
                {console.log(courseSectionData)}
                {courseSectionData.map((section) => {
                    return (
                        <div key={section._id}>
                            {console.log(section)}
                            <div
                                className="flex flex-row justify-between"
                                onClick={() => setActiveSection(section._id)}
                            >
                                <div>{section.sectionName}</div>
                                <div
                                    className={`${
                                        section._id === activeSection
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                >
                                    <IoChevronDown />
                                </div>
                            </div>

                            {section._id === activeSection &&
                                section.subSections.map((subsection) => {
                                    return (
                                        <div
                                            index={subsection._id}
                                            className="flex flex-row gap-2 items-center" 
                                            onClick={()=>{navigate(`/view-course/${courseEntireData._id}/section/${section._id}/subSection/${subsection._id}`)}}
                                        >
                                            <div>
                                                {completedLectures.includes(
                                                    subsection._id
                                                ) ? (
                                                    <IoCheckbox />
                                                ) : (
                                                    <MdCheckBoxOutlineBlank />
                                                )}
                                            </div>
                                            <div>{subsection.title} </div>
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseViewerSidebar;
