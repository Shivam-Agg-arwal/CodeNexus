const Category = require("../models/Category");
const Course = require("../models/Course");

//Category creation
exports.createCategory = async (req, res) => {
    try {
        //fetch
        const { name, description } = req.body;
        //validate
        if (!name || !description) {
            return res.status(500).json({
                success: false,
                message: "Name or desciption field is empty",
            });
        }
        //create
        const createdCategory = await Category.create({
            categoryName: name,
            categoryDescription: description,
        });

        return res.status(200).json({
            success: true,
            message: "Category was created successfully",
            createdCategory,
        });
    } catch (error) {
        console.log("Error occure durinr category creation ", error);
        return res.status(500).json({
            success: false,
            message: "Category was not created successfully",
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        console.log("he");
        const allCategories = await Category.find(
            {},
            { categoryName: true, categoryDescription: true }
        );
        return res.status(200).json({
            success: true,
            message: "All Category were fetched successfully",
            allCategories,
        });
    } catch (error) {
        console.log("Problem occured during fetching all Category", error);
        return res.status(500).json({
            success: false,
            message: "Category was not fetched successfully",
            error,
        });
    }
};

//category Page Details

exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        console.log("getting info ");
        const { categoryId } = req.body;
        console.log("received category id ",categoryId);
        //get courses for specified categoryId
        if(!categoryId){
            return res.status(500).json({
                success:false,
                message: " Category Id missing "
            })
        }
        const selectedCategory = await Category.findById(categoryId)
            .populate("course")
            .exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category was Not Found in the database",
            });
        }
        console.log("work completed");
        //get courses for different categories
        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        })
            .populate("course")
            .exec();

        console.log("work completed");
        //get top 10 selling courses
        const courseWithMostStudents = await Course.aggregate([
            {
                $match: {
                    enrolledStudents: { $exists: true, $ne: null, $type: "array" }
                }
            },
            {
                $project: {
                    _id: 1,
                    courseName: 1,
                    price: 1,
                    courseDescription: 1,
                    thumbnail: 1,
                    enrolledStudentCount: { $size: "$enrolledStudents" },
                },
            },
            {
                $sort: { enrolledStudentCount: -1 },
            },
            {
                $limit: 10,
            },
        ]);
        
        console.log("work completed");

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                courseWithMostStudents,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
