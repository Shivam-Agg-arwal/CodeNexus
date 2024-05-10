import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../../../services/apis";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { getCategoryPageDetails } from "../../../services/operations/catalogPageAPI";

const CatalogPage = () => {
    const { catalogName } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [catalogData, setCatalogData] = useState(null);

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
                <p>{`Home/Catalog/${catalogData.selectedCategory.categoryName}`}</p>
                <p>{catalogData.selectedCategory.categoryName}</p>
                <p>{catalogData.selectedCategory.categoryDescription}</p>
                
                {/* Section 1 */}
                <section>
                    <div>
                        <div>Courses to get you started</div>
                        <div>
                            <p>Most Popular</p>
                            <p>New</p>
                        </div>
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
