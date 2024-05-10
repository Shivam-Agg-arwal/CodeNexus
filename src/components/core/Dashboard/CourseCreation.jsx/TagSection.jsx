import React, { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
const TagSection = ({ label, name, register, setValue, getValues, errors }) => {
    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        });
        const currentvalues = getValues();
        setTagList(currentvalues[name]);
    }, []);

    useEffect(() => {
        setValue(name, tagList);
    }, [tagList]);

    const addToList = () => {
        if (tag.length > 0) {
            const updatedList = [...tagList, tag];
            setTagList(updatedList);
            setTag("");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addToList();
        }
    };
    const removeFromList = (index) => {
        const updatedList = tagList.filter((_, i) => i !== index);
        setTagList(updatedList);
    };
    return (
        <div>
            <label htmlFor={name} className="mb-4">
                {label} <sup>*</sup>
            </label>
            <div className="flex flex-row gap-2 text-xs my-4">
                {tagList.map((Tag, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-row gap-2 items-center bg-yellow-50 p-1 rounded-3xl text-richblack-900"
                        >
                            <div>{Tag}</div>
                            <div
                                onClick={() => {
                                    removeFromList(index);
                                }}
                                className="cursor-pointer"
                            >
                                <GiTireIronCross className="text-xs" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <input
                type="text"
                id={name}
                name={name}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter Tag and Press Enter"
                className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)] "
            />

            {errors[name] && <span>Tags are required.</span>}
        </div>
    );
};

export default TagSection;
