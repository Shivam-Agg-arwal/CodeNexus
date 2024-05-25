import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Logo/CodeNexus.png'
import { NavbarLinks } from '../../../data/navbar-links'
import { Link } from 'react-router-dom'
import { matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from './ProfileDropDown'
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'
import { RiArrowDropDownLine } from "react-icons/ri";


const Navbar = () => {
    const token=useSelector((state)=>state.auth.token);
    const totalItems=useSelector((state)=>state.cart.totalItems);
    const user=useSelector((state)=>state.profile.user);
    const location=useLocation();
    const [sublinks,setSubLinks]=useState([
        {
            title:"Python",
            link:"/python"
        },
        {
            title:"Web Development",
            link:"/webdev"
        }
    ]);

    const fetchAPIData=async()=>{
        try{
            const result=await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Result :",result);
            console.log(result.allCategories);
            const categ = result.allCategories;
            if(categ){
                const modifiedSublinks = categ.map(category => {
                    // Combine category name if it contains 2 or more words with '-'
                    const combinedTitle = category.categoryName.split(' ').join('-');
                    return {
                        title: category.categoryName,
                        link: `/catalog/${combinedTitle.toLowerCase()}`, // Assuming link should be lowercase
                    };
                });
        
                // Update sublinks state with modified sublinks
                setSubLinks(modifiedSublinks);
                console.log("hogya");
            }
        }
        catch(error){
            console.log("problem occured while fetching api data",error);
        }
    }
    useEffect(()=>{
        fetchAPIData();
    },[])


    function pathfinder(path){
        return path===location.pathname;
    }
    
    return (
    <div className='bg-richblack-900 h-14 border-b-[1px] border-b-richblack-600 flex items-center justify-center py-4'>
        <div className='mx-auto w-10/12 max-w-maxContent flex flex-row justify-between items-center'>
            <Link to="/">
                <img src={logo} width={200} className='mt-2'/>
            </Link>
            {/* Home Catalog About Contact */}
            <div className='flex flex-row gap-6 text-white'>
            {
                NavbarLinks.map((element, index) => {
                    return element.title === "Catalog" ? (
                        <div className='flex flex-row gap-1 items-center relative group'>
                            <div>Catalog</div>
                            <RiArrowDropDownLine className='text-xl'/>

                            <div className=' invisible opacity-0 absolute top-[160%] -right-[40%] flex flex-col gap-2 rounded-md bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute bg-richblack-5 h-8 w-8 rounded-md rotate-45 -top-[5%] right-[20%]'></div>

                                {sublinks.length ? (
                                    sublinks.map((category, index) => (
                                        <Link to={`${category.link}`} key={index}>{category.title}</Link>
                                    ))
                                ) : (
                                    <p>No sublinks available</p>
                                )}
                            </div>
                        </div>
                        ) : (
                        <Link
                            to={element.path}
                            key={index}
                            className={`${pathfinder(element.path) ?"text-yellow-200" : "text-white"} font-bold` }
                        >
                            {element.title}
                        </Link>
                    );
                })
            }


            </div>

            <div className='text-white flex flex-row gap-2 items-center'>
                {
                    user && user.accountType!=="Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <FaShoppingCart/>
                            {
                                totalItems>0 && (<div className='absolute text-sm'>{totalItems}</div>)
                            }
                        </Link>
                    )
                }
                {
                    token===null && (
                        <div className='flex flex-row gap-4'>
                            <Link to="/login">
                                <button className='border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-[12px] py-[8px]'>Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className='border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-[12px] py-[8px]'>Sign Up</button>
                            </Link>
                        </div>
                    )
                }
                {
                    token!==null && (
                        <ProfileDropDown />
                    )
                }
            </div>
            
        </div>
    </div>
  )
}

export default Navbar