import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';
import '../../../../../styles/components/ComplexComponents/Admin/RichTextEditor.scss';

export default function RichTextEditor({ value, onChange, placeholder = '' }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    let quillInstance;

    if (!editorRef.current) return;

    import('quill').then(({ default: Quill }) => {
      quillInstance = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ header: [2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: ['#48AE5A', '#F24942', '#000000', '#FFFFFF', false] }],
            [{ background: ['#48AE5A', '#F24942', '#000000', '#FFFFFF', false] }],
            [{ align: [] }],
            ['clean'],
          ],
        },
      });

      if (value) {
        quillInstance.clipboard.dangerouslyPasteHTML(value);
      }

      quillInstance.on('text-change', () => {
        const html = quillInstance.root.innerHTML;
        onChange(html);
      });

      quillRef.current = quillInstance;
    });

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
        quillRef.current = null;
        quillInstance = null;
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || '');
    }
  }, [value]);

  return <div className="custom-quill-editor" ref={editorRef} />;
}
