import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useLocationState from '../../hooks/useLocationState';
import useBreadCrumb from '../../store/breadCrumbStore';

function ExamTT() {
    const { pathname } = useLocationState();
    const { addBreadCrumb } = useBreadCrumb();
    useEffect(() => {
        addBreadCrumb([{ id: "", label: pathname, url: pathname }])
    }, [])

    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default ExamTT