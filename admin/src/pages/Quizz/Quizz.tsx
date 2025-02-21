import React, { useEffect } from 'react'
import useLocationState from '../../hooks/useLocationState';
import useBreadCrumb from '../../store/breadCrumbStore';

function Quizz() {
    const { pathname } = useLocationState();
    const { addBreadCrumb } = useBreadCrumb();
    useEffect(() => {
        addBreadCrumb([{ id: "", label: pathname, url: pathname }])
    }, [])
    return (
        <div>Quizz</div>
    )
}

export default Quizz