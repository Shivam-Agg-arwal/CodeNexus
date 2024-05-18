import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../../../services/apis";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { apiConnector } from "../../../services/apiConnector";
import CourseSlider from "./CourseSlider";
import Course_Card from "./Course_Card";
import { getCategoryPageDetails } from "../../../services/operations/catalogPageAPI";

const CatalogPage = () => {
    const { catalogName } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [catalogData, setCatalogData] = useState(null);
    const [isPopular,setIsPopular]=useState(true);

    useEffect(() => {
        const getCategoryId = async () => {
            const loadingToast = toast.loading("Loading...");
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log(result.allCategories);

            // result.allCategories.map((ct)=>{console.log(ct.categoryName.split(" ").join("-").toLowerCase())});
            const c_id = result.allCategories.filter(
                (ct) =>
                    ct.categoryName.split(" ").join("-").toLowerCase() ===
                    catalogName
            )[0]._id;
            console.log(c_id);
            // console.log(catalogName);
            setCategoryId(c_id);
            toast.dismiss(loadingToast);
        };
        getCategoryId();
    }, [catalogName]);

    useEffect(() => {
        const getCatalogPageInfo = async () => {
            const response = await getCategoryPageDetails(categoryId);
            if (response) {
                console.log("catalog page ka data ", response);
                setCatalogData(response.data);
            } else {
                console.log("some error occured in catalog page api caling");
            }
        };
        if(categoryId){getCatalogPageInfo();}
    }, [categoryId]);
    return (
        <div>
    {
        catalogData ? (
            <div>
                {console.log(catalogData)}
                <p>{`Home/Catalog/${catalogData.selectedCategoryInfo.categoryName}`}</p>
                <p>{catalogData.selectedCategoryInfo.categoryName}</p>
                <p>{catalogData.selectedCategoryInfo.categoryDescription}</p>
                
                {/* Section 1 */}
                <section>
                    <div>
                        <div>Courses to get you started</div>
                        <div>
                            <p onClick={()=>setIsPopular(true)}>Most Popular</p>
                            <p onClick={()=>setIsPopular(false)}>New</p>
                        </div>
                        <CourseSlider courses={isPopular ? catalogData.selectedCategoryPopular.course: catalogData.selectedCategoryNewest.course }/>
                    </div>
                </section>

                <section>
                    <div>
                        Top Courses in {catalogData.randomCategoryPopular.categoryName}
                    </div>
                    <CourseSlider courses={catalogData.randomCategoryPopular.course}/>
                </section>

                <section>
                    <div>Frequently Bought</div>
                    <div>
                        {
                            catalogData.courseWithMostStudents.slice(0,4).map((course)=>{
                                return (<Course_Card course={course} Height={400}/>)
                            })
                        }
                    </div>
                </section>
            </div>
        ) : (
            <div>No content to load</div>
        )
    }
</div>

    );
};

export default CatalogPage;
