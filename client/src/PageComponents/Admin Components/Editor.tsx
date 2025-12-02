// 'use client';

// import React, { useRef, useState, Fragment } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import ListItem from '@tiptap/extension-list-item';
// import Image from '@tiptap/extension-image';
// import TextAlign from '@tiptap/extension-text-align';
// import Link from '@tiptap/extension-link';
// import Underline from '@tiptap/extension-underline';
// import Blockquote from '@tiptap/extension-blockquote';

// import { Table } from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableCell from '@tiptap/extension-table-cell';
// import TableHeader from '@tiptap/extension-table-header';
// import { Dialog, Transition } from '@headlessui/react';

// import {
//   Bold, Italic, Strikethrough, Code, List, ListOrdered,
//   AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon,
//   ImageIcon, Undo, Redo, Table2, Plus, Minus, Columns, Link2Off, Quote,
// } from 'lucide-react';

// type EditorProps = {
//   content: string;
//   onChange?: (value: string) => void;
//   title: string;
//   onTitleChange: (value: string) => void;
// };

// const Tiptap: React.FC<EditorProps> = ({ content, onChange, title, onTitleChange }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('');
//   const [linkSelectionActive, setLinkSelectionActive] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: false,
//         bulletList: false,
//         orderedList: false,
//         listItem: false,
//       }),
//       Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
//       BulletList,
//       OrderedList,
//       ListItem,
//       Image.extend({
//         addAttributes() {
//           return {
//             ...this.parent?.(),
//             src: {},
//             alt: { default: '' },
//             title: { default: '' },
//             width: { default: null },
//             height: { default: null },
//             style: { default: null },
//             caption: { default: '' },
//             float: { default: 'none' },
//           };
//         },
//         parseHTML() {
//           return [{ tag: 'img' }];
//         },
//         renderHTML({ HTMLAttributes }) {
//           const style = `
//             ${HTMLAttributes.style || ''}
//             float: ${HTMLAttributes.float || 'none'};
//             width: ${HTMLAttributes.width || 'auto'}; 
//             height: ${HTMLAttributes.height || 'auto'};
//           `;
//           return [
//             'figure',
//             { class: 'image-wrapper', style },
//             [
//               'img',
//               {
//                 ...HTMLAttributes,
//                 alt: HTMLAttributes.alt || '',
//                 title: HTMLAttributes.title || '',
//                 style,
//               },
//             ],
//             ...(HTMLAttributes.caption ? [['figcaption', {}, HTMLAttributes.caption]] : []),
//           ];
//         },
//       }),
//       TextAlign.configure({
//         types: ['heading', 'paragraph', 'image'],
//         alignments: ['left', 'center', 'right', 'justify'],
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: 'text-blue-600 underline',
//           target: '_blank',
//           rel: 'noopener noreferrer',
//         },
//       }),
//       Underline,
//       Blockquote,
//       Table.configure({ resizable: true }),
//       TableRow,
//       TableCell,
//       TableHeader,
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange?.(editor.getHTML());
//       setLinkSelectionActive(editor.isActive('link'));
//     },
//     immediatelyRender: false,
//   });

//   const btnBase =
//     'bg-transparent rounded p-1.5 opacity-80 hover:bg-gray-100 hover:opacity-100 transition-all';

//   const openLinkModal = () => {
//     if (!editor) return;
//     if (editor.isActive('link')) {
//       setLinkUrl(editor.getAttributes('link').href || '');
//     } else {
//       setLinkUrl('');
//     }
//     setIsLinkModalOpen(true);
//   };

//   const applyLink = () => {
//     if (!editor) return;
//     if (linkUrl) {
//       editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: '_blank', rel: 'noopener noreferrer' }).run();
//     } else {
//       editor.chain().focus().unsetLink().run();
//     }
//     setIsLinkModalOpen(false);
//   };

//   const unlink = () => {
//     if (!editor) return;
//     editor.chain().focus().unsetLink().run();
//     setIsLinkModalOpen(false);
//   };

//   const addImage = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!editor) return;
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       const data = new FormData();
//       data.append('file', file);
//       data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

//       const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: 'POST',
//         body: data,
//       });

//       const json = await res.json();
//       if (json.secure_url) {
//         editor.chain().focus().setImage({ src: json.secure_url }).run();
//       } else {
//         console.error('Cloudinary upload error', json);
//         alert('Image upload failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Image upload failed');
//     } finally {
//       event.target.value = '';
//     }
//   };


//   const handleHeadingChange = (value: string) => {
//     if (!editor) return;
//     if (value === '0') {
//       editor.chain().focus().setParagraph().run();
//     } else {
//       editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
//     }
//   };

//   return (
//     <>
//       {/* Blog Title as H1 - Editable */}
//       <h1
//         ref={(el) => {
//           if (el && !title) {
//             el.textContent = 'Add Title';
//           }
//         }}
//         contentEditable
//         suppressContentEditableWarning
//         dir="ltr"
//         onInput={(e) => {
//           const newTitle = e.currentTarget.textContent || '';
//           onTitleChange(newTitle);
//         }}
//         onFocus={(e) => {
//           if (e.currentTarget.textContent === 'Add Title') {
//             e.currentTarget.textContent = '';
//           }
//         }}
//         onBlur={(e) => {
//           if (e.currentTarget.textContent?.trim() === '') {
//             e.currentTarget.textContent = 'Add Title';
//           }
//         }}
//         className="text-4xl font-bold mb-6 focus:outline-none border-b-2 border-transparent focus:border-gray-800 pb-2 transition-colors"
//         style={{
//           minHeight: '1em',
//           direction: 'ltr',
//           textAlign: 'left',
//         }}
//       />

//       {/* Link input modal */}
//       <Transition show={isLinkModalOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-50" onClose={() => setIsLinkModalOpen(false)}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-200"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-150"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 backdrop-blur-sm bg-white/10" />
//           </Transition.Child>

//           <div className="fixed inset-0 flex items-center justify-center p-4">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-200"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-150"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-6 shadow-lg">
//                 <Dialog.Title className="text-lg font-bold mb-2">Insert Link</Dialog.Title>
//                 <input
//                   type="url"
//                   className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter URL (https://...)"
//                   value={linkUrl}
//                   onChange={(e) => setLinkUrl(e.target.value)}
//                 />
//                 <div className="flex justify-end space-x-2">
//                   {linkSelectionActive && (
//                     <button
//                       onClick={unlink}
//                       className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
//                     >
//                       <Link2Off /> Unlink
//                     </button>
//                   )}
//                   <button
//                     onClick={() => setIsLinkModalOpen(false)}
//                     className="px-3 py-1 rounded border border-gray-300"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={applyLink}
//                     className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>

//       {/* Editor toolbar */}
//       <div className="flex items-center gap-1 px-2 py-1 bg-white/90 shadow rounded-full mb-2 select-none">
//         {/* Undo/Redo */}
//         <button
//           onClick={() => editor?.chain().focus().undo().run()}
//           disabled={!editor?.can().undo()}
//           className={btnBase}
//           title="Undo"
//         >
//           <Undo size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().redo().run()}
//           disabled={!editor?.can().redo()}
//           className={btnBase}
//           title="Redo"
//         >
//           <Redo size={20} />
//         </button>

//         {/* Heading dropdown */}
//         <select
//           value={
//             editor?.isActive('heading', { level: 1 }) ? '1'
//               : editor?.isActive('heading', { level: 2 }) ? '2'
//               : editor?.isActive('heading', { level: 3 }) ? '3'
//               : editor?.isActive('heading', { level: 4 }) ? '4'
//               : editor?.isActive('heading', { level: 5 }) ? '5'
//               : editor?.isActive('heading', { level: 6 }) ? '6'
//               : '0'
//           }
//           onChange={e => handleHeadingChange(e.target.value)}
//           className="mx-1 px-1 py-1 text-xs font-bold border-none focus:outline-none focus:ring-0 bg-transparent"
//           title="Block type"
//         >
//           <option value="0">{editor?.isActive('paragraph') ? 'Paragraph' : 'P'}</option>
//           <option value="1">H1</option>
//           <option value="2">H2</option>
//           <option value="3">H3</option>
//           <option value="4">H4</option>
//           <option value="5">H5</option>
//           <option value="6">H6</option>
//         </select>

//         {/* Formatting buttons */}
//         <button
//           onClick={() => editor?.chain().focus().toggleBold().run()}
//           className={`${btnBase} ${editor?.isActive('bold') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Bold"
//         >
//           <Bold size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().toggleItalic().run()}
//           className={`${btnBase} ${editor?.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Italic"
//         >
//           <Italic size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().toggleUnderline().run()}
//           className={`${btnBase} ${editor?.isActive('underline') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Underline"
//         >
//           <Strikethrough size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().toggleStrike().run()}
//           className={`${btnBase} ${editor?.isActive('strike') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Strikethrough"
//         >
//           <Strikethrough size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().toggleCode().run()}
//           className={`${btnBase} ${editor?.isActive('code') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Code"
//         >
//           <Code size={20} />
//         </button>
//         {/* Blockquote */}
//         <button
//           onClick={() => editor?.chain().focus().toggleBlockquote().run()}
//           className={`${btnBase} ${editor?.isActive('blockquote') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Blockquote"
//         >
//           <Quote size={20} />
//         </button>

//         {/* Link and unlink */}
//         <button
//           onClick={openLinkModal}
//           className={`${btnBase} ${linkSelectionActive ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Insert Link"
//         >
//           <LinkIcon size={20} />
//         </button>
//         {linkSelectionActive && (
//           <button
//             onClick={() => {
//               editor?.chain().focus().unsetLink().run();
//               setLinkSelectionActive(false);
//             }}
//             className={btnBase}
//             title="Unlink"
//           >
//             <Link2Off size={20} />
//           </button>
//         )}

//         {/* Image and file input */}
//         <button
//           onClick={addImage}
//           className={btnBase}
//           title="Insert Image"
//         >
//           <ImageIcon size={20} />
//         </button>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />

//         {/* Lists */}
//         <button
//           onClick={() => editor?.chain().focus().toggleBulletList().run()}
//           className={`${btnBase} ${editor?.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Bullet List"
//         >
//           <List size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().toggleOrderedList().run()}
//           className={`${btnBase} ${editor?.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Ordered List"
//         >
//           <ListOrdered size={20} />
//         </button>

//         {/* Alignment */}
//         <button
//           onClick={() => editor?.chain().focus().setTextAlign('left').run()}
//           className={`${btnBase} ${editor?.isActive({ textAlign: 'left' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Align Left"
//         >
//           <AlignLeft size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().setTextAlign('center').run()}
//           className={`${btnBase} ${editor?.isActive({ textAlign: 'center' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Align Center"
//         >
//           <AlignCenter size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().setTextAlign('right').run()}
//           className={`${btnBase} ${editor?.isActive({ textAlign: 'right' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Align Right"
//         >
//           <AlignRight size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
//           className={`${btnBase} ${editor?.isActive({ textAlign: 'justify' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
//           title="Justify"
//         >
//           <AlignJustify size={20} />
//         </button>

//         {/* Separator */}
//         <div className="w-0.5 h-5 mx-1 bg-gray-300 opacity-70 rounded" />

//         {/* Table controls */}
//         <button
//           onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
//           className={btnBase}
//           title="Insert Table"
//         >
//           <Table2 size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().addColumnAfter().run()}
//           className={btnBase}
//           title="Add Column After"
//         >
//           <Columns size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().addColumnBefore().run()}
//           className={btnBase}
//           title="Add Column Before"
//         >
//           <Columns size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().deleteColumn().run()}
//           className={btnBase}
//           title="Delete Column"
//         >
//           <Minus size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().addRowAfter().run()}
//           className={btnBase}
//           title="Add Row After"
//         >
//           <Plus size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().addRowBefore().run()}
//           className={btnBase}
//           title="Add Row Before"
//         >
//           <Plus size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().deleteRow().run()}
//           className={btnBase}
//           title="Delete Row"
//         >
//           <Minus size={20} />
//         </button>
//         <button
//           onClick={() => editor?.chain().focus().deleteTable().run()}
//           className={btnBase}
//           title="Delete Table"
//         >
//           <Table2 size={20} />
//         </button>
//       </div>

//       {/* Editor Content */}
//       <EditorContent
//         editor={editor}
//         className="prose max-w-none p-4 min-h-[650px] focus:outline-none border border-gray-300 rounded-lg bg-white"
//       />
//     </>
//   );
// };

// export default Tiptap;


































'use client';

import React, { useRef, useState, Fragment } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break'; // Added for line breaks
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import { Dialog, Transition } from '@headlessui/react';

import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon,
  ImageIcon, Undo, Redo, Table2, Plus, Minus, Columns, Link2Off, Quote, ArrowDown,
} from 'lucide-react';

type EditorProps = {
  content: string;
  onChange?: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
};

const Tiptap: React.FC<EditorProps> = ({ content, onChange, title, onTitleChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkSelectionActive, setLinkSelectionActive] = useState(false);

  const btnBase =
    'bg-transparent rounded p-1.5 opacity-80 hover:bg-gray-100 hover:opacity-100 transition-all';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            src: {},
            alt: { default: '' },
            title: { default: '' },
            width: { default: null },
            height: { default: null },
            style: { default: null },
            caption: { default: '' },
            float: { default: 'none' },
          };
        },
        parseHTML() {
          return [{ tag: 'img' }];
        },
        renderHTML({ HTMLAttributes }) {
          const style = `
            ${HTMLAttributes.style || ''}
            float: ${HTMLAttributes.float || 'none'};
            width: ${HTMLAttributes.width || 'auto'}; 
            height: ${HTMLAttributes.height || 'auto'};
          `;
          return [
            'figure',
            { class: 'image-wrapper', style },
            [
              'img',
              {
                ...HTMLAttributes,
                alt: HTMLAttributes.alt || '',
                title: HTMLAttributes.title || '',
                style,
              },
            ],
            ...(HTMLAttributes.caption ? [['figcaption', {}, HTMLAttributes.caption]] : []),
          ];
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Underline,
      Blockquote,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      HardBreak, // Added for line breaks
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      setLinkSelectionActive(editor.isActive('link'));
    },
    immediatelyRender: false,
    // Keyboard shortcut for shift+enter to insert hard break
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === 'Enter' && event.shiftKey) {
          editor?.chain().focus().setHardBreak().run();
          return true;
        }
        return false;
      },
    },
  });

  const openLinkModal = () => {
    if (!editor) return;
    if (editor.isActive('link')) {
      setLinkUrl(editor.getAttributes('link').href || '');
    } else {
      setLinkUrl('');
    }
    setIsLinkModalOpen(true);
  };

  const applyLink = () => {
    if (!editor) return;
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: '_blank', rel: 'noopener noreferrer' }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setIsLinkModalOpen(false);
  };

  const unlink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setIsLinkModalOpen(false);
  };

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.secure_url) {
        editor.chain().focus().setImage({ src: json.secure_url }).run();
      } else {
        console.error('Cloudinary upload error', json);
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Image upload failed');
    } finally {
      event.target.value = '';
    }
  };

  const handleHeadingChange = (value: string) => {
    if (!editor) return;
    if (value === '0') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }
  };

  return (
    <>
      {/* Blog Title as H1 - Editable */}
      <h1
        ref={(el) => {
          if (el && !title) {
            el.textContent = 'Add Title';
          }
        }}
        contentEditable
        suppressContentEditableWarning
        dir="ltr"
        onInput={(e) => {
          const newTitle = e.currentTarget.textContent || '';
          onTitleChange(newTitle);
        }}
        onFocus={(e) => {
          if (e.currentTarget.textContent === 'Add Title') {
            e.currentTarget.textContent = '';
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget.textContent?.trim() === '') {
            e.currentTarget.textContent = 'Add Title';
          }
        }}
        className="text-4xl font-bold mb-6 focus:outline-none border-b-2 border-transparent focus:border-gray-800 pb-2 transition-colors"
        style={{
          minHeight: '1em',
          direction: 'ltr',
          textAlign: 'left',
        }}
      />

      {/* Link input modal */}
      <Transition show={isLinkModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsLinkModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-white/10" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-6 shadow-lg">
                <Dialog.Title className="text-lg font-bold mb-2">Insert Link</Dialog.Title>
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter URL (https://...)"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  {linkSelectionActive && (
                    <button
                      onClick={unlink}
                      className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                    >
                      <Link2Off /> Unlink
                    </button>
                  )}
                  <button
                    onClick={() => setIsLinkModalOpen(false)}
                    className="px-3 py-1 rounded border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyLink}
                    className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Apply
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Editor toolbar */}
      <div className="sticky top-0 z-40 flex items-center gap-1 px-2 py-1 bg-white/90 shadow rounded-full mb-2 flex-wrap">
        {/* Undo/Redo */}
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          className={btnBase}
          title="Undo"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          className={btnBase}
          title="Redo"
        >
          <Redo size={20} />
        </button>

        {/* Heading dropdown */}
        <select
          value={
            editor?.isActive('heading', { level: 1 }) ? '1'
              : editor?.isActive('heading', { level: 2 }) ? '2'
                : editor?.isActive('heading', { level: 3 }) ? '3'
                  : editor?.isActive('heading', { level: 4 }) ? '4'
                    : editor?.isActive('heading', { level: 5 }) ? '5'
                      : editor?.isActive('heading', { level: 6 }) ? '6'
                        : '0'
          }
          onChange={(e) => handleHeadingChange(e.target.value)}
          className="mx-1 px-2 py-1.5 text-xs font-semibold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white hover:bg-gray-50"
          title="Block type"
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        {/* Formatting buttons */}
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${btnBase} ${editor?.isActive('bold') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Bold"
        >
          <Bold size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${btnBase} ${editor?.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Italic"
        >
          <Italic size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`${btnBase} ${editor?.isActive('underline') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Underline"
        >
          <Strikethrough size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`${btnBase} ${editor?.isActive('strike') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={`${btnBase} ${editor?.isActive('code') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Code"
        >
          <Code size={20} />
        </button>
        {/* Blockquote */}
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`${btnBase} ${editor?.isActive('blockquote') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Blockquote"
        >
          <Quote size={20} />
        </button>

        {/* Link and unlink */}
        <button
          onClick={openLinkModal}
          className={`${btnBase} ${linkSelectionActive ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Insert Link"
        >
          <LinkIcon size={20} />
        </button>
        {linkSelectionActive && (
          <button
            onClick={() => {
              editor?.chain().focus().unsetLink().run();
              setLinkSelectionActive(false);
            }}
            className={btnBase}
            title="Unlink"
          >
            <Link2Off size={20} />
          </button>
        )}

        {/* Image and file input */}
        <button onClick={addImage} className={btnBase} title="Insert Image">
          <ImageIcon size={20} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Lists */}
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${btnBase} ${editor?.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Bullet List"
        >
          <List size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`${btnBase} ${editor?.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={20} />
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className={`${btnBase} ${editor?.isActive({ textAlign: 'left' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Align Left"
        >
          <AlignLeft size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className={`${btnBase} ${editor?.isActive({ textAlign: 'center' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Align Center"
        >
          <AlignCenter size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className={`${btnBase} ${editor?.isActive({ textAlign: 'right' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Align Right"
        >
          <AlignRight size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
          className={`${btnBase} ${editor?.isActive({ textAlign: 'justify' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
          title="Justify"
        >
          <AlignJustify size={20} />
        </button>


        {/* Separator */}
        <div className="w-0.5 h-5 mx-1 bg-gray-300 opacity-70 rounded" />

        {/* Table controls */}
        <button
          onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className={btnBase}
          title="Insert Table"
        >
          <Table2 size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().addColumnAfter().run()}
          className={btnBase}
          title="Add Column After"
        >
          <Columns size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().addColumnBefore().run()}
          className={btnBase}
          title="Add Column Before"
        >
          <Columns size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().deleteColumn().run()}
          className={btnBase}
          title="Delete Column"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().addRowAfter().run()}
          className={btnBase}
          title="Add Row After"
        >
          <Plus size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().addRowBefore().run()}
          className={btnBase}
          title="Add Row Before"
        >
          <Plus size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().deleteRow().run()}
          className={btnBase}
          title="Delete Row"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().deleteTable().run()}
          className={btnBase}
          title="Delete Table"
        >
          <Table2 size={20} />
        </button>

        {/* Line Break Button */}
        <button
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          className={btnBase}
          title="Line Break (Shift+Enter)"
        >
          <ArrowDown size={20} />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[650px] focus:outline-none border border-gray-300 rounded-lg bg-white"
      />
    </>
  );
};

export default Tiptap;
