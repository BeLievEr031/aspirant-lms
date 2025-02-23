import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


interface IQuillEditor {
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value: string

}

export function QuillEditor({ setValue, value }: IQuillEditor) {

    return <ReactQuill theme="snow" value={value} className='w-full h-full border-none overflow-y-scroll' onChange={(value) => {
        setValue(value);
    }
    } />;
}