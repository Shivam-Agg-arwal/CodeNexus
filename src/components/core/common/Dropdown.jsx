import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
const Dropdown = () => {
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();
  return (
    <div className='bg-white h-[300px] w-[280px] text-black p-6 font-bold text-2xl' >
        <div className='flex flex-row gap-2 items-center font-bold text-xl'>
            <img src={user.image} width={40} height={40} className='rounded-full'/>
            <div>{user.firstName}{" "}{user.lastName}</div>
        </div>
        <div className='bg-richblack-700 h-[1px] w-full scale-x-[1.2] mt-4'></div>

        <Link to="/dashboard/my-profile" className='my-6  cursor-pointer' >Dashboard</Link>
        <div className='cursor-pointer' onClick={()=>dispatch(logout(navigate))}>Logout</div>
    </div>
  )
}

export default Dropdown