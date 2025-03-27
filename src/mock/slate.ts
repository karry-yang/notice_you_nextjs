import {  Descendant } from 'slate';
export const initialValue: Descendant[] = [
  // 文本
    {
      type: 'paragraph',
      children: [
        { text: '这是普通文本，' },
        { text: '这是加粗文本', bold: true },
        { text: ' ', bold: false },
        {
          type: 'link',
          url: 'https://example.com',
          children: [{ text: '这是一个链接' }]
        },
        { text: '。' }
      ]
    },
    // 图片
    {
      type: 'image',
      url: '/image.jpg',
      alt: '示例图片',
      children: [{ text: '' }]
    },
    // 文件
    {
      type: 'file',
      fileType: 'pdf',
      url: '/file.pdf',
      fileName: '文档.pdf',
      children: [{ text: '' }]
    }
   
  ];