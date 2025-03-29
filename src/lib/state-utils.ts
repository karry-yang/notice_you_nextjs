import { Editor, Transforms, Element, Text, Range } from "slate";
import { ReactEditor } from "slate-react";
import type { CustomElement, CustomText } from "@/types/componentType/slate";
// import { CustomBaseElement } from "@/types/slate";

// 通用工具函数
export const isMarkActive = (editor: Editor, format: keyof Omit<CustomText, "text">) => {
  const marks = Editor.marks(editor) as Partial<Omit<CustomText, "text">> | null;
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: keyof Omit<CustomText, "text">) => {
  const isActive = isMarkActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

// 文本格式操作
export const toggleBold = (editor: Editor) => toggleMark(editor, "bold");
export const toggleItalic = (editor: Editor) => toggleMark(editor, "italic");
export const toggleUnderline = (editor: Editor) => toggleMark(editor, "underline");
export const toggleStrikethrough = (editor: Editor) => toggleMark(editor, "strikethrough");
export const toggleCode = (editor: Editor) => toggleMark(editor, "code");
export const toggleHighlight = (editor: Editor) => toggleMark(editor, "light");

// 块级元素操作
export const toggleBlock = (editor: Editor, format: CustomElement["type"]) => {
  const isActive = isBlockActive(editor, format);
  const isList = ["ul", "ol"].includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => Element.isElement(n) && ["ul", "ol", "li"].includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: (() => {
      if (isActive) return "paragraph";
      if (isList) return "li";
      return format;
    })(),
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => Element.isElement(n) && n.type === format,
  });
  return !!match;
};

// 列表操作
export const toggleBulletList = (editor: Editor) => toggleBlock(editor, "ul");
export const toggleOrderedList = (editor: Editor) => toggleBlock(editor, "ol");

// 标题操作
export const toggleHeading = (editor: Editor, level: number) => {
  Transforms.setNodes(editor, {
    type: "heading",
    level,
  });
};

// 链接操作
export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: n => Element.isElement(n) && n.type === "link",
  });
  return !!link;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: n => Element.isElement(n) && n.type === "link",
  });
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

// 图片操作
export const insertImage = (editor: Editor, url: string, alt = "") => {
  const image: CustomElement = {
    type: "image",
    url,
    alt,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, image);
};

// 文件操作
export const insertFile = (editor: Editor, url: string, fileName: string) => {
  const file: CustomElement = {
    type: "file",
    url,
    fileName,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, file);
};

// 引用操作
export const insertQuote = (editor: Editor) => {
  const quote: CustomElement = {
    type: "quote",
    display: "block",
    children: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  };
  Transforms.wrapNodes(editor, quote, {
    match: n => Editor.isBlock(editor, n),
  });
};

// 待办事项操作
export const insertChecklist = (editor: Editor) => {
  const checklist: CustomElement = {
    type: "check",
    checked: false,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, checklist);
};

// 时间戳操作
export const insertTimestamp = (editor: Editor) => {
  const timeString = new Date().toLocaleString();
  Transforms.insertText(editor, timeString);
};

// 全屏操作（需要配合UI框架实现）
export const toggleFullscreen = () => {
  // 实际实现取决于您的UI框架
  console.log("Toggle fullscreen");
};

// 导出所有操作
export const slateActions = {
  full_screen: toggleFullscreen,
  bold: toggleBold,
  italic: toggleItalic,
  underline: toggleUnderline,
  strikethrough: toggleStrikethrough,
  code: toggleCode,
  link: insertLink,
  image: insertImage,
  file: insertFile,
  ul: toggleBulletList,
  ol: toggleOrderedList,
  quote: insertQuote,
  light: toggleHighlight,
  heading: {
    one: (editor: Editor) => toggleHeading(editor, 1),
    two: (editor: Editor) => toggleHeading(editor, 2),
    three: (editor: Editor) => toggleHeading(editor, 3),
    four: (editor: Editor) => toggleHeading(editor, 4),
  },
  check: insertChecklist,
  time: insertTimestamp,
};