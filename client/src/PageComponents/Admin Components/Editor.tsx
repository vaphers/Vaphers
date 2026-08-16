'use client';

import React, { useRef, useState, Fragment, useEffect } from 'react';
import {
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from '@tiptap/react';
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
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Table2,
  Minus,
  Columns,
  Link2Off,
  Quote,
  Trash2,
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  HelpCircle,
  Megaphone,
  Star,
  Terminal,
  Copy,
  Check,
  Calendar,
  Sparkles,
  SearchCheck,
  Crosshair,
  ChevronDown,
  Layers,
  Youtube,
  Globe,
  Images,
} from 'lucide-react';
import {
  YouTubeEmbedNode,
  WebsiteCardNode,
  ImageGalleryNode,
  validateImageSize,
} from './EditorEmbedExtensions';

const lowlight = createLowlight(common);

type EditorProps = {
  content: string;
  onChange?: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
};

const Divider = () => <div className="w-[1px] h-4 bg-[#e5e5e5] mx-1 hidden sm:block" />;

const CodeBlockComponent = ({ node, updateAttributes }: any) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(node.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeViewWrapper className="relative group my-6 font-mono">
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2">
        <select
          contentEditable={false}
          value={node.attrs.language || 'javascript'}
          onChange={(event) => updateAttributes({ language: event.target.value })}
          className="text-xs bg-white border border-gray-200 rounded px-2 py-1 text-gray-600 shadow-sm focus:outline-none cursor-pointer"
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
          className="p-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded text-gray-500 shadow-sm transition-colors flex items-center justify-center cursor-pointer"
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-teal-600" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="!bg-[#f7f6f3] !rounded-md !p-5 !text-[14px] !leading-relaxed !text-[#eb5757] overflow-x-auto !shadow-none no-scrollbar">
        <NodeViewContent as={'code' as any} className="!bg-transparent !p-0 !text-inherit" />
      </pre>
    </NodeViewWrapper>
  );
};

const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
});

// --- CUSTOM IMAGE COMPONENT FOR CAPTIONS ---
const ImageComponent = ({ node, updateAttributes }: any) => {
  return (
    <NodeViewWrapper as="figure" className="relative group my-8 flex flex-col items-center max-w-full">
      <img
        src={node.attrs.src}
        alt={node.attrs.alt}
        title={node.attrs.title}
        style={{ width: node.attrs.width || 'auto', height: node.attrs.height || 'auto' }}
        className="rounded-md shadow-sm max-w-full"
      />
      <input
        type="text"
        className="mt-0 text-[0.875rem] text-center text-[#6b7280] bg-transparent border-none outline-none w-full max-w-md placeholder:text-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50 rounded px-2 py-1"
        placeholder="Write a caption..."
        value={node.attrs.caption || ''}
        onChange={(e) => updateAttributes({ caption: e.target.value })}
        onKeyDownCapture={(e) => e.stopPropagation()}
      />
    </NodeViewWrapper>
  );
};

const CustomImage = Image.extend({
  inline: false,
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
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
    return [
      {
        tag: 'figure',
        getAttrs: (dom) => {
          const img = dom.querySelector('img');
          const figcaption = dom.querySelector('figcaption');
          if (!img) return false;
          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            title: img.getAttribute('title'),
            caption: figcaption ? figcaption.textContent || figcaption.innerText : '',
            style: dom.getAttribute('style'),
          };
        },
      },
      { tag: 'img' },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const { caption, style, float, width, height, ...imgAttrs } = HTMLAttributes;
    const figureStyle = `${style || ''} float: ${float || 'none'}; width: ${width || 'auto'}; height: ${
      height || 'auto'
    };`.trim();

    if (caption) {
      return [
        'figure',
        { class: 'image-wrapper', style: figureStyle },
        ['img', { ...imgAttrs, style: figureStyle }],
        ['figcaption', {}, caption],
      ];
    }

    return [
      'figure',
      { class: 'image-wrapper', style: figureStyle },
      ['img', { ...imgAttrs, style: figureStyle }],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});

const StrategyBox = Node.create({
  name: 'strategyBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="strategy"]',
        contentElement: (node) => (node as HTMLElement).querySelector('.widget-main-col') || (node as HTMLElement),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const gridStyle = `background-color: #F8FAFC; background-image: linear-gradient(to right, rgba(14, 165, 233, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.08) 1px, transparent 1px); background-size: 24px 24px;`;
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'strategy',
        class:
          'widget-container relative overflow-hidden rounded-3xl border border-blue-200/70 p-6 sm:p-8 md:p-12 my-10 shadow-lg shadow-blue-500/5 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center not-prose transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/10',
        style: gridStyle,
      }),
      [
        'div',
        {
          class:
            'widget-main-col md:col-span-7 flex flex-col justify-center text-left [&>.widget-badge]:!inline-flex [&>.widget-badge]:!items-center [&>.widget-badge]:!text-[11px] [&>.widget-badge]:!font-bold [&>.widget-badge]:!tracking-widest [&>.widget-badge]:!uppercase [&>.widget-badge]:!text-blue-700 [&>.widget-badge]:!bg-blue-100/90 [&>.widget-badge]:!border [&>.widget-badge]:!border-blue-200 [&>.widget-badge]:!px-3.5 [&>.widget-badge]:!py-1 [&>.widget-badge]:!rounded-full [&>.widget-badge]:!mb-4 [&>.widget-badge]:!w-fit [&>h2,&>h3]:!text-[#0F172A] [&>h2,&>h3]:!text-2xl sm:[&>h2,&>h3]:!text-3xl md:[&>h2,&>h3]:!text-[2.1rem] [&>h2,&>h3]:!font-extrabold [&>h2,&>h3]:!tracking-tight [&>h2,&>h3]:!mb-3 [&>h2,&>h3]:!mt-0 [&>h2,&>h3]:!leading-[1.15] [&>p:not(:last-of-type)]:!text-[#475569] [&>p:not(:last-of-type)]:!text-base sm:[&>p:not(:last-of-type)]:!text-[1.05rem] [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!mb-7 [&_a]:!inline-flex [&_a]:!items-center [&_a]:!justify-center [&_a]:!gap-2 [&_a]:!bg-[#0F172A] hover:[&_a]:!bg-[#1E293B] [&_a]:!text-white [&_a]:!font-bold [&_a]:!py-3.5 [&_a]:!px-7 [&_a]:!rounded-lg [&_a]:!text-sm sm:[&_a]:!text-base [&_a]:!will-change-transform [&_a]:!transition-transform [&_a]:!duration-150 [&_a]:!ease-out [&_a]:!shadow-md hover:[&_a]:!-translate-y-0.5 [&_a]:!cursor-pointer [&_a]:!no-underline [&_a]:!w-fit',
        },
        0,
      ],
      [
        'div',
        { class: 'widget-card-col md:col-span-5 select-none', contenteditable: 'false' },
        [
          'div',
          { class: 'relative rounded-2xl bg-gradient-to-b from-[#003057] to-[#001D38] p-6 sm:p-7 text-white shadow-2xl shadow-blue-950/40 border border-blue-400/20 text-left overflow-hidden' },
          [
            'div',
            { class: 'absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none' },
          ],
          ['div', { class: 'text-white font-bold text-base sm:text-lg mb-6 leading-snug tracking-tight relative z-10' }, 'Plan your marketing budget with our easy to use Marketing Calculator'],
          [
            'div',
            { class: 'mb-6 relative z-10' },
            ['div', { class: 'text-xs text-blue-200 font-medium mb-3' }, 'What is your monthly budget?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#001429] rounded-full flex items-center border border-blue-900/60' },
              [
                'div',
                { class: 'h-full w-2/3 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[60%] -translate-x-1/2 bg-[#0066FF] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ $4000 ›',
              ],
            ],
          ],
          [
            'div',
            { class: 'mb-2 relative z-10' },
            ['div', { class: 'text-xs text-blue-200 font-medium mb-3' }, 'What is your time frame?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#001429] rounded-full flex items-center border border-blue-900/60' },
              [
                'div',
                { class: 'h-full w-3/4 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[70%] -translate-x-1/2 bg-[#0066FF] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ 12 months ›',
              ],
            ],
          ],
        ],
      ],
    ];
  },
});

const AiAuditBox = Node.create({
  name: 'aiAuditBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="ai-audit"]',
        contentElement: (node) => (node as HTMLElement).querySelector('.widget-main-col') || (node as HTMLElement),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const gridStyle = `background-color: #FAF5FF; background-image: linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px); background-size: 24px 24px;`;
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'ai-audit',
        class:
          'widget-container relative overflow-hidden rounded-3xl border border-purple-200/70 p-6 sm:p-8 md:p-12 my-10 shadow-lg shadow-purple-500/5 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center not-prose transition-shadow duration-300 hover:shadow-xl hover:shadow-purple-500/10',
        style: gridStyle,
      }),
      [
        'div',
        {
          class:
            'widget-main-col md:col-span-7 flex flex-col justify-center text-left [&>.widget-badge]:!inline-flex [&>.widget-badge]:!items-center [&>.widget-badge]:!text-[11px] [&>.widget-badge]:!font-bold [&>.widget-badge]:!tracking-widest [&>.widget-badge]:!uppercase [&>.widget-badge]:!text-purple-700 [&>.widget-badge]:!bg-purple-100/90 [&>.widget-badge]:!border [&>.widget-badge]:!border-purple-200 [&>.widget-badge]:!px-3.5 [&>.widget-badge]:!py-1 [&>.widget-badge]:!rounded-full [&>.widget-badge]:!mb-4 [&>.widget-badge]:!w-fit [&>h2,&>h3]:!text-[#0F172A] [&>h2,&>h3]:!text-2xl sm:[&>h2,&>h3]:!text-3xl md:[&>h2,&>h3]:!text-[2.1rem] [&>h2,&>h3]:!font-extrabold [&>h2,&>h3]:!tracking-tight [&>h2,&>h3]:!mb-3 [&>h2,&>h3]:!mt-0 [&>h2,&>h3]:!leading-[1.15] [&>p:not(:last-of-type)]:!text-[#475569] [&>p:not(:last-of-type)]:!text-base sm:[&>p:not(:last-of-type)]:!text-[1.05rem] [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!mb-7 [&_a]:!inline-flex [&_a]:!items-center [&_a]:!justify-center [&_a]:!gap-2 [&_a]:!bg-[#0F172A] hover:[&_a]:!bg-[#1E293B] [&_a]:!text-white [&_a]:!font-bold [&_a]:!py-3.5 [&_a]:!px-7 [&_a]:!rounded-lg [&_a]:!text-sm sm:[&_a]:!text-base [&_a]:!will-change-transform [&_a]:!transition-transform [&_a]:!duration-150 [&_a]:!ease-out [&_a]:!shadow-md hover:[&_a]:!-translate-y-0.5 [&_a]:!cursor-pointer [&_a]:!no-underline [&_a]:!w-fit',
        },
        0,
      ],
      [
        'div',
        { class: 'widget-card-col md:col-span-5 select-none', contenteditable: 'false' },
        [
          'div',
          { class: 'relative rounded-2xl bg-gradient-to-b from-[#1E113A] to-[#120826] p-6 sm:p-7 text-white shadow-2xl shadow-purple-950/40 border border-purple-400/20 text-left overflow-hidden' },
          [
            'div',
            { class: 'absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none' },
          ],
          ['div', { class: 'text-white font-bold text-base sm:text-lg mb-6 leading-snug tracking-tight relative z-10' }, 'Benchmark your visibility with our AI Search Calculator'],
          [
            'div',
            { class: 'mb-6 relative z-10' },
            ['div', { class: 'text-xs text-purple-200 font-medium mb-3' }, 'What is your target AI visibility?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#0C051A] rounded-full flex items-center border border-purple-900/60' },
              [
                'div',
                { class: 'h-full w-4/5 bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[70%] -translate-x-1/2 bg-[#7C3AED] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ Top 3 Cited ›',
              ],
            ],
          ],
          [
            'div',
            { class: 'mb-2 relative z-10' },
            ['div', { class: 'text-xs text-purple-200 font-medium mb-3' }, 'What is your industry sector?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#0C051A] rounded-full flex items-center border border-purple-900/60' },
              [
                'div',
                { class: 'h-full w-2/3 bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[60%] -translate-x-1/2 bg-[#7C3AED] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ High Intent ›',
              ],
            ],
          ],
        ],
      ],
    ];
  },
});

const SeoAuditBox = Node.create({
  name: 'seoAuditBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="seo-audit"]',
        contentElement: (node) => (node as HTMLElement).querySelector('.widget-main-col') || (node as HTMLElement),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const gridStyle = `background-color: #F0FDF4; background-image: linear-gradient(to right, rgba(20, 184, 166, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 184, 166, 0.08) 1px, transparent 1px); background-size: 24px 24px;`;
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'seo-audit',
        class:
          'widget-container relative overflow-hidden rounded-3xl border border-teal-200/70 p-6 sm:p-8 md:p-12 my-10 shadow-lg shadow-teal-500/5 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center not-prose transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-500/10',
        style: gridStyle,
      }),
      [
        'div',
        {
          class:
            'widget-main-col md:col-span-7 flex flex-col justify-center text-left [&>.widget-badge]:!inline-flex [&>.widget-badge]:!items-center [&>.widget-badge]:!text-[11px] [&>.widget-badge]:!font-bold [&>.widget-badge]:!tracking-widest [&>.widget-badge]:!uppercase [&>.widget-badge]:!text-teal-700 [&>.widget-badge]:!bg-teal-100/90 [&>.widget-badge]:!border [&>.widget-badge]:!border-teal-200 [&>.widget-badge]:!px-3.5 [&>.widget-badge]:!py-1 [&>.widget-badge]:!rounded-full [&>.widget-badge]:!mb-4 [&>.widget-badge]:!w-fit [&>h2,&>h3]:!text-[#0F172A] [&>h2,&>h3]:!text-2xl sm:[&>h2,&>h3]:!text-3xl md:[&>h2,&>h3]:!text-[2.1rem] [&>h2,&>h3]:!font-extrabold [&>h2,&>h3]:!tracking-tight [&>h2,&>h3]:!mb-3 [&>h2,&>h3]:!mt-0 [&>h2,&>h3]:!leading-[1.15] [&>p:not(:last-of-type)]:!text-[#475569] [&>p:not(:last-of-type)]:!text-base sm:[&>p:not(:last-of-type)]:!text-[1.05rem] [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!mb-7 [&_a]:!inline-flex [&_a]:!items-center [&_a]:!justify-center [&_a]:!gap-2 [&_a]:!bg-[#0F172A] hover:[&_a]:!bg-[#1E293B] [&_a]:!text-white [&_a]:!font-bold [&_a]:!py-3.5 [&_a]:!px-7 [&_a]:!rounded-lg [&_a]:!text-sm sm:[&_a]:!text-base [&_a]:!will-change-transform [&_a]:!transition-transform [&_a]:!duration-150 [&_a]:!ease-out [&_a]:!shadow-md hover:[&_a]:!-translate-y-0.5 [&_a]:!cursor-pointer [&_a]:!no-underline [&_a]:!w-fit',
        },
        0,
      ],
      [
        'div',
        { class: 'widget-card-col md:col-span-5 select-none', contenteditable: 'false' },
        [
          'div',
          { class: 'relative rounded-2xl bg-gradient-to-b from-[#053235] to-[#021F21] p-6 sm:p-7 text-white shadow-2xl shadow-teal-950/40 border border-teal-400/20 text-left overflow-hidden' },
          [
            'div',
            { class: 'absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none' },
          ],
          ['div', { class: 'text-white font-bold text-base sm:text-lg mb-6 leading-snug tracking-tight relative z-10' }, 'Analyze your website health with our SEO Diagnostic Audit'],
          [
            'div',
            { class: 'mb-6 relative z-10' },
            ['div', { class: 'text-xs text-teal-200 font-medium mb-3' }, 'What is your monthly traffic goal?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#011415] rounded-full flex items-center border border-teal-900/60' },
              [
                'div',
                { class: 'h-full w-3/4 bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[70%] -translate-x-1/2 bg-[#0D9488] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ 50,000+ Visits ›',
              ],
            ],
          ],
          [
            'div',
            { class: 'mb-2 relative z-10' },
            ['div', { class: 'text-xs text-teal-200 font-medium mb-3' }, 'What is your target health score?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#011415] rounded-full flex items-center border border-teal-900/60' },
              [
                'div',
                { class: 'h-full w-[85%] bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[80%] -translate-x-1/2 bg-[#0D9488] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ 98 / 100 ›',
              ],
            ],
          ],
        ],
      ],
    ];
  },
});

const CompetitorAuditBox = Node.create({
  name: 'competitorAuditBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="competitor-audit"]',
        contentElement: (node) => (node as HTMLElement).querySelector('.widget-main-col') || (node as HTMLElement),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const gridStyle = `background-color: #FFFDF5; background-image: linear-gradient(to right, rgba(217, 119, 6, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.08) 1px, transparent 1px); background-size: 24px 24px;`;
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'competitor-audit',
        class:
          'widget-container relative overflow-hidden rounded-3xl border border-amber-200/70 p-6 sm:p-8 md:p-12 my-10 shadow-lg shadow-amber-500/5 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center not-prose transition-shadow duration-300 hover:shadow-xl hover:shadow-amber-500/10',
        style: gridStyle,
      }),
      [
        'div',
        {
          class:
            'widget-main-col md:col-span-7 flex flex-col justify-center text-left [&>.widget-badge]:!inline-flex [&>.widget-badge]:!items-center [&>.widget-badge]:!text-[11px] [&>.widget-badge]:!font-bold [&>.widget-badge]:!tracking-widest [&>.widget-badge]:!uppercase [&>.widget-badge]:!text-amber-800 [&>.widget-badge]:!bg-amber-100/90 [&>.widget-badge]:!border [&>.widget-badge]:!border-amber-200 [&>.widget-badge]:!px-3.5 [&>.widget-badge]:!py-1 [&>.widget-badge]:!rounded-full [&>.widget-badge]:!mb-4 [&>.widget-badge]:!w-fit [&>h2,&>h3]:!text-[#0F172A] [&>h2,&>h3]:!text-2xl sm:[&>h2,&>h3]:!text-3xl md:[&>h2,&>h3]:!text-[2.1rem] [&>h2,&>h3]:!font-extrabold [&>h2,&>h3]:!tracking-tight [&>h2,&>h3]:!mb-3 [&>h2,&>h3]:!mt-0 [&>h2,&>h3]:!leading-[1.15] [&>p:not(:last-of-type)]:!text-[#475569] [&>p:not(:last-of-type)]:!text-base sm:[&>p:not(:last-of-type)]:!text-[1.05rem] [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!mb-7 [&_a]:!inline-flex [&_a]:!items-center [&_a]:!justify-center [&_a]:!gap-2 [&_a]:!bg-[#0F172A] hover:[&_a]:!bg-[#1E293B] [&_a]:!text-white [&_a]:!font-bold [&_a]:!py-3.5 [&_a]:!px-7 [&_a]:!rounded-lg [&_a]:!text-sm sm:[&_a]:!text-base [&_a]:!will-change-transform [&_a]:!transition-transform [&_a]:!duration-150 [&_a]:!ease-out [&_a]:!shadow-md hover:[&_a]:!-translate-y-0.5 [&_a]:!cursor-pointer [&_a]:!no-underline [&_a]:!w-fit',
        },
        0,
      ],
      [
        'div',
        { class: 'widget-card-col md:col-span-5 select-none', contenteditable: 'false' },
        [
          'div',
          { class: 'relative rounded-2xl bg-gradient-to-b from-[#2B1B06] to-[#1A0E02] p-6 sm:p-7 text-white shadow-2xl shadow-amber-950/40 border border-amber-400/20 text-left overflow-hidden' },
          [
            'div',
            { class: 'absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none' },
          ],
          ['div', { class: 'text-white font-bold text-base sm:text-lg mb-6 leading-snug tracking-tight relative z-10' }, 'Plan your market share takeover with Competitor Gap Analysis'],
          [
            'div',
            { class: 'mb-6 relative z-10' },
            ['div', { class: 'text-xs text-amber-200 font-medium mb-3' }, 'How many competitors to analyze?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#120901] rounded-full flex items-center border border-amber-900/60' },
              [
                'div',
                { class: 'h-full w-2/3 bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[60%] -translate-x-1/2 bg-[#D97706] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ Top 3 Competitors ›',
              ],
            ],
          ],
          [
            'div',
            { class: 'mb-2 relative z-10' },
            ['div', { class: 'text-xs text-amber-200 font-medium mb-3' }, 'What is your keyword gap target?'],
            [
              'div',
              { class: 'relative h-2.5 bg-[#120901] rounded-full flex items-center border border-amber-900/60' },
              [
                'div',
                { class: 'h-full w-4/5 bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full' },
              ],
              [
                'div',
                { class: 'absolute left-[75%] -translate-x-1/2 bg-[#D97706] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1' },
                '‹ 50+ Keywords ›',
              ],
            ],
          ],
        ],
      ],
    ];
  },
});

const FaqBox = Node.create({
  name: 'faqBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [{ tag: 'div[data-type="faq"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const style = `--bg-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A56DB' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");`;
    const faqClasses = [
      'relative bg-[#F4F8FD] rounded-lg px-6 py-4 mb-3 border border-transparent hover:border-blue-100 transition-colors',
      '[&>*:first-child]:!text-[#1A56DB] [&>*:first-child]:!text-[1.05rem] [&>*:first-child]:!font-medium [&>*:first-child]:!m-0 [&>*:first-child]:!pr-8',
      '[&>*:first-child]:relative [&>*:first-child]:cursor-text',
      '[&>*:first-child]:after:content-[""] [&>*:first-child]:after:absolute [&>*:first-child]:after:right-0 [&>*:first-child]:after:top-1/2 [&>*:first-child]:after:-translate-y-1/2 [&>*:first-child]:after:w-5 [&>*:first-child]:after:h-5',
      '[&>*:first-child]:after:bg-[image:var(--bg-chevron)]',
      '[&>*:first-child]:after:bg-no-repeat [&>*:first-child]:after:bg-center [&>*:first-child]:after:bg-contain',
      '[&>*:not(:first-child)]:!text-[#37352f] [&>*:not(:first-child)]:!mt-3 [&>*:not(:first-child)]:!pt-3 [&>*:not(:first-child)]:!border-t [&>*:not(:first-child)]:!border-blue-100/60 [&>*:not(:first-child)]:!text-[15px] [&>*:not(:first-child)]:!leading-relaxed',
    ].join(' ');
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'faq', class: faqClasses, style }), 0];
  },
});

const CtaBox = Node.create({
  name: 'ctaBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [{ tag: 'div[data-type="cta"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const ctaClasses = [
      'relative overflow-hidden rounded-md bg-[#0f172a] px-8 py-14 my-8 text-center',
      'before:absolute before:-top-32 before:-right-16 before:w-80 before:h-80 before:rounded-full before:border-[55px] before:border-[#1e3a8a] before:content-[""] before:pointer-events-none',
      'after:absolute after:-bottom-32 after:-left-16 after:w-80 after:h-80 after:rounded-full after:border-[55px] after:border-[#1e3a8a] after:content-[""] after:pointer-events-none',
      '[&>*]:relative [&>*]:z-10',
      '[&>h2]:!text-white [&>h2]:!text-3xl [&>h2]:!font-bold [&>h2]:!mb-4 [&>h2]:!mt-0',
      '[&>p]:!text-slate-200 [&>p]:!text-lg [&>p]:!mb-8 [&>p]:!max-w-2xl [&>p]:!mx-auto',
      '[&_a]:!inline-block [&_a]:!bg-[#fbbf24] [&_a]:!text-[#0f172a] [&_a]:!font-bold [&_a]:!py-3 [&_a]:!px-8 [&_a]:!rounded-md [&_a]:!no-underline hover:[&_a]:!bg-[#f59e0b] [&_a]:!transition-colors [&_a]:!cursor-pointer',
    ].join(' ');
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'cta', class: ctaClasses }), 0];
  },
});

const TestimonialBox = Node.create({
  name: 'testimonialBox',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [{ tag: 'div[data-type="testimonial"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const style = `
      --bg-lines: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 -50 C 80 50 250 80 250 130' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M80 -50 C 130 50 250 30 250 80' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M130 -50 C 180 20 250 0 250 30' stroke='%2345E6E6' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
      --bg-confetti: url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 90 L35 110' stroke='%23FFD100' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M50 115 L70 130' stroke='%23FFD100' stroke-width='10' stroke-linecap='round'/%3E%3Cpath d='M85 135 L105 145' stroke='%23FFD100' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M10 115 L25 130' stroke='%23FFD100' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M50 140 L65 148' stroke='%23FFD100' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
    `.replace(/\n\s+/g, ' ');

    const testimonialClasses = [
      'relative overflow-hidden rounded-xl bg-[#247CE5] px-6 py-14 md:px-12 my-8 text-center shadow-lg',
      'before:absolute before:top-0 before:right-0 before:w-72 before:h-72 before:bg-[image:var(--bg-lines)] before:bg-no-repeat before:bg-right-top before:pointer-events-none',
      'after:absolute after:bottom-0 after:left-0 after:w-56 after:h-56 after:bg-[image:var(--bg-confetti)] after:bg-left-bottom after:pointer-events-none',
      '[&>*]:relative [&>*]:z-10',
      '[&>:is(h1,h2,h3,h4,h5,h6)]:!text-white [&>:is(h1,h2,h3,h4,h5,h6)]:!text-3xl md:[&>:is(h1,h2,h3,h4,h5,h6)]:!text-4xl [&>:is(h1,h2,h3,h4,h5,h6)]:!font-extrabold [&>:is(h1,h2,h3,h4,h5,h6)]:!mb-1 [&>:is(h1,h2,h3,h4,h5,h6)]:!mt-0',
      `[&>:first-child]:after:content-["★★★★★"] [&>:first-child]:after:block [&>:first-child]:after:text-[#FACC15] [&>:first-child]:after:text-3xl [&>:first-child]:after:tracking-[0.15em] [&>:first-child]:after:mx-auto [&>:first-child]:after:mt-4 [&>:first-child]:after:mb-4`,
      '[&>p:not(:last-of-type)]:!text-white [&>p:not(:last-of-type)]:!text-[1.15rem] md:[&>p:not(:last-of-type)]:!text-xl [&>p:not(:last-of-type)]:!mb-8 [&>p:not(:last-of-type)]:!max-w-4xl [&>p:not(:last-of-type)]:!mx-auto [&>p:not(:last-of-type)]:!leading-relaxed [&>p:not(:last-of-type)]:!font-medium',
      '[&>p:last-of-type]:!text-white [&>p:last-of-type]:!text-[1.05rem] [&>p:last-of-type]:!font-bold [&>p:last-of-type]:!tracking-[0.1em] [&>p:last-of-type]:!uppercase [&>p:last-of-type]:!m-0',
    ].join(' ');

    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'testimonial', class: testimonialClasses, style }), 0];
  },
});

const Tiptap: React.FC<EditorProps> = ({ content, onChange, title, onTitleChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const widgetsMenuRef = useRef<HTMLDivElement>(null);
  const [isWidgetsMenuOpen, setIsWidgetsMenuOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkSelectionActive, setLinkSelectionActive] = useState(false);
  const [activeFormat, setActiveFormat] = useState('0');

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetsMenuRef.current && !widgetsMenuRef.current.contains(event.target as globalThis.Node)) {
        setIsWidgetsMenuOpen(false);
      }
    };
    if (isWidgetsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWidgetsMenuOpen]);

  const btnBase =
    'p-1.5 text-[#37352f]/60 rounded hover:bg-[#efefef] hover:text-[#37352f] transition-colors focus:outline-none flex items-center justify-center';
  const btnActive = 'bg-[#efefef] text-[#37352f]';

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
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false,
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      CustomCodeBlock.configure({ lowlight, defaultLanguage: 'javascript' }),
      StrategyBox,
      AiAuditBox,
      SeoAuditBox,
      CompetitorAuditBox,
      FaqBox,
      CtaBox,
      TestimonialBox,
      CustomImage,
      YouTubeEmbedNode,
      WebsiteCardNode,
      ImageGalleryNode,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            'text-blue-600 underline underline-offset-2 decoration-[#d3e3fd] hover:decoration-blue-600 transition-colors',
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
      HardBreak,
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
        class:
          'prose max-w-none focus:outline-none min-h-[500px] pb-32 text-[#37352f] prose-p:leading-[1.6] prose-p:my-2 prose-headings:font-bold prose-headings:text-[#37352f] prose-h1:text-[32px] prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-[24px] prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-[20px] prose-h3:mt-4 prose-h3:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-[#37352f] prose-blockquote:pl-4 prose-blockquote:text-[#37352f] prose-blockquote:not-italic prose-blockquote:bg-transparent prose-img:rounded-md prose-img:shadow-sm prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 w-full selection:bg-[#cce2ff]',
      },
    },
  });

  useEffect(() => {
    if (editor && content && !isInitialized) {
      editor.commands.setContent(content);
      setIsInitialized(true);
    }
  }, [editor, content, isInitialized]);

  useEffect(() => {
    if (titleRef.current && title !== titleRef.current.textContent) {
      titleRef.current.textContent = title;
      if (title) titleRef.current.classList.remove('text-[#37352f]/30');
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
    if (linkUrl) {
      let validUrl = linkUrl.trim();
      if (
        !/^https?:\/\//i.test(validUrl) &&
        !/^mailto:/i.test(validUrl) &&
        !/^tel:/i.test(validUrl)
      ) {
        validUrl = `https://${validUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: validUrl, target: '_blank', rel: 'noopener noreferrer' })
        .run();
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

  const addImage = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const file = event.target.files?.[0];
    if (!file) return;

    // Strict image size limit check (< 200KB)
    const sizeCheck = validateImageSize(file);
    if (!sizeCheck.valid) {
      alert(sizeCheck.error);
      event.target.value = '';
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Missing Cloudinary environment variables. Check your .env file.');
      event.target.value = '';
      return;
    }

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const json = await res.json();

      if (!res.ok) {
        console.error('Cloudinary Error:', json);
        alert(
          `Upload Failed: ${json.error?.message || '401 Unauthorized'}\nMake sure your Upload Preset is set to "Unsigned".`
        );
        return;
      }

      if (json.secure_url) {
        editor.chain().focus().setImage({ src: json.secure_url }).run();
      } else {
        alert('Image upload failed: No secure URL returned.');
      }
    } catch (err) {
      console.error('Upload Exception:', err);
      alert('Image upload failed due to a network error.');
    } finally {
      event.target.value = '';
    }
  };

  const handleHeadingChange = (value: string) => {
    if (!editor) return;
    setActiveFormat(value);
    if (value === '0') editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
  };

  const insertStrategy = () => {
    if (!editor) return;
    const section = [
      {
        type: 'strategyBox',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Try our free Marketing Strategy Session' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Craft a tailored online marketing strategy! Meet directly with our search and acquisition specialists for a custom plan based on your location, reach, timeframe, and budget.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: 'https://calendar.app.google/2fERfiu4ESvHmAtb7',
                      target: '_blank',
                    },
                  },
                ],
                text: 'Plan Your Marketing Strategy',
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
    ];
    editor.chain().focus().insertContent(section).run();
  };

  const insertAiAudit = () => {
    if (!editor) return;
    const section = [
      {
        type: 'aiAuditBox',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Try our free AI Search Visibility Audit' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Find out how ChatGPT, Perplexity, Gemini, and Claude cite and rank your business. Request a custom plan based on your industry, reach, and AI search presence.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: '/contact',
                      target: '_blank',
                    },
                  },
                ],
                text: 'Plan Your AI Search Strategy',
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
    ];
    editor.chain().focus().insertContent(section).run();
  };

  const insertSeoAudit = () => {
    if (!editor) return;
    const section = [
      {
        type: 'seoAuditBox',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Try our free No-Cost SEO Audit' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Uncover what is holding your search rankings and website performance back. Receive a diagnostic breakdown of your technical health, Core Web Vitals, and keyword opportunities.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: '/contact',
                      target: '_blank',
                    },
                  },
                ],
                text: 'Plan Your SEO Audit',
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
    ];
    editor.chain().focus().insertContent(section).run();
  };

  const insertCompetitorAudit = () => {
    if (!editor) return;
    const section = [
      {
        type: 'competitorAuditBox',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Try our free Competitor Gap Analysis' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'See the exact search queries and content strategies driving traffic to your top competitors — and learn how to outperform them for qualified client leads.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: '/contact',
                      target: '_blank',
                    },
                  },
                ],
                text: 'Plan Your Competitor Analysis',
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
    ];
    editor.chain().focus().insertContent(section).run();
  };

  const insertFaq = () => {
    if (!editor) return;
    const faqSection = [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Frequently Asked Questions' }],
      },
      {
        type: 'faqBox',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'How do you structure an effective marketing campaign?' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Start typing your answer here...' }],
          },
        ],
      },
    ];
    editor.chain().focus().insertContent(faqSection).run();
  };

  const insertCta = () => {
    if (!editor) return;
    const ctaSection = [
      {
        type: 'ctaBox',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Scale Faster and Smarter with Vaphers' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'From visibility to conversions, Vaphers builds high-performance digital systems designed to attract, convert, and scale your revenue consistently.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'link', attrs: { href: 'https://www.vaphers.com', target: '_blank' } }],
                text: 'Grow with Vaphers',
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
    ];
    editor.chain().focus().insertContent(ctaSection).run();
  };

  const insertTestimonial = () => {
    if (!editor) return;
    const testimonialSection = [
      {
        type: 'testimonialBox',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Hear What It’s Like to Work With Us' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '“Vaphers is a fantastic partner. They provide the reporting I need, the results I want, and proactive growth strategies.”',
              },
            ],
          },
          { type: 'paragraph', content: [{ type: 'text', text: 'SATISFIED CLIENT' }] },
        ],
      },
      { type: 'paragraph' },
    ];
    editor.chain().focus().insertContent(testimonialSection).run();
  };

  const insertYouTube = () => {
    if (!editor) return;
    editor.chain().focus().insertContent({ type: 'youtubeEmbed', attrs: { src: '' } }).run();
  };

  const insertWebsiteCard = () => {
    if (!editor) return;
    editor.chain().focus().insertContent({ type: 'websiteCard', attrs: { url: '' } }).run();
  };

  const insertImageGallery = () => {
    if (!editor) return;
    editor.chain().focus().insertContent({ type: 'imageGallery', attrs: { images: [], columns: 2 } }).run();
  };

  return (
    <div className="min-h-screen bg-white text-[#37352f] selection:bg-[#cce2ff] font-sans no-scrollbar">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hljs-comment, .hljs-quote { color: #9ca3af; font-style: italic; }
        .hljs-keyword, .hljs-selector-tag, .hljs-type, .hljs-literal, .hljs-built_in { color: #d946ef; }
        .hljs-string, .hljs-symbol, .hljs-bullet, .hljs-attr { color: #10b981; }
        .hljs-title, .hljs-section, .hljs-attribute { color: #2563eb; }
        .hljs-variable, .hljs-template-variable { color: #f59e0b; }
        .hljs-number { color: #f97316; }
        .hljs-meta { color: #64748b; }
        .hljs-property { color: #37352f; }
        .hljs-operator { color: #37352f; }
        .hljs-punctuation { color: #37352f; }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #37352f;
          opacity: 0.3;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `,
        }}
      />

      {/* Formatting toolbar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#efefef] w-full px-4 py-2 flex flex-wrap items-center gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)] no-scrollbar">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className={`${btnBase} disabled:opacity-30`}
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className={`${btnBase} disabled:opacity-30`}
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>

        <Divider />

        <div className="flex items-center">
          <select
            value={activeFormat}
            onChange={(e) => handleHeadingChange(e.target.value)}
            className="h-7 px-2 text-[13px] font-medium border-0 bg-transparent text-[#37352f] hover:bg-[#efefef] rounded focus:ring-0 cursor-pointer appearance-none outline-none w-[110px]"
            title="Text style"
          >
            <option value="0">Text</option>
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
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`${btnBase} ${editor?.isActive('bold') ? btnActive : ''}`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`${btnBase} ${editor?.isActive('italic') ? btnActive : ''}`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`${btnBase} ${editor?.isActive('underline') ? btnActive : ''}`}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`${btnBase} ${editor?.isActive('strike') ? btnActive : ''}`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCode().run()}
            className={`${btnBase} ${editor?.isActive('code') ? btnActive : ''}`}
            title="Inline Code"
          >
            <Code size={16} />
          </button>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button
            onClick={openLinkModal}
            className={`${btnBase} ${linkSelectionActive ? btnActive : ''}`}
            title="Link"
          >
            <LinkIcon size={16} />
          </button>
          {linkSelectionActive && (
            <button
              onClick={() => {
                editor?.chain().focus().unsetLink().run();
                setLinkSelectionActive(false);
              }}
              className={`${btnBase} text-red-500 hover:bg-red-50`}
              title="Remove Link"
            >
              <Link2Off size={16} />
            </button>
          )}
          <button onClick={addImage} className={btnBase} title="Upload Image">
            <ImageIcon size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={`${btnBase} ${editor?.isActive('blockquote') ? btnActive : ''}`}
            title="Quote"
          >
            <Quote size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`${btnBase} ${editor?.isActive('codeBlock') ? btnActive : ''}`}
            title="Code Block"
          >
            <Terminal size={16} />
          </button>

          {/* Insert Widgets Dropdown */}
          <div className="relative inline-block text-left ml-1" ref={widgetsMenuRef}>
            <button
              type="button"
              onClick={() => setIsWidgetsMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200/70 rounded-md transition-all shadow-xs cursor-pointer"
              title="Insert Lead Generation & Growth Widgets"
            >
              <Layers size={13} className="text-blue-600" />
              <span>+ Widgets</span>
              <ChevronDown
                size={12}
                className={`text-blue-500 transition-transform duration-200 ${
                  isWidgetsMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isWidgetsMenuOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-xl bg-white shadow-2xl ring-1 ring-black/10 focus:outline-none z-50 p-2 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Growth & Audit Widgets
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      insertStrategy();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-blue-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1.5 rounded-md bg-blue-100/70 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Calendar size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800 group-hover:text-blue-700">
                        Free Strategy Session
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Google Calendar 30-min booking link
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertAiAudit();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-purple-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1.5 rounded-md bg-purple-100/70 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800 group-hover:text-purple-700">
                        AI Search Visibility Audit
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        ChatGPT, Perplexity & Gemini report
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertSeoAudit();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-teal-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1.5 rounded-md bg-teal-100/70 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <SearchCheck size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800 group-hover:text-teal-700">
                        No-Cost SEO Audit
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Technical health & ranking opportunities
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertCompetitorAudit();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-amber-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1.5 rounded-md bg-amber-100/70 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Crosshair size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800 group-hover:text-amber-700">
                        Competitor Gap Analysis
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Competitor keyword & traffic X-Ray
                      </div>
                    </div>
                  </button>
                </div>

                <div className="my-1.5 border-t border-gray-100" />

                <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Components
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      insertCta();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-left hover:bg-gray-100 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded-md bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Megaphone size={13} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">CTA Banner</div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        High-contrast lead banner
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertTestimonial();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-left hover:bg-gray-100 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded-md bg-yellow-100 text-yellow-700 group-hover:bg-yellow-500 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Star size={13} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">Testimonial Card</div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Client review & rating
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertFaq();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-left hover:bg-gray-100 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded-md bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <HelpCircle size={13} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">FAQ Section</div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Frequently asked questions
                      </div>
                    </div>
                  </button>
                </div>

                <div className="my-1.5 border-t border-gray-100" />

                <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Rich Embeds & Media
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      insertYouTube();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-left hover:bg-red-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded-md bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Youtube size={13} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">YouTube Video</div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Responsive 16:9 video player
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertWebsiteCard();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-left hover:bg-blue-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded-md bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Globe size={13} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">Website Bookmark Card</div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Auto-fetches OpenGraph preview & favicon
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      insertImageGallery();
                      setIsWidgetsMenuOpen(false);
                    }}
                    className="w-full flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-left hover:bg-indigo-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded-md bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Images size={13} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">Multi-Image Gallery</div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        Responsive 2-4 column grid (&lt; 200KB)
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`${btnBase} ${editor?.isActive('bulletList') ? btnActive : ''}`}
            title="Bulleted list"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`${btnBase} ${editor?.isActive('orderedList') ? btnActive : ''}`}
            title="Numbered list"
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className={`${btnBase} ${editor?.isActive({ textAlign: 'left' }) ? btnActive : ''}`}
            title="Align left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={`${btnBase} ${editor?.isActive({ textAlign: 'center' }) ? btnActive : ''}`}
            title="Align center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            className={`${btnBase} ${editor?.isActive({ textAlign: 'right' }) ? btnActive : ''}`}
            title="Align right"
          >
            <AlignRight size={16} />
          </button>
        </div>

        <Divider />

        <div className="flex items-center gap-0.5">
          <button
            onClick={() =>
              editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            className={btnBase}
            title="Insert table"
          >
            <Table2 size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().addColumnBefore().run()}
            className={btnBase}
            title="Add col"
          >
            <BetweenHorizonalEnd size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().addRowAfter().run()}
            className={btnBase}
            title="Add row"
          >
            <BetweenVerticalEnd size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().deleteColumn().run()}
            className={btnBase}
            title="Delete col"
          >
            <Columns size={16} className="rotate-90 opacity-50" />
            <Minus size={9} className="absolute ml-2.5 mt-2.5 text-red-500" />
          </button>
          <button
            onClick={() => editor?.chain().focus().deleteRow().run()}
            className={btnBase}
            title="Delete row"
          >
            <Columns size={16} className="opacity-50" />
            <Minus size={9} className="absolute ml-2.5 mt-2.5 text-red-500" />
          </button>
          <button
            onClick={() => editor?.chain().focus().deleteTable().run()}
            className={`${btnBase} text-red-500 hover:bg-red-50 hover:text-red-600`}
            title="Delete table"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[900px] mx-auto px-6 sm:px-16 md:px-24 py-12 sm:py-20 no-scrollbar">
        <h1
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          dir="ltr"
          onInput={(e) => {
            const newTitle = e.currentTarget.textContent || '';
            e.currentTarget.classList.remove('text-[#37352f]/30');
            onTitleChange(newTitle);
          }}
          onFocus={(e) => {
            if (e.currentTarget.textContent === 'Untitled') {
              e.currentTarget.textContent = '';
              e.currentTarget.classList.remove('text-[#37352f]/30');
            }
          }}
          onBlur={(e) => {
            if (e.currentTarget.textContent?.trim() === '') {
              e.currentTarget.textContent = 'Untitled';
              e.currentTarget.classList.add('text-[#37352f]/30');
            }
          }}
          className="text-[40px] font-bold tracking-tight mb-6 focus:outline-none leading-[1.2] text-[#37352f]/30 break-words"
          style={{ minHeight: '1.2em', direction: 'ltr', textAlign: 'left' }}
        >
          Untitled
        </h1>

        <div className="transition-all duration-300">
          <EditorContent editor={editor} className="w-full" />
        </div>
      </div>

      {/* Link Dialog */}
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
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-md border border-gray-100">
                  <div className="bg-white px-6 pb-6 pt-6 sm:p-6 sm:pb-4">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-[#37352f] mb-4">
                      Add a link
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="url"
                        className="w-full border border-gray-300 rounded px-4 py-2 text-[#37352f] focus:outline-none focus:ring-2 focus:ring-[#2383e2] focus:border-transparent transition-shadow"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') applyLink();
                        }}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="bg-[#f7f6f3] px-6 py-4 flex flex-row-reverse gap-2">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded bg-[#2383e2] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1a66b2] sm:w-auto transition-colors cursor-pointer"
                      onClick={applyLink}
                    >
                      Save Link
                    </button>
                    {linkSelectionActive && (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100 sm:w-auto mr-auto transition-colors cursor-pointer"
                        onClick={unlink}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded bg-white px-4 py-2 text-sm font-semibold text-[#37352f] shadow-sm border border-gray-200 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors cursor-pointer"
                      onClick={() => setIsLinkModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Tiptap;