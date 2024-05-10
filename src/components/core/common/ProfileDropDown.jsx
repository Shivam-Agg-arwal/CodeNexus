import React, { useRef, useState } from 'react';
import UseOutsideClick from '../hooks/useOutsideClick';
import trash from '../../../assets/Images/Instructor.png'
import { logout } from '../../../services/operations/authAPI';
import Dropdown from './Dropdown';

import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.profile);
  const profileImg=user?user.image:trash;
  const menuRef=useRef();
  const imgRef=useRef();


  const onClose = () => {
    setIsOpen(false);
  };

  function handleLogout(){
    dispatch(logout(navigate));
  }


  window.addEventListener("click",(e)=>{
    console.log(e.target===menuRef.current);
  })


  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)} className='relative'>
        <img src={profileImg} ref={imgRef} width={30} height={30} className='rounded-full'/>
      </button>
      <div className='absolute top-50 right-0 ' ref={menuRef}>
        {isOpen && <Dropdown />}
      </div>
    </div>
  );
};

export default ProfileDropDown;
