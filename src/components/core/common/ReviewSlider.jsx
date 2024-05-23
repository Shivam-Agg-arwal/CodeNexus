import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import ReactStars from "react-stars";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { apiConnector } from "../../../services/apiConnector";
import { ratingEndpoints } from "../../../services/apis";

const ReviewSlider = () => {
    const { GET_ALL_RATING } = ratingEndpoints;
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchBestReviews = async () => {
            try {
                const response = await apiConnector("GET", GET_ALL_RATING);
                console.log("rating ", response);

                if (response?.success) {
                    setRatings(response.allRatings);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBestReviews();
    }, [GET_ALL_RATING]); // Add dependency array

    return (
        <div className="h-[400px]">
            <h1>REVIEWS FROM OTHER LEARNERS</h1>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className="h-[100%]"
            >
                {ratings.length > 0 ? (
                    ratings.slice(0,15).map((rating) => (
                        <SwiperSlide key={rating.id}>
                            <div>
                                <div className="flex flex-row gap-2 items-center ">
                                    <div>
                                        <img
                                            src={rating.user.image}
                                            className="w-[40px] aspect-square rounded-full "
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            {rating.user.firstName}{" "}
                                            {rating.user.lastName}
                                        </div>
                                        <div>{rating.course.courseTitle}</div>
                                    </div>
                                </div>
                                <div>{rating.review.substr(0,50)}{rating.review.length>50?"...":""}</div>
                                <div className="flex flex-row gap-2 items-center">
                                    <div>{rating.rating}.0</div>
                                    <ReactStars
                                        count={5}
                                        value={rating.rating}
                                        edit={false}
                                        size={24}
                                        color2={"#ffd700"}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>No ratings available</SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default ReviewSlider;
