// theme/lightTheme.ts
import { ThemeConfig } from "antd";

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff", // 主题色
    borderRadius: 8, // 圆角大小
    fontSize: 14, // 字体大小
  },
  components: {
    Menu: {
      itemColor: "#333", // 菜单项文字颜色
      itemSelectedColor: "#1890ff", // 选中菜单项文字颜色
      itemSelectedBg: "#e6f7ff", // 选中菜单项背景颜色
    },
  },
};

export default lightTheme;