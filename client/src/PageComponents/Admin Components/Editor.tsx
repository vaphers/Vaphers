// 'use client';

// import React, { useRef, useState, Fragment, useEffect } from 'react';
// import { useEditor, EditorContent, ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
// import { Node, mergeAttributes } from '@tiptap/core';
// import StarterKit from '@tiptap/starter-kit';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { common, createLowlight } from 'lowlight';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import ListItem from '@tiptap/extension-list-item';
// import Image from '@tiptap/extension-image';
// import TextAlign from '@tiptap/extension-text-align';
// import Link from '@tiptap/extension-link';
// import Underline from '@tiptap/extension-underline';
// import Blockquote from '@tiptap/extension-blockquote';
// import HardBreak from '@tiptap/extension-hard-break'; 
// import { Table } from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableCell from '@tiptap/extension-table-cell';
// import TableHeader from '@tiptap/extension-table-header';

// import { Dialog, Transition } from '@headlessui/react';

// import {
//   Bold, Italic, Strikethrough, Code, List, ListOrdered,
//   AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon,
//   ImageIcon, Undo, Redo, Table2, Plus, Minus, Columns, Link2Off, Quote, ArrowDown,
//   Trash2, BetweenHorizonalEnd, BetweenVerticalEnd, HelpCircle, Megaphone, Star, Terminal,
//   Copy, Check
// } from 'lucide-react';

// // Initialize syntax highlighter for common languages (JS, TS, HTML, CSS, Python, etc.)
// const lowlight = createLowlight(common);

// type EditorProps = {
//   content: string;
//   onChange?: (value: string) => void;
//   title: string;
//   onTitleChange: (value: string) => void;
// };

// // Helper for toolbar dividers
// const Divider = () => <div className="w-[1px] h-6 bg-gray-200 mx-1 hidden sm:block" />;

// // --- Custom Code Block Extension (Light Theme + Copy Button + Lowlight) ---
// const CodeBlockComponent = ({ node, updateAttributes, extension }: any) => {
//   const [copied, setCopied] = useState(false);
  
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(node.textContent);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <NodeViewWrapper className="relative group my-8 font-mono">
//       <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2">
//         <select 
//           contentEditable={false}
//           value={node.attrs.language || 'javascript'}
//           onChange={event => updateAttributes({ language: event.target.value })}
//           className="text-xs bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-600 shadow-sm focus:outline-none"
//         >
//           <option value="null">auto</option>
//           <option value="javascript">JavaScript</option>
//           <option value="typescript">TypeScript</option>
//           <option value="html">HTML</option>
//           <option value="css">CSS</option>
//           <option value="python">Python</option>
//           <option value="json">JSON</option>
//         </select>
//         <button
//           onClick={copyToClipboard}
//           className="p-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-md text-gray-500 shadow-sm transition-colors flex items-center justify-center"
//           title="Copy code"
//         >
//           {copied ? <Check size={16} className="text-teal-600" /> : <Copy size={16} />}
//         </button>
//       </div>
//       <pre className="!bg-[#F8F9FA] !border !border-gray-200 !rounded-lg !p-5 !text-[14px] !leading-relaxed !text-[#24292e] overflow-x-auto !shadow-none">
//         {/* Bypass the overly strict Tiptap TypeScript definition with 'as any' */}
//         <NodeViewContent as={"code" as any} className="!bg-transparent !p-0 !text-inherit" />
//       </pre>
//     </NodeViewWrapper>
//   );
// };

// const CustomCodeBlock = CodeBlockLowlight.extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(CodeBlockComponent);
//   }
// });

// // --- Custom FAQ Extension ---
// const FaqBox = Node.create({
//   name: 'faqBox',
//   group: 'block',
//   content: 'block+',
//   defining: true,

//   parseHTML() {
//     return [{ tag: 'div[data-type="faq"]' }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     const style = `--bg-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A56DB' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");`;
    
//     const faqClasses = [
//       'relative bg-[#F4F8FD] rounded-lg px-6 py-4 mb-3 border border-transparent hover:border-blue-100 transition-colors',
//       '[&>*:first-child]:!text-[#1A56DB] [&>*:first-child]:!text-[1.05rem] [&>*:first-child]:!font-medium [&>*:first-child]:!m-0 [&>*:first-child]:!pr-8',
//       '[&>*:first-child]:relative [&>*:first-child]:cursor-text',
//       '[&>*:first-child]:after:content-[""] [&>*:first-child]:after:absolute [&>*:first-child]:after:right-0 [&>*:first-child]:after:top-1/2 [&>*:first-child]:after:-translate-y-1/2 [&>*:first-child]:after:w-5 [&>*:first-child]:after:h-5',
//       '[&>*:first-child]:after:bg-[image:var(--bg-chevron)]',
//       '[&>*:first-child]:after:bg-no-repeat [&>*:first-child]:after:bg-center [&>*:first-child]:after:bg-contain',
//       '[&>*:not(:first-child)]:!text-slate-600 [&>*:not(:first-child)]:!mt-3 [&>*:not(:first-child)]:!pt-3 [&>*:not(:first-child)]:!border-t [&>*:not(:first-child)]:!border-blue-100/60 [&>*:not(:first-child)]:!text-[15px] [&>*:not(:first-child)]:!leading-relaxed'
//     ].join(' ');

//     return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'faq', class: faqClasses, style }), 0];
//   },
// });

// // --- Custom CTA Extension ---
// const CtaBox = Node.create({
//   name: 'ctaBox',
//   group: 'block',
//   content: 'block+',
//   defining: true,

//   parseHTML() {
//     return [{ tag: 'div[data-type="cta"]' }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     const ctaClasses = [
//       'relative overflow-hidden rounded-md bg-[#0f172a] px-8 py-14 my-8 text-center',
//       'before:absolute before:-top-32 before:-right-16 before:w-80 before:h-80 before:rounded-full before:border-[55px] before:border-[#1e3a8a] before:content-[""] before:pointer-events-none',
//       'after:absolute after:-bottom-32 after:-left-16 after:w-80 after:h-80 after:rounded-full after:border-[55px] after:border-[#1e3a8a] after:content-[""] after:pointer-events-none',
//       '[&>*]:relative [&>*]:z-10',
//       '[&>h2]:!text-white [&>h2]:!text-3xl [&>h2]:!font-bold [&>h2]:!mb-4 [&>h2]:!mt-0',
//       '[&>p]:!text-slate-200 [&>p]:!text-lg [&>p]:!mb-8 [&>p]:!max-w-2xl [&>p]:!mx-auto',
//       '[&_a]:!inline-block [&_a]:!bg-[#fbbf24] [&_a]:!text-[#0f172a] [&_a]:!font-bold [&_a]:!py-3 [&_a]:!px-8 [&_a]:!rounded-md [&_a]:!no-underline hover:[&_a]:!bg-[#f59e0b] [&_a]:!transition-colors [&_a]:!cursor-pointer'
//     ].join(' ');

//     return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'cta', class: ctaClasses }), 0];
//   },
// });

// // --- Custom Testimonial Extension ---
// const TestimonialBox = Node.create({
//   name: 'testimonialBox',
//   group: 'block',
//   content: 'block+',
//   defining: true,

//   parseHTML() {
//     return [{ tag: 'div[data-type="testimonial"]' }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     const style = `
//       --bg-lines: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 -50 C 80 50 250 80 250 130' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M80 -50 C 130 50 250 30 250 80' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M130 -50 C 180 20 250 0 250 30' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
//       --bg-confetti: url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 90 L35 110' stroke='%23FFD100' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M50 115 L70 130' stroke='%23FFD100' stroke-width='10' stroke-linecap='round'/%3E%3Cpath d='M85 135 L105 145' stroke='%23FFD100' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M10 115 L25 130' stroke='%23FFD100' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M50 140 L65 148' stroke='%23FFD100' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
//     `.replace(/\n\s+/g, ' ');

//     const testimonialClasses = [
//       'relative overflow-hidden rounded-xl bg-[#247CE5] px-6 py-14 md:px-12 my-8 text-center shadow-lg',
//       'before:absolute before:top-0 before:right-0 before:w-72 before:h-72 before:bg-[image:var(--bg-lines)] before:bg-no-repeat before:bg-right-top before:pointer-events-none',
//       'after:absolute after:bottom-0 after:left-0 after:w-56 after:h-56 after:bg-[image:var(--bg-confetti)] after:bg-no-repeat after:bg-left-bottom after:pointer-events-none',
//       '[&>*]:relative [&>*]:z-10',
//       '[&>:is(h1,h2,h3,h4,h5,h6)]:!text-white [&>:is(h1,h2,h3,h4,h5,h6)]:!text-3xl md:[&>:is(h1,h2,h3,h4,h5,h6)]:!text-4xl [&>:is(h1,h2,h3,h4,h5,h6)]:!font-extrabold [&>:is(h1,h2,h3,h4,h5,h6)]:!mb-1 [&>:is(h1,h2,h3,h4,h5,h6)]:!mt-0',
//       `[&>:first-child]:after:content-["★★★★★"] [&>:first-child]:after:block [&>:first-child]:after:text-[#FACC15] [&>:first-child]:after:text-3xl [&>:first-child]:after:tracking-[0.15em] [&>:first-child]:after:mx-auto [&>:first-child]:after:mt-4 [&>:first-child]:after:mb-4`,
//       '[&>p:not(:last-of-type)]:!text-white [&>p:not(:last-of-type)]:!text-[1.15rem] md:[&>p:not(:last-of-type)]:!text-xl [&>p:not(:last-of-type)]:!mb-8 [&>p:not(:last-of-type)]:!max-w-4xl [&>p:not(:last-of-type)]:!mx-auto [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!font-medium',
//       '[&>p:last-of-type]:!text-white [&>p:last-of-type]:!text-[1.05rem] [&>p:last-of-type]:!font-bold [&>p:last-of-type]:!tracking-[0.1em] [&>p:last-of-type]:!uppercase [&>p:last-of-type]:!m-0'
//     ].join(' ');

//     return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'testimonial', class: testimonialClasses, style }), 0];
//   },
// });
// // ----------------------------

// const Tiptap: React.FC<EditorProps> = ({ content, onChange, title, onTitleChange }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('');
//   const [linkSelectionActive, setLinkSelectionActive] = useState(false);
//   const [activeFormat, setActiveFormat] = useState('0');

//   const btnBase =
//     'p-1.5 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none flex items-center justify-center';
//   const btnActive = 'bg-gray-100 text-gray-900 shadow-sm';

//   const updateToolbarState = (editorInstance: any) => {
//     setLinkSelectionActive(editorInstance.isActive('link'));
    
//     if (editorInstance.isActive('heading', { level: 1 })) setActiveFormat('1');
//     else if (editorInstance.isActive('heading', { level: 2 })) setActiveFormat('2');
//     else if (editorInstance.isActive('heading', { level: 3 })) setActiveFormat('3');
//     else if (editorInstance.isActive('heading', { level: 4 })) setActiveFormat('4');
//     else if (editorInstance.isActive('heading', { level: 5 })) setActiveFormat('5');
//     else if (editorInstance.isActive('heading', { level: 6 })) setActiveFormat('6');
//     else setActiveFormat('0');
//   };

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: false,
//         bulletList: false,
//         orderedList: false,
//         listItem: false,
//         codeBlock: false, // Disabled to use our CustomCodeBlock with Lowlight
//       }),
//       Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
//       BulletList,
//       OrderedList,
//       ListItem,
//       CustomCodeBlock.configure({
//         lowlight,
//         defaultLanguage: 'javascript',
//       }),
//       FaqBox,
//       CtaBox,
//       TestimonialBox,
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
//           class: 'text-blue-600 underline underline-offset-4 decoration-blue-400/50 hover:decoration-blue-400 transition-colors',
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
//       HardBreak, 
//     ],
//     content,
//     onCreate: ({ editor }) => {
//       updateToolbarState(editor);
//     },
//     onUpdate: ({ editor }) => {
//       onChange?.(editor.getHTML());
//       updateToolbarState(editor);
//     },
//     onSelectionUpdate: ({ editor }) => {
//       updateToolbarState(editor);
//     },
//     immediatelyRender: false,

//     editorProps: {
//       handleKeyDown(view, event) {
//         if (event.key === 'Enter' && event.shiftKey) {
//           editor?.chain().focus().setHardBreak().run();
//           return true;
//         }
//         return false;
//       },
//       attributes: {
//         class: 'prose prose-lg prose-gray max-w-none focus:outline-none min-h-[500px] pb-12 prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-600 prose-img:rounded-xl prose-img:shadow-sm prose-li:marker:text-gray-400 w-full',
//       },
//     },
//   });

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
//     setActiveFormat(value);
//     if (value === '0') {
//       editor.chain().focus().setParagraph().run();
//     } else {
//       editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
//     }
//   };

//   const insertFaq = () => {
//     if (!editor) return;
//     const faqSection = [
//       {
//         type: 'heading',
//         attrs: { level: 2 },
//         content: [{ type: 'text', text: 'FAQs about construction marketing ideas' }]
//       },
//       { type: 'faqBox', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'What are the best marketing ideas for a construction business?' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Start typing your answer here...' }] }] },
//       { type: 'faqBox', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'How can I market my construction company online?' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Start typing your answer here...' }] }] },
//       { type: 'faqBox', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'What are some local marketing strategies for construction companies?' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Start typing your answer here...' }] }] },
//       { type: 'faqBox', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'How can I use client engagement to promote my business?' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Start typing your answer here...' }] }] }
//     ];
//     editor.chain().focus().insertContent(faqSection).run();
//   };

//   const insertCta = () => {
//     if (!editor) return;
//     const ctaSection = [
//       {
//         type: 'ctaBox',
//         content: [
//           { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Map your SaaS marketing funnel with Mouseflow' }] },
//           { type: 'paragraph', content: [{ type: 'text', text: 'Analyze the real user journey and reduce drop-offs at each stage of the funnel with actionable insights from behavior analytics' }] },
//           { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'link', attrs: { href: '#', target: '_blank' } }], text: 'View Interactive Demo' }] }
//         ]
//       },
//       { type: 'paragraph' }
//     ];
//     editor.chain().focus().insertContent(ctaSection).run();
//   };

//   const insertTestimonial = () => {
//     if (!editor) return;
//     const testimonialSection = [
//       {
//         type: 'testimonialBox',
//         content: [
//           { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Hear What It's Like to Work With WebFX!" }] },
//           { type: 'paragraph', content: [{ type: 'text', text: '"WebFX is a fantastic company to work with. They provide the reporting I need, the results I want, and if there is a problem they reach out first and have a plan on adjustments. I cannot recommend them enough."' }] },
//           { type: 'paragraph', content: [{ type: 'text', text: 'LANDSCAPER' }] }
//         ]
//       },
//       { type: 'paragraph' }
//     ];
//     editor.chain().focus().insertContent(testimonialSection).run();
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto space-y-6">
      
//       {/* Enhanced CSS Block for Syntax Highlighting colors (Light Theme matching image) */}
//       <style dangerouslySetInnerHTML={{__html: `
//         .hljs-comment, .hljs-quote { color: #008080; font-style: italic; }
//         .hljs-keyword, .hljs-selector-tag, .hljs-type, .hljs-literal, .hljs-built_in { color: #0000ff; }
//         .hljs-string, .hljs-symbol, .hljs-bullet, .hljs-attr { color: #a31515; }
//         .hljs-title, .hljs-section, .hljs-attribute { color: #795e26; }
//         .hljs-variable, .hljs-template-variable { color: #001080; }
//         .hljs-number { color: #098658; }
//         .hljs-meta { color: #2b91af; }
//         .hljs-property { color: #001080; }
//         .hljs-operator { color: #000000; }
//         .hljs-punctuation { color: #000000; }
//       `}} />

//       {/* Blog Title Input */}
//       <h1
//         ref={(el) => {
//           if (el && !title) {
//             el.textContent = 'Add a spectacular title...';
//             el.classList.add('text-gray-300');
//           }
//         }}
//         contentEditable
//         suppressContentEditableWarning
//         dir="ltr"
//         onInput={(e) => {
//           const newTitle = e.currentTarget.textContent || '';
//           e.currentTarget.classList.remove('text-gray-300');
//           onTitleChange(newTitle);
//         }}
//         onFocus={(e) => {
//           if (e.currentTarget.textContent === 'Add a spectacular title...') {
//             e.currentTarget.textContent = '';
//             e.currentTarget.classList.remove('text-gray-300');
//           }
//         }}
//         onBlur={(e) => {
//           if (e.currentTarget.textContent?.trim() === '') {
//             e.currentTarget.textContent = 'Add a spectacular title...';
//             e.currentTarget.classList.add('text-gray-300');
//           }
//         }}
//         className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 focus:outline-none border-b border-transparent focus:border-gray-200 pb-4 transition-colors leading-tight px-2 sm:px-0"
//         style={{ minHeight: '1.2em', direction: 'ltr', textAlign: 'left' }}
//       />

//       {/* Editor Toolbar */}
//       <div className="sticky top-4 z-40 flex flex-wrap items-center gap-1.5 px-3 py-2 bg-white/80 backdrop-blur-md shadow-sm border border-gray-200 rounded-xl mb-4">
        
//         {/* Undo / Redo */}
//         <div className="flex items-center gap-0.5">
//           <button onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()} className={`${btnBase} disabled:opacity-30`} title="Undo">
//             <Undo size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()} className={`${btnBase} disabled:opacity-30`} title="Redo">
//             <Redo size={18} />
//           </button>
//         </div>

//         <Divider />

//         {/* Text Format & Headings */}
//         <div className="flex items-center gap-1">
//           <select
//             value={activeFormat}
//             onChange={(e) => handleHeadingChange(e.target.value)}
//             className="h-8 px-2 text-sm font-medium border-0 bg-transparent text-gray-700 hover:bg-gray-100 rounded-md focus:ring-0 cursor-pointer appearance-none w-[110px]"
//             title="Text style"
//           >
//             <option value="0">Normal text</option>
//             <option value="1">Heading 1</option>
//             <option value="2">Heading 2</option>
//             <option value="3">Heading 3</option>
//             <option value="4">Heading 4</option>
//             <option value="5">Heading 5</option>
//             <option value="6">Heading 6</option>
//           </select>
//         </div>

//         <Divider />

//         {/* Basic Formatting */}
//         <div className="flex items-center gap-0.5">
//           <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`${btnBase} ${editor?.isActive('bold') ? btnActive : ''}`} title="Bold">
//             <Bold size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`${btnBase} ${editor?.isActive('italic') ? btnActive : ''}`} title="Italic">
//             <Italic size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={`${btnBase} ${editor?.isActive('underline') ? btnActive : ''}`} title="Underline">
//             <Strikethrough size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={`${btnBase} ${editor?.isActive('strike') ? btnActive : ''}`} title="Strikethrough">
//             <Strikethrough size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().toggleCode().run()} className={`${btnBase} ${editor?.isActive('code') ? btnActive : ''}`} title="Inline Code snippet">
//             <Code size={18} />
//           </button>
//         </div>

//         <Divider />

//         {/* Insertions */}
//         <div className="flex items-center gap-0.5">
//           <button onClick={openLinkModal} className={`${btnBase} ${linkSelectionActive ? btnActive : ''}`} title="Link">
//             <LinkIcon size={18} />
//           </button>
//           {linkSelectionActive && (
//             <button onClick={() => { editor?.chain().focus().unsetLink().run(); setLinkSelectionActive(false); }} className={`${btnBase} text-red-500 hover:bg-red-50`} title="Remove Link">
//               <Link2Off size={18} />
//             </button>
//           )}
//           <button onClick={addImage} className={btnBase} title="Upload Image">
//             <ImageIcon size={18} />
//           </button>
//           <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          
//           <button onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={`${btnBase} ${editor?.isActive('blockquote') ? btnActive : ''}`} title="Quote block">
//             <Quote size={18} />
//           </button>

//           {/* New Code Block Button */}
//           <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className={`${btnBase} ${editor?.isActive('codeBlock') ? btnActive : ''}`} title="Insert Code Block">
//             <Terminal size={18} />
//           </button>
          
//           <button onClick={insertFaq} className={btnBase} title="Insert FAQ Section">
//             <HelpCircle size={18} />
//           </button>

//           <button onClick={insertCta} className={btnBase} title="Insert CTA Banner">
//             <Megaphone size={18} />
//           </button>

//           <button onClick={insertTestimonial} className={btnBase} title="Insert Testimonial">
//             <Star size={18} />
//           </button>

//           <button onClick={() => editor?.chain().focus().setHardBreak().run()} className={btnBase} title="Line break">
//             <ArrowDown size={18} />
//           </button>
//         </div>

//         <Divider />

//         {/* Lists & Alignment */}
//         <div className="flex items-center gap-0.5">
//           <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`${btnBase} ${editor?.isActive('bulletList') ? btnActive : ''}`} title="Bullet list">
//             <List size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`${btnBase} ${editor?.isActive('orderedList') ? btnActive : ''}`} title="Numbered list">
//             <ListOrdered size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().setTextAlign('left').run()} className={`${btnBase} ${editor?.isActive({ textAlign: 'left' }) ? btnActive : ''}`} title="Align left">
//             <AlignLeft size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().setTextAlign('center').run()} className={`${btnBase} ${editor?.isActive({ textAlign: 'center' }) ? btnActive : ''}`} title="Align center">
//             <AlignCenter size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().setTextAlign('right').run()} className={`${btnBase} ${editor?.isActive({ textAlign: 'right' }) ? btnActive : ''}`} title="Align right">
//             <AlignRight size={18} />
//           </button>
//         </div>

//         <Divider />

//         {/* Tables */}
//         <div className="flex items-center gap-0.5">
//           <button onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={btnBase} title="Insert table">
//             <Table2 size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().addColumnBefore().run()} className={btnBase} title="Add column before">
//             <BetweenHorizonalEnd size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().addRowAfter().run()} className={btnBase} title="Add row after">
//             <BetweenVerticalEnd size={18} />
//           </button>
//           <button onClick={() => editor?.chain().focus().deleteColumn().run()} className={btnBase} title="Delete column">
//             <Columns size={18} className="rotate-90 opacity-50" />
//             <Minus size={10} className="absolute ml-3 mt-3 text-red-500" />
//           </button>
//           <button onClick={() => editor?.chain().focus().deleteRow().run()} className={btnBase} title="Delete row">
//             <Columns size={18} className="opacity-50" />
//             <Minus size={10} className="absolute ml-3 mt-3 text-red-500" />
//           </button>
//           <button onClick={() => editor?.chain().focus().deleteTable().run()} className={`${btnBase} text-red-500 hover:bg-red-50`} title="Delete table">
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Link Input Modal */}
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
//             <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-md border border-gray-100">
//                   <div className="bg-white px-6 pb-6 pt-6 sm:p-6 sm:pb-4">
//                     <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
//                       Add a link
//                     </Dialog.Title>
//                     <div className="mt-2">
//                       <input
//                         type="url"
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-shadow"
//                         placeholder="https://example.com"
//                         value={linkUrl}
//                         onChange={(e) => setLinkUrl(e.target.value)}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') applyLink();
//                         }}
//                         autoFocus
//                       />
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-2">
//                     <button
//                       type="button"
//                       className="inline-flex w-full justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:w-auto transition-colors"
//                       onClick={applyLink}
//                     >
//                       Save Link
//                     </button>
//                     {linkSelectionActive && (
//                       <button
//                         type="button"
//                         className="inline-flex w-full justify-center rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100 sm:w-auto mr-auto transition-colors"
//                         onClick={unlink}
//                       >
//                         Remove Link
//                       </button>
//                     )}
//                     <button
//                       type="button"
//                       className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
//                       onClick={() => setIsLinkModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       {/* Main Editor Body */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm focus-within:shadow-md focus-within:border-gray-200 transition-all duration-300 px-6 py-8 sm:px-12 sm:py-16">
//         <EditorContent editor={editor} className="w-full" />
//       </div>
//     </div>
//   );
// };

// export default Tiptap;




'use client';

import React, { useRef, useState, Fragment, useEffect } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break'; 
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import { Dialog, Transition } from '@headlessui/react';

import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon,
  ImageIcon, Undo, Redo, Table2, Plus, Minus, Columns, Link2Off, Quote, ArrowDown,
  Trash2, BetweenHorizonalEnd, BetweenVerticalEnd, HelpCircle, Megaphone, Star, Terminal,
  Copy, Check
} from 'lucide-react';

const lowlight = createLowlight(common);

type EditorProps = {
  content: string;
  onChange?: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
};

const Divider = () => <div className="w-[1px] h-6 bg-gray-200 mx-1 hidden sm:block" />;

const CodeBlockComponent = ({ node, updateAttributes }: any) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(node.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeViewWrapper className="relative group my-8 font-mono">
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2">
        <select 
          contentEditable={false}
          value={node.attrs.language || 'javascript'}
          onChange={event => updateAttributes({ language: event.target.value })}
          className="text-xs bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-600 shadow-sm focus:outline-none"
        >
          <option value="null">auto</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="python">Python</option>
          <option value="json">JSON</option>
        </select>
        <button
          onClick={copyToClipboard}
          className="p-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-md text-gray-500 shadow-sm transition-colors flex items-center justify-center"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-teal-600" /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="!bg-[#F8F9FA] !border !border-gray-200 !rounded-lg !p-5 !text-[14px] !leading-relaxed !text-[#24292e] overflow-x-auto !shadow-none">
        <NodeViewContent as={"code" as any} className="!bg-transparent !p-0 !text-inherit" />
      </pre>
    </NodeViewWrapper>
  );
};

const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  }
});

const FaqBox = Node.create({
  name: 'faqBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() { return [{ tag: 'div[data-type="faq"]' }]; },
  renderHTML({ HTMLAttributes }) {
    const style = `--bg-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A56DB' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");`;
    const faqClasses = [
      'relative bg-[#F4F8FD] rounded-lg px-6 py-4 mb-3 border border-transparent hover:border-blue-100 transition-colors',
      '[&>*:first-child]:!text-[#1A56DB] [&>*:first-child]:!text-[1.05rem] [&>*:first-child]:!font-medium [&>*:first-child]:!m-0 [&>*:first-child]:!pr-8',
      '[&>*:first-child]:relative [&>*:first-child]:cursor-text',
      '[&>*:first-child]:after:content-[""] [&>*:first-child]:after:absolute [&>*:first-child]:after:right-0 [&>*:first-child]:after:top-1/2 [&>*:first-child]:after:-translate-y-1/2 [&>*:first-child]:after:w-5 [&>*:first-child]:after:h-5',
      '[&>*:first-child]:after:bg-[image:var(--bg-chevron)]',
      '[&>*:first-child]:after:bg-no-repeat [&>*:first-child]:after:bg-center [&>*:first-child]:after:bg-contain',
      '[&>*:not(:first-child)]:!text-slate-600 [&>*:not(:first-child)]:!mt-3 [&>*:not(:first-child)]:!pt-3 [&>*:not(:first-child)]:!border-t [&>*:not(:first-child)]:!border-blue-100/60 [&>*:not(:first-child)]:!text-[15px] [&>*:not(:first-child)]:!leading-relaxed'
    ].join(' ');
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'faq', class: faqClasses, style }), 0];
  },
});

const CtaBox = Node.create({
  name: 'ctaBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() { return [{ tag: 'div[data-type="cta"]' }]; },
  renderHTML({ HTMLAttributes }) {
    const ctaClasses = [
      'relative overflow-hidden rounded-md bg-[#0f172a] px-8 py-14 my-8 text-center',
      'before:absolute before:-top-32 before:-right-16 before:w-80 before:h-80 before:rounded-full before:border-[55px] before:border-[#1e3a8a] before:content-[""] before:pointer-events-none',
      'after:absolute after:-bottom-32 after:-left-16 after:w-80 after:h-80 after:rounded-full after:border-[55px] after:border-[#1e3a8a] after:content-[""] after:pointer-events-none',
      '[&>*]:relative [&>*]:z-10',
      '[&>h2]:!text-white [&>h2]:!text-3xl [&>h2]:!font-bold [&>h2]:!mb-4 [&>h2]:!mt-0',
      '[&>p]:!text-slate-200 [&>p]:!text-lg [&>p]:!mb-8 [&>p]:!max-w-2xl [&>p]:!mx-auto',
      '[&_a]:!inline-block [&_a]:!bg-[#fbbf24] [&_a]:!text-[#0f172a] [&_a]:!font-bold [&_a]:!py-3 [&_a]:!px-8 [&_a]:!rounded-md [&_a]:!no-underline hover:[&_a]:!bg-[#f59e0b] [&_a]:!transition-colors [&_a]:!cursor-pointer'
    ].join(' ');
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'cta', class: ctaClasses }), 0];
  },
});

const TestimonialBox = Node.create({
  name: 'testimonialBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() { return [{ tag: 'div[data-type="testimonial"]' }]; },
  renderHTML({ HTMLAttributes }) {
    const style = `
      --bg-lines: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 -50 C 80 50 250 80 250 130' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M80 -50 C 130 50 250 30 250 80' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M130 -50 C 180 20 250 0 250 30' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
      --bg-confetti: url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 90 L35 110' stroke='%23FFD100' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M50 115 L70 130' stroke='%23FFD100' stroke-width='10' stroke-linecap='round'/%3E%3Cpath d='M85 135 L105 145' stroke='%23FFD100' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M10 115 L25 130' stroke='%23FFD100' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M50 140 L65 148' stroke='%23FFD100' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
    `.replace(/\n\s+/g, ' ');

    const testimonialClasses = [
      'relative overflow-hidden rounded-xl bg-[#247CE5] px-6 py-14 md:px-12 my-8 text-center shadow-lg',
      'before:absolute before:top-0 before:right-0 before:w-72 before:h-72 before:bg-[image:var(--bg-lines)] before:bg-no-repeat before:bg-right-top before:pointer-events-none',
      'after:absolute after:bottom-0 after:left-0 after:w-56 after:h-56 after:bg-[image:var(--bg-confetti)] after:bg-no-repeat after:bg-left-bottom after:pointer-events-none',
      '[&>*]:relative [&>*]:z-10',
      '[&>:is(h1,h2,h3,h4,h5,h6)]:!text-white [&>:is(h1,h2,h3,h4,h5,h6)]:!text-3xl md:[&>:is(h1,h2,h3,h4,h5,h6)]:!text-4xl [&>:is(h1,h2,h3,h4,h5,h6)]:!font-extrabold [&>:is(h1,h2,h3,h4,h5,h6)]:!mb-1 [&>:is(h1,h2,h3,h4,h5,h6)]:!mt-0',
      `[&>:first-child]:after:content-["★★★★★"] [&>:first-child]:after:block [&>:first-child]:after:text-[#FACC15] [&>:first-child]:after:text-3xl [&>:first-child]:after:tracking-[0.15em] [&>:first-child]:after:mx-auto [&>:first-child]:after:mt-4 [&>:first-child]:after:mb-4`,
      '[&>p:not(:last-of-type)]:!text-white [&>p:not(:last-of-type)]:!text-[1.15rem] md:[&>p:not(:last-of-type)]:!text-xl [&>p:not(:last-of-type)]:!mb-8 [&>p:not(:last-of-type)]:!max-w-4xl [&>p:not(:last-of-type)]:!mx-auto [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!font-medium',
      '[&>p:last-of-type]:!text-white [&>p:last-of-type]:!text-[1.05rem] [&>p:last-of-type]:!font-bold [&>p:last-of-type]:!tracking-[0.1em] [&>p:last-of-type]:!uppercase [&>p:last-of-type]:!m-0'
    ].join(' ');

    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'testimonial', class: testimonialClasses, style }), 0];
  },
});

const Tiptap: React.FC<EditorProps> = ({ content, onChange, title, onTitleChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkSelectionActive, setLinkSelectionActive] = useState(false);
  const [activeFormat, setActiveFormat] = useState('0');
  
  // State locks the initialization so it only happens once
  const [isInitialized, setIsInitialized] = useState(false);

  const btnBase = 'p-1.5 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none flex items-center justify-center';
  const btnActive = 'bg-gray-100 text-gray-900 shadow-sm';

  const updateToolbarState = (editorInstance: any) => {
    setLinkSelectionActive(editorInstance.isActive('link'));
    if (editorInstance.isActive('heading', { level: 1 })) setActiveFormat('1');
    else if (editorInstance.isActive('heading', { level: 2 })) setActiveFormat('2');
    else if (editorInstance.isActive('heading', { level: 3 })) setActiveFormat('3');
    else if (editorInstance.isActive('heading', { level: 4 })) setActiveFormat('4');
    else if (editorInstance.isActive('heading', { level: 5 })) setActiveFormat('5');
    else if (editorInstance.isActive('heading', { level: 6 })) setActiveFormat('6');
    else setActiveFormat('0');
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, bulletList: false, orderedList: false, listItem: false, codeBlock: false, 
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList, OrderedList, ListItem,
      CustomCodeBlock.configure({ lowlight, defaultLanguage: 'javascript' }),
      FaqBox, CtaBox, TestimonialBox,
      Image.extend({
        addAttributes() {
          return { src: {}, alt: { default: '' }, title: { default: '' }, width: { default: null }, height: { default: null }, style: { default: null }, caption: { default: '' }, float: { default: 'none' } };
        },
        parseHTML() { return [{ tag: 'img' }]; },
        renderHTML({ HTMLAttributes }) {
          const style = `${HTMLAttributes.style || ''} float: ${HTMLAttributes.float || 'none'}; width: ${HTMLAttributes.width || 'auto'}; height: ${HTMLAttributes.height || 'auto'};`;
          return ['figure', { class: 'image-wrapper', style }, ['img', { ...HTMLAttributes, style }]];
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'], alignments: ['left', 'center', 'right', 'justify'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline underline-offset-4 decoration-blue-400/50 hover:decoration-blue-400 transition-colors', target: '_blank', rel: 'noopener noreferrer' } }),
      Underline, Blockquote, Table.configure({ resizable: true }), TableRow, TableCell, TableHeader, HardBreak, 
    ],
    content: content, 
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      updateToolbarState(editor);
    },
    onSelectionUpdate: ({ editor }) => updateToolbarState(editor),
    immediatelyRender: false,
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === 'Enter' && event.shiftKey) {
          editor?.chain().focus().setHardBreak().run();
          return true;
        }
        return false;
      },
      attributes: {
        class: 'prose prose-lg prose-gray max-w-none focus:outline-none min-h-[500px] pb-12 prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-600 prose-img:rounded-xl prose-img:shadow-sm prose-li:marker:text-gray-400 w-full',
      },
    },
  });

  // --- STRICT CONTENT INJECTION ---
  useEffect(() => {
    if (editor && content && !isInitialized) {
      // Force set the initial data ONCE.
      // Removed the 'false' parameter to fix the TypeScript Type Error.
      editor.commands.setContent(content);
      setIsInitialized(true);
    }
  }, [editor, content, isInitialized]);

  // --- STRICT TITLE INJECTION ---
  useEffect(() => {
    if (titleRef.current && title !== titleRef.current.textContent) {
      titleRef.current.textContent = title;
      if (title) titleRef.current.classList.remove('text-gray-300');
    }
  }, [title]);

  const openLinkModal = () => {
    if (!editor) return;
    if (editor.isActive('link')) setLinkUrl(editor.getAttributes('link').href || '');
    else setLinkUrl('');
    setIsLinkModalOpen(true);
  };

  const applyLink = () => {
    if (!editor) return;
    if (linkUrl) editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: '_blank', rel: 'noopener noreferrer' }).run();
    else editor.chain().focus().unsetLink().run();
    setIsLinkModalOpen(false);
  };

  const unlink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setIsLinkModalOpen(false);
  };

  const addImage = () => fileInputRef.current?.click();

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
        alert('Image upload failed');
      }
    } catch (err) {
      alert('Image upload failed');
    } finally {
      event.target.value = '';
    }
  };

  const handleHeadingChange = (value: string) => {
    if (!editor) return;
    setActiveFormat(value);
    if (value === '0') editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: Number(value) as 1|2|3|4|5|6 }).run();
  };

  const insertFaq = () => {
    if (!editor) return;
    const faqSection = [
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'FAQs about construction marketing ideas' }] },
      { type: 'faqBox', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'What are the best marketing ideas for a construction business?' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Start typing your answer here...' }] }] },
      { type: 'faqBox', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'How can I market my construction company online?' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Start typing your answer here...' }] }] }
    ];
    editor.chain().focus().insertContent(faqSection).run();
  };

  const insertCta = () => {
    if (!editor) return;
    const ctaSection = [
      { type: 'ctaBox', content: [ { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Scale Faster and Smarter with Vaphers' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'From visibility to conversions, Vaphers builds high-performance digital systems designed to attract, convert, and scale your revenue consistently.' }] }, { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'link', attrs: { href: 'https://www.vaphers.com', target: '_blank' } }], text: 'Grow with Vaphers' }] } ] },
      { type: 'paragraph' }
    ];
    editor.chain().focus().insertContent(ctaSection).run();
  };

  const insertTestimonial = () => {
    if (!editor) return;
    const testimonialSection = [
      { type: 'testimonialBox', content: [ { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Hear What It's Like to Work With WebFX!" }] }, { type: 'paragraph', content: [{ type: 'text', text: '"WebFX is a fantastic company to work with. They provide the reporting I need, the results I want, and if there is a problem they reach out first and have a plan on adjustments. I cannot recommend them enough."' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'LANDSCAPER' }] } ] },
      { type: 'paragraph' }
    ];
    editor.chain().focus().insertContent(testimonialSection).run();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      <style dangerouslySetInnerHTML={{__html: `
        .hljs-comment, .hljs-quote { color: #008080; font-style: italic; }
        .hljs-keyword, .hljs-selector-tag, .hljs-type, .hljs-literal, .hljs-built_in { color: #0000ff; }
        .hljs-string, .hljs-symbol, .hljs-bullet, .hljs-attr { color: #a31515; }
        .hljs-title, .hljs-section, .hljs-attribute { color: #795e26; }
        .hljs-variable, .hljs-template-variable { color: #001080; }
        .hljs-number { color: #098658; }
        .hljs-meta { color: #2b91af; }
        .hljs-property { color: #001080; }
        .hljs-operator { color: #000000; }
        .hljs-punctuation { color: #000000; }
      `}} />

      <h1
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        dir="ltr"
        onInput={(e) => {
          const newTitle = e.currentTarget.textContent || '';
          e.currentTarget.classList.remove('text-gray-300');
          onTitleChange(newTitle);
        }}
        onFocus={(e) => {
          if (e.currentTarget.textContent === 'Add a spectacular title...') {
            e.currentTarget.textContent = '';
            e.currentTarget.classList.remove('text-gray-300');
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget.textContent?.trim() === '') {
            e.currentTarget.textContent = 'Add a spectacular title...';
            e.currentTarget.classList.add('text-gray-300');
          }
        }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 focus:outline-none border-b border-transparent focus:border-gray-200 pb-4 transition-colors leading-tight px-2 sm:px-0 text-gray-300"
        style={{ minHeight: '1.2em', direction: 'ltr', textAlign: 'left' }}
      >
        Add a spectacular title...
      </h1>

      <div className="sticky top-4 z-40 flex flex-wrap items-center gap-1.5 px-3 py-2 bg-white/80 backdrop-blur-md shadow-sm border border-gray-200 rounded-xl mb-4">
        
        <div className="flex items-center gap-0.5">
          <button onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()} className={`${btnBase} disabled:opacity-30`} title="Undo"><Undo size={18} /></button>
          <button onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()} className={`${btnBase} disabled:opacity-30`} title="Redo"><Redo size={18} /></button>
        </div>

        <Divider />

        <div className="flex items-center gap-1">
          <select value={activeFormat} onChange={(e) => handleHeadingChange(e.target.value)} className="h-8 px-2 text-sm font-medium border-0 bg-transparent text-gray-700 hover:bg-gray-100 rounded-md focus:ring-0 cursor-pointer appearance-none w-[110px]" title="Text style">
            <option value="0">Normal text</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">Heading 5</option>
            <option value="6">Heading 6</option>
          </select>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`${btnBase} ${editor?.isActive('bold') ? btnActive : ''}`} title="Bold"><Bold size={18} /></button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`${btnBase} ${editor?.isActive('italic') ? btnActive : ''}`} title="Italic"><Italic size={18} /></button>
          <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={`${btnBase} ${editor?.isActive('underline') ? btnActive : ''}`} title="Underline"><Strikethrough size={18} /></button>
          <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={`${btnBase} ${editor?.isActive('strike') ? btnActive : ''}`} title="Strikethrough"><Strikethrough size={18} /></button>
          <button onClick={() => editor?.chain().focus().toggleCode().run()} className={`${btnBase} ${editor?.isActive('code') ? btnActive : ''}`} title="Inline Code snippet"><Code size={18} /></button>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button onClick={openLinkModal} className={`${btnBase} ${linkSelectionActive ? btnActive : ''}`} title="Link"><LinkIcon size={18} /></button>
          {linkSelectionActive && <button onClick={() => { editor?.chain().focus().unsetLink().run(); setLinkSelectionActive(false); }} className={`${btnBase} text-red-500 hover:bg-red-50`} title="Remove Link"><Link2Off size={18} /></button>}
          <button onClick={addImage} className={btnBase} title="Upload Image"><ImageIcon size={18} /></button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          
          <button onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={`${btnBase} ${editor?.isActive('blockquote') ? btnActive : ''}`} title="Quote block"><Quote size={18} /></button>
          <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className={`${btnBase} ${editor?.isActive('codeBlock') ? btnActive : ''}`} title="Insert Code Block"><Terminal size={18} /></button>
          <button onClick={insertFaq} className={btnBase} title="Insert FAQ Section"><HelpCircle size={18} /></button>
          <button onClick={insertCta} className={btnBase} title="Insert CTA Banner"><Megaphone size={18} /></button>
          <button onClick={insertTestimonial} className={btnBase} title="Insert Testimonial"><Star size={18} /></button>
          <button onClick={() => editor?.chain().focus().setHardBreak().run()} className={btnBase} title="Line break"><ArrowDown size={18} /></button>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`${btnBase} ${editor?.isActive('bulletList') ? btnActive : ''}`} title="Bullet list"><List size={18} /></button>
          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`${btnBase} ${editor?.isActive('orderedList') ? btnActive : ''}`} title="Numbered list"><ListOrdered size={18} /></button>
          <button onClick={() => editor?.chain().focus().setTextAlign('left').run()} className={`${btnBase} ${editor?.isActive({ textAlign: 'left' }) ? btnActive : ''}`} title="Align left"><AlignLeft size={18} /></button>
          <button onClick={() => editor?.chain().focus().setTextAlign('center').run()} className={`${btnBase} ${editor?.isActive({ textAlign: 'center' }) ? btnActive : ''}`} title="Align center"><AlignCenter size={18} /></button>
          <button onClick={() => editor?.chain().focus().setTextAlign('right').run()} className={`${btnBase} ${editor?.isActive({ textAlign: 'right' }) ? btnActive : ''}`} title="Align right"><AlignRight size={18} /></button>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={btnBase} title="Insert table"><Table2 size={18} /></button>
          <button onClick={() => editor?.chain().focus().addColumnBefore().run()} className={btnBase} title="Add column before"><BetweenHorizonalEnd size={18} /></button>
          <button onClick={() => editor?.chain().focus().addRowAfter().run()} className={btnBase} title="Add row after"><BetweenVerticalEnd size={18} /></button>
          <button onClick={() => editor?.chain().focus().deleteColumn().run()} className={btnBase} title="Delete column"><Columns size={18} className="rotate-90 opacity-50" /><Minus size={10} className="absolute ml-3 mt-3 text-red-500" /></button>
          <button onClick={() => editor?.chain().focus().deleteRow().run()} className={btnBase} title="Delete row"><Columns size={18} className="opacity-50" /><Minus size={10} className="absolute ml-3 mt-3 text-red-500" /></button>
          <button onClick={() => editor?.chain().focus().deleteTable().run()} className={`${btnBase} text-red-500 hover:bg-red-50`} title="Delete table"><Trash2 size={18} /></button>
        </div>
      </div>

      <Transition show={isLinkModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsLinkModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-md border border-gray-100">
                  <div className="bg-white px-6 pb-6 pt-6 sm:p-6 sm:pb-4">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">Add a link</Dialog.Title>
                    <div className="mt-2">
                      <input type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-shadow" placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') applyLink(); }} autoFocus />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-2">
                    <button type="button" className="inline-flex w-full justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:w-auto transition-colors" onClick={applyLink}>Save Link</button>
                    {linkSelectionActive && <button type="button" className="inline-flex w-full justify-center rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100 sm:w-auto mr-auto transition-colors" onClick={unlink}>Remove Link</button>}
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors" onClick={() => setIsLinkModalOpen(false)}>Cancel</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm focus-within:shadow-md focus-within:border-gray-200 transition-all duration-300 px-6 py-8 sm:px-12 sm:py-16">
        <EditorContent editor={editor} className="w-full" />
      </div>
    </div>
  );
};

export default Tiptap;