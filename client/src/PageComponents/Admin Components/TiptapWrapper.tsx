'use client'

import React, { useState } from 'react'
import Tiptap from './Editor' // adjust path if needed

export default function TiptapWrapper() {
  const [content, setContent] = useState('<p>Start typing your blog...</p>');

  return (
    <Tiptap content={content} onChange={setContent} />
  );
}
