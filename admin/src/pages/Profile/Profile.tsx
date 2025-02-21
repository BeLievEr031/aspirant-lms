import React from 'react'
import BannerImgSrc from "../../assets/images/logo.png"
import ProfileSrc from "../../assets/images/profile.png"
import Button from '../../components/Button'
import { CiLogout } from "react-icons/ci";
function Profile() {
    return (
        <div className='w-full'>
            <div className='flex justify-center relative'>
                <div className='w-5/6 bg-red-500 h-[250px] rounded-2xl border-2 shadow-lg overflow-hidden'>
                    <img src={BannerImgSrc} className='w-full h-full bg-cover shadow-lg' />
                </div>
                <div className='w-[150px] h-[150px] absolute  rounded-full bottom-0 translate-y-1/2 overflow-hidden'>
                    <img src={ProfileSrc} className='w-full h-full bg-cover shadow-lg' />
                </div>
            </div>

            <div className='mt-20 w-5/6 mx-auto pt-4'>
                <h1 className='font-bold text-2xl'>Personal Information: </h1>
                <div className='flex gap-8 mt-2'>
                    <div className='w-1/3'>
                        <div className='text-xl font-semibold capitalize'>first name </div>
                        <div className='text-xl font-semibold capitalize px-2 py-1 bg-slate-100 rounded-md mt-1'>Sandeep </div>
                    </div>
                    <div className='w-1/3'>
                        <div className='text-xl font-semibold capitalize'>Last name </div>
                        <div className='text-xl font-semibold capitalize px-2 py-1 bg-slate-100 rounded-md mt-1'>Rajak </div>
                    </div>
                </div>
                <div className='flex gap-8 mt-4'>
                    <div className='w-1/3'>
                        <div className='text-xl font-semibold capitalize'>Email </div>
                        <div className='text-xl font-semibold px-2 py-1 bg-slate-100 rounded-md mt-1'>sandyrajak031@gmail.com </div>
                    </div>
                </div>
                <Button className='mt-4' variant='danger' iconLeft={CiLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Profile