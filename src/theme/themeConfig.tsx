import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff", // 主题色
    borderRadius: 8, // 圆角大小
    fontSize: 10, // 字体大小
  },
  components: {
    Menu: {
      itemColor: "#333", // 菜单项文字颜色
      itemSelectedColor: "#1890ff", // 选中菜单项文字颜色
      itemSelectedBg: "#e6f7ff", // 选中菜单项背景颜色
      darkItemBg: "#001529", // 暗色主题背景色
      darkItemColor: "#fff", // 暗色主题文字颜色
      darkItemSelectedBg: "#1890ff", // 暗色主题选中背景色
      darkItemSelectedColor: "#fff", // 暗色主题选中文字颜色
    },
  },
};

export default theme;