"use client";

import { useEffect, useState } from "react";
import { IconProps } from "@/types/componentType/IconProps";

/**
 * @description 图标组件
 * @param type string类型  图标类型
 * @param className  string类型
 * @param style  React.CSSProperties类型    SVG 的有效样式属性
 * @param  onClick  function类型 点击事件
 */

//React.FC 是 React 提供的泛型类型，用于定义函数组件。
const MyIcon: React.FC<IconProps> = ({
  type,
  className = "",
  style,
  onClick,
  tooltip,
  width = 24, // 默认宽度
  height = 24, // 默认高度
  onMouseEnter,
  onMouseLeave,
  position = "bottom", // 默认位置为 bottom
}) => {
  useEffect(() => {
    // 动态加载 IconFont 的 JS 文件
    const script = document.createElement("script");
    script.src = "//at.alicdn.com/t/c/font_4631415_q8877qn1xaf.js";
    document.body.appendChild(script);

    return () => {
      // 组件卸载时移除脚本
      document.body.removeChild(script);
    };
  }, [type, className]);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = (e: React.MouseEvent) => {
    setShowTooltip(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setShowTooltip(false);
    onMouseLeave?.(e);
  };
  return (
    <>
      <svg
        className={`icon ${type} ${className}`} // 结合类名
        aria-hidden="true"
        aria-label={type} // 添加 aria-label
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          width: `${width}px`, // 支持数字或字符串（如 "20px"）
          height: `${height}px`,
          cursor: onClick ? "pointer" : "default", // 设置光标样式
        }}
      >
        <use xlinkHref={`#${type}`} />
      </svg>
      {tooltip && showTooltip && (
        <div
          className={`icon-tooltip 
            z-50
             absolute
              bg-gray-800
               text-white 
               text-xs 
               rounded px-2 py-1 
         transition-all
      duration-200
      ${position === "top" ? "bottom-full mb-1" : ""}
      ${position === "bottom" ? "top-full mt-1" : ""}
      ${position === "left" ? "right-full mr-1" : ""}
      ${position === "right" ? "left-full ml-1" : ""}
     `}
        >
          {tooltip}
        </div>
      )}
    </>
  );
};

/**
 * aria-label={type}
 * 图标通常是一个视觉元素，例如一个 <i> 标签或 <button> 标签，内部没有文本内容。
 * 对于视障用户来说，屏幕阅读器无法直接读取图标的内容，因为图标本身没有语义化的文本描述。
 * 如果没有 aria-label，屏幕阅读器可能会完全忽略图标，或者读取一些无意义的内容（例如图标的类名）。
 */

export default MyIcon;
// Removed the conflicting local useState function
