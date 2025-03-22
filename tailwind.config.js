// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}', // 包含 app 目录下的所有文件
        './src/components/**/*.{js,ts,jsx,tsx}', // 包含 components 目录下的所有文件
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: "#1a1a1a",
                    secondary: "#262626",
                },
                text: {
                    primary: "#ffffff",
                    secondary: "#cccccc",
                },
                primary: {
                    main: "#1890ff",
                    dark: "#096dd9",
                },
                secondary: {
                    success: "#52c41a",
                    warning: "#fa8c16",
                    error: "#ff4d4f",
                },
                border: {
                    primary: "#434343",
                    secondary: "#595959",
                },
            },
            boxShadow: {
                dark: "0 4px 6px rgba(0, 0, 0, 0.5)",
            },
        },
    },
    plugins: [],
};