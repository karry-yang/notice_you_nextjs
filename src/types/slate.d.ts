// types/slate.d.ts
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

// 1. 定义严格的文本节点类型
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
} & Text;

type EmptyText = { text: "" } & Text;

// 2. 使用联合类型明确定义所有支持的元素类型
type ParagraphElement = {
  type: "paragraph";
  children: Descendant[];
} & Element;

type LinkElement = {
  type: "link";
  url: string;
  children: CustomText[];
} & Element;

type ImageElement = {
  type: "image";
  url: string;
  alt?: string;
  children: [EmptyText];
} & Element;

type FileElement = {
  type: "file";
  url: string;
  fileName: string;
  fileType: string;
  children: [EmptyText];
} & Element;


// 所有元素类型的联合
type CustomElement = 
  | { 
      type: 'paragraph'; 
      children: Descendant[]  // 关键修改：使用更宽泛的类型
    }
  | { 
      type: 'heading'; 
      level: number; 
      children: Descendant[] 
    }
  | LinkElement
  | ImageElement
  | FileElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}

// 工具函数
export const isMarkActive = (
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>
): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};