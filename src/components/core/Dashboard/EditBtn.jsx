import React from 'react'
import { FaEdit } from "react-icons/fa";

const EditBtn = () => {
  return (
    <div className='flex flex-row gap-2 items-center bg-yellow-50 py-2 px-4 rounded-md text-black'>
        <FaEdit/>
        <div>Edit</div>
    </div>
  )
}

export default EditBtn