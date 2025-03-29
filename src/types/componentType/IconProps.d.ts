// MyIcon.tsx 或对应的类型定义文件
export interface IconProps {
  type: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  tooltip?: string;
  width?: number | string;
  height?: number | string;
  position ?: string; // 位置属性,
}