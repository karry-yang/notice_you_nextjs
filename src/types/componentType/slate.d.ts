// types/slate.d.ts
import { BaseElement, BaseText } from 'slate';

// 1. 定义所有文本格式属性
interface CustomTextFormat {
  bold?: boolean;         // 加粗
  italic?: boolean;       // 斜体
  underline?: boolean;    // 下划线
  strikethrough?: boolean;// 删除线
  code?: boolean;         // 代码块
  light?: string;         // 高亮颜色（可扩展为颜色值）
}
type EmptyText = { text: "" } & Text;
// 2. 基础文本节点（必须包含text属性）
interface CustomText extends CustomTextFormat, BaseText {
  text: string;
}

// 3. 定义所有元素类型
type CustomElementType = 
  | 'paragraph'    // 段落
  | 'heading'      // 标题
  | 'quote'        // 引用
  | 'link'         // 链接
  | 'image'        // 图片
  | 'file'         // 文件
  | 'ul'           // 无序列表
  | 'ol'           // 有序列表
  | 'li'           // 列表项
  | 'check'        // 复选框
  | 'code-block';  // 代码块

// 4. 扩展基础元素属性
interface CustomBaseElement extends BaseElement {
  type: CustomElementType;
  children: (CustomElement | CustomText)[];
}

// 5. 具体元素类型定义
interface ParagraphElement extends CustomBaseElement {
  type: 'paragraph';
  align?: 'left' | 'center' | 'right'; // 可选对齐方式
}

interface HeadingElement extends CustomBaseElement {
  type: 'heading';
  level: 1 | 2 | 3 | 4;  // 对应h1-h4
}

interface QuoteElement extends CustomBaseElement {
  type: 'quote';
  display: 'inline' | 'block'; // 行内引用或块级引用
}

interface LinkElement extends CustomBaseElement {
  type: 'link';
  url: string;
  target?: '_blank' | '_self';
  rel?: string; // SEO相关属性
}

interface ImageElement extends CustomBaseElement {
  type: 'image';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface FileElement extends CustomBaseElement {
  type: 'file';
  url: string;
  fileName: string;
  fileType: string;
  size?: number;
}

interface ListElement extends CustomBaseElement {
  type: 'ul' | 'ol';
}

interface ListItemElement extends CustomBaseElement {
  type: 'li';
}

interface CheckElement extends CustomBaseElement {
  type: 'check';
  checked: boolean;
}

interface CodeBlockElement extends CustomBaseElement {
  type: 'code-block';
  language?: string; // 编程语言类型
}

// 6. 联合所有元素类型
type CustomElement = 
  | ParagraphElement
  | HeadingElement
  | QuoteElement
  | LinkElement
  | ImageElement
  | FileElement
  | ListElement
  | ListItemElement
  | CheckElement
  | CodeBlockElement;

// 7. 扩展Slate类型系统
declare module 'slate' {
  interface CustomTypes {
    Text: CustomText;
    Element: CustomElement;
  }
}