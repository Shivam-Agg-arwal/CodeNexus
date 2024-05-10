import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

const { CATALOGPAGEDATA_API } = categories;

export async function getCategoryPageDetails(categoryId) {
    let result = null;
    console.log("i am here",categoryId);
    try {
        const loadingToastId = toast.loading("Loading...");
        const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
            categoryId: categoryId,
        });
        console.log("Category page details ............", response);

        if (!response.success) {
            throw new Error(response.message);
        }
        result = response;
        toast.dismiss(loadingToastId);
        toast.success("Category page details loaded successfully");
    } catch (error) {
        console.log("Category page details API ERROR............", error);
        toast.error("Failed to load category page details");
    }
    return result;
}
