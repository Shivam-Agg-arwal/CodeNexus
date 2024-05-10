const BASE_URL="http://localhost:4000/api/v1";

export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategories",
    CREATE_CATEGORY_API:BASE_URL+"/course/createCategory",
    CATALOGPAGEDATA_API:BASE_URL+"/course/categoryPageDetails"
}


export const authenticationEndpoints={
    LOGIN_API:BASE_URL+"/auth/login",
    SENDOTP_API:BASE_URL+"/auth/sendOTP",
    SIGNUP_API:BASE_URL+"/auth/signUp",
    RESETPASSWORD_API:BASE_URL+"/auth/resetPassword",
    RESETPASSTOKEN_API:BASE_URL+"/auth/resetPasswordToken",
}
export const contactEndpoints={
    CONTACT_ADMIN_API:BASE_URL+"/contact/sendMail",
}

export const profileEndpoints={
    CHANGEPASSWORD_API:BASE_URL+"/auth/changePassword",
    GET_USER_DETAILS_API:BASE_URL+"/profile/getUserDetails",
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateProfile",
    DELETE_ACCOUNT_API:BASE_URL+"/profile/deleteAccount",
    UPDATE_DP_API:BASE_URL+"/profile/updateDisplayPicture",
    GET_ENROLLED_COURSES_API:BASE_URL+"/profile/getEnrolledCourses",
    GET_DP_API:BASE_URL+"/profile/getProfileImg",
}

export const courseEndpoints={
    CREATE_COURSE_API:BASE_URL+"/course/createCourse",
    EDIT_COURSE_API:BASE_URL+"/course/editCourse",
    GET_ALL_COURSE_API:BASE_URL+"/course/showAllCourses",
    COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetails",
    GET_INSTRUCTOR_COURSES_API:BASE_URL+"/course/getCreatedCourses",
    DELETE_COURSE_API:BASE_URL+"/course/deleteCourse",
    
    CREATE_SECTION_API:BASE_URL+"/course/createSection",
    UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
    DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
    
    CREATE_SUBSECTION_API:BASE_URL+"/course/createSubsection",
    UPDATE_SUBSECTION_API:BASE_URL+"/course/updateSubsection",
    DELETE_SUBSECTION_API:BASE_URL+"/course/deleteSubsection",
}

export const ratingEndpoints={
    CREATE_RATING_API:BASE_URL+"/course/createRating",
    GET_AVG_RATING_API:BASE_URL+"/course/getAverageRating",
    GET_COURSE_RATING:BASE_URL+"/course/getAllRatingCourse",
    GET_ALL_RATING:BASE_URL+"/course/getAllRating",
    
}
