/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom'
import useLocationState from '../../hooks/useLocationState';
import useBreadCrumb from '../../store/breadCrumbStore';
import { useEffect } from 'react';
function StudyMaterial() {
    const { pathname } = useLocationState();
    const { addBreadCrumb } = useBreadCrumb();
    useEffect(() => {
        addBreadCrumb([{ id: "", label: pathname, url: pathname }])
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default StudyMaterial