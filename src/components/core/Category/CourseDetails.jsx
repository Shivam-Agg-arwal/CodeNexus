import React from 'react'
import { buyCourse } from '../../../services/operations/PaymentHandlingAPI'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const {token}=useSelector((state)=>state.auth);
  const course=useParams().courseId;
  let courses=[];
  courses.push(course);
  const handleBuy=()=>{
    if(token){
      // console.log(courses);
      // console.log(token);
      buyCourse(courses,token);
    }
  }
  return (
    <div className='text-black bg-yellow rounded-md p-2 ' onClick={()=>handleBuy()}>
      BUY
    </div>
  )
}

export default CourseDetails