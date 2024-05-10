import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TagSection from "./TagSection";
import ThumbnailSection from "./ThumbnailSection";
import RequirementSection from "./RequirementSection";
import { apiConnector } from "../../../../services/apiConnector";
import { categories } from "../../../../services/apis";
import { setCourse, setStep } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import {
    addCourseDetails,
    editCourseDetails,
} from "../../../../services/operations/courseAPI";

const Form1 = () => {
    const { step } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const { CATEGORIES_API } = categories;
    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const { editCourse, course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [thumbnailChanged, setThumbnailChanged] = useState(false);

    console.log("coursse",course);
    console.log(editCourse);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apiConnector("GET", CATEGORIES_API);
            console.log("Abhi ka resoppne", response);
            setCourseCategories(response.allCategories);
        };
        fetchCategories();

        if (editCourse) {
            setValue("courseTitle", course.courseTitle);
            setValue("courseDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseCategory", course.category);
            setValue("courseBenefits", course.whatYouWillLearn);
            
            // setValue("tag",Object.values(JSON.parse(course.tag)));
        }
    }, []);

    const currentvalues = getValues();
    const dataChange = () => {
        if (
            currentvalues.courseTitle !== course.courseTitle ||
            currentvalues.courseDescription !== course.courseDescription ||
            currentvalues.courseCategory !== course.category ||
            currentvalues.coursePrice !== course.price ||
            currentvalues.courseBenefits !== course.whatYouWillLearn ||
            currentvalues.courseRequirement.toString() !==
            course.instructions.toString() ||
            currentvalues.courseTags.toString() !== course.tag.toString()
        ) {
            return true;
        }
        return false;
    };

    async function submitHandler(data) {
        if (editCourse) {
            if (thumbnailChanged || dataChange()) {
                const formData = new FormData();
                if (currentvalues.courseTitle !== course.courseTitle) {
                    formData.append("courseTitle", currentvalues.courseTitle);
                }
                if (currentvalues.courseDescription !== course.courseDescription) {
                    formData.append(
                        "courseDescription",
                        currentvalues.courseDescription
                    );
                }
                if (currentvalues.courseCategory !== course.category) {
                    formData.append("category", currentvalues.courseCategory);
                }
                if (currentvalues.coursePrice !== course.price) {
                    formData.append("price", currentvalues.coursePrice);
                }
                if (currentvalues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append(
                        "whatYouWillLearn",
                        currentvalues.courseBenefits
                    );
                }
                if (
                    currentvalues.courseRequirement.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(currentvalues.courseRequirement)
                    );
                }
                if (currentvalues.courseTags.toString() !== course.tag.toString()) {
                    formData.append(
                        "tag",
                        JSON.stringify(currentvalues.courseTags)
                    );
                }
                formData.append("thumbnailImage", currentvalues.thumbnail);
                formData.append("courseID", course._id);
                setLoading(true);
                const response = await editCourseDetails(formData, token);
                console.log(response);
                if (response) {
                    dispatch(setStep(2));
                    dispatch(setCourse(response));
                }
                setLoading(false);
            }
            else {
                toast.error("No data has been changed");
                return;
            }
        } else {
            const formData = new FormData();
            formData.append("courseTitle", currentvalues.courseTitle);
            formData.append(
                "courseDescription",
                currentvalues.courseDescription
            );
            formData.append("category", currentvalues.courseCategory);
            formData.append("price", currentvalues.coursePrice);
            formData.append("whatYouWillLearn", currentvalues.courseBenefits);
            formData.append(
                "instructions",
                JSON.stringify(currentvalues.courseRequirement)
            );
            formData.append("tag", JSON.stringify(currentvalues.courseTags));
            formData.append("thumbnailImage", currentvalues.thumbnail);

            setLoading(true);
            const response = await addCourseDetails(formData, token);
            if (response) {
                dispatch(setStep(2));
                dispatch(setCourse(response));
            }
            setLoading(false);
        }

        setThumbnailChanged(false);
    }

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-richblack-800 rounded-lg p-6 flex flex-col gap-4 mt-10"
        >
            <div>
                <label htmlFor="courseTitle">
                    Course Title <sup>*</sup>
                </label>
                <input
                    id="courseTitle"
                    type="text"
                    name="courseTitle"
                    placeholder="Enter course title"
                    {...register("courseTitle", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                />

                {errors.courseTitle && <span>Course Title is required.</span>}
            </div>
            <div>
                <label htmlFor="courseDescription">
                    Course Description <sup>*</sup>
                </label>
                <textarea
                    type="text"
                    id="courseDescription"
                    name="courseDescription"
                    placeholder="Enter course description"
                    {...register("courseDescription", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                />

                {errors.courseDescription && (
                    <span>Course Description is required.</span>
                )}
            </div>
            <div>
                <label htmlFor="coursePrice">
                    Course Price <sup>*</sup>
                </label>
                <input
                    type="text"
                    id="coursePrice"
                    name="coursePrice"
                    placeholder="Enter course price"
                    {...register("coursePrice", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                />

                {errors.coursePrice && <span>Course Price is required.</span>}
            </div>

            {/* Category option */}

            <div>
                <label htmlFor="courseCategory">
                    Course Category <sup>*</sup>
                </label>
                <select
                    id="courseCategory"
                    defaultValue={""}
                    {...register("courseCategory", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                >
                    <option value="" disabled>
                        Choose a category
                    </option>
                    {courseCategories.map((course, index) => {
                        return (
                            <option key={index} value={course._id}>
                                {course.categoryName}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Tags option */}
            <TagSection
                label={"Tags"}
                name={"courseTags"}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />

            {/* Thumbnail option */}
            <label>
                Course thumbnail <sup>*</sup>
            </label>

            <ThumbnailSection
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                name={"thumbnail"}
                image={editCourse ? course.thumbnail : null}
                setThumbnailChanged={setThumbnailChanged}
            />

            <div>
                <label htmlFor="courseBenefits">
                    Benefits of the course <sup>*</sup>
                </label>
                <textarea
                    type="text"
                    id="courseBenefits"
                    name="courseBenefits"
                    placeholder="Enter course benefits"
                    {...register("courseBenefits", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                />

                {errors.courseBenefits && (
                    <span>Course Benefits is required.</span>
                )}
            </div>

            {/* Requirement column */}
            <RequirementSection
                label={"Requirement/Instructions"}
                name={"courseRequirement"}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />
            {editCourse && (
                <div
                    onClick={() => {
                        dispatch(setStep(2));
                    }}
                >
                    Continue without saving
                </div>
            )}
            <button type="submit">
                {editCourse ? "Save changes" : "Next"}
            </button>
        </form>
    );
};

export default Form1;
