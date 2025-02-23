import { MdOutlineAddBox } from 'react-icons/md';
import Button from '../../components/Button';
import { QuillEditor } from '../../components/ui/QuillEditor';
import { useState } from 'react';
import StudyPlanSrc from "../../assets/images/studyplan.jpg"
import { useStudyPlanResourceMutation, useStudyPlanResourceQuery } from '../../store/pages/StudyPlan/useStudyPlan';
import useBreadCrumb from '../../store/breadCrumbStore';
import { IPagination } from '../../types';
function PlanResources() {
    const [editor, setEditor] = useState(false)
    return (
        <div>
            <div className='flex justify-end'>
                <Button iconRight={MdOutlineAddBox} className='' onClick={() => setEditor(!editor)}>Create Study Plan</Button>
            </div>
            <div className='flex w-full'>
                <ViewStudyPlan />
            </div>
            {editor && <StudyPlanResource setEditor={setEditor} />}
        </div>
    )
}


function ViewStudyPlan() {
    const { breadCrumb } = useBreadCrumb();
    const [pagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        belong: "study-plan",
        examId: breadCrumb[breadCrumb.length - 1].id
    })

    const { isPending, isError, error, data } = useStudyPlanResourceQuery(pagination);

    if (isPending) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>{error.message}</div>
    }

    return (
        <>
            {data && data.data.data.length > 0 && data?.data?.data[0].data ? <div className='w-full text-wrap ' dangerouslySetInnerHTML={{ __html: data?.data?.data[0].data }} /> : "No study plan"}
        </>
    )
}

export interface IStudyPlanResource {
    setEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

function StudyPlanResource({ setEditor }: IStudyPlanResource) {

    const { breadCrumb } = useBreadCrumb();
    const { mutate } = useStudyPlanResourceMutation(setEditor);

    const [value, setValue] = useState("");

    const handleStudyPlanUpload = () => {
        mutate({ data: value, examId: breadCrumb[breadCrumb.length - 1].id })
    }

    return (
        <div className='fixed top-0 h-full left-0 bg-black/80 w-full flex items-center px-3'>
            <div className='w-1/2 flex justify-center items-center'>
                <img src={StudyPlanSrc} className='w-[600px] h-[600px] bg-cover rounded-lg' />
            </div>
            <div className='h-[95%] bg-white w-1/2 rounded-lg overflow-hidden'>
                <div className='bg-white w-full h-[90%] overflow-y-hidden rounded-md'>
                    <QuillEditor setValue={setValue} value={value} />
                </div>
                <div className='flex justify-end px-2 py-1 gap-2'>
                    <Button onClick={handleStudyPlanUpload}>Add</Button>
                    <Button variant='danger' onClick={() => setEditor(false)}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}


export default PlanResources