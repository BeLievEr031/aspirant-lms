import { useEffect } from 'react'
import useLocationState from '../../hooks/useLocationState';
import useBreadCrumb from '../../store/breadCrumbStore';

function Dashboard() {
    const { pathname } = useLocationState();
    const { addBreadCrumb } = useBreadCrumb();

    useEffect(() => {
        addBreadCrumb([{ id: "", label: pathname, url: pathname }])
    }, [])
    return (
        <div className='w-full'>
            <div className='flex pt-10 gap-4'>
                <div className='bg-sky-500 px-3 py-4 rounded-2xl '>
                    <h1 className='font-bold text-2xl text-white'>Total Lectures Uploaded</h1>
                    <p className='text-center text-6xl font-extrabold text-slate-100'>08</p>
                </div>

                <div className='bg-sky-500 px-3 py-4 rounded-2xl'>
                    <h1 className='font-bold text-2xl text-white'>Total Time Table</h1>
                    <p className='text-center text-6xl font-extrabold text-slate-100'>08</p>
                </div>

                <div className='bg-sky-500 px-3 py-4 rounded-2xl'>
                    <h1 className='font-bold text-2xl text-white'>Total Study Material</h1>
                    <p className='text-center text-6xl font-extrabold text-slate-100'>08</p>
                </div>

                <div className='bg-sky-500 px-3 py-4 rounded-2xl'>
                    <h1 className='font-bold text-2xl text-white'>Total Study Plan</h1>
                    <p className='text-center text-6xl font-extrabold text-slate-100'>08</p>
                </div>
            </div>

        </div>
    )
}

export default Dashboard