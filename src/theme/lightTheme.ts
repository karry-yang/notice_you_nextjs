// theme/lightTheme.ts
import { ThemeConfig } from "antd";

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff", // 主色调（与 Tailwind 的 primary.main 一致）
    borderRadius: 8, // 圆角大小
    fontSize: 14, // 字体大小
    colorTextBase: "#333333", // 主要文字颜色（与 Tailwind 的 text.primary 一致）
    colorBgContainer: "#ffffff", // 背景色（与 Tailwind 的 background.primary 一致）
  },
  components: {
    Menu: {
      itemColor: "#333333", // 菜单项文字颜色
      itemSelectedColor: "#1890ff", // 选中菜单项文字颜色（与主色调一致）
      itemSelectedBg: "#e6f7ff", // 选中菜单项背景颜色
      darkItemBg: "#ffffff", // 菜单背景色（与 background.primary 一致）
    },
  },
};

export default lightTheme;