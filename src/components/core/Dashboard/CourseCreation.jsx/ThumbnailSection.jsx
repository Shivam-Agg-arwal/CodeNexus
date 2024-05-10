import React, { useEffect, useState } from "react";
import { IoMdImages } from "react-icons/io";

const ThumbnailSection = ({
    register,
    errors,
    setValue,
    getValues,
    name,
    image,
    setThumbnailChanged,
}) => {
    const [imageUrl, setImageUrl] = useState(image ? image : "");
    const [file, setFile] = useState("");
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [GetCancel, setGetCancel] = useState(false);

    useEffect(() => {
        register(name, {
            required: true,
        });
    }, []);
    useEffect(() => {
        setValue(name, file);
    }, [file]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setThumbnailChanged(true);
            // Read the file and generate a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFile(file);
            setThumbnailChanged(true);
            // Read the file and generate a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true); // Set the dragging state
    };

    // Function to handle drag leave
    const handleDragLeave = () => {
        setIsDraggingOver(false); // Reset the dragging state
    };
    return (
        <div
            className={`bg-richblack-700 rounded-lg border-dashed border-2 border-richblack-400 aspect-video items-center justify-between flex ${
                isDraggingOver ? "bg-richblack-300" : "opacity-100"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {imageUrl ? (
                <div className="flex items-center justify-between flex-col">
                    <img src={imageUrl} className="aspect-video p-4" />
                    <button onClick={() => setGetCancel(true)}>
                        Want to Change ?{" "}
                    </button>
                    {GetCancel && (
                        <button
                            onClick={() => {
                                setImageUrl("");
                                setGetCancel(false);
                            }}
                            className="text-center text-richblack-5 underline"
                        >
                            Change
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between mx-auto">
                    <label
                        htmlFor={name}
                        className="flex items-center justify-between h-full"
                    >
                        <div className="items-center justify-between flex flex-col">
                            <div>
                                <IoMdImages className="text-4xl text-yellow-25" />
                            </div>
                            <div>
                                Drag and drop image or browse from your computer
                            </div>
                            <div>
                                <div>Aspect Ratio 16:9</div>
                                <div>Recommend Size : 1024 X 576</div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="file"
                        id={name}
                        name={name}
                        className="hidden h-0"
                        onChange={handleFileInputChange}
                    />
                    {errors[name] && <span>Image is needed.</span>}
                </div>
            )}
        </div>
    );
};

export default ThumbnailSection;
