"use client";
import { useSelected, useFocused, RenderElementProps } from "slate-react";
import { Element, Text, Descendant } from "slate";
import { CSSProperties } from "react";
import Image from "next/image";
import{ CustomText, EmptyText, ParagraphElement, LinkElement, ImageElement, FileElement } from "@/types/componentType/slate";

// type CustomElement = ParagraphElement | LinkElement | ImageElement | FileElement;

// 3. 增强类型守卫函数
const isParagraphElement = (element: Element): element is ParagraphElement =>
  element.type === "paragraph";

const isLinkElement = (element: Element): element is LinkElement =>
  element.type === "link";

const isImageElement = (element: Element): element is ImageElement =>
  element.type === "image";

const isFileElement = (element: Element): element is FileElement =>
  element.type === "file";

// 4. 主组件实现
const RenderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();

  // 5. 通用样式配置
  const baseStyles: CSSProperties = {
    margin: "0.5em 0",
    lineHeight: 1.5,
  };

  const selectedStyles: CSSProperties = {
    boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
    backgroundColor: selected && focused ? "#f5f9ff" : "transparent",
  };

  // 6. 使用类型守卫进行安全渲染
  if (isParagraphElement(element)) {
    return (
      <p
        {...attributes}
        style={{ ...baseStyles }}
        className="slate-paragraph"
      >
        {children}
      </p>
    );
  }

  if (isLinkElement(element)) {
    const linkStyles: CSSProperties = {
      ...selectedStyles,
      color: "#2563eb",
      textDecoration: "underline",
      cursor: "pointer",
    };

    return (
      <a
        {...attributes}
        href={element.url}
        style={linkStyles}
        className="slate-link"
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`External link to ${element.url}`}
      >
        {children}
      </a>
    );
  }

  if (isImageElement(element)) {
    const imageContainerStyles: CSSProperties = {
      ...selectedStyles,
      lineHeight: 0,
    };

    return (
      <div
        {...attributes}
        contentEditable={false}
        style={imageContainerStyles}
        className="slate-image-container"
      >
        <Image
          src={element.url}
          alt={element.alt ?? ""}
          width={500}
          height={300}
          className="slate-image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        {children}
      </div>
    );
  }

  if (isFileElement(element)) {
    const fileStyles: CSSProperties = {
      ...selectedStyles,
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "4px",
      backgroundColor: selected && focused ? "#f0f7ff" : "white",
      textDecoration: "none",
      color: "#1e40af",
    };

    return (
      <div
        {...attributes}
        contentEditable={false}
        className="slate-file-container"
      >
        <a
          href={element.url}
          style={fileStyles}
          className="slate-file-link"
          download={element.fileName}
          aria-label={`Download file ${element.fileName}`}
        >
          <Image src="/path/to/file-icon.png" alt="File icon" width={24} height={24} />
          <span
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {element.fileName}
          </span>
        </a>
        {children}
      </div>
    );
  }

  // 7. 处理未识别的元素类型
  console.warn("Unhandled element type:", element);
  return <div {...attributes}>{children}</div>;
};

export default RenderElement;