import React from "react";
import { RenderLeafProps } from "slate-react";
import { CustomText, EmptyText } from "../types/slate";
const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const hasMark = (leaf: CustomText | EmptyText, key: keyof CustomText): boolean => {
    return key in leaf && !!leaf[key as keyof typeof leaf];
  };

  return (
    <span
      {...attributes}
      style={{
        fontWeight: hasMark(leaf, 'bold') ? "bold" : "normal",
        fontStyle: hasMark(leaf, 'italic') ? "italic" : "normal",
        textDecoration: [
          hasMark(leaf, 'underline') ? 'underline' : '',
          hasMark(leaf, 'line-through') ? 'line-through' : ''
        ].join(' ') || 'none',
        backgroundColor: hasMark(leaf, 'highlight') ? "#ffeeba" : "transparent",
        borderLeft: hasMark(leaf, 'quote') ? "2px solid #ddd" : "none",
        fontFamily: hasMark(leaf, 'code') ? "monospace" : undefined,
      }}
    >
      {children}
    </span>
  );
};

export default renderLeaf;
