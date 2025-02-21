import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export function QuillEditor() {
    const [value, setValue] = useState(`'<p><strong>asdsdsdasd</strong></p><p>asdsd</p><p>asd</p><p>sd</p><p>sd</p><p>sd</p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>1</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>2</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>6</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>4</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>5</li></ol>`);
    return <ReactQuill theme="snow" value={value} className='w-full h-full border-none overflow-y-scroll' onChange={(value) => {
        setValue(value);
    }
    } />;
}