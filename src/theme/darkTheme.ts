// theme/darkTheme.ts
import { ThemeConfig } from "antd";

const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#177ddc", // 主题色
    borderRadius: 8, // 圆角大小
    fontSize: 14, // 字体大小
    colorBgBase: "#1f1f1f", // 背景颜色
    colorTextBase: "#ffffff", // 文字颜色
  },
  components: {
    Menu: {
      itemColor: "#ffffff", // 菜单项文字颜色
      itemSelectedColor: "#177ddc", // 选中菜单项文字颜色
      itemSelectedBg: "#2a2a2a", // 选中菜单项背景颜色
    },
  },
};

export default darkTheme;