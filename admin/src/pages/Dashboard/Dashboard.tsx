import React, { useEffect } from 'react'
import useLocationState from '../../hooks/useLocationState';
import useBreadCrumb from '../../store/breadCrumbStore';

function Dashboard() {
    const { pathname } = useLocationState();
    const { addBreadCrumb } = useBreadCrumb();

    useEffect(() => {
        addBreadCrumb([{ id: "", label: pathname, url: pathname }])
    }, [])
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard