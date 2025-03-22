// theme/darkTheme.ts
import { ThemeConfig } from "antd";

const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff", // 主色调（与 Tailwind 的 primary.main 一致）
    borderRadius: 8, // 圆角大小
    fontSize: 14, // 字体大小
    colorTextBase: "#ffffff", // 主要文字颜色（与 Tailwind 的 text.primary 一致）
    colorBgContainer: "#1a1a1a", // 背景色（与 Tailwind 的 background.primary 一致）
  },
  components: {
    Menu: {
      itemColor: "#ffffff", // 菜单项文字颜色
      itemSelectedColor: "#1890ff", // 选中菜单项文字颜色（与主色调一致）
      itemSelectedBg: "#262626", // 选中菜单项背景颜色（与 Tailwind 的 background.secondary 一致）
      darkItemBg: "#1a1a1a", // 菜单背景色（与 background.primary 一致）
    },
  },
};

export default darkTheme;