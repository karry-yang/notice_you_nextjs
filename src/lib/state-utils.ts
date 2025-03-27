
import { Editor, Element, Text, Transforms, Range} from 'slate';
import type { 
  LinkElement, 
  ImageElement, 
  FileElement 
} from '../types/slate';
// 检查文本格式是否激活（自定义实现）
type TextFormats = 'bold' | 'italic' | 'underline' | 'code'|'strikethrough'|'light'; 

export const isMarkActive = (
  editor: Editor, 
  format: TextFormats
): boolean => {
  const marks = Editor.marks(editor) as Partial<Record<TextFormats, boolean>>;
  return marks?.[format] === true;
};

// 检查链接是否激活（自定义实现）
export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: n => Element.isElement(n) && n.type === 'link',
  });
  return !!link;
};

// 移除链接（自定义实现）
export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: n => Element.isElement(n) && n.type === 'link',
  });
};


// 切换文本样式
export const toggleMark = (editor: Editor, format: TextFormats) => {
  const isActive = isMarkActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

// 插入图片
export const insertImage = (editor: Editor, url: string, alt = '') => {
  const image: ImageElement = {
    type: 'image',
    url,
    alt,
    children: [{ text: '' }]
  };
  Transforms.insertNodes(editor, image);
};

// 插入文件
export const insertFile = (
  editor: Editor,
  url: string,
  fileName: string,
  fileType: string
) => {
  const file: FileElement = {
    type: 'file',
    url,
    fileName,
    fileType,
    children: [{ text: '' }]
  };
  Transforms.insertNodes(editor, file);
};

// 添加/移除链接
export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : []
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};